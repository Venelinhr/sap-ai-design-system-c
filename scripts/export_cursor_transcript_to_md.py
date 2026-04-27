#!/usr/bin/env python3
"""
Export a Cursor agent transcript (.jsonl) to a single Markdown file:
user text, assistant text, and tool invocations (inputs only; tool *results* are
not present in the stored transcript format for this product).
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path


def clean_user_text(text: str) -> str:
    t = text.strip()
    m = re.match(r"<user_query>\s*(.*)", t, re.DOTALL)
    if m:
        inner = m.group(1)
        if "</user_query>" in inner:
            inner = inner.split("</user_query>", 1)[0]
        return inner.strip()
    return t


def format_tool_input(name: str, inp) -> str:
    if name == "ApplyPatch" and isinstance(inp, str):
        return f"```diff\n{inp.rstrip()}\n```\n"
    if isinstance(inp, (dict, list)):
        return f"```json\n{json.dumps(inp, indent=2, ensure_ascii=False)}\n```\n"
    return f"```\n{inp}\n```\n"


def part_to_md(part: dict) -> str:
    t = part.get("type")
    if t == "text":
        return part.get("text") or ""
    if t == "tool_use":
        name = part.get("name", "?")
        inp = part.get("input")
        return f"### Tool: `{name}`\n\n{format_tool_input(name, inp)}"
    return f"```\n{json.dumps(part, indent=2, ensure_ascii=False)[:20_000]}\n```\n"


def message_to_md(role: str, content) -> str:
    if not isinstance(content, list):
        return f"{content!r}\n"
    return "".join(part_to_md(p) for p in content if isinstance(p, dict))


def build_markdown(
    src: Path,
) -> tuple[list[str], int, list[dict[str, object]]]:
    """Return (md_body_lines, count, raw_records). Excludes the document header."""
    lines: list[str] = []
    n = 0
    raw_records: list[dict[str, object]] = []
    with src.open(encoding="utf-8") as f:
        for raw in f:
            n += 1
            d = json.loads(raw)
            raw_records.append(d)
            role = d.get("role", "?")
            msg = d.get("message") or {}
            content = msg.get("content")
            lines.append(f"## Message {n} — **{role}**\n\n")
            if role == "user" and isinstance(content, list) and all(
                isinstance(x, dict) and x.get("type") == "text" for x in content
            ):
                text = "\n\n".join(
                    (x.get("text") or "") for x in content if isinstance(x, dict)
                )
                lines.append(clean_user_text(text))
                lines.append("\n\n")
            else:
                lines.append(message_to_md(role, content))
                lines.append("\n")
    return lines, n, raw_records


def main() -> int:
    p = argparse.ArgumentParser(
        description="Export Cursor .jsonl transcript to Markdown and/or JSON"
    )
    p.add_argument("jsonl", type=Path, help="Path to .jsonl transcript")
    p.add_argument("-o", "--output", type=Path, help="Output .md path")
    p.add_argument(
        "--json",
        type=Path,
        metavar="OUT.json",
        help="Also write a JSON file (array of message rows with export metadata wrapper)",
    )
    p.add_argument(
        "--json-only",
        action="store_true",
        help="Write only JSON (no Markdown); use with --json",
    )
    args = p.parse_args()
    src = args.jsonl.expanduser()
    if not src.is_file():
        print(f"Not found: {src}", file=sys.stderr)
        return 1

    lines, n, raw_records = build_markdown(src)

    header: list[str] = [
        "# Cursor chat export (full transcript)\n\n",
        f"- **Source:** `{src}`\n",
        f"- **Generated:** {date.today().isoformat()}\n",
        "- **Note:** Stored rows include `user` and `assistant` messages. Assistant "
        "messages may contain `text` and `tool_use` parts. **Tool outputs** "
        "returned to the model are not serialized in this file format, so this "
        "export is **not** a byte-for-byte replica of all model-visible context, "
        "but it is the full persisted history for this session file.\n",
        "- **Redaction:** Some assistant `text` segments may read `[REDACTED]` in "
        "the source export.\n\n",
        "---\n\n",
    ]
    if not args.json_only:
        out = args.output
        if out is None:
            out = src.with_suffix("").with_name(src.stem + "_EXPORT.md")
        out = out.expanduser()
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text("".join(header) + "".join(lines), encoding="utf-8")
        print(f"Wrote {out} ({n} messages)")

    json_out = args.json
    if args.json_only and json_out is None:
        print("--json-only requires --json", file=sys.stderr)
        return 1

    if json_out is not None:
        json_path = json_out.expanduser()
        bundle = {
            "export": {
                "source": str(src.resolve()),
                "generated": date.today().isoformat(),
                "format": "cursor-agent-transcript-v1",
                "message_count": n,
            },
            "messages": raw_records,
        }
        json_path.parent.mkdir(parents=True, exist_ok=True)
        json_path.write_text(
            json.dumps(bundle, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )
        print(f"Wrote {json_path} ({n} messages)")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
