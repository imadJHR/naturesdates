const puppeteer=require("puppeteer-core");
(async()=>{
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--disable-gpu"]});
const widths=[375,768,1440];
for(const w of widths){
  const pg=await b.newPage();
  await pg.setViewport({width:w,height:900,deviceScaleFactor:1});
  await pg.goto("http://localhost:3100/",{waitUntil:"networkidle2",timeout:45000});
  // scroll through to trigger lazy images
  await pg.evaluate(async()=>{
    const step=400; const max=document.body.scrollHeight;
    for(let y=0;y<max;y+=step){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,60)); }
    window.scrollTo(0,0);
  });
  await new Promise(r=>setTimeout(r,2000));
  const zero=await pg.evaluate(()=>{ const a=[]; document.querySelectorAll('img').forEach(i=>{ if(i.complete && i.naturalWidth===0) a.push((i.currentSrc||i.src).split('/').slice(-2).join('/')); }); return [...new Set(a)]; });
  const ovf=await pg.evaluate(()=>({docW:document.documentElement.scrollWidth,winW:window.innerWidth,overflowX:document.documentElement.scrollWidth-window.innerWidth}));
  await pg.screenshot({path:`C:/Users/imadj/Desktop/naturesdates/verify-${w}.png`,fullPage:true});
  console.log(`W${w} ovf=${ovf.overflowX} zeroImgs=${zero.length}`, zero.slice(0,10).join(','));
  await pg.close();
}
await b.close();
console.log("DONE");
})().catch(e=>{console.error(e);process.exit(1)});
