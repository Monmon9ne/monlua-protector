import axios from "axios";

export default async function handler(req, res) {
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const id = req.url.split("/").pop().split("?")[0];

  if (!ua.includes("roblox")) {
    res.status(403).setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mon Lua Protector</title>
<style>
body{
margin:0;
height:100vh;
display:flex;
align-items:center;
justify-content:center;
background:#0f172a;
color:#e2e8f0;
font-family:system-ui,Arial;
text-align:center;
line-height:1.8
}
</style>
</head>
<body>
<div>
<div>Mon Lua Protector</div>
<div>PROTECTED BY MON LUA PROTECTOR</div>
<div>https://monlua-protector.vercel.app/</div>
</div>
</body>
</html>`);
    return;
  }

  try {
    const response = await axios.get(`https://api.github.com/gists/${id}`);
    const file = Object.values(response.data.files)[0];
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end(file.content);
  } catch {
    res.status(404).send("Not found");
  }
}
