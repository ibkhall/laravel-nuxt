import VueGates from 'vue-gates'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueGates as any)

    return {
      provide: {
        gates: nuxtApp.vueApp.gates
      }
    }
  })