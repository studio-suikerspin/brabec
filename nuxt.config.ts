import { repositoryName, apiEndpoint } from './slicemachine.config.json';
import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  runtimeConfig: {
    // Mailgun configuration (server-only)
    mailgunApiKey: '', // NUXT_MAILGUN_API_KEY
    mailgunDomain: 'mail.suikerspin.studio', // NUXT_MAILGUN_DOMAIN
    mailTo: 'info@suikerspin.studio', // NUXT_MAIL_TO
  },

  app: {
    head: {
      title: 'BRABEC - Digitaliseren voor iedereen',
      htmlAttrs: {
        lang: 'nl',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-96x96.png',
          sizes: '96x96',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        // Preconnect to Prismic CDN for faster resource loading
        { rel: 'preconnect', href: 'https://images.prismic.io' },
        { rel: 'dns-prefetch', href: 'https://images.prismic.io' },
      ],
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/prismic',
    '@nuxt/fonts',
    'lenis/nuxt',
    '@nuxt/ui',
  ],

  fonts: {
    defaults: {
      weights: [400, 500, 600, 800],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/assets/css/global.css', '~/assets/fonts/icons/iconly.min.css'],

  prismic: {
    endpoint: apiEndpoint || repositoryName,
    preview: '/api/preview',
    clientConfig: {
      routes: [
        {
          type: 'page',
          path: '/:uid',
        },
        {
          type: 'page',
          uid: 'home',
          path: '/',
        },
      ],
    },
  },

  ui: {
    colorMode: false,
  },

  routeRules: {
    // Cache static assets aggressively
    '/assets/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    // Cache API responses briefly
    '/api/**': { cache: { maxAge: 60 } },
    '/api/contact': {
      cache: false,
      isr: false,
    },
  },

  nitro: {
    compressPublicAssets: true,
    preset: 'netlify',
  },

  compatibilityDate: '2025-07-16',
});
