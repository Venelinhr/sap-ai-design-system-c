# SAP_LLM_Playbook_Full.pptx — story outline (for editors)

**Regenerate:** `make playbook-presentation` (needs `python-pptx` from `pip install -e ".[case-study]"`).

**Script:** `scripts/build_playbook_presentation.py` — edit the `_slides()` list to change wording or order. **Unlimited length:** add more `content` / `compare` / `section` / `title` objects before the final *Thank you*.

**Latest build:** **73+ slides** (includes **Part 3b–3e** — turning point + **:8087 / :8088** in `TURNING_POINT_MOMENTUM.md` & `DEMOS…`, + Parts 4–10).

## Slide types

| `kind` | Use |
|--------|-----|
| `title` | Opening and closing: title + subtitle on title layout |
| `section` | **Part N — Title** on title layout (big section divider) + one-line *blurb* |
| `content` | Normal bullets: slide title + body |
| `compare` | Two blocks: `left` / `right` with `left_header` / `right_header` — e.g. *Problem* / *Solution*, *DO* / *DON’T*, *Current* / *Target* |
| `image` | `title` + `file` (PNG in `docs/case_study/exports/images/`) + `caption` + optional `note` (localhost URL / `make` / regen) |

## Full narrative (all parts)

1. **Opening** — Title + expanded agenda (includes Part 3b–3e).  
2. **Part 1 — Current situation** — Typical workflow, gap, what breaks.  
3. **Part 2 — How it should be** — Chaos → target, stack, “LLM-readable” line.  
4. **Part 3 — The bridge** — Read order, key files, Figma, 3 token layers, JSON intro.  
5. **Part 3b — Agent skills, path, localhost** — What a **skill** is; what’s **included**; **8-step** chain (MCP/HTTP → JSON → SAP XML → validate + demos); two **image** slides (regen: `make playbook-images` or `scripts/playbook_images.py capture`).  
6. **Part 3c — Zero → 100%** — What **100%** means; **six** phase bands; **gap→fix**; **compare** wrong vs best **prompts**; map **screenshots** to `8085` / `8087` / `8088` + full doc [`docs/WORKFLOW_ZERO_TO_100.md`](../WORKFLOW_ZERO_TO_100.md).  
7. **Part 3d — :8087 & :8088** — **Approach, issues, fixes, best path**; compare; [`docs/DEMOS_LOCALHOST_8087_8088.md`](../DEMOS_LOCALHOST_8087_8088.md).  
8. **Part 3e — The “moment”** — When work **flips** from chat to **grounded** pipeline; **your action** vs **assistant** vs **repo**; fill-in: [`docs/TURNING_POINT_MOMENTUM.md`](../TURNING_POINT_MOMENTUM.md).  
9. **Part 4 — Day to day** — MCP/static/direct, 4-step, 7+5 step, errors, DO/DON’T, why it’s right.  
10. **Part 5 — Start** — First hour, **bookmark URLs**, tools, **regenerate this deck**.  
11. **Part 6 — Implementation journey** — **7 steps**, each **Problem / Solution**.  
12. **Part 7 — What to read (full shelf)**  
13. **Part 8 — JSON**  
14. **Part 9 — MCP**  
15. **Part 10 — More in your org pack**  
16. **Thank you** — Pointers to playbook + `TURNING_POINT_MOMENTUM`, `DEMOS…`, `WORKFLOW…`, Parts 6–10.

**Design intent:** **compare** slides use clear headers so **Problem** vs **Solution** (or **DO** vs **DON’T**) is obvious at a glance.
