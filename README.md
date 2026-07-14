# Natures Dates — Raised On Sunshine

An independent, non-commercial Next.js creative concept celebrating Medjool dates and Bard Valley sunshine. The project is not affiliated with or endorsed by Natural Delights.

## Requirements

- Node.js 20 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
```

The smoke test creates a production build, starts it locally, and verifies the home, FAQ, privacy and terms routes.

## Production

```bash
npm run build
npm start
```

## Project structure

- `app/page.tsx`: server-rendered landing-page content
- `app/components/interactive.tsx`: client-only menu, motion and smooth scrolling
- `app/components/ui`: local shadcn-style Button, Badge, Card and Tabs primitives
- `app/products`: full catalogue, category routes and individual product pages
- `app/data/products.ts`: shared product and category content
- `app/faq`, `app/privacy`, `app/terms`: supporting information pages
- `app/globals.css`: responsive visual system and reduced-motion behavior
- `public/assets`: local product, editorial and video media

External product, retailer, recipe and contact links intentionally point to official Natural Delights resources. Nutrition details should always be verified against current product labels.
