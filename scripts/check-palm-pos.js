const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r=>setTimeout(r,800));
  const res = await p.evaluate(() => {
    const sec = document.querySelector(".products");
    const palms = sec.querySelectorAll(".section-palm");
    return Array.from(palms).map(pl => { const r = pl.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), color: getComputedStyle(pl).color, opacity: getComputedStyle(pl).opacity, visW: Math.round(Math.min(r.right, window.innerWidth) - Math.max(r.left, 0)) }; });
  });
  console.log(JSON.stringify(res, null, 2));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
