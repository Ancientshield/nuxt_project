// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			omdbApiKey: process.env.OMDB_API_KEY,
		},
	},
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	modules: ['@nuxt/eslint', '@nuxt/ui'],
	css: ['~/assets/css/main.css'],
});
