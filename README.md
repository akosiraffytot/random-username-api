# Random Username API

A tiny serverless API that returns a random, human-readable username like `BraveFalcon0247` on every `GET`. Zero dependencies, no build step — plain ESM JavaScript you can deploy to Cloudflare Workers, Vercel, or Netlify.

```
GET / → {"username":"BraveFalcon0247"}
```

## How it works

Usernames combine a random adjective + noun + 4 zero-padded digits: `100` adjectives × `100` nouns × `10,000` digit suffixes = **100 million possible usernames**. Word lists are hand-curated to stay safe and neutral — no profanity, slurs, drugs, weapons, alcohol, trademarks, deities, or religious terms.

One call returns one username. The endpoint is read-only and never stores anything.

## Usage

```
GET /                        → {"username":"BraveFalcon0247"}
GET /?sep=dash               → {"username":"brave-falcon-0247"}
GET /?sep=dot                → {"username":"brave.falcon.0247"}
GET /?sep=underscore         → {"username":"brave_falcon_0247"}
GET /?sep=none               → {"username":"bravefalcon0247"}
GET /?sep=camel              → {"username":"BraveFalcon0247"}
```

| Param | Value | Example |
|-------|-------|---------|
| `sep` (optional) | `camel` *(default)* | `BraveFalcon0247` |
| | `dash` | `brave-falcon-0247` |
| | `dot` | `brave.falcon.0247` |
| | `underscore` | `brave_falcon_0247` |
| | `none` | `bravefalcon0247` |

Invalid or empty `sep` falls back to `camel`. Every response includes `Access-Control-Allow-Origin: *`, so it can be called straight from the browser.

## Deploy

All three deployments run the same core in `src/username.js`.

**Cloudflare Workers**

```sh
wrangler deploy
```

**Vercel**

Routes are auto-detected from the `api/` directory. Deploy the repo as a Node serverless project; the endpoint is `/api`.

**Netlify**

The function lives in `netlify/functions/`. `netlify.toml` maps `/api/username` to Netlify's internal `/.netlify/functions/username` path. Deploy the repo; the endpoint is `/api/username`.

Netlify's own function path is `/.netlify/functions/username` — it is not `/api/username`.

## Project layout

```
src/username.js            # word lists + generate logic (edit this only)
worker.js                  # Cloudflare Workers handler
api/index.js               # Vercel handler
netlify/functions/username.js   # Netlify function
netlify.toml               # Netlify route mapping
```

## Local verification

```sh
node --input-type=module -e "import('./src/username.js').then(m=>console.log(m.makeUsername('camel')))"
node --check worker.js; node --check api/index.js; node --check netlify/functions/username.js
```