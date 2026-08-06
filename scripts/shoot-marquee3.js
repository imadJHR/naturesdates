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
    const y = await p.evaluate(() => {
      const m = document.querySelector(".official-hero-marquee");
      return m ? Math.round(m.getBoundingClientRect().top + window.scrollY) : 0;
    });
    await p.evaluate((yy)=>window.scrollTo(0, yy - 20), y);
    await new Promise(r=>setTimeout(r,300));
    await p.screenshot({ path: `${dir}/mq2-${w}.png` });
    console.log("scrolled to", y, "w", w);
    await p.close();
  }
  await b.close();
  console.log("DONE");
})().catch(e=>{console.error(e);process.exit(1);});
