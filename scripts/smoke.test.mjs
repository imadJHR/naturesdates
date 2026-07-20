import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { after, before, test } from "node:test";

const port = 3210;
const baseUrl = `http://127.0.0.1:${port}`;
const formerOfficialHost = ["natural", "delights", ".com"].join("");
const formerOfficialLink = new RegExp(`href="https?://(?:www\\.)?${formerOfficialHost.replace(".", "\\.")}`, "i");
let server;

before(async () => {
  const buildExecutable = process.platform === "win32" ? process.env.ComSpec ?? "cmd.exe" : "npm";
  const buildArguments = process.platform === "win32" ? ["/d", "/s", "/c", "npm run build"] : ["run", "build"];
  const build = spawnSync(buildExecutable, buildArguments, {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  assert.equal(build.status, 0, `${build.error ?? ""}\n${build.stdout ?? ""}\n${build.stderr ?? ""}`);

  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], {
    cwd: process.cwd(),
    stdio: "ignore",
  });

  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("The production server did not become ready in time.");
});

after(() => server?.kill());

for (const [route, marker] of [
  ["/", "Raised by hand"],
  ["/products", "Find your"],
  ["/products/category/fresh-dates", "Fresh Dates"],
  ["/products/category/organic", "Organic"],
  ["/products/category/mini-medjools", "Mini Medjools"],
  ["/products/whole-fresh-medjool-dates", "Whole Fresh Medjool Dates"],
  ["/products/pitted-fresh-medjool-dates", "Pitted Fresh Medjool Dates"],
  ["/products/organic-whole-medjool-dates", "Organic Whole Medjool Dates"],
  ["/products/organic-pitted-medjool-dates", "Organic Pitted Medjool Dates"],
  ["/products/coconut-mini-medjools", "Coconut Mini Medjools"],
  ["/products/cacao-pecan-mini-medjools", "Cacao Pecan Mini Medjools"],
  ["/faq", "About &amp; FAQ"],
  ["/privacy", "Information you choose to provide"],
  ["/terms", "Business identity and jurisdiction"],
  ["/health-and-wellness", "practical way to think"],
  ["/gut-health", "fiber routine"],
  ["/kid-nutrition", "Small bites"],
  ["/vitality", "steadier days"],
  ["/alternative-diets", "lifestyle halo"],
  ["/fitness", "fueling plan"],
  ["/diabetes-health", "Read the carbs"],
  ["/pregnancy-health", "miracle claims"],
  ["/our-products", "Medjool for every"],
  ["/recipes", "every kind of craving"],
  ["/recipes/all", "every kind of craving"],
  ["/energy-ball-builder", "Build your own energy"],
  ["/supercharge-your-smoothies", "Build a smoothie"],
  ["/contact-us", "Questions, feedback"],
  ["/cart", "Cart removed"],
  ["/checkout", "Checkout removed"],
]) {
  test(`${route} renders successfully`, async () => {
    const response = await fetch(`${baseUrl}${route}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(marker, "i"));
    assert.doesNotMatch(html, formerOfficialLink);
  });
}

test("the home page exposes real destinations and no placeholder email", async () => {
  const html = await (await fetch(baseUrl)).text();
  assert.match(html, /href="\/products"/);
  assert.doesNotMatch(html, /href="\/cart"/);
  assert.match(html, /contact@naturesdates\.com/);
  assert.doesNotMatch(html, /href="\/store-locator"/);
  assert.doesNotMatch(html, /href="\/our-story"/);
  assert.doesNotMatch(html, /href="\/blog"/);
  assert.doesNotMatch(html, /href="\/resources"/);
  assert.doesNotMatch(html, /href="\/trade-resources"/);
  assert.doesNotMatch(html, formerOfficialLink);
  assert.doesNotMatch(html, /hello@example\.com/);
  assert.match(html, /href="\/privacy"/);
  assert.match(html, /Meet what(?:'|&#x27;)s new/i);
  assert.match(html, /href="\/products\/organic-pitted-medjool-dates"/);
  assert.match(html, /Wholesale/i);
  assert.doesNotMatch(html, /Add to cart/i);
  assert.match(html, /Choose your sunshine moment/i);
  assert.match(html, /href="\/supercharge-your-smoothies"/);
});

test("SEO uses the production domain and indexable discovery files", async () => {
  const homeHtml = await (await fetch(baseUrl)).text();
  assert.match(homeHtml, /<link rel="canonical" href="https:\/\/naturesdates\.com"/i);
  assert.match(homeHtml, /<link rel="icon" href="\/icon\.png" type="image\/png" sizes="512x512"/i);
  assert.match(homeHtml, /<link rel="icon" href="\/favicon-48\.png" type="image\/png" sizes="48x48"/i);
  assert.match(homeHtml, /<link rel="shortcut icon" href="\/favicon\.ico" type="image\/x-icon"/i);
  assert.match(homeHtml, /<meta property="og:image" content="https:\/\/naturesdates\.com\/og\.png"/i);
  assert.match(homeHtml, /https:\/\/naturesdates\.com\/#organization/);
  assert.match(homeHtml, /\/natures-dates-logo\.webp/);

  const productHtml = await (await fetch(`${baseUrl}/products/whole-fresh-medjool-dates`)).text();
  assert.match(productHtml, /<link rel="canonical" href="https:\/\/naturesdates\.com\/products\/whole-fresh-medjool-dates"/i);
  assert.match(productHtml, /"@type":"Product"/);

  const wellnessHtml = await (await fetch(`${baseUrl}/health-and-wellness`)).text();
  assert.match(wellnessHtml, /<meta name="keywords" content="Medjool date nutrition,/i);
  assert.match(wellnessHtml, /"@type":"WebPage"/);
  assert.match(wellnessHtml, /"@type":"BreadcrumbList"/);
  assert.match(wellnessHtml, /U\.S\. Food &amp; Drug Administration/);
  assert.match(wellnessHtml, /NIH Office of Dietary Supplements/);

  const gutHealthHtml = await (await fetch(`${baseUrl}/gut-health`)).text();
  assert.match(gutHealthHtml, /<meta name="keywords" content="Medjool dates and fiber,/i);
  assert.match(gutHealthHtml, /"@type":"WebPage"/);
  assert.match(gutHealthHtml, /"@type":"BreadcrumbList"/);
  assert.match(gutHealthHtml, /National Institute of Diabetes and Digestive and Kidney Diseases/);
  assert.match(gutHealthHtml, /Current Dietary Guidelines for Americans, 2025/i);

  const kidNutritionHtml = await (await fetch(`${baseUrl}/kid-nutrition`)).text();
  assert.match(kidNutritionHtml, /<meta name="keywords" content="Medjool dates for kids,/i);
  assert.match(kidNutritionHtml, /"@type":"WebPage"/);
  assert.match(kidNutritionHtml, /"@type":"BreadcrumbList"/);
  assert.match(kidNutritionHtml, /Choking hazards and safer food preparation/i);
  assert.match(kidNutritionHtml, /USDA MyPlate/);

  const vitalityHtml = await (await fetch(`${baseUrl}/vitality`)).text();
  assert.match(vitalityHtml, /<meta name="keywords" content="everyday vitality habits,/i);
  assert.match(vitalityHtml, /"@type":"WebPage"/);
  assert.match(vitalityHtml, /"@type":"BreadcrumbList"/);
  assert.match(vitalityHtml, /Physical Activity Guidelines: ten key points/i);
  assert.match(vitalityHtml, /Fatigue, possible causes/i);

  const alternativeDietsHtml = await (await fetch(`${baseUrl}/alternative-diets`)).text();
  assert.match(alternativeDietsHtml, /<meta name="keywords" content="Medjool dates vegan,/i);
  assert.match(alternativeDietsHtml, /"@type":"WebPage"/);
  assert.match(alternativeDietsHtml, /"@type":"BreadcrumbList"/);
  assert.match(alternativeDietsHtml, /Gluten and food-labeling requirements/i);
  assert.match(alternativeDietsHtml, /Vitamin B12 fact sheet/i);

  const fitnessHtml = await (await fetch(`${baseUrl}/fitness`)).text();
  assert.match(fitnessHtml, /<meta name="keywords" content="Medjool dates for fitness,/i);
  assert.match(fitnessHtml, /"@type":"WebPage"/);
  assert.match(fitnessHtml, /"@type":"BreadcrumbList"/);
  assert.match(fitnessHtml, /Nutrition and athletic performance/i);
  assert.match(fitnessHtml, /Heat safety guidance for athletes/i);

  const diabetesHtml = await (await fetch(`${baseUrl}/diabetes-health`)).text();
  assert.match(diabetesHtml, /<meta name="keywords" content="Medjool dates and diabetes,/i);
  assert.match(diabetesHtml, /"@type":"WebPage"/);
  assert.match(diabetesHtml, /"@type":"BreadcrumbList"/);
  assert.match(diabetesHtml, /Diabetes meal planning, carbohydrate counting/i);
  assert.match(diabetesHtml, /Low blood glucose signs/i);

  const pregnancyHtml = await (await fetch(`${baseUrl}/pregnancy-health`)).text();
  assert.match(pregnancyHtml, /<meta name="keywords" content="Medjool dates pregnancy,/i);
  assert.match(pregnancyHtml, /"@type":"WebPage"/);
  assert.match(pregnancyHtml, /"@type":"BreadcrumbList"/);
  assert.match(pregnancyHtml, /Safer food choices and handling during pregnancy/i);
  assert.match(pregnancyHtml, /Gestational diabetes screening/i);

  const robots = await (await fetch(`${baseUrl}/robots.txt`)).text();
  assert.match(robots, /Host: https:\/\/naturesdates\.com/i);
  assert.match(robots, /Sitemap: https:\/\/naturesdates\.com\/sitemap\.xml/i);

  for (const [path, type] of [
    ["/icon.png", "image/png"],
    ["/favicon-192.png", "image/png"],
    ["/favicon-48.png", "image/png"],
    ["/favicon.ico", "image/x-icon"],
  ]) {
    const response = await fetch(`${baseUrl}${path}`);
    assert.equal(response.status, 200, `${path} must be crawlable`);
    assert.match(response.headers.get("content-type") ?? "", new RegExp(type.replace("/", "\\/"), "i"));
  }

  const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
  assert.match(sitemap, /https:\/\/naturesdates\.com\/products/);
  assert.doesNotMatch(sitemap, /natures-dates\.example\.com/);
  assert.doesNotMatch(sitemap, /\/recipes\/all/);
});

test("the responsive navbar exposes the complete local navigation", async () => {
  const html = await (await fetch(baseUrl)).text();
  for (const href of [
    "/products",
    "/health-and-wellness",
    "/gut-health",
    "/kid-nutrition",
    "/vitality",
    "/alternative-diets",
    "/fitness",
    "/diabetes-health",
    "/pregnancy-health",
    "/recipes",
    "/energy-ball-builder",
    "/supercharge-your-smoothies",
  ]) {
    assert.match(html, new RegExp(`href="${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
  }
  for (const deletedHref of ["/our-story", "/store-locator", "/blog", "/resources", "/trade-resources"]) {
    assert.doesNotMatch(html, new RegExp(`href="${deletedHref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
  }
  assert.match(html, /aria-label="Main navigation"/);
  assert.match(html, /aria-controls="mobile-menu"/);
  assert.match(html, /aria-controls="desktop-health-&amp;-wellness"/);
});

test("the products decoration covers every responsive viewport", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  const productsRule = css.match(/\.products \{[^}]*\}/)?.[0] ?? "";

  assert.match(css, /max\(100%, min\(2400px, 110%\)\)/);
  assert.match(css, /\.two-col, \.product-row, \.wellness-grid \{ grid-template-columns: 1fr; \}/);
  assert.match(productsRule, /background-color: #f0e4dc/);
  assert.match(productsRule, /products-center\.webp/);
  assert.doesNotMatch(productsRule, /products-background\.png/);
  assert.match(css, /max\(100%, 1880px\) 210px/);

  for (const viewport of [320, 375, 430, 640, 768, 1024, 1180, 1440, 1920, 2560, 3840]) {
    const decorationWidth = viewport <= 640
      ? 920
      : viewport <= 1024
        ? 1300
        : Math.max(viewport, Math.min(2400, viewport * 1.1));
    assert.ok(decorationWidth >= viewport, `decoration is narrower than the ${viewport}px viewport`);
  }
});

test("the recipes image keeps its original composition without duplicate copy", async () => {
  const html = await (await fetch(baseUrl)).text();
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.doesNotMatch(html, /MEDJOOL DATES FOR EVERYDAY RECIPES/i);
  assert.match(css, /\.recipe-media[^}]*aspect-ratio: 15 \/ 8/);
  assert.match(css, /\.recipes[^}]*background-position: calc\(100% \+ 110px\) 100%/);
});
