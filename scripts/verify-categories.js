/* eslint-disable @typescript-eslint/no-require-imports */
const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await p.goto("http://localhost:3011/", { waitUntil: "networkidle0" }); await new Promise(r=>setTimeout(r,1300));
  const out = await p.evaluate(() => {
    const sec = document.querySelector(".home-categories");
    const before = getComputedStyle(sec, "::before");
    const after = getComputedStyle(sec, "::after");
    return {
      beforeContent: before.content,
      afterHasGrain: /data:image\/svg/.test(after.backgroundImage||after["background-image"]),
      afterOpacity: after.opacity,
      palms: sec.querySelectorAll(".nutrition-palm").length,
      heading: sec.querySelector("h2")?.textContent?.trim(),
      cards: sec.querySelectorAll(".home-category-card").length,
      innerZ: getComputedStyle(sec.querySelector(".section-inner")).zIndex,
    };
  });
  console.log("DOM:"+JSON.stringify(out));
  await p.evaluate(() => document.querySelector(".home-categories").scrollIntoView());
  await new Promise(r=>setTimeout(r,600));
  const el = await p.$(".home-categories");
  await el.screenshot({ path: "C:/Users/imadj/Desktop/naturesdates/categories-desktop.png" });
  await b.close(); console.log("SHOT DONE");
})().catch(e=>{console.error(e);process.exit(1)});
