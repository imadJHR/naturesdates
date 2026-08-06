/* eslint-disable @typescript-eslint/no-require-imports */
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const shotsDir = "C:/Users/imadj/Desktop/naturesdates";

async function shoot(w, selector, name) {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: w, height: 900, deviceScaleFactor: 2 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
  await new Promise(r=>setTimeout(r,1200));
  await p.evaluate((s)=>document.querySelector(s)?.scrollIntoView(), selector);
  await new Promise(r=>setTimeout(r,500));
  const el = await p.$(selector);
  await el.screenshot({ path: `${shotsDir}/${name}-${w}.png` });
  await b.close();
}

(async () => {
  await shoot(375, "footer", "footer");
  await shoot(375, ".wellness-redesign", "nutrition-m");
  await shoot(375, ".home-categories", "categories-m");
  console.log("DONE");
})().catch(e=>{console.error(e);process.exit(1)});
