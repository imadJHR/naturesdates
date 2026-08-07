const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  const info = await p.evaluate(()=>{
    const bi=(sel)=>{const e=document.querySelector(sel); return e?getComputedStyle(e).backgroundImage.slice(0,90):"NF";};
    return {
      announcement: bi('.announcement-bar'),
      header: bi('.site-header'),
      story: bi('.story'),
      faq: bi('.home-faq'),
      footer: bi('footer'),
    };
  });
  console.log(JSON.stringify(info,null,1));
  // logo children
  const logo = await p.evaluate(()=>{
    const l=document.querySelector('.logo');
    if(!l) return "no logo";
    let out=[l.tagName];
    l.querySelectorAll('*').forEach(c=>{ out.push(c.tagName+':'+getComputedStyle(c).backgroundColor+':color='+getComputedStyle(c).color); });
    return out.join(' | ');
  });
  console.log("LOGO INNER:", logo);
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
