import { createSEOMeta } from './utils/seo'
import { fetchSitemapRoutes } from './utils/sitemap'

const GFONTS =
  'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Share+Tech&family=Share+Tech+Mono'

export default async () => {
  const routes = await fetchSitemapRoutes()
  return {
    mode: 'universal',
    target: 'static',
    /*
     ** Headers of the page
     */
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: '·ban | Berlin Architectural Network' || '',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ...createSEOMeta({
          description:
            "Berlin's largest community connecting architecture professionals to exchange knowledge and support.",
          image:
            'https://res.cloudinary.com/architecturalnetworks/image/upload/v1597991287/ban/og-image_jq2tvh.png',
        }),
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: true,
        },
        { rel: 'preload', as: 'style', href: `${GFONTS}&display=swap` },
        {
          rel: 'stylesheet',
          href: `${GFONTS}&display=swap`,
          media: 'print',
          onload: 'this.media="all"',
        },
      ],
      noscript: [
        {
          link: [{ rel: 'stylesheet', href: `${GFONTS}&display=swap` }],
        },
      ],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#E53E3E' },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~plugins/logoComponents.js'],
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
      // Doc: https://github.com/nuxt-community/eslint-module
      '@nuxtjs/eslint-module',
      // Doc: https://github.com/nuxt-community/stylelint-module
      '@nuxtjs/stylelint-module',
      // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
      '@nuxtjs/tailwindcss',
      [
        '@nuxtjs/date-fns',
        {
          methods: ['format', 'formatDistanceToNow'],
        },
      ],
      [
        '@nuxtjs/google-analytics',
        {
          id: 'UA-171122557-1',
        },
      ],
      '@nuxtjs/composition-api',
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
      // Doc: https://github.com/nuxt-community/dotenv-module
      '@nuxtjs/dotenv',
      '@nuxt/content',
      'nuxt-rfg-icon',
      '@nuxtjs/manifest',
      '@nuxtjs/markdownit',
      '@nuxtjs/sentry',
      '@nuxtjs/sitemap',
      [
        'storyblok-nuxt',
        {
          accessToken: process.env.NUXT_ENV_STORYBLOK_TOKEN,
          cacheProvider: 'memory',
        },
      ],
    ],
    markdownit: {
      injected: true,
      breaks: true,
    },
    sentry: {
      dsn:
        'https://837fdc7977b34ec88d0a4d94fc2e711d@o304029.ingest.sentry.io/5379661', // Enter your project's DSN here
      config: {}, // Additional config
    },
    content: {
      // Options
    },
    sitemap: {
      hostname: process.env.HOST_NAME,
      routes, // all the dynamic routes
    },
    /*
     ** Build configuration
     */
    build: {
      /*
       ** You can extend webpack config here
       */
      extend(config, ctx) {
        // for debugging on vs-code chrome debugger
        if (ctx.isDev) {
          config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
        }
      },
      transpile: ['vue-clamp', 'resize-detector'],
    },
  }
}
