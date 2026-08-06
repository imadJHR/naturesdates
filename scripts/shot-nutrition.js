/* eslint-disable @typescript-eslint/no-require-imports */
const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3008/", { waitUntil: "networkidle0" }); await new Promise(r=>setTimeout(r,1300));
  await p.evaluate(() => document.querySelector(".wellness-redesign").scrollIntoView());
  await new Promise(r=>setTimeout(r,700));
  const el = await p.$(".wellness-redesign");
  await el.screenshot({ path: "C:/Users/imadj/Desktop/naturesdates/nutrition-clean-desktop.png" });
  await b.close(); console.log("SHOT DONE");
})().catch(e=>{console.error(e);process.exit(1)});
