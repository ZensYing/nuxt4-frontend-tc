<template>
  <div class="container mx-auto">
    <GlobalLoadingOverlay />
    <!-- Hero Banner Section -->
    <section class=" ">
      <Banner 
        :autoplay="true" 
        :autoplay-interval="6000"
        :show-arrows="true"
        :show-dots="true"
      />
    </section>
    <!-- Categories Section -->
     <Categories />
  </div>
</template>

<script setup lang="ts">
// Define page meta
definePageMeta({
  title: 'Multi-Vendor Store - Home',
  description: 'Discover amazing products from multiple vendors in our marketplace',
})

// SEO
useHead({
  title: 'Multi-Vendor Store - Home',
  meta: [
    { name: 'description', content: 'Discover amazing products from multiple vendors in our marketplace' },
    { name: 'keywords', content: 'multi-vendor, marketplace, shopping, products, vendors' },
    { property: 'og:title', content: 'Multi-Vendor Store - Home' },
    { property: 'og:description', content: 'Discover amazing products from multiple vendors in our marketplace' },
    { property: 'og:type', content: 'website' },
  ],
})

</script>