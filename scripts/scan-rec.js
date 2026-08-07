const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/recipes", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  const bad = await p.evaluate(()=>{
    const isNeutral=(c)=>/rgba?\(0, 0, 0, 0\)|rgba?\(255, 255, 255|rgb\(252|rgb\(251|rgb\(248|rgb\(246|rgb\(245|rgb\(242|rgb\(239|rgb\(230|rgb\(224|rgb\(167, 3, 16|rgb\(142, 27, 27|rgb\(110, 22, 24|rgb\(200, 132, 43|rgb\(230, 193, 92|rgb\(212, 160, 60/.test(c);
    const isSusp=(c)=>{const m=c.match(/rgb\((\d+), (\d+), (\d+)/);if(!m)return false;const r=+m[1],g=+m[2],bl=+m[3];if(g>r+25&&g>bl+25&&g>80)return true;if(bl>r+25&&bl>g+25&&bl>80)return true;if(r>150&&g>80&&g<r-30&&bl<90)return true;if(r>90&&g<70&&bl<60&&r>g+25)return true;return false;};
    const out=[];const seen=new Set();
    for(const el of document.querySelectorAll('*')){const cs=getComputedStyle(el);const txt=(el.textContent||'').trim().slice(0,22);[['color',cs.color],['bg',cs.backgroundColor]].forEach(([k,v])=>{if(txt&&!isNeutral(v)&&isSusp(v)&&!seen.has(k+v+txt)){seen.add(k+v+txt);out.push({k,cls:el.className.toString().slice(0,38),txt,v});}});}
    return out.slice(0,30);
  });
  console.log(JSON.stringify(bad,null,1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
