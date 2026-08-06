const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r=>setTimeout(r,800));
  const res = await p.evaluate(() => {
    const cards = document.querySelectorAll(".home-category-card");
    const out = [];
    cards.forEach((c,i) => {
      const eyebrow = c.querySelector(".home-category-content > p");
      const cls = c.className;
      if(!eyebrow) return;
      const cs = getComputedStyle(eyebrow);
      out.push({ card:i, class: cls, paddingLeft: cs.paddingLeft, text: eyebrow.textContent });
    });
    return out;
  });
  console.log(JSON.stringify(res, null, 2));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
