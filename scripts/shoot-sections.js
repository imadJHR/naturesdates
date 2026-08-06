const puppeteer = require("puppeteer-core");
const fs = require("fs");
const dir = "C:/Users/imadj/Desktop/naturesdates/verify-shots";
fs.mkdirSync(dir, { recursive: true });
const shots = [
  { sel: ".wellness", name: "wellness" },
  { sel: ".products", name: "products" },
  { sel: ".new-products-section", name: "newproducts" },
  { sel: ".sunshine-moment", name: "sunshine" },
  { sel: ".recipes", name: "recipes" },
  { sel: ".home-categories", name: "categories" },
  { sel: "footer", name: "footer-desk" },
];
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  for (const w of [1440]) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: 900 });
    await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise(r=>setTimeout(r,800));
    for (const s of shots) {
      const y = await p.evaluate((sel)=>{const m=document.querySelector(sel);return m?Math.round(m.getBoundingClientRect().top+window.scrollY):0;}, s.sel);
      await p.evaluate((yy)=>window.scrollTo(0,yy+30), y);
      await new Promise(r=>setTimeout(r,300));
      await p.screenshot({ path: `${dir}/${s.name}-${w}.png` });
    }
    // footer mobile
    await p.setViewport({ width: 375, height: 900 });
    await new Promise(r=>setTimeout(r,300));
    const yf = await p.evaluate(()=>{const m=document.querySelector("footer");return m?Math.round(m.getBoundingClientRect().top+window.scrollY):0;});
    await p.evaluate((yy)=>window.scrollTo(0,yy+30), yf);
    await new Promise(r=>setTimeout(r,300));
    await p.screenshot({ path: `${dir}/footer-mob-375.png` });
    await p.close();
  }
  await b.close();
  console.log("DONE");
})().catch(e=>{console.error(e);process.exit(1);});
