const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r=>setTimeout(r,1000));
  await p.screenshot({ path: "verify-shots/reverted-desktop.png", fullPage: true });
  // confirm divider uses tone-based (no from/mid inline gradient) and green token value
  const info = await p.evaluate(() => {
    const d = document.querySelector(".dune-divider");
    return { dividerHTML: d ? d.outerHTML.slice(0,120) : null };
  });
  console.log("DIVIDER:", info.dividerHTML);
  await b.close();
  console.log("DONE");
})().catch(e=>{console.error(e);process.exit(1);});
