const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/kid-nutrition", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  await p.evaluate(()=>{ const el=document.querySelector('.story-sources-section'); if(el) el.scrollIntoView({block:'start'}); });
  await new Promise(r=>setTimeout(r,400));
  const box = await p.evaluate(()=>{ const el=document.querySelector('.story-sources-section'); const b=el.getBoundingClientRect(); return {top:Math.round(b.top+window.scrollY), h:Math.round(b.height)}; });
  await p.screenshot({ path:"verify-shots/src-fixed.png", clip:{x:0,y:Math.max(0,box.top-10),width:1280,height:Math.min(box.h+20,820)} });
  console.log("shot done", box.h);
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
