import axios from "axios";

export default async function handler(req, res) {
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const id = req.url.split("/").pop().split("?")[0];

  const renderPage = (title, content, status = 200) => {
    res.status(status).setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(`<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:Inter,system-ui,Arial}
body{background:#0f172a;color:#e2e8f0;display:flex;align-items:center;justify-content:center;min-height:100vh}
.card{background:#111827;border:1px solid #1f2937;border-radius:16px;padding:28px;max-width:800px;width:92%;box-shadow:0 10px 30px rgba(0,0,0,.4)}
.title{font-size:20px;font-weight:600;margin-bottom:12px}
.code{background:#020617;border:1px solid #1f2937;border-radius:10px;padding:16px;overflow:auto;white-space:pre-wrap;word-break:break-word;color:#22c55e}
.badge{display:inline-block;padding:6px 10px;border-radius:999px;background:#1f2937;font-size:12px;margin-bottom:14px}
.err{color:#f87171}
</style>
</head>
<body>
<div class="card">
<div class="badge">MON LUA PROTECTOR</div>
<div class="title">${title}</div>
<div class="${status===200?"code":"err"}">${content}</div>
</div>
</body>
</html>`);
  };

  try {
    const gistUrl = `https://api.github.com/gists/${id}`;
    const response = await axios.get(gistUrl);
    const files = response.data.files;
    const file = Object.values(files)[0];
    const code = file.content;

    if (ua.includes("roblox")) {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end(code);
      return;
    }

    renderPage("Script Loaded", code, 200);
  } catch {
    if (ua.includes("roblox")) {
      res.status(404).send("Not found or deleted");
      return;
    }
    renderPage("Not found or deleted", "Gist không tồn tại hoặc đã bị xóa", 404);
  }
}
