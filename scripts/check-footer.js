const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r=>setTimeout(r,900));
  const info = await p.evaluate(() => {
    const f = document.querySelector("footer");
    const wm = document.querySelector(".footer-wordmark");
    const cs = getComputedStyle(f);
    return {
      footerBg: cs.backgroundColor,
      footerBgImage: cs.backgroundImage.slice(0,60),
      footerColor: cs.color,
      wordmarkColor: wm ? getComputedStyle(wm).color : null,
      wordmarkText: wm ? wm.textContent.trim().slice(0,20) : null,
    };
  });
  console.log(JSON.stringify(info, null, 1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
