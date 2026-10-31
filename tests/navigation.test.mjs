import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import test from "node:test";

async function pageRoutes(directory, prefix = "") {
  const routes = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) routes.push(...await pageRoutes(new URL(`${entry.name}/`, directory), `${prefix}/${entry.name}`));
    else if (entry.name === "page.tsx") routes.push(prefix || "/");
  }
  return routes;
}

test("every page has working internal links, fragment targets, and navigation", async () => {
  const { default: worker } = await import("../dist/server/index.js");
  const origin = "http://localhost";
  const pages = new Map();
  for (const route of await pageRoutes(new URL("../app/", import.meta.url))) {
    const response = await worker.fetch(new Request(`${origin}${route}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} });
    assert.equal(response.status, 200, `${route} must load`);
    const html = await response.text();
    const links = Array.from(html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi), match => ({
      href: /\bhref="([^"]*)"/.exec(match[1])?.[1],
      text: match[2].replace(/<[^>]+>/g, "").trim(),
    }));
    const nextHref = /<a\b[^>]*data-project-direction="next"[^>]*href="([^"]+)"/.exec(html)?.[1];
    const previousHref = /<a\b[^>]*data-project-direction="previous"[^>]*href="([^"]+)"/.exec(html)?.[1];
    const ids = new Set(Array.from(html.matchAll(/<[a-z][^>]*\bid="([^"]+)"/gi), match => match[1]));
    pages.set(route, { links, ids, nextHref, previousHref });
  }

  // Following Next must visit the whole portfolio before repeating a project.
  const projectRoutes = [...pages.keys()].filter(route => route.startsWith("/work/"));
  const visited = new Set();
  let current = "/work/cubed";
  while (!visited.has(current)) {
    visited.add(current);
    current = pages.get(current)?.nextHref;
    assert(projectRoutes.includes(current), `Next project from portfolio points to ${current}`);
  }
  assert.equal(visited.size, projectRoutes.length, "Next project navigation must reach every project");
  assert.equal(current, "/work/cubed", "Next project navigation must form a complete loop");

  const expectedOrder = ["cadence", "cubed", "wecount", "earthen", "valmia", "coolbuilding", "simplesite"].map(slug => `/work/${slug}`);
  for (const [index, route] of expectedOrder.entries()) {
    assert.equal(pages.get(route).nextHref, expectedOrder[(index + 1) % expectedOrder.length], `${route}: next must follow landing page order`);
    assert.equal(pages.get(route).previousHref, expectedOrder[(index - 1 + expectedOrder.length) % expectedOrder.length], `${route}: previous must reverse next`);
  }

  let checked = 0;
  for (const [route, { links }] of pages) {
    if (route !== "/") {
      assert(links.some(link => link.href === "/#work" && link.text === "Work"), `${route}: Work navigation missing`);
      assert(links.some(link => link.href === "/studio" && link.text === "About"), `${route}: About navigation missing`);
      assert(links.some(link => link.href === "/"), `${route}: home link missing`);
    }
    for (const link of links) {
      assert(link.href, `${route}: empty link`);
      const target = new URL(link.href, `${origin}${route}`);
      if (target.origin !== origin) continue;
      const destination = pages.get(target.pathname);
      assert(destination, `${route}: ${link.href} points to a missing page`);
      if (target.hash) assert(destination.ids.has(decodeURIComponent(target.hash.slice(1))), `${route}: ${link.href} points to a missing section`);
      checked++;
    }
  }
  console.log(`Verified ${checked} internal links across ${pages.size} pages.`);
});
