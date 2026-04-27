#!/usr/bin/env python3
"""
Serve the repository root so the case study hub and /docs/*.md links work.
Binds 127.0.0.1, picks a free port starting at 8089 (or PLAYBOOK_SITE_PORT), opens the browser.
"""
from __future__ import annotations

import contextlib
import os
import socket
import sys
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
DEFAULT_PORT = 8089
N_TRIES = 24
PAGE = "/examples/llm-playbook-case-study/index.html"


def _bind_port(start: int) -> int:
    for p in range(start, start + N_TRIES):
        with contextlib.closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as s:
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                s.bind(("127.0.0.1", p))
            except OSError:
                continue
            return p
    print(
        f"No free port in {start}..{start + N_TRIES - 1} on 127.0.0.1. "
        "Close another server or set PLAYBOOK_SITE_PORT.",
        file=sys.stderr,
    )
    raise SystemExit(1)


def main() -> None:
    start = int(os.environ.get("PLAYBOOK_SITE_PORT", DEFAULT_PORT))
    port = _bind_port(start)
    os.chdir(REPO)

    url = f"http://127.0.0.1:{port}{PAGE}"
    print(f"Repository root: {REPO}")
    print(f"Serving:      http://127.0.0.1:{port}/")
    print(f"Case study:   {url}")
    if "--no-open" not in sys.argv:
        webbrowser.open(url)

    handler = SimpleHTTPRequestHandler
    with ThreadingHTTPServer(("127.0.0.1", port), handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")


if __name__ == "__main__":
    main()
