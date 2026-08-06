const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r=>setTimeout(r,800));
  const res = await p.evaluate(() => {
    const sections = [".story",".wellness",".home-categories",".products",".new-products-section",".sunshine-moment",".recipes",".home-faq","footer"];
    const out = {};
    let totalOverflow = false;
    for (const s of sections) {
      const el = document.querySelector(s);
      if (!el) { out[s] = "MISSING"; continue; }
      const palms = el.querySelectorAll(".section-palm, .story-palm, .faq-palm").length;
      const r = el.getBoundingClientRect();
      const ov = r.right > window.innerWidth + 1;
      totalOverflow = totalOverflow || ov;
      out[s] = { palms, overflow: ov };
    }
    out._anyOverflow = totalOverflow;
    return out;
  });
  console.log(JSON.stringify(res, null, 2));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
