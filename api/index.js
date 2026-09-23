import { makeUsername } from "../src/username.js";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ username: makeUsername(req.query.sep ?? "camel") });
}