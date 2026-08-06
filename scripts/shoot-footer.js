const puppeteer = require("puppeteer-core");
const fs = require("fs");
const dir = "C:/Users/imadj/Desktop/naturesdates/verify-shots";
fs.mkdirSync(dir, { recursive: true });
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  for (const w of [375, 768, 1440]) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: 900 });
    await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise(r=>setTimeout(r,800));
    // scroll to bottom
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r=>setTimeout(r,400));
    // check wordmark overflow + bounding
    const m = await p.evaluate(() => {
      const wm = document.querySelector(".footer-wordmark");
      if (!wm) return null;
      const r = wm.getBoundingClientRect();
      return { right: Math.round(r.right), left: Math.round(r.left), vw: window.innerWidth, text: wm.textContent, overflow: r.right > window.innerWidth + 1 || r.left < -1 };
    });
    console.log("w="+w, JSON.stringify(m));
    await p.screenshot({ path: `${dir}/footer-${w}.png` });
    await p.close();
  }
  await b.close();
  console.log("DONE");
})().catch(e=>{console.error(e);process.exit(1);});
