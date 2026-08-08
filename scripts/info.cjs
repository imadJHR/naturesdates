const puppeteer=require("puppeteer-core");
(async()=>{
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--disable-gpu"]});
const pg=await b.newPage();
await pg.setViewport({width:1280,height:900,deviceScaleFactor:1});
await pg.goto("http://localhost:3100/",{waitUntil:"networkidle2",timeout:40000});
await new Promise(r=>setTimeout(r,1200));
const info=await pg.evaluate(()=>{
  const cards=[...document.querySelectorAll('.product-card, .fresh-product-card, .home-category-card')];
  return cards.map(c=>{
    const img=c.querySelector('img');
    const h=c.querySelector('h3, h4');
    return {cls:c.className.split(' ')[0], title:h?h.innerText.slice(0,28):'', src:img?(img.currentSrc||img.src).split('/').slice(-2).join('/'):'NONE'};
  });
});
console.log(JSON.stringify(info,null,1));
await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
