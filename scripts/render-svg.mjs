import puppeteer from "puppeteer-core";
import fs from "fs";
const files = ["halal","usda-organic","fssc-22000","koshercheck"];
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu"] });
for (const f of files) {
  const svg = fs.readFileSync(`public/certifications/${f}.svg`,"utf8");
  const p = await b.newPage();
  await p.setViewport({width:500,height:500,deviceScaleFactor:2});
  await p.setContent(`<body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#fff">${svg}</body>`);
  await new Promise(r=>setTimeout(r,400));
  await p.screenshot({path:`public/certifications/_${f}.png`});
  await p.close();
}
await b.close();
console.log("rendered all");
