export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  css: ['~/assets/css/main.css'],
  supabase: {
    redirect: false,
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY
  },
  app: { head: { title: 'Day 30 Vocal Series Finale - Payment Proof Submission' } }
})
