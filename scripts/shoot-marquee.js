/* eslint-disable */
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const dir = "C:/Users/imadj/Desktop/naturesdates/verify-shots";
fs.mkdirSync(dir, { recursive: true });
const BASE = "http://localhost:3000";
(async () => {
  const b = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });
  for (const w of [375, 1440]) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await p.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 900));
    const el = await p.$(".official-hero-marquee");
    if (el) await el.screenshot({ path: `${dir}/marquee-${w}.png` }).catch((e) => console.log(e));
    await p.close();
  }
  await b.close();
  console.log("DONE");
})().catch((e) => { console.error(e); process.exit(1); });
