# DSA Mart

A React + Vite storefront for DSA Mart with:
- Homepage sections (hero, highlights, testimonials, contact)
- Dedicated `/shop` page with category/subcategory filtering
- Product detail modal with image gallery, swipe/arrows/dots, autoplay
- Sanity CMS integration for products/services/categories/subcategories
- Embedded Sanity Studio at `/admin`

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Sanity (`sanity`, `@sanity/client`, `@sanity/image-url`)

## 1. Prerequisites

- Node.js 18+ (recommended LTS)
- npm
- A Sanity project (project ID + dataset)

## 2. Install

```bash
npm install
```

## 3. Environment Setup

Create/update `.env`:

```env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
# VITE_SANITY_API_TOKEN=optional_read_token_for_private_dataset
```

## 4. Run Locally

```bash
npm run dev
```

App URLs:
- Site: `http://localhost:5173`
- Shop: `http://localhost:5173/shop`
- Services: `http://localhost:5173/services`
- Studio: `http://localhost:5173/admin`

## 5. Sanity Studio / Schema

Local schema/config is in:
- `sanity/sanity.config.ts`
- `sanity/schemaTypes/*`

Key schema docs:
- `productCategory`
- `productSubcategory`
- `product`
- `service`

Product supports:
- Primary image upload or primary image URL
- Optional gallery images (upload or URL per item)

## 6. Seed Sample Data

Login first:

```bash
npx sanity login
```

Import sample data:

```bash
npx sanity dataset import ./sanity/seed/sample-data.ndjson production --replace
```

Reference sample values:
- `sanity/EXAMPLE_ENTRIES.md`

## 7. Useful Scripts

```bash
npm run dev
npm run build
npm run preview
npm run typecheck
npm run lint
```

## 8. Troubleshooting

- Images from website pages don’t render:
  Use direct image links or upload to Sanity.  
  Pexels page links are auto-converted in Shop gallery.

- Empty category/subcategory dropdowns in Studio:
  Create/import `productCategory` and `productSubcategory` documents first.

- `/admin` not loading:
  Check Sanity env vars and restart `npm run dev`.

## Project Structure

```text
src/
  components/
  lib/sanity.ts
  pages/StudioPage.tsx
sanity/
  sanity.config.ts
  schemaTypes/
  seed/sample-data.ndjson
```
