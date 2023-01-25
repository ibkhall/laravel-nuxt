import vuetify from "vite-plugin-vuetify";


export default defineNuxtConfig({
    runtimeConfig: {
      public: {
        apiBase: process.env.NUXT_API_BASE || 'http://localhost:8000',
      }
    },
    static: './client/public/',
    srcDir: 'client/',
    app: {
      head: {
        charset: 'utf-8',
        meta: [
          { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
        ]
      }
    },
    css: ["@/assets/main.scss"],
    build: {
      transpile: ['vuetify', '@vuepic/vue-datepicker'],
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
    ssr: false,
    router: {
      options: {
        hashMode: true
      }
    }
})
