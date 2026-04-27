# The moment things start to happen (turning point)

**Why this file exists:** Many teams ask *“when did it click?”* and *“was that me, the agent, or the repo?”* This page names the **mechanical** turning point in **this** program, separates **roles**, and gives you a **blank** to record **your** story (your action vs assistant vs tooling).

---

## What “starts to happen” (technical, not magic)

**Before the turn:** The model **free-associates** Fiori-looking XML; success is **a screenshot** or a lucky run.

**After the turn:** The **same** stack every time: **version-pinned** UI5 + **retrieved** `ComponentSpec` (or a **small** registry slice) + **one** **recipe** + **`make`** + **browser**. Progress is **evidence** (API line, `make` log, DOM), not **vibes**.

**The “thing” that actually flips** is *not* a single clever prompt. It is **two habits** that lock in together:

1. **You stop treating the chat as the source of truth** and start treating **the OpenUI5 API + this repo** as the **judge** of valid control names and aggregations.  
2. **You run the pipeline** — at least `make build-registry` (or your path’s equivalent) and **one** `make demo-*` — **before** you call a review “done.”

The **first** time you see **no red** from your chosen `make` target **and** `http://localhost:8087` or `:8088` (or `8085` PO) **loads** with a **Fiori-credible** screen — that is often the **felt** *“it moved”* moment. It means the **wiring** is real, not a one-off.

---

## Who did what (roles — so “my action vs your decision” is clear)

| Role | What you bring | What you do *not* need to do alone |
|------|----------------|-----------------------------------|
| **You (human / lead)** | **Intent** (Object Page, subscription story, “must be Horizon+compact”); **non-negotiables** (e.g. “only `sap.*` from API”, “no merge without `make`”); **which** `make` path is the **ship** path | Invent every aggregation rule — the **API** + **registry** + **recipes** hold that. |
| **Assistant / LLM in the loop** | **Drafts** `view.xml` / `controller` **if** you attach **slices** and **version**; suggests **minimal** diffs; can run **7-step** self-check in text | It cannot **reliably** “remember” the whole SAPUI5 API; **grounding** must come from **retrieved** files or **tools**. **Your decision** to **accept** or **reject** a line is still **yours**. |
| **This repository (the product decision)** | **ComponentSpec** schema, `data/registry.json`, **FastAPI** search/get/validate, **`make` gates**, **demos** on fixed ports | It is the **repeated** “no” to illegal XML — if you **skip** it, the moment never **sticks**. |

**Plain sentence:** *Your* **action** is to **turn on** the discipline (version, retrieval, `make`, browser). *The* **assistant’s* role is to **speed up** work **inside** those rails. *The* **repo’s* **decision** (encoded by maintainers) is: **mechanical** truth **wins** over chat — that is **why** the demos exist.

---

## The subscription / showcase context (`:8088` and `:8087`)

For the **B2B subscription** and **LLM showcase** demos specifically, the **momentum** moment is often:

- **8087:** First time **SimpleForm** + **Table** + OPL **sections** all render **without** inventing a control **outside** the **seed** list — the **green** “ResponsiveGridLayout” strip is **boring** in a *good* way: it means **structure** was set correctly.  
- **8088:** First time the **header** **HBox** **doesn’t clip** (OverflowToolbar issue **avoided**—see `Subscription.view.xml` comments) **and** Unsubscribe / Re-subscribe **drives** **ObjectStatus** + **MessageStrip** — the **state machine** **lives** in the browser.

Details: [DEMOS_LOCALHOST_8087_8088.md](DEMOS_LOCALHOST_8087_8088.md).

---

## Your story (fill in — 4 lines)

*Use in decks or partner briefs. Replace the brackets.*

1. **The day / sprint when it clicked:** [ … ]  
2. **My action (one sentence):** e.g. *“I refused to accept XML until every line had a control id I could look up in the API.”* [ … ]  
3. **What the assistant / agent did that helped (one sentence):** e.g. *“It diffed the OPL `blocks` after I attached the recipe.”* [ … ]  
4. **What the repo / `make` caught that chat did not (one sentence):** e.g. *“`make validate-registry` failed until we fixed the slot name.”* [ … ]  

---

## See also

- [WORKFLOW_ZERO_TO_100.md](WORKFLOW_ZERO_TO_100.md) — phases 0–100%  
- [DEMOS_LOCALHOST_8087_8088.md](DEMOS_LOCALHOST_8087_8088.md) — :8087 / :8088  
- [LLM_HUMAN_PLAYBOOK.md](LLM_HUMAN_PLAYBOOK.md) — full briefing  
