const puppeteer = require("puppeteer-core");
const fs = require("fs");
const dir = "C:/Users/imadj/Desktop/naturesdates/verify-shots";
fs.mkdirSync(dir, { recursive: true });
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  for (const [w,h,name] of [[1440,900,"full-desktop2"],[390,844,"full-mobile2"]]) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: h });
    await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise(r=>setTimeout(r,1000));
    await p.screenshot({ path: `${dir}/${name}.png`, fullPage: true });
    await p.close();
  }
  await b.close();
  console.log("DONE");
})().catch(e=>{console.error(e);process.exit(1);});
