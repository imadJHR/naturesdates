const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args:["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  // catalog
  await p.goto("http://localhost:3000/products", { waitUntil:"networkidle0", timeout:60000 });
  await new Promise(r=>setTimeout(r,900));
  await p.screenshot({ path:"verify-shots/catalog.png", fullPage:false });
  // slug (first product)
  const slug = await p.evaluate(async()=>{
    const res = await fetch("/products");
    const html = await res.text();
    const m = html.match(/href="(\/products\/[a-z0-9-]+)"/i);
    return m? m[1] : null;
  });
  if(slug){
    await p.goto("http://localhost:3000"+slug, { waitUntil:"networkidle0", timeout:60000 });
    await new Promise(r=>setTimeout(r,900));
    await p.screenshot({ path:"verify-shots/slug.png", fullPage:false });
    console.log("SLUG:", slug);
  } else { console.log("no slug found"); }
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
