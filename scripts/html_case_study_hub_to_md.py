#!/usr/bin/env python3
"""Convert examples/llm-playbook-case-study/index.html to CASE_STUDY_HUB.md with repo-relative links."""
from __future__ import annotations

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
HUB_DIR = REPO / "examples" / "llm-playbook-case-study"
INDEX = HUB_DIR / "index.html"
OUT = HUB_DIR / "CASE_STUDY_HUB.md"

try:
    from bs4 import BeautifulSoup
    from markdownify import markdownify as to_md
except ImportError as e:  # pragma: no cover
    print("Install: pip install beautifulsoup4 markdownify", file=sys.stderr)
    raise SystemExit(1) from e


def main() -> None:
    raw = INDEX.read_text(encoding="utf-8")
    soup = BeautifulSoup(raw, "html.parser")
    body = soup.body
    if not body:  # pragma: no cover
        raise SystemExit("No body in index.html")
    for tag in body.find_all("script"):
        tag.decompose()
    warn = body.find("p", id="fileProtocolWarn")
    if warn:
        warn.decompose()
    # Avoid markdownify turning "/docs/…" link text into spurious `</…>` lines
    for a in body.find_all("a", href=True):
        t = a.get_text()
        h = a.get("href", "") or ""
        if t and h and t.strip() == h.strip() and t.strip().startswith("/"):
            a.string = t.strip().lstrip("/")

    md = to_md(
        str(body),
        heading_style="ATX",
        bullets="-",
    )

    # [text](/abs/path) -> [text](../../abs/path) from examples/llm-playbook-case-study/

    def fix_href(m: re.Match[str]) -> str:
        href = m.group(1)
        if href.startswith("http://") or href.startswith("https://") or href.startswith("mailto:") or href.startswith(
            "#"
        ):
            return m.group(0)
        if href.startswith("/"):
            return f"](../..{href})"
        return m.group(0)

    md = re.sub(r"\]\(([^)]+)\)", fix_href, md)
    # Self-link to this file from repo-absolute path
    md = md.replace(
        "](../../examples/llm-playbook-case-study/CASE_STUDY_HUB.md)",
        "](CASE_STUDY_HUB.md)",
    )
    # Heal any remaining mistaken `</path>` lines from old conversions
    def heal_false_close(m: re.Match[str]) -> str:
        path = m.group(1)
        return f"- [`{path}`](../../{path})"

    md = re.sub(r"^</((?:docs/|src/).+)>$", heal_false_close, md, flags=re.MULTILINE)

    header = f"""# Case study static hub — `index.html` as Markdown

**Generated from** [`index.html`](index.html) in this folder. **Serve note:** in the browser, root paths like `../../README.md` work when the repo is served from its root (`make demo-playbook-site`). For `file://` opens, use your editor or GitHub.

**Canonical title (HTML):** {soup.title.string.strip() if soup.title and soup.title.string else "Case study hub"}

---

"""
    OUT.write_text(header + md, encoding="utf-8")
    print(f"Wrote {OUT.relative_to(REPO)}")


if __name__ == "__main__":
    main()
