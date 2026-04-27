#!/usr/bin/env python3
"""
Maintain PNG screenshots for the LLM Playbook deck (docs/case_study/exports/images/).

Commands:
  placeholders  —  Fiori-style illustrative frames (Pillow). No servers; safe in CI.
  capture       —  Try Google Chrome headless against local http servers; best effort.

Typical workflow for a *real* browser capture on your machine:
  1. Terminal A:  make demo-subscription
  2. Terminal B:  make demo-showcase
  3.              python3 scripts/playbook_images.py capture

Or:  make playbook-images  (runs `playbook_images.py capture` then you can re-run presentation)
"""
from __future__ import annotations

import argparse
import subprocess
import sys
import time
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
OUT = REPO / "docs" / "case_study" / "exports" / "images"

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SHOTS: list[tuple[str, int, str, str]] = [
    (
        "demo-subscription-8088.png",
        8088,
        "B2B subscription & billing (Object Page)",
        "examples/subscription-billing/webapp",
    ),
    (
        "demo-showcase-8087.png",
        8087,
        "Enterprise LLM showcase (Object Page, top controls)",
        "examples/enterprise-llm-showcase/webapp",
    ),
]


def cmd_placeholders() -> int:
    try:
        from PIL import Image, ImageDraw
    except ImportError:
        print("Install Pillow: pip install pillow  (or: pip install -e '.[case-study]')", file=sys.stderr)
        return 1

    W, H = 1400, 780
    OUT.mkdir(parents=True, exist_ok=True)
    HORIZON = (0, 92, 154)
    CANVAS = (250, 250, 250)
    SHELL = (54, 62, 70)
    TILE = (255, 255, 255)
    ACCENT = (0, 120, 212)

    def add_header(
        d: "ImageDraw.ImageDraw",  # type: ignore[name-defined]
        w: int,
        h: int,
        title: str,
        sub: str,
        port: int,
    ) -> None:
        d.rectangle([0, 0, w, 44], fill=HORIZON)
        d.text((20, 12), "SAP Fiori / OpenUI5 — local host demo", fill=(255, 255, 255))
        d.rectangle([0, 44, w, 88], fill=SHELL)
        d.text((20, 58), title, fill=(255, 255, 255))
        d.text((w - 480, 58), f"http://127.0.0.1:{port}/", fill=(200, 210, 220))
        d.rectangle([0, 88, w, h], fill=CANVAS)
        d.text((24, 100), sub, fill=(40, 44, 52))
        d.rounded_rectangle(
            [24, 150, w - 24, h - 24], 4, outline=(200, 205, 210), width=1, fill=TILE
        )
        d.text(
            (48, 180),
            "Object Page / sections (illustrative frame for deck export)",
            fill=ACCENT,
        )
        d.rectangle([48, 220, w // 2 - 40, 360], fill=(245, 247, 250), outline=(220, 225, 230))
        d.text((64, 240), "Header / facets", fill=(60, 65, 70))
        d.rectangle(
            [w // 2 + 20, 220, w - 48, 500], fill=(245, 247, 250), outline=(220, 225, 230)
        )
        d.text((w // 2 + 40, 240), "Main / forms / table", fill=(60, 65, 70))
        d.text(
            (48, h - 48),
            "For a live screen: make demo-subscription (8088) or make demo-showcase (8087).",
            fill=(100, 108, 120),
        )

    for fname, port, title, sub in SHOTS:
        im = Image.new("RGB", (W, H), CANVAS)
        draw = ImageDraw.Draw(im)
        add_header(draw, W, H, title, f"Path: {sub}", port)
        path = OUT / fname
        im.save(path, "PNG", optimize=True)
        print("Wrote", path)

    return 0


def cmd_capture() -> int:
    chrome = Path(CHROME) if Path(CHROME).is_file() else None
    if not chrome:
        print("Chrome not found; run: python3 scripts/playbook_images.py placeholders", file=sys.stderr)
        return 1

    OUT.mkdir(parents=True, exist_ok=True)
    servers: list[subprocess.Popen[bytes]] = []
    try:
        for _fname, port, _title, webapp in SHOTS:
            p = subprocess.Popen(
                [
                    sys.executable,
                    "-m",
                    "http.server",
                    str(port),
                    "--bind",
                    "127.0.0.1",
                    "--directory",
                    str(REPO / webapp),
                ],
                cwd=str(REPO),
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            servers.append(p)
        time.sleep(1.2)

        for fname, port, _t, _w in SHOTS:
            url = f"http://127.0.0.1:{port}/"
            out = OUT / fname
            r = subprocess.run(
                [
                    str(chrome),
                    "--headless=new",
                    "--disable-gpu",
                    "--window-size=1400,900",
                    f"--screenshot={out}",
                    url,
                ],
                capture_output=True,
                text=True,
            )
            if r.returncode != 0 or not out.is_file() or out.stat().st_size < 5000:
                print("Skip", fname, "rc=", r.returncode, r.stderr[:200] if r.stderr else "", file=sys.stderr)
            else:
                print("Captured", out)
    finally:
        for p in servers:
            p.terminate()
            try:
                p.wait(timeout=2)
            except subprocess.TimeoutExpired:
                p.kill()

    return 0


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument(
        "command",
        choices=("placeholders", "capture"),
        nargs="?",
        default="placeholders",
        help="placeholders: PIL frames; capture: Chrome (requires local Chrome macOS path)",
    )
    args = ap.parse_args()
    if args.command == "placeholders":
        sys.exit(cmd_placeholders())
    sys.exit(cmd_capture())


if __name__ == "__main__":
    main()
