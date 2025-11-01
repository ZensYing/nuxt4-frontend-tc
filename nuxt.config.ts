// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    app: {
    head: {
      title: 'Book & Career Expo',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'description',
          content:
            "Book & Career Expo, based in Phnom Penh, Cambodia.",
        },
        {
          name: 'keywords',
          content:
            'starter template,',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Hanuman:wght@100;300;400;700;900&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/logo.ico' },
      ],
      script: [
    
      ],  
    },
  },
  runtimeConfig: {
    DIRECTUS_URL: process.env.DIRECTUS_URL,
    DIRECTUS_TOKEN: process.env.DIRECTUS_TOKEN,
    API_ENCRYPT_SECRET: process.env.API_ENCRYPT_SECRET, // ✅ add this
    public: {
      SITE_URL: process.env.SITE_URL || 'https://tech-cambodia.com',
    },
  },
  nitro: { preset: 'node-server' },
  typescript: { strict: true },
  
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    'motion-v/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/main.css', '~/assets/css/index.css'],
  ssr: true,
  build: {
    transpile: ['@pinia/nuxt']
  },
  //  i18n: {
  //   defaultLocale: 'en', // or your default locale
  //   locales: ['en', 'km'], // your locales
  //   strategy: 'prefix_except_default'
  // }
})