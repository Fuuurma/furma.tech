/**
 * Hydration-safety contract for src/lib/use-reduced-motion.ts
 * (`useStableReducedMotion`).
 *
 * The hook exists so components can branch markup on the reduced-motion
 * preference without a hydration mismatch (React error #418): the server
 * render and the first client render must both paint `false`, and only the
 * post-mount effect may consult `window.matchMedia`. framer-motion's
 * `useReducedMotion` — the implementation this hook replaces — reports the
 * real preference on the first client render (and `null` on the server),
 * so reverting to it fails the first-paint assertions below.
 *
 * Plain node:test, no DOM test dependency: React's server renderer runs in
 * bare Node, and the client render runs against a minimal DOM shim that is
 * enough for `createRoot` on a single `<div>{text}</div>`. React and
 * react-dom are app dependencies, not test dependencies. The shim installs
 * its `window`/`document` before the modules under test are imported, so
 * the falsifier observes the same globals the real hook sees.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

/** matchMedia double that records change subscriptions and replays them. */
class FakeMediaQueryList {
  matches: boolean;
  #listeners: (() => void)[] = [];

  constructor(matches: boolean) {
    this.matches = matches;
  }

  addEventListener(type: string, listener: () => void): void {
    if (type === "change") this.#listeners.push(listener);
  }

  removeEventListener(type: string, listener: () => void): void {
    this.#listeners = this.#listeners.filter((l) => l !== listener);
  }

  /** Flip the OS preference and notify live subscribers. */
  dispatch(matches: boolean): void {
    this.matches = matches;
    for (const listener of [...this.#listeners]) listener();
  }

  changeListeners(): readonly (() => void)[] {
    return this.#listeners;
  }
}

/* ------------------------------------------------------------------ */
/* Minimal DOM: enough of Node/Element/Document for createRoot on one  */
/* <div>{text}</div> tree. No third-party DOM implementation.          */
/* ------------------------------------------------------------------ */

type Listener = (...args: unknown[]) => void;

class FakeNode {
  nodeType: number;
  nodeName: string;
  parentNode: FakeNode | null = null;
  childNodes: FakeNode[] = [];
  namespaceURI = "http://www.w3.org/1999/xhtml";
  ownerDocument: FakeDocument | null = null;
  #listeners = new Map<string, Set<Listener>>();

  constructor(nodeType: number, nodeName: string) {
    this.nodeType = nodeType;
    this.nodeName = nodeName;
  }

  appendChild<T extends FakeNode>(child: T): T {
    if (child.parentNode) child.parentNode.removeChild(child);
    this.childNodes.push(child);
    child.parentNode = this;
    return child;
  }

  insertBefore(node: FakeNode, ref: FakeNode | null): FakeNode {
    if (ref === null) return this.appendChild(node);
    const index = this.childNodes.indexOf(ref);
    if (index === -1) return this.appendChild(node);
    if (node.parentNode) node.parentNode.removeChild(node);
    this.childNodes.splice(index, 0, node);
    node.parentNode = this;
    return node;
  }

  removeChild<T extends FakeNode>(child: T): T {
    const index = this.childNodes.indexOf(child);
    if (index !== -1) this.childNodes.splice(index, 1);
    child.parentNode = null;
    return child;
  }

  get firstChild(): FakeNode | null {
    return this.childNodes[0] ?? null;
  }

  get lastChild(): FakeNode | null {
    return this.childNodes[this.childNodes.length - 1] ?? null;
  }

  get nextSibling(): FakeNode | null {
    const parent = this.parentNode;
    if (!parent) return null;
    return parent.childNodes[parent.childNodes.indexOf(this) + 1] ?? null;
  }

  get textContent(): string {
    return this.childNodes
      .map((c) => (c.nodeType === 3 ? (c as FakeText).nodeValue : c.textContent))
      .join("");
  }

  /* Real DOM semantics: assigning textContent replaces all children with
   * one text node. React writes string children through exactly this. */
  set textContent(value: string) {
    for (const child of [...this.childNodes]) this.removeChild(child);
    if (this.nodeType === 3) (this as unknown as FakeText).nodeValue = value;
    else if (value !== "" && this.ownerDocument) {
      this.appendChild(this.ownerDocument.createTextNode(value));
    }
  }

  addEventListener(type: string, listener: Listener): void {
    let set = this.#listeners.get(type);
    if (!set) {
      set = new Set();
      this.#listeners.set(type, set);
    }
    set.add(listener);
  }

  removeEventListener(type: string, listener: Listener): void {
    this.#listeners.get(type)?.delete(listener);
  }
}

class FakeText extends FakeNode {
  nodeValue: string;
  constructor(text: string) {
    super(3, "#text");
    this.nodeValue = text;
  }
}

class FakeComment extends FakeNode {
  nodeValue: string;
  constructor(text: string) {
    super(8, "#comment");
    this.nodeValue = text;
  }
}

class FakeElement extends FakeNode {
  tagName: string;
  #attributes = new Map<string, string>();
  style: Record<string, string> = {};

  constructor(tagName: string) {
    super(1, tagName.toUpperCase());
    this.tagName = this.nodeName;
  }

  get className(): string {
    return this.#attributes.get("class") ?? "";
  }
  set className(value: string) {
    this.#attributes.set("class", value);
  }

  getAttribute(name: string): string | null {
    return this.#attributes.get(name) ?? null;
  }
  setAttribute(name: string, value: string): void {
    this.#attributes.set(name, String(value));
  }
  hasAttribute(name: string): boolean {
    return this.#attributes.has(name);
  }
  removeAttribute(name: string): void {
    this.#attributes.delete(name);
  }
  getAttributeNS(): string | null {
    return null;
  }
  setAttributeNS(_ns: string | null, name: string, value: string): void {
    this.setAttribute(name, value);
  }
}

class FakeDocument extends FakeNode {
  documentElement: FakeElement;
  body: FakeElement;
  activeElement: FakeNode | null = null;
  defaultView: unknown = null;

  constructor() {
    super(9, "#document");
    this.documentElement = new FakeElement("html");
    this.documentElement.ownerDocument = this;
    this.body = this.createElement("body");
    this.appendChild(this.documentElement);
    this.documentElement.appendChild(this.body);
  }

  createElement(tagName: string): FakeElement {
    const element = new FakeElement(tagName);
    element.ownerDocument = this;
    return element;
  }

  createTextNode(text: string): FakeText {
    return new FakeText(text);
  }

  createComment(text: string): FakeComment {
    return new FakeComment(text);
  }
}

const globals = globalThis as typeof globalThis & {
  window: unknown;
  document: unknown;
  IS_REACT_ACT_ENVIRONMENT?: boolean;
};

globals.IS_REACT_ACT_ENVIRONMENT = true;
const document = new FakeDocument();
let mediaQuery = new FakeMediaQueryList(true);
const window = {
  // framer-motion (the falsifier) also queries the unsuffixed
  // "(prefers-reduced-motion)"; answer every reduced-motion query with the
  // same list so its first paints come from its own logic, not a stub.
  matchMedia: (query: string) =>
    query.includes("prefers-reduced-motion") ? mediaQuery : { matches: false },
  addEventListener: () => {},
  removeEventListener: () => {},
  document,
  // getActiveElementDeep probes focus through this constructor even when
  // no iframe ever exists.
  HTMLIFrameElement: class HTMLIFrameElement {},
};
document.defaultView = window;
globals.window = window;
globals.document = document;

/** Swap the OS preference the fake window reports. */
function setMediaQuery(mq: FakeMediaQueryList): void {
  mediaQuery = mq;
}

/* Globals must exist before the modules under test evaluate: framer's
 * useReducedMotion (the falsifier) reads `window` when it loads. */
const { act, createElement } = await import("react");
const { renderToString } = await import("react-dom/server");
const { createRoot } = await import("react-dom/client");
const { useStableReducedMotion } = await import("../src/lib/use-reduced-motion.ts");

/** Probe component that records every render-phase value of the hook. */
function makeProbe(record: (value: boolean | null) => void) {
  return function Probe() {
    const reduced = useStableReducedMotion();
    record(reduced);
    return createElement("div", null, String(reduced));
  };
}

test("server render paints false even when the preference is reduce", () => {
  setMediaQuery(new FakeMediaQueryList(true));
  const values: (boolean | null)[] = [];
  const html = renderToString(createElement(makeProbe((v) => values.push(v))));
  assert.deepEqual(values, [false], "server render must paint false, not the real preference");
  assert.match(html, /<div[^>]*>false<\/div>/, html);
});

test("first client render is false, then the hook tracks matchMedia and cleans up", async () => {
  // The OS already prefers reduce: exactly the case framer-motion's hook
  // got wrong on the first client render (the hydration mismatch).
  setMediaQuery(new FakeMediaQueryList(true));
  const { createRoot: createRootFn } = await import("react-dom/client");
  const values: (boolean | null)[] = [];
  const probe = createElement(makeProbe((v) => values.push(v)));
  const container = document.createElement("div");

  let root: { unmount(): void } | undefined;
  await act(async () => {
    root = createRootFn(container as unknown as Element);
    root.render(probe);
  });

  assert.equal(values[0], false, "first client render must paint false (hydration-safe)");
  assert.equal(values.at(-1), true, "post-mount effect must sync the real preference");
  assert.equal(container.textContent, "true");

  // A live preference change propagates through the change listener.
  await act(async () => {
    mediaQuery.dispatch(false);
  });
  assert.equal(values.at(-1), false, "a matchMedia change must update the hook");
  assert.equal(container.textContent, "false");
  assert.equal(mediaQuery.changeListeners().length, 1, "exactly one live change subscription");

  // Unmount runs the listener cleanup.
  await act(async () => {
    root?.unmount();
  });
  assert.equal(mediaQuery.changeListeners().length, 0, "listener cleanup must run on unmount");
});
