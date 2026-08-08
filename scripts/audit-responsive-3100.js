/* eslint-disable @typescript-eslint/no-require-imports */
const puppeteer = require("puppeteer-core");
const fs = require("fs");

const widths = [375, 768, 1440];
const shotsDir = "C:/Users/imadj/Desktop/naturesdates";

(async () => {
  const b = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });

  for (const w of widths) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await p.goto("http://localhost:3100/", { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 1200));

    // Detect horizontal overflow: compare scrollWidth vs innerWidth
    const overflow = await p.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      // find elements wider than viewport
      const offenders = [];
      document.querySelectorAll("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.right > winW + 2 && r.width > 0) {
          offenders.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || "",
            right: Math.round(r.right),
            w: Math.round(r.width),
          });
        }
      });
      // de-dupe by cls+tag, keep worst 12
      const seen = new Set();
      const uniq = offenders.filter((o) => {
        const k = o.tag + "|" + o.cls;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      }).slice(0, 12);
      return { docW, winW, overflowX: docW - winW, offenders: uniq };
    });

    console.log(`\n=== WIDTH ${w} ===`);
    console.log(JSON.stringify(overflow));

    await p.screenshot({ path: `${shotsDir}/audit-${w}.png`, fullPage: true });
    await p.close();
  }

  await b.close();
  console.log("\nALL SHOTS DONE");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
