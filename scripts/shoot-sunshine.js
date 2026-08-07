const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  await p.goto("http://localhost:3000/", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  // scroll to moments
  await p.evaluate(()=>{ const el=document.getElementById('moments'); if(el) el.scrollIntoView({block:'center'}); });
  await new Promise(r=>setTimeout(r,600));
  const tabs = await p.evaluate(()=>Array.from(document.querySelectorAll('.moment-tab-trigger')).map(t=>t.textContent.trim()));
  console.log("TABS:", tabs.join(" | "));
  for (let i=0;i<tabs.length;i++){
    // click tab i
    await p.evaluate((idx)=>{ document.querySelectorAll('.moment-tab-trigger')[idx].click(); }, i);
    await new Promise(r=>setTimeout(r,500));
    const box = await p.evaluate(()=>{ const el=document.getElementById('moments'); const b=el.getBoundingClientRect(); return {top:Math.round(b.top+window.scrollY), h:Math.round(b.height)}; });
    await p.screenshot({ path:`verify-shots/sun-${i}-${tabs[i]}.png`, clip:{x:0,y:Math.max(0,box.top),width:1280,height:Math.min(box.h,820)} });
  }
  await b.close();
  console.log("DONE");
})().catch(e=>{console.error(e);process.exit(1);});
