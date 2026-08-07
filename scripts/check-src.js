const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/kid-nutrition", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,800));
  const info = await p.evaluate(()=>{
    const sec=document.querySelector('.story-sources-section');
    const h2=document.querySelector('.story-sources-inner h2');
    const kicker=document.querySelector('.story-sources-inner .info-kicker');
    const icon=document.querySelector('.story-source-list a > svg:first-child');
    const card=document.querySelector('.story-source-list a');
    return {
      secBg: sec?getComputedStyle(sec).backgroundColor:null,
      h2: h2?getComputedStyle(h2).color:null,
      kicker: kicker?getComputedStyle(kicker).color:null,
      icon: icon?getComputedStyle(icon).color:null,
      cardBg: card?getComputedStyle(card).backgroundColor:null,
    };
  });
  console.log(JSON.stringify(info,null,1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
