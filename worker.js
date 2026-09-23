import { makeUsername } from "./src/username.js";

const HEADERS = {
  "content-type": "application/json",
  "access-control-allow-origin": "*",
};

export default {
  async fetch(request) {
    const sep = new URL(request.url).searchParams.get("sep");
    const username = makeUsername(sep ?? "camel");
    return new Response(JSON.stringify({ username }), { headers: HEADERS });
  },
};