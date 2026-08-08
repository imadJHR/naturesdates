const puppeteer=require("puppeteer-core");
(async()=>{
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--disable-gpu"]});
const pg=await b.newPage();
await pg.setViewport({width:375,height:900,deviceScaleFactor:1});
const fails=[];
pg.on("response",r=>{ try{ if(r.resourceType()==="image" && r.status()>=400) fails.push(r.status()+" "+r.url()); }catch(e){} });
await pg.goto("http://localhost:3100/",{waitUntil:"networkidle2",timeout:30000});
await pg.evaluate(async()=>{ const ps=[]; document.querySelectorAll('img').forEach(i=>{ if(!i.complete||i.naturalWidth===0){ try{ ps.push(i.decode()); }catch(e){} } }); await Promise.allSettled(ps); });
await new Promise(r=>setTimeout(r,1500));
const zero=await pg.evaluate(()=>{ const a=[]; document.querySelectorAll('img').forEach(i=>{ if(i.complete && i.naturalWidth===0) a.push((i.currentSrc||i.src).replace(location.origin,'')); }); return [...new Set(a)]; });
console.log("FAILS",JSON.stringify(fails));
console.log("ZERO",JSON.stringify(zero));
await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
