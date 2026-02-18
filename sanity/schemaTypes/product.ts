import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'reference',
      to: [{ type: 'productSubcategory' }],
      options: {
        filter: ({ document }) => {
          const categoryRef = (document as { category?: { _ref?: string } } | undefined)?.category?._ref;
          if (!categoryRef) {
            return {};
          }
          return {
            filter: 'category._ref == $categoryId',
            params: { categoryId: categoryRef },
          };
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Primary Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) =>
        rule.custom((value, context) => {
          const documentWithImageUrl = context.document as { imageUrl?: string } | undefined;
          if (value || documentWithImageUrl?.imageUrl) return true;
          return 'Provide either Primary Image upload or Image URL.';
        }),
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL (Optional)',
      type: 'url',
      description: 'Use this when you want to reference an online image instead of uploading.',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images (Optional)',
      type: 'array',
      of: [{ type: 'galleryImage' }],
      description: 'Additional product images used in product detail slider.',
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [{ type: 'specification' }],
      description: 'Shown in product cards and listing details.',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured (Popular)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      media: 'image',
    },
  },
});
