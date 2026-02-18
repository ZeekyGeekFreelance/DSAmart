const service = {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Price (Starting from)',
      type: 'string',
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      options: {
        list: [
          { title: 'Wrench', value: 'Wrench' },
          { title: 'Shield Check', value: 'ShieldCheck' },
          { title: 'Life Buoy', value: 'LifeBuoy' },
          { title: 'File Text', value: 'FileText' },
          { title: 'Copy', value: 'Copy' },
          { title: 'Scan', value: 'Scan' },
        ],
      },
    },
    {
      name: 'issues',
      title: 'Common Issues',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};

export default service;
