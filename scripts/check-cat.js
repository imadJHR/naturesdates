const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.goto("http://localhost:3000/products/category/fresh-dates", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,1000));
  const info = await p.evaluate(()=>{
    const link=document.querySelector('.product-card-link'); 
    const linkInfo=link?{bg:getComputedStyle(link).backgroundColor,border:getComputedStyle(link).borderColor,color:getComputedStyle(link).color}:null;
    const step=document.querySelector('.category-guide-steps article');
    const stepInfo=step?{bg:getComputedStyle(step).backgroundColor,border:getComputedStyle(step).borderColor}:null;
    return {link:linkInfo, step:stepInfo};
  });
  console.log(JSON.stringify(info,null,1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
