import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { contactFormSchema } from "../src/lib/schemas.ts";
import {
  ARCHIVED_PROJECTS,
  HOME_PROJECTS,
} from "../src/lib/home-projects.ts";

const read = (path: string): string =>
  readFileSync(new URL(path, import.meta.url), "utf8");

const VALID_CONTACT = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Hello — I would like to talk about a collaboration.",
};

const DETAIL_PAGES = [
  ["pond", "pond"],
  ["qart", "qart"],
  ["bloxs", "bloxs"],
  ["putarenfe", "putarenfe"],
] as const;

for (const [dir, id] of DETAIL_PAGES) {
  test(`portfolio/${dir} CTA deep-links to contact carrying interest=${id}`, () => {
    const source = read(`../src/app/portfolio/${dir}/page.tsx`);
    assert.match(
      source,
      new RegExp(`primaryHref="/#contact\\?interest=${id}"`),
      `expected primaryHref="/#contact?interest=${id}"`,
    );
  });
}

test("PlasticHome reads interest from the URL and submits it with the form", () => {
  const home = read("../src/components/home/PlasticHome.tsx");
  assert.match(home, /URLSearchParams/);
  assert.match(home, /location\.(search|hash)/);
  assert.match(home, /<input[^>]*type="hidden"[^>]*name="interest"/);
  assert.match(home, /writing about/);
  assert.match(home, /HOME_PROJECTS\.find/);
});

test("PlasticHome still routes the #contact?interest= deep link to the contact section", () => {
  const home = read("../src/components/home/PlasticHome.tsx");
  assert.doesNotMatch(home, /location\.hash === "#contact"/);
  assert.match(home, /isContactHash\(window\.location\.hash\)/);
});

test("every advertised HOME_PROJECTS id parses as contact interest", () => {
  for (const project of HOME_PROJECTS) {
    const result = contactFormSchema.safeParse({
      ...VALID_CONTACT,
      interest: project.id,
    });
    assert.equal(
      result.success,
      true,
      `interest "${project.id}" must parse`,
    );
  }
});

test("interest accepts the catch-all value and defaults to it", () => {
  const explicit = contactFormSchema.safeParse({
    ...VALID_CONTACT,
    interest: "all",
  });
  assert.equal(explicit.success, true);

  const defaulted = contactFormSchema.safeParse(VALID_CONTACT);
  assert.equal(defaulted.success, true);
  if (defaulted.success) {
    assert.equal(defaulted.data.interest, "all");
  }
});

test("archived project ids and stale values are rejected as interest", () => {
  for (const project of ARCHIVED_PROJECTS) {
    const result = contactFormSchema.safeParse({
      ...VALID_CONTACT,
      interest: project.id,
    });
    assert.equal(
      result.success,
      false,
      `archived id "${project.id}" must not parse`,
    );
  }
  for (const stale of ["bogus", "Pond", "tic tac toe"]) {
    const result = contactFormSchema.safeParse({
      ...VALID_CONTACT,
      interest: stale,
    });
    assert.equal(result.success, false, `interest "${stale}" must not parse`);
  }
});
