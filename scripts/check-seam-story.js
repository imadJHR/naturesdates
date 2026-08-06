const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r=>setTimeout(r,900));
  const info = await p.evaluate(() => {
    const story = document.querySelector(".story");
    const r = story.getBoundingClientRect();
    return { top: Math.round(r.top+window.scrollY), h: Math.round(r.height) };
  });
  // The divider is the LAST ~200px of .story. Capture exactly that band.
  const y = info.top + info.h - 200;
  await p.evaluate((yy)=>window.scrollTo(0,yy), y);
  await new Promise(r=>setTimeout(r,300));
  await p.screenshot({ path: "verify-shots/seam-story-tight.png" });
  // verify gradient stops in the first dune divider
  const stops = await p.evaluate(() => {
    const d = document.querySelector(".dune-divider");
    const s = d.querySelectorAll("linearGradient stop");
    return Array.from(s).map(x => x.getAttribute("stop-color") + "@" + x.getAttribute("offset"));
  });
  console.log("STORY divider stops:", JSON.stringify(stops));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
