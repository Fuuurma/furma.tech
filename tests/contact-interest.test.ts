import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { contactFormSchema } from "../src/lib/schemas.ts";
import { HOME_PROJECTS, ARCHIVED_PROJECTS } from "../src/lib/home-projects.ts";

const root = (path: string) =>
  fileURLToPath(new URL(`../${path}`, import.meta.url));

const read = (path: string) => readFileSync(root(path), "utf8");

const DETAIL_PAGES = [
  ["src/app/portfolio/pond/page.tsx", "pond"],
  ["src/app/portfolio/qart/page.tsx", "qart"],
  ["src/app/portfolio/bloxs/page.tsx", "bloxs"],
  ["src/app/portfolio/putarenfe/page.tsx", "putarenfe"],
] as const;

const VALID_CONTACT = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Hello — I would like to talk about a collaboration.",
};

test("each in-development detail CTA carries its own interest", () => {
  for (const [path, id] of DETAIL_PAGES) {
    assert.match(
      read(path),
      new RegExp(`primaryHref="/#contact\\?interest=${id}"`),
      `${path} must point at /#contact?interest=${id}`,
    );
  }
});

test("PlasticHome carries a validated interest into the contact form", () => {
  const source = read("src/components/home/PlasticHome.tsx");
  assert.match(source, /window\.location\.search/);
  assert.match(source, /window\.location\.hash/);
  assert.match(source, /URLSearchParams/);
  assert.match(source, /<input[^>]*type="hidden"[^>]*name="interest"/);
  assert.match(source, /writing about/);
});

test("every advertised project id parses as interest", () => {
  for (const project of HOME_PROJECTS) {
    const result = contactFormSchema.safeParse({
      ...VALID_CONTACT,
      interest: project.id,
    });
    assert.equal(result.success, true, `${project.id} must parse`);
  }
});

test("archived and unknown interest values are rejected", () => {
  for (const project of ARCHIVED_PROJECTS) {
    const result = contactFormSchema.safeParse({
      ...VALID_CONTACT,
      interest: project.id,
    });
    assert.equal(result.success, false, `${project.id} must not parse`);
  }
  assert.equal(
    contactFormSchema.safeParse({ ...VALID_CONTACT, interest: "bogus" })
      .success,
    false,
  );
});

test("interest defaults to all", () => {
  const result = contactFormSchema.safeParse(VALID_CONTACT);
  assert.equal(result.success, true);
  if (result.success) assert.equal(result.data.interest, "all");
});

test("the interest enum is exactly the catalogue ids plus all", () => {
  const field = contactFormSchema.shape.interest as unknown as {
    def: {
      innerType: {
        def: { innerType: { def: { entries: Record<string, string> } } };
      };
    };
  };
  const entries = field.def.innerType.def.innerType.def.entries;
  assert.deepEqual(
    new Set(Object.keys(entries)),
    new Set([...HOME_PROJECTS.map((p) => p.id), "all"]),
  );
});
