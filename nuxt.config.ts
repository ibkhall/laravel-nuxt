import vuetify from "vite-plugin-vuetify";


export default defineNuxtConfig({
    static: './client/public/',
    srcDir: 'client/',
    head: {
      title: 'Boilerplate',
    },
    meta: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
        { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      ],
    },
    css: ["@/assets/main.scss"],
    build: {
      transpile: ['vuetify'],
    },
    modules: [

      async (options, nuxt) => {
        nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(
          vuetify()
        ))
      }
    ],
    vite: {
      define: {
        'process.env.DEBUG': false,
      },
    },
    ssr: false
})
