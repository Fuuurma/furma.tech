/**
 * Next.js type-only export contract.
 *
 * Zero-dependency (node:test). `Metadata` and `MetadataRoute` are types in
 * `next`, not runtime exports: the `node --test` gate strips types but keeps
 * value imports, so `import { Metadata } from "next"` crashes module
 * resolution ("does not provide an export named 'Metadata'") the moment a
 * test reaches the module. Every import of those names from the bare `next`
 * specifier must be `import type` — the convention AGENTS.md documents.
 *
 * Run: `node --test tests/`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const SRC = fileURLToPath(new URL("../src", import.meta.url));

// A value import from the bare `next` specifier. The lookahead keeps
// `import type` out of the match; `next/*` subpaths are real runtime modules.
// Imports in this codebase always start their own line.
const NEXT_VALUE_IMPORT = /^[ \t]*import\s+(?!type\b)([^;]*?)\bfrom\s*['"]next['"]/gm;

function* sources(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      yield* sources(path);
    } else if (entry.endsWith(".ts") || entry.endsWith(".tsx")) {
      yield path;
    }
  }
}

test("next's type-only exports are never value-imported", () => {
  const offenders: string[] = [];
  for (const file of sources(SRC)) {
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(NEXT_VALUE_IMPORT)) {
      const named = /\{([^}]*)\}/.exec(match[1]);
      if (!named) continue;
      for (const specifier of named[1].split(",")) {
        const raw = specifier.trim();
        if (!raw || /^type\b/.test(raw)) continue;
        const imported = raw.split(/\s+as\s+/)[0].trim();
        if (imported === "Metadata" || imported === "MetadataRoute") {
          offenders.push(
            `${relative(SRC, file)}: ${match[0].replace(/\s+/g, " ").trim()}`,
          );
        }
      }
    }
  }
  assert.deepEqual(offenders, []);
});
