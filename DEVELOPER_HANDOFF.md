# Developer handoff

## Approved version

This is the complete code and asset snapshot behind Analog Future's approved Sites version 69, published on 31 October 2026.

- Original source commit: `7bd07ef25d15b8a461dc0918de827013b045ed75`
- Preview: https://analog-future-case-study-preview.anjica-bananica.chatgpt.site
- GitHub branch: `handoff/approved-website-2026-10-31`
- Intended production domain: `analog-future.co`

The README has been refreshed and this guide and `SOURCE_SNAPSHOT.json` added for handoff. Application code and original assets match the approved source snapshot. The manifest records the original tracked files and Git blob hashes, including the original README.

## Get the code

```bash
git clone --branch handoff/approved-website-2026-10-31 --single-branch https://github.com/andrealausevic/analog-future-website.git
cd analog-future-website
npm ci
npx vite
```

Use Node.js 22.13 or newer. The local URL is printed by Vite. Dependencies are pinned in `package-lock.json`; retain it.

To build, test, and preview the production build:

```bash
npx vinext build
node --test tests/*.test.mjs
npx vinext start
```

The existing `npm run build` and `npm test` commands use Linux shell helpers with GNU `timeout`. The direct commands above avoid those wrappers on macOS. On Windows, use WSL for the supplied npm shell scripts or invoke the direct commands.

## What is included

- Homepage and Studio page, including responsive layouts, lilac calls to action, ping-pong and connect-the-dots illustrations.
- Cadence: sharp SVG wordmark and synchronized pulsing symbol on `#18181B`.
- Cubed: white identity symbol and 12-column grid.
- Earthen: original high-resolution hero photograph and SVG wordmark.
- #WeCount: interactive historical data explorer; beige interface inside its border with the website's charcoal outside.
- Coolbuilding: local interactive architectural atlas with flags, zoom, dragging, and building cards.
- SimpleSite: restored photo mockup and wordmark, with the symbol assembling from the center on load; diagonals at 40% opacity.
- Valmia and all other case-study content and assets.
- Working shared navigation and reciprocal previous/next project links across all seven projects.

## Source map

| Area | Files |
| --- | --- |
| Homepage | `app/page.tsx`, `app/home-panels.css`, `app/globals.css` |
| Studio | `app/studio/`, `components/site/` |
| Case studies | `app/work/` |
| Shared project navigation | `components/site/project-navigation.tsx`, `components/site/case-study-footer.tsx`, `lib/project-order.ts` |
| #WeCount | `components/wecount/`, `lib/wecount-*`, `app/work/wecount/` |
| Coolbuilding atlas | `public/assets/coolbuilding/atlas-hero.html` |
| Images, SVGs, fonts | `public/assets/`, `public/fonts/`, `public/textures/` |
| Motion | `app/motion.css`, `components/site/site-motion.tsx`, project CSS |
| Runtime and build | `vite.config.ts`, `worker/index.ts`, `build/sites-vite-plugin.ts` |

## Publish using the current Cloudflare adapter

The existing target is Cloudflare Workers, not a static HTML export. Build output contains `dist/client/` for assets and `dist/server/` for the Worker, including generated `wrangler.json`.

1. Choose the production Cloudflare account and Worker name. Configure account, routes/custom domain, and asset bindings in persistent project configuration before deployment. Keep generated output reproducible instead of relying on edits to `dist/`.
2. Authenticate Wrangler locally, or supply the account's deployment token through the hosting platform's secrets settings.
3. Run the build and checks above.
4. Deploy the generated Worker configuration with Wrangler:

```bash
npx wrangler deploy --config dist/server/wrangler.json
```

5. Attach `analog-future.co` in the chosen hosting account and configure DNS there. Check both the apex domain and `www` behavior.

The portfolio pages do not currently need a database or bucket: `d1` and `r2` are null in `.openai/hosting.json`. That file also records the existing Sites project identity; it is build metadata, not a GitHub or Cloudflare credential.

The Worker contains an optional `/_vinext/image` optimization route expecting `ASSETS` and `IMAGES` bindings. If that route will be used, configure both in the deployment target. The portfolio's current image elements load files directly from `public/`.

The copied code has been built and tested locally. Publishing to the developer's own hosting account and domain remains a separate step.

## If using Vercel or another host

The repository currently has a Vinext/Cloudflare adapter. It is not configured as a standard Vercel Next.js project or a static upload. Select and configure the appropriate adapter/runtime first, then verify the same routes, assets, and interactions. Preserve the approved application code and appearance during that hosting change.

## Launch checks

- Open all nine routes directly and refresh each one.
- Check Work, About, Contact, project cards, and the complete previous/next cycle.
- Confirm fonts and high-resolution images load from local assets.
- Check desktop and phone layouts.
- Check Cadence pulse and SimpleSite assembly; reduced-motion settings should show still graphics.
- Exercise #WeCount month/state/zoom controls and the Coolbuilding atlas.
- Compare against the approved preview before switching the domain.

Keep `public/` intact. Do not replace the vector hero elements with flattened screenshots. No credentials, dependencies, or generated build output are part of this handoff.
