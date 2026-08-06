const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r=>setTimeout(r,800));
  const res = await p.evaluate(() => {
    return Array.from(document.querySelectorAll(".cert-badge img")).map(i => ({
      src: i.getAttribute("src"),
      ok: i.naturalWidth > 0,
      w: i.naturalWidth, h: i.naturalHeight,
      title: i.closest(".cert-badge")?.getAttribute("title")
    }));
  });
  console.log(JSON.stringify(res, null, 1));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
