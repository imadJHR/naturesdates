const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/products/whole-fresh-medjool-dates", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,1000));
  const info = await p.evaluate(()=>{
    const cards=[...document.querySelectorAll('.product-notes .shad-card')].slice(0,3).map(e=>({bg:getComputedStyle(e).backgroundColor, title:getComputedStyle(e.querySelector('.shad-card-title')||e).color}));
    const h1=document.querySelector('.product-detail-copy h1'); const h1c=h1?getComputedStyle(h1).color:"NF";
    const badge=document.querySelector('.product-detail-copy .shad-badge-outline'); const bc=badge?{bg:getComputedStyle(badge).backgroundColor,color:getComputedStyle(badge).color}:"NF";
    return {cards, h1c, badge:bc};
  });
  console.log(JSON.stringify(info,null,1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
