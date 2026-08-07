const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/products/whole-fresh-medjool-dates", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,1000));
  // scroll to info cards
  await p.evaluate(()=>{ const el=document.querySelector('.product-notes'); if(el) el.scrollIntoView({block:'start'}); });
  await new Promise(r=>setTimeout(r,500));
  await p.screenshot({ path:"verify-shots/slug-notes.png", clip:{x:0,y:0,width:1280,height:900} });
  // faq
  await p.evaluate(()=>{ const el=document.querySelector('.product-faq'); if(el) el.scrollIntoView({block:'start'}); });
  await new Promise(r=>setTimeout(r,500));
  await p.screenshot({ path:"verify-shots/slug-faq.png", clip:{x:0,y:0,width:1280,height:900} });
  // related
  await p.evaluate(()=>{ const el=document.querySelector('.related-products'); if(el) el.scrollIntoView({block:'start'}); });
  await new Promise(r=>setTimeout(r,500));
  await p.screenshot({ path:"verify-shots/slug-related.png", clip:{x:0,y:0,width:1280,height:900} });
  console.log("DONE");
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
