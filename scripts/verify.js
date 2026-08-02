const puppeteer = require("puppeteer-core");
const pages = [["home","/"],["contact","/contact-us"],["faq","/faq"],["products","/products"],["product","/products/whole-fresh-medjool-dates"]];
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  for (const theme of ["dark","light"]) {
    const p = await b.newPage();
    await p.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
    for (const [n,u] of pages) {
      await p.goto("http://localhost:3000"+u, { waitUntil: "networkidle0", timeout: 60000 });
      await p.evaluate((t) => { localStorage.setItem("naturesdates-theme", t); document.documentElement.setAttribute("data-theme", t); }, theme);
      await p.reload({ waitUntil: "networkidle0", timeout: 60000 });
      await p.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
      await new Promise(r => setTimeout(r, 500));
      await p.screenshot({ path: `_verify/${n}-${theme}.png` });
      console.log("captured", n, theme);
    }
    await p.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
