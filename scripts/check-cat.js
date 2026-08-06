const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r=>setTimeout(r,800));
  const res = await p.evaluate(() => {
    const sec = document.querySelector(".home-categories");
    const palms = sec.querySelectorAll(".section-palm");
    const r = sec.getBoundingClientRect();
    return { count: palms.length, overflow: r.right > window.innerWidth + 1,
      tops: Array.from(palms).map(pl=>{const rr=pl.getBoundingClientRect();return {top: Math.round(rr.top), bottom: Math.round(rr.bottom), h: Math.round(rr.height)};}) };
  });
  console.log(JSON.stringify(res));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
