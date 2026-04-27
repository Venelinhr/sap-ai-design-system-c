import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_token_audit_exits_zero_on_clean_tree() -> None:
    """Gate 7: static visual audit must pass on the main branch layout."""
    script = ROOT / "scripts" / "audit_static_visuals.py"
    r = subprocess.run(
        [sys.executable, str(script)],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
    )
    assert r.returncode == 0, r.stdout + r.stderr
