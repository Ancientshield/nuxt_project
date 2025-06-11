// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	alias: { '@': resolve(__dirname, '/') },
	modules: ['@nuxt/eslint', '@nuxt/ui'],
	css: ['~/assets/css/main.css'],
});
