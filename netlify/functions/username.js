import { makeUsername } from "../../src/username.js";

export async function handler(event) {
  return {
    statusCode: 200,
    headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
    body: JSON.stringify({ username: makeUsername(event.queryStringParameters?.sep ?? "camel") }),
  };
}