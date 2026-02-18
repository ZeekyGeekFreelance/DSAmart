# Sanity Sample Entries (One per Schema)

If category/subcategory options are empty in Product, it means those documents were not created yet.

Create entries in this order:
1. `Product Category`
2. `Product Subcategory`
3. `Service`
4. `Product`

## 1) Product Category

- `Category Name`: `Printers`
- `Slug`: `printers`
- `Description`: `Thermal, barcode, and office printers for daily business operations.`
- `Display Order`: `1`

## 2) Product Subcategory

- `Subcategory Name`: `Barcode Printers`
- `Slug`: `barcode-printers`
- `Parent Category`: select `Printers`
- `Display Order`: `1`

## 3) Service

- `Title`: `Printer Installation`
- `Description`: `On-site setup, calibration, and test print support for new printer deployments.`
- `Price (Starting from)`: `₹999`
- `Icon Name`: `Wrench`
- `Common Issues`:
  - `Initial setup errors`
  - `Driver mismatch`
  - `Label alignment issues`

## 4) Product

- `Product Name`: `Zebra ZD220 Barcode Printer`
- `Slug`: `zebra-zd220-barcode-printer`
- `Description`: `Entry-level direct thermal barcode printer for retail and warehouse labels.`
- `Category`: select `Printers`
- `Subcategory`: select `Barcode Printers`
- `Primary Image`: upload one product image
- `Specifications`:
  - `Label`: `Print Width`, `Value`: `4 inch`
  - `Label`: `Connectivity`, `Value`: `USB`
  - `Label`: `Resolution`, `Value`: `203 dpi`
- `Featured (Popular)`: `true`

## Why categories are "not listed"

`Product` uses references. The dropdowns only show values after you create documents in:
- `Product Category`
- `Product Subcategory`

No category documents = empty category dropdown.
