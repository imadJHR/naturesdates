/* eslint-disable */
const puppeteer = require("puppeteer-core");
const fs = require("fs");

const widths = [360, 375, 768, 1024, 1280, 1440];
const shotsDir = "C:/Users/imadj/Desktop/naturesdates/audit-shots";
const BASE = "http://localhost:3000";
fs.mkdirSync(shotsDir, { recursive: true });

(async () => {
  const b = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });

  for (const w of widths) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await p.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1000));

    // ---- overflow + tiny text diagnostics ----
    const diag = await p.evaluate((vw) => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const offenders = [];
      document.querySelectorAll("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.right > winW + 2 && r.width > 0) {
          const cls = (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || "";
          offenders.push({ tag: el.tagName.toLowerCase(), cls: typeof cls === "string" ? cls.slice(0, 80) : "", right: Math.round(r.right), w: Math.round(r.width) });
        }
      });
      const seen = new Set();
      const uniq = offenders.filter((o) => {
        const k = o.tag + "|" + o.cls;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      }).slice(0, 20);

      // tiny text detection
      const tiny = [];
      document.querySelectorAll("p, span, a, li, small, strong, h1, h2, h3, h4").forEach((el) => {
        const cs = getComputedStyle(el);
        const fs = parseFloat(cs.fontSize);
        const txt = (el.textContent || "").trim();
        if (fs > 0 && fs < 12 && txt.length > 0 && cs.visibility !== "hidden" && cs.display !== "none") {
          tiny.push({ tag: el.tagName.toLowerCase(), fs: Math.round(fs * 100) / 100, cls: (typeof el.className === "string" ? el.className : "").slice(0, 60), txt: txt.slice(0, 30) });
        }
      });
      const seenTiny = new Set();
      const uniqTiny = tiny.filter((t) => {
        const k = t.tag + "|" + t.cls + "|" + t.fs;
        if (seenTiny.has(k)) return false;
        seenTiny.add(k);
        return true;
      }).slice(0, 25);

      return { docW, winW, overflowX: docW - winW, offenders: uniq, tinyFonts: uniqTiny };
    }, w);

    console.log(`\n=== WIDTH ${w} ===`);
    console.log(`overflowX=${diag.overflowX}px docW=${diag.docW} winW=${diag.winW}`);
    if (diag.offenders.length) console.log("OVERFLOW OFFENDERS:", JSON.stringify(diag.offenders, null, 1));
    if (diag.tinyFonts.length) console.log("TINY FONTS(<12px):", JSON.stringify(diag.tinyFonts, null, 1));

    await p.screenshot({ path: `${shotsDir}/home-${w}.png`, fullPage: true });
    await p.close();
  }

  // Section shots at mobile 375 and desktop 1440
  const sections = [
    { sel: "#top", name: "hero" },
    { sel: "#story", name: "story" },
    { sel: "#wellness", name: "wellness" },
    { sel: "#categories", name: "categories" },
    { sel: "#products", name: "products" },
  ];
  for (const w of [375, 768, 1440]) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await p.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 800));
    for (const s of sections) {
      const el = await p.$(s.sel);
      if (el) {
        await el.screenshot({ path: `${shotsDir}/sec-${s.name}-${w}.png` }).catch(() => {});
      }
    }
    await p.close();
  }

  await b.close();
  console.log("\nALL SHOTS DONE");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
