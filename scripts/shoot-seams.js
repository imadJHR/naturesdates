const puppeteer = require("puppeteer-core");
const fs = require("fs");
const dir = "C:/Users/imadj/Desktop/naturesdates/verify-shots";
fs.mkdirSync(dir, { recursive: true });
// Capture a tall strip around each high-contrast seam: prev section bottom + divider + next section top.
const seams = [
  { sel: ".story", name: "seam-story-wellness", prevColor: "dark burgundy", nextColor: "cream" },
  { sel: ".products", name: "seam-products-new", prevColor: "sand", nextColor: "cream" },
  { sel: ".sunshine-moment", name: "seam-sunshine-recipes", prevColor: "green", nextColor: "cream" },
  { sel: ".recipes", name: "seam-recipes-faq", prevColor: "cream", nextColor: "brown" },
];
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r=>setTimeout(r,1000));
  for (const s of seams) {
    const info = await p.evaluate((sel)=>{const m=document.querySelector(sel);const r=m.getBoundingClientRect();return {top:Math.round(r.top+window.scrollY), h:Math.round(r.height)};}, s.sel);
    // capture ~380px band centered on the bottom edge of the section (where divider sits)
    const y = info.top + info.h - 230;
    await p.evaluate((yy)=>window.scrollTo(0, Math.max(0,yy)), y);
    await new Promise(r=>setTimeout(r,300));
    await p.screenshot({ path: `${dir}/${s.name}.png` });
  }
  await b.close();
  console.log("DONE seams");
})().catch(e=>{console.error(e);process.exit(1);});
