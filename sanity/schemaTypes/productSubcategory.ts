import { defineField, defineType } from 'sanity';

export const productSubcategoryType = defineType({
  name: 'productSubcategory',
  title: 'Product Subcategory',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Subcategory Name',
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
      name: 'category',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      categoryName: 'category.name',
    },
    prepare({ title, categoryName }) {
      return {
        title,
        subtitle: categoryName ? `Category: ${categoryName}` : 'No category selected',
      };
    },
  },
});
