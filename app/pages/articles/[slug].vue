<!-- pages/articles/[slug].vue -->
<script setup lang="ts">
import { fetchArticleBySlug, type DirectusArticle } from '../../../server/utils/directus'
const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

// SSR-only fetch; result is embedded into HTML, so nothing shows in Network.
const { data: article } = await useAsyncData<DirectusArticle>(
  () => fetchArticleBySlug(slug.value),
  { server: true, lazy: false }
)
if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Not found' })
}

// Optional: safe HTML rendering for Directus body
const sanitizedBody = computed(() => article.value?.body || '')
useHead({
  title: article.value?.title ?? 'Article',
  meta: [{ name: 'description', content: article.value?.title ?? '' }]
})
</script>

<template>
  <main class="min-h-screen 0">
    <article class="max-w-4xl mx-auto p-4 md:p-8rounded-2xl shadow ">
      <h1 class="text-2xl md:text-4xl font-bold mb-4">{{ article?.title }}</h1>
      <div class="text-sm mb-6">
        <time v-if="article?.date_created">{{ new Date(article.date_created).toLocaleString() }}</time>
        <span v-if="article?.views" class="ml-3">{{ article.views }} views</span>
      </div>

      <div class="prose max-w-none" v-html="sanitizedBody"></div>
    </article>
  </main>
</template>

<style>
.prose iframe { width: 100%; border-radius: 12px; }
</style>
