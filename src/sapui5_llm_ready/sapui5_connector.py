from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Optional

import httpx


DEFAULT_CANDIDATE_URLS = [
    # Common UI5 sdk locations for machine-readable API docs.
    "https://ui5.sap.com/test-resources/sap/m/designtime/api.json",
    "https://ui5.sap.com/test-resources/sap/ui/core/designtime/api.json",
    "https://sapui5.hana.ondemand.com/test-resources/sap/m/designtime/api.json",
    "https://sapui5.hana.ondemand.com/test-resources/sap/ui/core/designtime/api.json",
]


@dataclass(frozen=True)
class DownloadResult:
    url: str
    payload: Dict[str, Any]


def _normalize_api_payload(raw: Dict[str, Any]) -> Dict[str, Any]:
    # Some UI5 api.json files expose symbols under "symbols" and some under "classes"/"controls".
    if "symbols" in raw and isinstance(raw["symbols"], list):
        return raw

    symbols: List[Dict[str, Any]] = []
    for key in ("classes", "controls"):
        val = raw.get(key)
        if isinstance(val, list):
            symbols.extend([x for x in val if isinstance(x, dict)])
    if symbols:
        out = dict(raw)
        out["symbols"] = symbols
        return out
    return raw


def download_first_available_api_doc(
    *,
    candidate_urls: Optional[List[str]] = None,
    timeout_s: int = 60,
) -> DownloadResult:
    urls = candidate_urls or DEFAULT_CANDIDATE_URLS
    errors: List[str] = []

    headers = {
        "User-Agent": "sap-ai-design-system-c/0.1 (+https://ui5.sap.com/)",
        "Accept": "application/json, text/plain, */*",
    }
    with httpx.Client(timeout=timeout_s, follow_redirects=True, headers=headers) as client:
        for url in urls:
            try:
                resp = client.get(url)
                if resp.status_code >= 400:
                    errors.append(f"{url} -> HTTP {resp.status_code}")
                    continue
                payload = resp.json()
                normalized = _normalize_api_payload(payload)
                if isinstance(normalized.get("symbols"), list):
                    return DownloadResult(url=url, payload=normalized)
                errors.append(f"{url} -> no symbols/classes/controls in payload")
            except Exception as exc:  # noqa: BLE001
                errors.append(f"{url} -> {exc}")

    raise RuntimeError("No SAPUI5 API endpoint succeeded. " + " | ".join(errors))

