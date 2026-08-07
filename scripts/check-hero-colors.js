const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 860 });
  await p.goto("http://localhost:3000/", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,1200));
  const info = await p.evaluate(()=>{
    const g=(sel)=>{const e=document.querySelector(sel); return e?getComputedStyle(e).color:null;};
    return {
      heroBg: getComputedStyle(document.querySelector('.hero.official-hero')).backgroundImage.slice(0,70),
      eyebrow: g('.official-hero-eyebrow'),
      h1strong: g('.hero-field-letter h1 strong'),
      h1span: g('.hero-field-letter h1 span'),
      storyLink: g('.hero-story-link'),
      noteCite: g('.hero-person-note cite'),
      photoBg: getComputedStyle(document.querySelector('.hero-field-photo-image')).backgroundColor,
    };
  });
  console.log(JSON.stringify(info,null,1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
