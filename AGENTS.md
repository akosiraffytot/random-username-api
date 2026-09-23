# AGENTS.md

Random username API. Plain ESM JavaScript, zero dependencies, no build step. One `GET` returns `{"username":"..."}` in the shape `adjective-noun-1234`.

Root `package.json` is metadata only (`type: module`, node engine) — no deps, no scripts. Vercel will not detect the `api/` folder as Node functions without it; do not add dependencies or build scripts.

## Architecture

Single shared core, three thin serverless handlers. Change generation logic in `src/username.js` only — the handlers are pass-through wrappers.

- `src/username.js` — sole source of logic. Exports `makeUsername(sepName)`.
- `worker.js` — Cloudflare Workers (`wrangler deploy`)
- `api/index.js` — Vercel (route `/api`). Vercel project must use Framework Preset **Other**; the Node.js preset skips `api/` and demands a root server entrypoint.
- `netlify/functions/username.js` — Netlify function. `netlify.toml` maps `/api/username` → `/.netlify/functions/username` (Netlify's own path is `/.netlify/functions/username`, not `/api/username`).

All three handlers read query param `sep` and forward the raw value to core. Never read `sep` semantics in a handler; resolve in core.

## API contract

- `GET <deploy-root>` → `{"username":"..."}`. CORS header `access-control-allow-origin: *` on every response.
- `?sep=dash|dot|underscore|none|camel` — default `camel`, invalid or empty → `camel`.
- `camel` `BraveFalcon0247` / `dash` `brave-falcon-0247` / `dot` `brave.falcon.0247` / `underscore` `brave_falcon_0247` / `none` `bravefalcon0247`.
- Digit suffix is `0`-`9999`, zero-padded to 4 digits.

## Constraints

- Word lists (100 adjectives + 100 nouns = 100M combos) are hand-curated safe: no profanity, slurs, drugs, weapons, alcohol, body parts, trademarks, deities, or religious terms, and no combos that read as a slur/brand. New words must stay in that spirit. Words must be single lowercase words (camelcase capitalizes `w[0]` only).
- `/api` handler signature differs per platform (fetch / `req,res` / `event`) — don't "unify" them.
- CORS `*` is intentional for browser use; a bare hostname with no auth is exposed, so never add mutating endpoints.

## Verification

No test framework. Verify by running the core directly:

```
node --input-type=module -e "import('./src/username.js').then(m=>console.log(m.makeUsername('camel')))"
```

Syntax-check handlers with `node --check worker.js; node --check api/index.js; node --check netlify/functions/username.js`.