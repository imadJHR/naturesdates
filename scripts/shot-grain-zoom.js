/* eslint-disable @typescript-eslint/no-require-imports */
const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await p.goto("http://localhost:3010/", { waitUntil: "networkidle0" }); await new Promise(r=>setTimeout(r,1300));
  await p.evaluate(() => document.querySelector(".wellness-redesign").scrollIntoView());
  await new Promise(r=>setTimeout(r,600));
  const box = await p.evaluate(() => {
    const k = document.querySelector(".goodness-kicker").getBoundingClientRect();
    const x = 40, y = Math.round(k.top) + 30, w = 520, h = 340;
    return { x: Number(x), y: Number(y), width: Number(w), height: Number(h) };
  });
  console.log("BOX:"+JSON.stringify(box));
  await p.screenshot({ path: "C:/Users/imadj/Desktop/naturesdates/nutrition-grain-zoom.png", clip: box });
  await b.close(); console.log("SHOT DONE");
})().catch(e=>{console.error(e);process.exit(1)});
