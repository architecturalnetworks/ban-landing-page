const GFONTS =
  'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Share+Tech&family=Share+Tech+Mono'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: '·ban | Berlin Architectural Network' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
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
    // https://github.com/nuxt/components
    '@nuxt/components',
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
  ],
  components: true,
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxt/content',
    'nuxt-rfg-icon',
    '@nuxtjs/manifest',
  ],
  content: {
    // Options
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    transpile: ['vue-clamp', 'resize-detector'],
  },
}
