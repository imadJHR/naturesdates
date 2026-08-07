const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/products/category/mini-medjools", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,1200));
  // full page
  await p.screenshot({ path:"verify-shots/mini-FP.png", fullPage:true });
  // explore hover
  await p.evaluate(()=>{ const el=document.querySelector('.category-explore'); if(el) el.scrollIntoView({block:'center'}); });
  await new Promise(r=>setTimeout(r,500));
  const box = await p.evaluate(()=>{ const el=document.querySelector('.category-explore'); const b=el.getBoundingClientRect(); return {top:Math.round(b.top+window.scrollY), h:Math.round(b.height)}; });
  const links = await p.$$('.category-explore a');
  if(links[0]){ await links[0].hover(); await new Promise(r=>setTimeout(r,400)); }
  await p.screenshot({ path:"verify-shots/mini-explore-hover.png", clip:{x:0,y:Math.max(0,box.top-20),width:1280,height:Math.min(box.h+40,520)} });
  console.log("cards:", links.length);
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
