const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  await p.evaluate(()=>{ const el=document.querySelector('#products'); if(el) el.scrollIntoView({block:'center'}); });
  await new Promise(r=>setTimeout(r,600));
  const box = await p.evaluate(()=>{ const el=document.querySelector('#products'); const b=el.getBoundingClientRect(); return {top:Math.round(b.top+window.scrollY), h:Math.round(b.height)}; });
  await p.screenshot({ path:"verify-shots/products-red.png", clip:{x:0,y:Math.max(0,box.top),width:1280,height:Math.min(box.h,700)} });
  await b.close();
  console.log("DONE");
})().catch(e=>{console.error(e);process.exit(1);});
