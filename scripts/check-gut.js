const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/gut-health", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,1000));
  const info = await p.evaluate(()=>{
    const cards=[...document.querySelectorAll('.story-facts-grid article')];
    const facts=cards.map(c=>({bg:getComputedStyle(c).backgroundColor, cls:c.className, strong:c.querySelector('strong')?c.querySelector('strong').textContent:null}));
    const hl=[...document.querySelectorAll('.info-highlight-grid > div')].map(c=>getComputedStyle(c.querySelector('span')||c).color);
    // look for inline style on facts
    const inline=cards.map(c=>c.getAttribute('style'));
    return {facts, hlColors:hl, inlineStyles:inline};
  });
  console.log(JSON.stringify(info,null,1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
