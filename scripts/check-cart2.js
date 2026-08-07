const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  const info = await p.evaluate(()=>{
    const el=document.querySelector('.product-card-cart');
    if(!el) return "no cart btn";
    const cs=getComputedStyle(el);
    const root=getComputedStyle(document.documentElement).getPropertyValue('--date-red');
    return { classes: el.className, background: cs.background, backgroundColor: cs.backgroundColor, dateRedVar: root, redVar: getComputedStyle(document.documentElement).getPropertyValue('--red') };
  });
  console.log(JSON.stringify(info,null,1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
