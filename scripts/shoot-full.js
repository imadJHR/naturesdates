const puppeteer = require("puppeteer-core");
const fs = require("fs");
const dir = "C:/Users/imadj/Desktop/naturesdates/verify-shots";
fs.mkdirSync(dir, { recursive: true });
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  // Desktop full page
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r=>setTimeout(r,1000));
  await p.screenshot({ path: `${dir}/full-desktop.png`, fullPage: true });
  // Mobile full page
  const m = await b.newPage();
  await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await m.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r=>setTimeout(r,1000));
  await m.screenshot({ path: `${dir}/full-mobile.png`, fullPage: true });
  await b.close();
  console.log("DONE full");
})().catch(e=>{console.error(e);process.exit(1);});
