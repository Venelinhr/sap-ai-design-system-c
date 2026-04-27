from __future__ import annotations

import subprocess
import tempfile
from pathlib import Path
from typing import Dict, List
from xml.etree import ElementTree as ET


SAP_MVC_NS = "sap.ui.core.mvc"
SAP_M_NS = "sap.m"
SAP_LAYOUT_FORM_NS = "sap.ui.layout.form"


def _split_tag(tag: str) -> tuple[str, str]:
    if tag.startswith("{") and "}" in tag:
        ns, local = tag[1:].split("}", 1)
        return ns, local
    # No namespace; treat prefix notation as non-canonical.
    return "", _local_name(tag)


def _local_name(tag: str) -> str:
    if "}" in tag:
        return tag.split("}", 1)[1]
    return tag.split(":")[-1]


def validate_sapui5_xml_structure(xml_text: str) -> Dict[str, object]:
    root = ET.fromstring(xml_text)
    root_ns, root_name = _split_tag(root.tag)

    required_controls = [
        (SAP_M_NS, "Page"),
        (SAP_LAYOUT_FORM_NS, "SimpleForm"),
        (SAP_M_NS, "Button"),
    ]
    found_exact: List[tuple[str, str]] = []
    for elem in root.iter():
        ns, local = _split_tag(elem.tag)
        if (ns, local) in required_controls:
            found_exact.append((ns, local))

    missing = [
        f"{ns}.{name}" for (ns, name) in required_controls if (ns, name) not in set(found_exact)
    ]
    return {
        "xmlParseable": True,
        "xmlRootIsMvcView": root_name == "View" and root_ns == SAP_MVC_NS,
        "xmlRootNamespace": root_ns,
        "xmlMissingRequiredNodes": missing,
        "xmlHasRequiredNodes": len(missing) == 0,
    }


def validate_react_tsx_compiles(react_tsx: str) -> Dict[str, object]:
    with tempfile.TemporaryDirectory(prefix="po-tsx-validate-") as td:
        tmp = Path(td)
        tsx_file = tmp / "PurchaseOrderForm.tsx"
        stubs_file = tmp / "react-stubs.d.ts"
        tsconfig = tmp / "tsconfig.json"

        tsx_file.write_text(react_tsx + "\n", encoding="utf-8")
        stubs_file.write_text(
            (
                "declare namespace React { type FormEvent = any; }\n"
                "declare module 'react' {\n"
                "  const React: any;\n"
                "  export default React;\n"
                "  export function useState<S>(initial: S): [S, (v: S | ((prev: S) => S)) => void];\n"
                "}\n"
                "declare namespace JSX {\n"
                "  interface Element {}\n"
                "  interface IntrinsicElements { [elemName: string]: any; }\n"
                "}\n"
            ),
            encoding="utf-8",
        )
        tsconfig.write_text(
            (
                "{\n"
                '  "compilerOptions": {\n'
                '    "target": "ES2020",\n'
                '    "module": "ESNext",\n'
                '    "jsx": "preserve",\n'
                '    "strict": false,\n'
                '    "skipLibCheck": true,\n'
                '    "noEmit": true\n'
                "  },\n"
                '  "files": ["react-stubs.d.ts", "PurchaseOrderForm.tsx"]\n'
                "}\n"
            ),
            encoding="utf-8",
        )

        cmd = ["npx", "-y", "-p", "typescript@5.9.3", "tsc", "-p", str(tsconfig)]
        proc = subprocess.run(cmd, capture_output=True, text=True)
        ok = proc.returncode == 0
        return {
            "reactTypeScriptCompileOk": ok,
            "reactTypeScriptCommand": " ".join(cmd),
            "reactTypeScriptStdout": proc.stdout.strip(),
            "reactTypeScriptStderr": proc.stderr.strip(),
        }

