const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  const info = await p.evaluate(()=>{
    const sec=document.querySelector('.certifications-marquee');
    if(!sec) return "SECTION NOT FOUND";
    const h2=sec.querySelector('h2')?.textContent;
    const imgs=[...sec.querySelectorAll('.cert-marquee-track img')];
    const loaded=imgs.filter(i=>i.naturalWidth>0).length;
    const titles=imgs.slice(0,5).map(i=>i.alt||i.getAttribute('title'));
    const track=sec.querySelector('.cert-marquee-track');
    const anim=getComputedStyle(track).animationName;
    return {h2, totalImgs:imgs.length, loaded, first5Alt:titles, animName:anim};
  });
  console.log(JSON.stringify(info,null,1));
  // screenshot the section
  await p.evaluate(()=>{ const s=document.querySelector('.certifications-marquee'); s.scrollIntoView({block:'center'}); });
  await new Promise(r=>setTimeout(r,500));
  const box = await p.evaluate(()=>{ const s=document.querySelector('.certifications-marquee'); const b=s.getBoundingClientRect(); return {top:Math.round(b.top+window.scrollY), h:Math.round(b.height)}; });
  await p.screenshot({ path:"verify-shots/cert-section.png", clip:{x:0,y:Math.max(0,box.top),width:1280,height:Math.min(box.h,420)} });
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
