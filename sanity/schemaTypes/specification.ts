import { defineField, defineType } from 'sanity';

export const specificationType = defineType({
  name: 'specification',
  title: 'Specification',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      key: 'key',
      value: 'value',
    },
    prepare({ key, value }) {
      return {
        title: key || 'Specification',
        subtitle: value || '',
      };
    },
  },
});
