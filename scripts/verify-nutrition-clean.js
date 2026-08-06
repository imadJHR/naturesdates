/* eslint-disable @typescript-eslint/no-require-imports */
const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3008/", { waitUntil: "networkidle0" }); await new Promise(r=>setTimeout(r,1300));
  const out = await p.evaluate(() => {
    const sec = document.querySelector(".wellness-redesign");
    const bg = sec.querySelector(".wellness-redesign-bg");
    const arches = sec.querySelectorAll(".nutrition-arch").length;
    const palms = sec.querySelectorAll(".nutrition-palm").length;
    const before = getComputedStyle(sec, "::before");
    const beforeBg = before.backgroundImage || before["background-image"];
    // cards / text intact?
    const cards = sec.querySelectorAll(".wellness-benefit-card").length;
    const h2 = sec.querySelector(".goodness-headline")?.textContent?.trim();
    const cta = sec.querySelector(".goodness-cta")?.textContent?.trim();
    const certs = sec.querySelectorAll(".wellness-certifications *").length;
    const r2 = sec.getBoundingClientRect(); const sy = window.scrollY;
    return {
      bgPresent: !!bg,
      arches, palms,
      beforeHasPattern: /moroccan-pattern|url\(/.test(beforeBg),
      cards, h2, cta, certs,
      clip: { y: Math.round(r2.top + sy), w: Math.round(r2.width), h: Math.round(r2.height) }
    };
  });
  console.log("DOM:"+JSON.stringify(out));
  await p.screenshot({ path: "C:/Users/imadj/Desktop/naturesdates/nutrition-clean-desktop.png", clip: out.clip });
  await b.close(); console.log("DONE");
})().catch(e=>{console.error(e);process.exit(1)});
