import fs from "fs-extra";
import path from "path";
import { randomUUID } from "crypto";

const DATA_DIR = "/tmp/data";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const body = req.body || {};
  const { text, filename, isText } = body;
  if (!text) return res.status(400).json({ error: "Missing code" });

  await fs.ensureDir(DATA_DIR);
  const id = randomUUID();
  const savePath = path.join(DATA_DIR, id + ".lua");
  await fs.writeFile(savePath, text, "utf8");

  const rawLink = `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}/raw/${id}`;
  res.json({ id, raw: rawLink });
}
