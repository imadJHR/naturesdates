const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  const info = await p.evaluate(()=>{
    const l=document.querySelector('.logo');
    if(!l) return "no logo";
    const cs=getComputedStyle(l);
    let out={tag:l.tagName, bg:cs.backgroundColor, border:cs.borderColor, children:[]};
    l.querySelectorAll('*').forEach(c=>{const cc=getComputedStyle(c); out.children.push(c.tagName+': bg='+cc.backgroundColor+' color='+cc.color);});
    return out;
  });
  console.log(JSON.stringify(info,null,1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
