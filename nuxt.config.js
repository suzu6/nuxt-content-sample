export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-content-sample',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'noindex' },
      { hid: 'description', name: 'description', content: '技術ブログ' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // node.js module but we specify the pre-processor
    { src: 'bulma/bulma.sass', lang: 'sass' },

    // material design icon
    { src: '@mdi/font/css/materialdesignicons.min.css', lang: 'css' },
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://google-analytics.nuxtjs.org/setup
    // '@nuxtjs/google-analytics'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://www.npmjs.com/package/@nuxtjs/sitemap
    '@nuxtjs/sitemap',
    // https://github.com/nuxt-community/google-adsense-module
    // ['@nuxtjs/google-adsense', {
    //   id: process.env.GOOGLE_ADSENSE_ID,
    //   pageLevelAds: false,
    // }]
  ],

  // https://ja.nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config/
  publicRuntimeConfig: {
    // GENERATED_BY: process.env.GENERATED_BY,
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // https://google-analytics.nuxtjs.org/setup
  // googleAnalytics: {
  //   id: process.env.GOOGLE_ANALYTICS_ID
  // },
  // publicRuntimeConfig: {
  //   googleAnalytics: {
  //     id: process.env.GOOGLE_ANALYTICS_ID
  //   }
  // },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    markdown: {
      prism: {
        // See https://github.com/PrismJS/prism-themes/
        theme: 'prism-themes/themes/prism-coldark-dark.css',
      },
      remarkPlugins: [
        'remark-emoji',
        'remark-math',
        'remark-toc',
        'remark-footnotes',
        'remark-code-titles',
      ],
      rehypePlugins: ['rehype-katex'],
    },
  },

  sitemap: {
    hostname: process.env.BASE_URL || 'https://www.suzu6.net/',
    routes: async () => {
      let array = [
        {
          // トップページ
          url: '/',
          changefreq: 'daily',
          priority: 1,
          lastmod: new Date(),
        },
      ]
      // コンテンツ
      const { $content } = require('@nuxt/content')
      const posts = await $content('posts').only(['path', 'updated_at']).fetch()
      array = array.concat(
        posts.map((p) => {
          return {
            url: p.path,
            lastmod: p.updated_at,
            priority: 1,
          }
        })
      )
      return array
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },

  // https://content.nuxtjs.org/ja/advanced/
  generate: {
    async routes() {
      let array = []
      const { $content } = require('@nuxt/content')
      const files1 = await $content().only(['path']).fetch()
      const route = files1.map((file) =>
        file.path === '/index' ? '/' : file.path
      )
      array = array.concat(route)

      // コンテンツ
      const files2 = await $content('/posts').only(['path']).fetch()
      const posts = files2.map((file) =>
        file.path === '/posts/index' ? '/posts/' : file.path
      )
      array = array.concat(posts)

      // tags
      const contents = await $content('posts').only(['tags']).fetch()
      let tags = []
      for (const item of contents) {
        tags = tags.concat(item.tags.split(','))
      }
      tags = tags.filter(function (x, i, self) {
        return self.indexOf(x) === i
      })
      tags = tags.map((tag) => '/tags/' + tag.toLowerCase())
      array = array.concat(tags)
      return array
    },
  },
}
