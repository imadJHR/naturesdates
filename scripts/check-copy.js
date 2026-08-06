const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,800));
  const txt = await p.evaluate(() => {
    const spans = Array.from(document.querySelectorAll(".footer-bottom span")).map(s=>s.textContent);
    return spans;
  });
  console.log("FOOTER BOTTOM:", JSON.stringify(txt));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
