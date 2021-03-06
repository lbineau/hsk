module.exports = {
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios']
  },
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {},
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Customize app manifest
  */
  manifest: {
    theme_color: '#3B8070'
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa'
  ],
  /*
  ** Call plugins
  */
  plugins: [
    {
      src: '~/plugins/element-ui.js'
    }
  ],
  css: [
    'normalize.css',
    'element-ui/lib/theme-default/index.css',
    '~/assets/scss/main.scss'
  ],
  mode: 'spa'
}
