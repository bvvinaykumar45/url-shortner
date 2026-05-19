import { defineConfig } from 'drizzle-kit';

console.log(process.env.DATABASE_URL);
const config = defineConfig({
  out: './drizzle',
  schema: './models/index.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  casing: 'snake_case'
});

export default config;