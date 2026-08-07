const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  await p.evaluate(()=>{ const el=document.getElementById('moments'); if(el) el.scrollIntoView(); });
  await new Promise(r=>setTimeout(r,400));
  const info = await p.evaluate(()=>{
    const sec = document.querySelector('.sunshine-moment');
    const active = document.querySelector('.moment-tab-trigger[data-state="active"]');
    const panel = document.querySelector('.moment-panel');
    const btn = document.querySelector('.moment-copy .shad-button');
    const cs = (el)=>el?getComputedStyle(el):null;
    return {
      sectionBg: cs(sec)?.backgroundColor || cs(sec)?.backgroundImage.slice(0,60),
      activeBg: cs(active)?.backgroundColor,
      activeColor: cs(active)?.color,
      panelBg: cs(panel)?.backgroundColor,
      btnBg: cs(btn)?.backgroundColor,
      btnColor: cs(btn)?.color,
    };
  });
  console.log(JSON.stringify(info,null,1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
