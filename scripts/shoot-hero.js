const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 860, deviceScaleFactor: 1 });
  await p.goto("http://localhost:3000/", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,1200));
  await p.screenshot({ path: "verify-shots/hero-new.png" });
  const bg = await p.evaluate(()=>{ const el=document.querySelector('.hero.official-hero'); return getComputedStyle(el).backgroundImage.slice(0,80); });
  console.log("HERO BG:", bg);
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
