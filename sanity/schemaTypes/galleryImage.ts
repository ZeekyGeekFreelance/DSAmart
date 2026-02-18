import { defineField, defineType } from 'sanity';

export const galleryImageType = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Uploaded Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL',
      type: 'url',
      description: 'Use this if you want to link an online image instead of uploading.',
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const item = value as { image?: unknown; imageUrl?: string } | undefined;
      if (item?.image || item?.imageUrl) return true;
      return 'Add either an uploaded image or an image URL.';
    }),
  preview: {
    select: {
      media: 'image',
      title: 'imageUrl',
    },
    prepare({ media, title }) {
      return {
        media,
        title: title || 'Uploaded image',
      };
    },
  },
});
