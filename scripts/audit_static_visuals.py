#!/usr/bin/env python3
"""
Audit static HTML/CSS for hardcoded hex colors (and raw px in CSS) outside the
closed token file. Aligned with https://hvpandya.com/llm-design-systems

Authoritative single source for static demo colors:
  examples/purchase-order/demo/_shared/llm-tokens.css
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

HEX_RE = re.compile(r"#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})\b")
PX_RE = re.compile(r"(?<![\w.])(\d{1,4})px(?=\s*[!;}\)]|,|\s*$)")


def _is_token_file(root: Path, path: Path) -> bool:
    return path.resolve() == (root / "examples/purchase-order/demo/_shared/llm-tokens.css").resolve()


def _strip_block_comments(text: str) -> str:
    out, i, n = [], 0, len(text)
    while i < n:
        if i + 1 < n and text[i : i + 2] == "/*":
            j = text.find("*/", i + 2)
            i = j + 2 if j != -1 else n
            continue
        out.append(text[i])
        i += 1
    return "".join(out)


def scan_path(root: Path, path: Path) -> list[tuple[int, str, str]]:
    if _is_token_file(root, path):
        return []
    try:
        raw = path.read_text(encoding="utf-8")
    except OSError as e:
        return [(0, "read", str(e))]
    text = _strip_block_comments(raw) if path.suffix.lower() == ".css" else raw
    issues: list[tuple[int, str, str]] = []
    for i, line in enumerate(text.splitlines(), start=1):
        for m in HEX_RE.finditer(line):
            issues.append((i, "hex", m.group(0)))
        if path.suffix.lower() in (".css",):
            for m in PX_RE.finditer(line):
                # allow 0px if ever needed; still prefer rem in components
                if m.group(1) == "0":
                    continue
                issues.append((i, "px", m.group(0)))
    return issues


def run_audit(root: Path) -> int:
    token = root / "examples/purchase-order/demo/_shared/llm-tokens.css"
    if not token.exists():
        print(f"ERROR: missing {token}", file=sys.stderr)
        return 1

    roots = [
        root / "examples/purchase-order/demo",
        root / "examples/enterprise-llm-showcase/webapp",
        root / "examples/subscription-billing/webapp",
        root / "examples/llm-playbook-case-study",
    ]
    files: list[Path] = []
    for d in roots:
        if not d.is_dir():
            continue
        for p in d.rglob("*"):
            if not p.is_file() or p.suffix.lower() not in (".html", ".css"):
                continue
            rel = p.relative_to(root).as_posix()
            if "/ui5/webapp/" in rel or "/react/" in rel:
                continue
            files.append(p)
    files = sorted(set(files), key=str)

    report: list[tuple[str, int, str, str]] = []
    for f in files:
        for line, kind, detail in scan_path(root, f):
            rel = f.relative_to(root).as_posix()
            report.append((rel, line, kind, detail))

    if not report:
        print("Static visual audit: OK (0 violations).")
        return 0
    print("Static visual audit: FAIL", file=sys.stderr)
    for rel, line, kind, detail in report:
        print(f"  {rel}:{line}: [{kind}] {detail}", file=sys.stderr)
    print(
        "\nUse examples/purchase-order/demo/_shared/llm-tokens.css for raw values; "
        "reference var(--llm-*) in deck.css / pitch.css only.",
        file=sys.stderr,
    )
    return 1


if __name__ == "__main__":
    raise SystemExit(run_audit(Path(__file__).resolve().parents[1]))
