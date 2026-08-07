const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  const info = await p.evaluate(()=>{
    const bi=(sel)=>{const e=document.querySelector(sel); return e?getComputedStyle(e).backgroundImage.slice(0,70):"NF";};
    const logoBg=document.querySelector('.logo')?getComputedStyle(document.querySelector('.logo')).backgroundColor:"NF";
    return {
      header: bi('.site-header'),
      announcement: bi('.announcement-bar'),
      logoBg,
      footer: bi('footer'),
    };
  });
  console.log(JSON.stringify(info,null,1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
