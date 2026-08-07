const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 800 });
  await p.goto("http://localhost:3000/", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  // scroll to top
  await p.evaluate(()=>window.scrollTo(0,0));
  const info = await p.evaluate(() => {
    const row = document.querySelector(".hero-certifications");
    if(!row) return {error:"no hero row"};
    return Array.from(row.querySelectorAll("img")).map(i=>({
      src:i.getAttribute("src"), ok:i.naturalWidth>0, w:i.naturalWidth, h:i.naturalHeight
    }));
  });
  console.log(JSON.stringify(info,null,1));
  // screenshot hero cert area
  const r = await p.evaluate(()=>{const e=document.querySelector(".hero-certifications");const b=e.getBoundingClientRect();return {top:Math.round(b.top+window.scrollY),h:Math.round(b.height)};});
  await p.evaluate(y=>window.scrollTo(0,y), Math.max(0,r.top-20));
  await new Promise(r=>setTimeout(r,300));
  await p.screenshot({path:"verify-shots/hero-certs-local.png", clip:{x:0,y:Math.max(0,r.top-20),width:1280,height:r.h+60}});
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
