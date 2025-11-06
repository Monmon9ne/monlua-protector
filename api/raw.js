import fs from "fs-extra";
import path from "path";

const DATA_DIR = "/tmp/data";

export default async function handler(req, res) {
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const id = req.url.split("/").pop().split("?")[0];
  const filePath = path.join(DATA_DIR, id + ".lua");

  if (!await fs.pathExists(filePath)) return res.status(404).send("Not found");

  // Chặn trình duyệt, chỉ cho Roblox xem
  if (!ua.includes("roblox")) {
    res.status(403).send("❌ Bạn không có quyền xem code này");
    return;
  }

  const code = await fs.readFile(filePath, "utf8");
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(code);
}
