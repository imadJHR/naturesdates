const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  const c = await p.evaluate(() => { const wm=document.querySelector(".footer-wordmark"); return getComputedStyle(wm).color; });
  console.log("wordmark color =", c);
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
