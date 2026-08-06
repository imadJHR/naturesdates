const puppeteer = require("puppeteer-core");
const fs = require("fs");
const dir = "C:/Users/imadj/Desktop/naturesdates/verify-shots";
fs.mkdirSync(dir, { recursive: true });
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  for (const w of [375, 1440]) {
    const p = await b.newPage();
    await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
    await p.setViewport({ width: w, height: 900 });
    await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise(r=>setTimeout(r,800));
    // scroll marquee into view, then screenshot its bounding box
    const box = await p.evaluate(() => {
      const m = document.querySelector(".official-hero-marquee");
      if (!m) return null;
      m.scrollIntoView();
      const r = m.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    });
    if (box) {
      await p.screenshot({ path: `${dir}/mq-${w}.png`, clip: { x: Math.max(0,box.x), y: Math.max(0,box.y), width: box.w, height: box.h } });
    }
    // also report item color + animation
    const meta = await p.evaluate(() => {
      const inner = document.querySelector(".hero-marquee-inner");
      const item = document.querySelector(".hero-marquee-item");
      return { anim: getComputedStyle(inner).animationName, itemColor: getComputedStyle(item).color, dotBg: getComputedStyle(document.querySelector(".hero-marquee-dot")).backgroundColor };
    });
    console.log(w, JSON.stringify(meta));
    await p.close();
  }
  await b.close();
  console.log("DONE");
})().catch(e=>{console.error(e);process.exit(1);});
