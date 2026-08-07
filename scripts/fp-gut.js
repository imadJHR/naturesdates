const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  const res = await p.goto("http://localhost:3000/gut-health", { waitUntil:"networkidle0", timeout:60000 });
  console.log("STATUS:", res.status());
  await new Promise(r=>setTimeout(r,1200));
  await p.screenshot({ path:"verify-shots/gut-FP.png", fullPage:true });
  console.log("FP DONE");
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
