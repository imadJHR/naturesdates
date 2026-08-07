const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  const info = await p.evaluate(()=>{
    const cart=[...document.querySelectorAll('.product-card-cart')].slice(0,3).map(e=>getComputedStyle(e).backgroundColor);
    const titles=[...document.querySelectorAll('.product-card h3')].slice(0,3).map(e=>getComputedStyle(e).color);
    const badge=[...document.querySelectorAll('.product-card-badge')].slice(0,1).map(e=>getComputedStyle(e).backgroundColor);
    return {cartBg:cart, titleColor:titles, badgeBg:badge};
  });
  console.log(JSON.stringify(info,null,1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
