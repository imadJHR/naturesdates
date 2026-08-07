const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  const info = await p.evaluate(()=>{
    const bg=(s)=>{const e=document.querySelector(s); if(!e)return "NF"; const bi=getComputedStyle(e).backgroundImage; if(bi&&bi!=="none"){const m=bi.match(/rgb\((\d+), (\d+), (\d+)\)/); return m?`rgb(${m[1]},${m[2]},${m[3]})`:bi.slice(0,30);} return getComputedStyle(e).backgroundColor;}
    return {
      header: bg('.site-header'),
      hero: bg('.hero.official-hero').slice(0,40),
      sunshine: bg('.sunshine-moment').slice(0,40),
      faq: bg('.home-faq').slice(0,40),
      footer: bg('footer').slice(0,40),
    };
  });
  console.log(JSON.stringify(info,null,1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
