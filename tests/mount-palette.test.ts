/**
 * The v1 pages are monochrome.
 *
 * The mount — the sheet a product's picture is printed on — used to be a
 * pastel per project: a decorative wash that carried a hue the studio's brand
 * does not have, ignored the theme, and split the home into three worlds
 * between the two black-and-white screens. One neutral plate instead, and the
 * products keep their colours inside their own pictures.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { HOME_PROJECTS } from "../src/lib/home-projects.ts";

const css = readFileSync(
  fileURLToPath(new URL("../src/app/globals.css", import.meta.url)),
  "utf8",
);

test("the mount is a neutral plate: one value, no chroma", () => {
  const mount = css.match(/--mount:\s*([^;]+);/);
  assert.ok(mount, "the mount token must exist");

  // oklch(L C H) — the chroma component has to be zero.
  const parts = mount[1].match(
    /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/,
  );
  assert.ok(
    parts,
    `--mount must be an oklch() value, got "${mount[1]}"`,
  );
  assert.equal(Number(parts[2]), 0, "--mount must carry no chroma");
});

test("the mount is defined once: the plate sits on a black ground in both themes", () => {
  const definitions = css.match(/--mount:/g) ?? [];
  assert.equal(
    definitions.length,
    1,
    "--mount must be defined once, in :root — it does not invert with the theme",
  );
});

test("the mount keeps the value the washes had", () => {
  // The ten washes this replaces ran OKLCH L 0.879–0.939, mean 0.918. The
  // plate is the house's own --grey-200 step, so no product's picture
  // changes contrast against the sheet it is printed on.
  const mount = css.match(/--mount:\s*oklch\(\s*([\d.]+)\s+0\s+0\s*\);/);
  assert.ok(mount, "--mount must be an oklch() value");
  assert.equal(
    Number(mount[1]),
    0.92,
    "--mount must be the grey-200 step, not an invented lightness",
  );

  const grey200 = css.match(/--grey-200:\s*oklch\(\s*([\d.]+)\s+0\s+0\s*\);/);
  assert.ok(grey200, "the house grey scale must have a --grey-200 step");
  assert.equal(
    Number(grey200[1]),
    Number(mount[1]),
    "--mount must be the house's own grey step, at the same lightness",
  );
});

test("no project carries a colour of its own", () => {
  assert.ok(HOME_PROJECTS.length > 0, "the portfolio must not be empty");
  for (const project of HOME_PROJECTS) {
    assert.equal(
      "coverTint" in project,
      false,
      `${project.id} must not carry a colour of its own`,
    );
  }
});
