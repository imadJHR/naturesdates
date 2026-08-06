const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r=>setTimeout(r,800));
  const res = await p.evaluate(() => {
    const divs = document.querySelectorAll(".dune-divider");
    return Array.from(divs).map((d,i) => {
      const svg = d.querySelector("svg");
      const paths = d.querySelectorAll("path");
      const h = d.getBoundingClientRect().height;
      return { i, height: Math.round(h), pathCount: paths.length,
        fills: Array.from(paths).map(pa => pa.getAttribute("fill")),
        gradStops: Array.from(d.querySelectorAll("stop")).map(s => s.getAttribute("stop-color")) };
    });
  });
  console.log(JSON.stringify(res, null, 1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
