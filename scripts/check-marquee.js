const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  const info = await p.evaluate(() => {
    const m = document.querySelector(".official-hero-marquee");
    if (!m) return { found: false };
    const inner = m.querySelector(".hero-marquee-inner");
    const items = m.querySelectorAll(".hero-marquee-item");
    const cs = getComputedStyle(m);
    return { found: true, hasInner: !!inner, itemCount: items.length, bg: cs.backgroundImage.slice(0,60), color: cs.color, anim: getComputedStyle(inner||m).animationName };
  });
  console.log(JSON.stringify(info, null, 2));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
