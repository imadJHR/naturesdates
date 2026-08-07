const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/products/whole-fresh-medjool-dates", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,1000));
  await p.screenshot({ path:"verify-shots/slug-fp.png", fullPage:true });
  console.log("DONE fullpage");
  await b.close();
})().catch(e);
