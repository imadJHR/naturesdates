const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/recipes", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  const info = await p.evaluate(()=>{
    // tab buttons (filter pills)
    const tabs=[...document.querySelectorAll('[class*="tab"], [class*="filter"], button')].filter(b=>/breakfast|snack|savory/i.test(b.textContent||'')&&b.children.length<3);
    const tabInfo=tabs.slice(0,4).map(t=>({txt:(t.textContent||'').trim().slice(0,30), bg:getComputedStyle(t).backgroundColor, color:getComputedStyle(t).color, cls:t.className}));
    // numbered circle inside tabs
    const circle=document.querySelector('[class*="tab"] span, [class*="filter"] span');
    const hubHeading=document.querySelector('.recipe-hub-heading h2');
    const cardTitle=document.querySelector('.recipe-card-copy h3');
    const cardTime=document.querySelector('.recipe-card-time');
    const cardLink=document.querySelector('.recipe-card-link');
    return {
      tabsFound: tabs.length,
      tabInfo,
      circle: circle?{bg:getComputedStyle(circle).backgroundColor, color:getComputedStyle(circle).color, cls:circle.className}:null,
      hubHeading: hubHeading?getComputedStyle(hubHeading).color:null,
      cardTitle: cardTitle?getComputedStyle(cardTitle).color:null,
      cardTime: cardTime?getComputedStyle(cardTime).color:null,
      cardLink: cardLink?getComputedStyle(cardLink).color:null,
    };
  });
  console.log(JSON.stringify(info,null,1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
