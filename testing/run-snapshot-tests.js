/**
 * Snapshot-style tests for canonical LLM outputs (subscription prompt + file).
 */
"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const ValidationPipeline = require("../validation/run-validation");

const ROOT = path.join(__dirname, "..");
const SUBSCRIPTION_OUTPUT = path.join(ROOT, "test-outputs", "customer-subscription-output.json");

const SUBSCRIPTION_TYPES = new Set([
  "sap.m.App",
  "sap.m.Page",
  "sap.m.Panel",
  "sap.ui.layout.form.SimpleForm",
  "sap.m.Input",
  "sap.m.Select",
  "sap.m.Button",
  "sap.m.Table",
  "sap.m.SearchField",
  "sap.m.CheckBox"
]);

function collectTypes(node, out) {
  if (!node) return;
  if (node.type) out.add(node.type);
  (node.children || []).forEach((c) => collectTypes(c, out));
}

function countNodesWithProps(node) {
  if (!node) return 0;
  let n = node.props && typeof node.props === "object" ? 1 : 0;
  for (const c of node.children || []) n += countNodesWithProps(c);
  return n;
}

function runSubscriptionTests() {
  const raw = fs.readFileSync(SUBSCRIPTION_OUTPUT, "utf8");
  const output = JSON.parse(raw);
  const pipeline = new ValidationPipeline();
  const report = pipeline.validate(output);

  assert.strictEqual(report.status, "passed", `Expected status passed, got ${report.status}. Issues: ${report.issues.join("; ")}`);
  assert.ok(report.score && report.score.total >= 85, `Score should be >= 85, got ${report.score && report.score.total}`);
  assert.strictEqual(report.validation_results.hallucination.hasHallucinations, false);

  assert.strictEqual(output.ui_tree.type, "sap.m.App");
  const types = new Set();
  collectTypes(output.ui_tree, types);
  for (const t of SUBSCRIPTION_TYPES) {
    assert.ok(types.has(t), `ui_tree should include ${t}, found: ${[...types].sort().join(", ")}`);
  }

  const propsNodes = countNodesWithProps(output.ui_tree);
  assert.ok(propsNodes >= 8, `Expected 8+ nodes with props for props-accuracy coverage, got ${propsNodes}`);

  const xml = output.sapui5.xml_view;
  assert.ok(xml.includes("<mvc:View"), "xml_view should contain mvc:View");
  assert.ok(xml.includes("Customer Subscription Management"), "xml_view should include page title");
  assert.ok(xml.includes("form:SimpleForm") || xml.includes("SimpleForm"), "xml_view should include SimpleForm");
  assert.ok(xml.includes("SearchField"), "xml_view should include SearchField");
  assert.ok(xml.includes("SubscriptionManage"), "xml_view/controller should reference SubscriptionManage");

  const ctrl = output.sapui5.controller_js;
  assert.ok(ctrl.includes("demo.controller.SubscriptionManage"), "controller should extend SubscriptionManage");
  assert.ok(ctrl.includes("JSONModel"), "controller should use JSONModel");
  assert.ok(ctrl.includes("onSave"), "controller should define onSave");

  console.log("OK subscription snapshot:", SUBSCRIPTION_OUTPUT);
  console.log(`   score: ${report.score.total}/100, props nodes: ${propsNodes}, types: ${SUBSCRIPTION_TYPES.size}`);
}

function main() {
  runSubscriptionTests();
  console.log("\nAll snapshot tests passed.");
}

main();
