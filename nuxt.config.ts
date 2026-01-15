// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // 전역 CSS
  css: ['~/assets/styles/main.scss'],

  // 개발 서버 설정
  devServer: {
    port: 3000
  },

  // TypeScript 설정
  typescript: {
    strict: true
  }
})
