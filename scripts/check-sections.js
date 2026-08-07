const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  const info = await p.evaluate(()=>{
    const bg=(sel)=>{const e=document.querySelector(sel); return e?getComputedStyle(e).backgroundColor||getComputedStyle(e).backgroundImage.slice(0,40):"NOT FOUND";};
    const logoBg = (()=>{const l=document.querySelector('.logo'); if(!l)return "none"; const cs=getComputedStyle(l); return {bg:cs.backgroundColor, childBg: (l.firstElementChild?getComputedStyle(l.firstElementChild).backgroundColor:"n/a")};})();
    return {
      header: bg('.site-header'),
      announcement: bg('.announcement-bar'),
      hero: bg('.hero.official-hero').slice(0,40),
      story: bg('.story'),
      faq: bg('.home-faq'),
      footer: bg('footer'),
      logo: logoBg,
    };
  });
  console.log(JSON.stringify(info,null,1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
