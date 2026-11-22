/**
 * Stack and architecture truth contract.
 *
 * Zero-dependency (node:test). The agent guides (AGENTS.md, GEMINI.md,
 * QWEN.md, README.md) and ARCHITECTURE.md carry a picture of the pinned
 * stack and module tree; this suite pins the package.json `next` version
 * into each guide's stack/framework line and pins ARCHITECTURE.md to the
 * modules that exist on disk, so a version bump or file move cannot
 * drift silently again.
 *
 * Run: `node --test tests/stack-and-arch-truth.test.ts`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const pkg = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as { dependencies?: Record<string, string> };
const nextVersion = pkg.dependencies?.next;
assert.ok(
  typeof nextVersion === "string" && nextVersion.length > 0,
  'package.json must pin a "next" dependency version',
);

function readRepoFile(path: string): string {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

const STACK_LINES: ReadonlyArray<readonly [string, RegExp]> = [
  ["AGENTS.md", /^\*\*Stack:\*\*/],
  ["GEMINI.md", /\*\*Framework:\*\*/],
  ["README.md", /^Next\.js /],
];

for (const [file, marker] of STACK_LINES) {
  test(`${file} names the pinned Next.js version on its stack/framework line`, () => {
    const line = readRepoFile(file).split("\n").find((l) => marker.test(l));
    assert.ok(line, `${file} must carry a stack/framework line`);
    assert.ok(
      line.includes(`Next.js ${nextVersion}`),
      `${file} must name Next.js ${nextVersion} (the package.json pin), got: ${line.trim()}`,
    );
  });
}

test("QWEN.md names the pinned Next.js version in its intro and framework row", () => {
  const lines = readRepoFile("QWEN.md").split("\n");
  const intro = lines.find((l) => /Next\.js[^\n]*website/.test(l));
  assert.ok(intro, "QWEN.md must carry a Next.js intro line");
  assert.ok(
    intro.includes(`Next.js ${nextVersion}`),
    `QWEN.md intro must name Next.js ${nextVersion}, got: ${intro.trim()}`,
  );
  const row = lines.find((l) => l.startsWith("| Framework |"));
  assert.ok(row, "QWEN.md must carry a Framework table row");
  assert.ok(
    row.includes(`Next.js ${nextVersion}`),
    `QWEN.md framework row must name Next.js ${nextVersion}, got: ${row.trim()}`,
  );
});

test("ARCHITECTURE.md names the real water module and the real hook", () => {
  const text = readRepoFile("ARCHITECTURE.md");
  assert.match(text, /`water\.ts`/, "ARCHITECTURE.md must name src/lib/water.ts");
  assert.ok(!text.includes("fluid.ts"), "ARCHITECTURE.md must not name fluid.ts");
  const hooksLine = text.split("\n").find((l) => l.includes("`src/hooks/`"));
  assert.ok(hooksLine, "ARCHITECTURE.md must carry a src/hooks/ bullet");
  assert.ok(
    hooksLine.includes("useScroll.ts"),
    "the src/hooks/ bullet must name useScroll.ts",
  );
  assert.ok(
    !text.includes("use-mobile.ts") && !text.includes("useAgentNavigation.ts"),
    "ARCHITECTURE.md must not name use-mobile.ts or useAgentNavigation.ts",
  );
});

test("the modules ARCHITECTURE.md names exist on disk", () => {
  for (const path of ["src/lib/water.ts", "src/hooks/useScroll.ts"]) {
    assert.ok(
      existsSync(new URL(`../${path}`, import.meta.url)),
      `${path} must exist`,
    );
  }
});
