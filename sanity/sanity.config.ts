import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Sales Portfolio Admin',
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'iy3c1ufh',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  basePath: '/admin',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
