import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

test("no-new-comments ratchet passes at the committed baseline", () => {
  // The gate itself is the contract: it must exit 0 on the current tree.
  // A new or edited comment anywhere in scope makes it exit 1.
  execFileSync("node", ["scripts/check-comments.mjs"], { stdio: "pipe" });
});

test("comment baseline is committed and well-formed", () => {
  assert.ok(existsSync("scripts/comment-baseline.json"), "baseline file missing");
  const baseline = JSON.parse(readFileSync("scripts/comment-baseline.json", "utf8"));
  assert.equal(baseline.version, 2);
  assert.ok(
    Object.keys(baseline.files).length > 0,
    "baseline covers no files — ratchet would be vacuous",
  );
  assert.ok(baseline.files["src/lib/water.ts"], "baseline lost a core module");
});
