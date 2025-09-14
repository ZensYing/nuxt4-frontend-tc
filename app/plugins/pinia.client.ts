// plugins/pinia.client.ts
export default defineNuxtPlugin({
  name: 'pinia-hydration',
  setup() {
    // This plugin ensures Pinia is properly initialized on client-side
    // before any stores are accessed
  }
})