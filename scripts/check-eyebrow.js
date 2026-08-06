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
      const num = c.querySelector(".home-category-number");
      const eyebrow = c.querySelector(".home-category-content > p");
      if(!num||!eyebrow) return;
      const nr = num.getBoundingClientRect();
      const er = eyebrow.getBoundingClientRect();
      out.push({ card:i, numRight: Math.round(nr.right), numTop: Math.round(nr.top), eyebrowLeft: Math.round(er.left), eyebrowTop: Math.round(er.top), overlapX: er.left < nr.right, overlapY: er.top < nr.bottom && er.top > nr.top - 5 });
    });
    return out;
  });
  console.log(JSON.stringify(res));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
