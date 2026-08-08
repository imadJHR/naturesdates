const puppeteer=require("puppeteer-core");
(async()=>{
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--disable-gpu"]});
const pg=await b.newPage();
await pg.setViewport({width:375,height:900,deviceScaleFactor:1});
await pg.goto("http://localhost:3100/",{waitUntil:"networkidle0"});
await new Promise(r=>setTimeout(r,1500));
const res=await pg.evaluate(()=>{
  const out={broken:[],sample:[]};
  document.querySelectorAll('img').forEach(i=>{
    const r=i.getBoundingClientRect();
    if(i.complete && i.naturalWidth===0) out.broken.push((i.currentSrc||i.src).replace(location.origin,''));
    out.sample.push({src:(i.currentSrc||i.src).replace(location.origin,'').split('/').pop().slice(0,30),nat:Math.round(i.naturalWidth)});
  });
  return out;
});
console.log(JSON.stringify(res));
await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
