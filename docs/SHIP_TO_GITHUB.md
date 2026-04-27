# Ship this repository to GitHub (copy-paste)

**GitHub URL:** [github.com/Venelinhr/sap-ai-design-system-c](https://github.com/Venelinhr/sap-ai-design-system-c)  
**Do not** use placeholder paths like `/path/to/...` — always `cd` into the real folder that contains **`Makefile`**.

## One-shot script (macOS Terminal)

Some IDEs block creating `.git`; use **Terminal.app** (or iTerm) on your machine:

```bash
cd ~/sapui5-llm-ready          # or wherever this repo lives
chmod +x scripts/first_push_to_github.sh
bash scripts/first_push_to_github.sh
```

It runs `make all`, `make build-sap-po`, sets `origin` to `https://github.com/Venelinhr/sap-ai-design-system-c.git`, and pushes `main`. For **SSH** remotes:  
`bash scripts/first_push_to_github.sh git@github.com:Venelinhr/sap-ai-design-system-c.git`

## 1) Find your project folder (macOS / Linux)

After clone or download, the folder is usually one of:

| Situation | Command |
|-----------|---------|
| You **cloned** the repo | `cd ~/sap-ai-design-system-c` (or the path you used with `git clone`) |
| You still have the old folder name | `cd ~/sapui5-llm-ready` if that is where `Makefile` lives |
| You are not sure | `ls ~/Makefile` → wrong; `find ~ -maxdepth 3 -name Makefile 2>/dev/null \| head` and pick the one **inside** this project |

**Check:** `test -f Makefile && echo OK` should print `OK`.

## 2) Validate before commit

```bash
cd /your/actual/project/path
python3 -m venv .venv
source .venv/activate
pip install -e ".[dev]"
make all && make build-sap-po
```

Both must finish with **exit code 0**.

## 3) Log in to GitHub from the terminal (once per machine)

```bash
gh auth login
# or set up SSH: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

Do **not** paste tokens into chat or commit them.

## 4) First-time push (no local git yet)

```bash
cd /your/actual/project/path
git init
git add -A
git status
git commit -m "Initial commit: SAP AI design system registry and demos"
git branch -M main
git remote add origin https://github.com/Venelinhr/sap-ai-design-system-c.git
git push -u origin main
```

If `remote add` fails with **"remote origin already exists"**:

```bash
git remote -v
git remote set-url origin https://github.com/Venelinhr/sap-ai-design-system-c.git
git push -u origin main
```

## 5) Or create the repo and push in one step (GitHub CLI)

```bash
cd /your/actual/project/path
gh auth login
gh repo create Venelinhr/sap-ai-design-system-c --public --source=. --remote=origin --push
```

(Use `--private` if the repo should not be public.)

## 6) If push is rejected (remote has README)

If GitHub already has commits you do not have locally:

```bash
git pull origin main --rebase --allow-unrelated-histories
# resolve any conflicts, then
git push -u origin main
```

(Prefer an **empty** repo on GitHub when possible to avoid this.)

## Naming reference

| What | Value |
|------|--------|
| **Git remote / PyPI distribution name** | `sap-ai-design-system-c` (see `pyproject.toml` `[project] name`) |
| **Python import package** (unchanged) | `sapui5_llm_ready` — e.g. `import sapui5_llm_ready` |
| **Clone** | `git clone https://github.com/Venelinhr/sap-ai-design-system-c.git` |

More detail: [GITHUB_PUBLISH.md](GITHUB_PUBLISH.md)
