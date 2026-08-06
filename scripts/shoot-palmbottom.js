const puppeteer = require("puppeteer-core");
const fs = require("fs");
const dir = "C:/Users/imadj/Desktop/naturesdates/verify-shots";
fs.mkdirSync(dir, { recursive: true });
const shots = [
  { sel: ".wellness", name: "wellness-bottom" },
  { sel: ".products", name: "products-bottom" },
  { sel: ".sunshine-moment", name: "sunshine-bottom" },
  { sel: ".recipes", name: "recipes-bottom" },
];
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r=>setTimeout(r,800));
  for (const s of shots) {
    const y = await p.evaluate((sel)=>{const m=document.querySelector(sel);if(!m)return 0;const r=m.getBoundingClientRect();const sh=m.scrollHeight;return Math.round(r.top+window.scrollY + sh - window.innerHeight + 20);}, s.sel);
    await p.evaluate((yy)=>window.scrollTo(0, Math.max(0,yy)), y);
    await new Promise(r=>setTimeout(r,300));
    await p.screenshot({ path: `${dir}/${s.name}-1440.png` });
  }
  await b.close();
  console.log("DONE");
})().catch(e=>{console.error(e);process.exit(1);});
