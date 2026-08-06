const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r=>setTimeout(r,1000));
  // capture hero cert row
  const hero = await p.evaluate(() => {
    const el = document.querySelector(".hero-certifications");
    if(!el) return null;
    const r = el.getBoundingClientRect();
    return { top: Math.round(r.top+window.scrollY), h: Math.round(r.height), count: el.querySelectorAll("img").length };
  });
  if (hero) { await p.evaluate(y=>window.scrollTo(0,y), Math.max(0,hero.top-40)); await new Promise(r=>setTimeout(r,300));
    await p.screenshot({ path: "verify-shots/certs-hero.png", clip: { x:0, y:Math.max(0,hero.top-40), width:1440, height:hero.h+80 } }); }
  // footer cert row
  const foot = await p.evaluate(() => {
    const el = document.querySelector(".footer-certifications");
    if(!el) return null;
    const r = el.getBoundingClientRect();
    return { top: Math.round(r.top+window.scrollY), h: Math.round(r.height), count: el.querySelectorAll("img").length };
  });
  if (foot) { await p.evaluate(y=>window.scrollTo(0,y), Math.max(0,foot.top-40)); await new Promise(r=>setTimeout(r,300));
    await p.screenshot({ path: "verify-shots/certs-footer.png", clip: { x:0, y:Math.max(0,foot.top-40), width:1440, height:foot.h+80 } }); }
  console.log("hero count:", hero && hero.count, "footer count:", foot && foot.count);
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
