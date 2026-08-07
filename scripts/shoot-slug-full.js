const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900, fullPage: false });
  await p.goto("http://localhost:3000/products/whole-fresh-medjool-dates", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,1000));
  await p.screenshot({ path:"verify-shots/slug-full-top.png", clip:{x:0,y:0,width:1280,height:900} });
  // scroll and capture more
  await p.evaluate(()=>window.scrollTo(0, 900)); await new Promise(r=>setTimeout(r,500));
  await p.screenshot({ path:"verify-shots/slug-full-mid.png", clip:{x:0,y:0,width:1280,height:900} });
  await p.evaluate(()=>window.scrollTo(0, 1800)); await new Promise(r=>setTimeout(r,500));
  await p.screenshot({ path:"verify-shots/slug-full-low.png", clip:{x:0,y:0,width:1280,height:900} });
  console.log("DONE");
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
