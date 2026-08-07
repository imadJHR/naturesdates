const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  for (const slug of ["gut-health","health-and-wellness","kid-nutrition","vitality","alternative-diets","fitness","diabetes-health","pregnancy-health"]) {
    const p = await b.newPage();
    await p.setViewport({ width: 1280, height: 900 });
    await p.goto("http://localhost:3000/"+slug, { waitUntil:"networkidle0", timeout:60000 });
    await new Promise(r=>setTimeout(r,700));
    const info = await p.evaluate(()=>{
      const h1=document.querySelector('.info-hero-copy h1'); const h1c=h1?getComputedStyle(h1).color:null;
      const cards=[...document.querySelectorAll('.story-facts-grid article')].map(c=>({bg:getComputedStyle(c).backgroundColor, strong:c.querySelector('strong')?c.querySelector('strong').textContent:null}));
      const sec=document.querySelector('.info-section-heading h2'); 
      return {h1c, cards, sec: sec?getComputedStyle(sec).color:null};
    });
    console.log(slug, "h1:", info.h1c, "| facts:", info.cards.map(c=>c.bg+"("+c.strong+")").join(" "), "| secH2:", info.sec);
    await p.close();
  }
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
