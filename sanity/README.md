# Sanity Product Listing Setup

This app now reads product listings from Sanity for:
- Home `Latest Products` carousel
- Home `Popular Products` carousel
- `/shop` page categories, subcategories, and products

## 1. Add schemas to your Sanity Studio

Copy the files from `sanity/schemaTypes` into your Studio project and export them from your Studio schema index.
An example config is included in `sanity/sanity.config.ts` (replace `YOUR_PROJECT_ID`).

Example Studio schema entrypoint:

```ts
import {schemaTypes} from './schemaTypes'

export default schemaTypes
```

## 2. Required environment variables in this app

Add these to `.env`:

```env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

Optional (only if dataset is private / drafts needed):

```env
VITE_SANITY_API_TOKEN=your_read_token
```

Studio is embedded in this app at:

- `http://localhost:5173/studio`

This is powered by:
- `src/pages/StudioPage.tsx`
- `sanity/sanity.config.ts` with `basePath: '/studio'`

## 3. Content model order

Create docs in this sequence:
1. `Product Category`
2. `Product Subcategory` (linked to category)
3. `Product` (linked to category + subcategory)

## 4. Notes

- Mark `isFeatured=true` for products you want in the Popular carousel.
- Latest carousel uses most recently created products.
- Product image is required and rendered directly from Sanity asset URL.
- Product gallery supports both uploaded images and direct image URLs.
- Product `Subcategory` is now chained to selected `Category` in Studio.
- Reference fields are configured with `disableNew` so editors use existing dropdown options.

## 5. Quick Start Sample Data

- Manual fill guide (one entry per schema): `sanity/EXAMPLE_ENTRIES.md`
- Importable seed for category/subcategory/service: `sanity/seed/sample-data.ndjson`

If you use Sanity CLI in your Studio project:

```bash
npx sanity login
npx sanity dataset import ./sanity/seed/sample-data.ndjson production --replace
```

Then create one `Product` manually in Studio (image upload is required).
