<!-- app/components/Categories/Index.vue -->
<template>
  <div class="w-full py-4">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 px-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Categories</h2>
      <NuxtLink 
        to="/categories" 
        class="text-sm text-[#2B6CB0] hover:text-[#1e4f87] font-semibold transition-colors duration-200 flex items-center space-x-1"
      >
        <span>See All</span>
        <Icon name="lucide:chevron-right" class="w-4 h-4" />
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="px-6">
      <div class="flex space-x-4 overflow-hidden">
        <div 
          v-for="i in 6" 
          :key="`skeleton-${i}`"
          class="flex-none w-20"
        >
          <div class="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl animate-pulse mb-2"></div>
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
          <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="px-6">
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
        <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
          <Icon name="lucide:alert-triangle" class="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
        <p class="text-red-700 dark:text-red-300 text-sm font-medium mb-3">Failed to load categories</p>
        <button 
          @click="fetchCategories" 
          class="bg-[#2B6CB0] hover:bg-[#1e4f87] text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Categories Carousel -->
    <div v-else-if="categories.length" class="relative">
      <!-- Horizontal Scrollable Container -->
      <div 
        ref="scrollContainer"
        class="flex space-x-4 overflow-x-auto scrollbar-hide px-6 pb-2"
        @scroll="onScroll"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div
          v-for="category in categories"
          :key="category.id"
          @click="navigateToCategory(category)"
          class="flex-none group cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <!-- Category Card -->
          <div class="w-20 flex flex-col items-center">
            <!-- Category Icon/Image Container -->
            <div class="relative w-20 h-20 mb-2">
              <!-- Background Circle with KHGlobal Gradient -->
              <div class="absolute inset-0 bg-gradient-to-br from-[#2B6CB0]/10 via-[#2B6CB0]/5 to-blue-50 dark:from-[#2B6CB0]/20 dark:via-[#2B6CB0]/10 dark:to-blue-900/20 rounded-2xl shadow-sm group-hover:shadow-lg border border-[#2B6CB0]/10 dark:border-[#2B6CB0]/20 transition-all duration-300 group-hover:border-[#F9A825]/30"></div>
              
              <!-- Category Image or Icon -->
              <div class="relative w-full h-full flex items-center justify-center rounded-2xl overflow-hidden">
                <img
                  v-if="category.image"
                  :src="useImg(category.image)"
                  :alt="category.name"
                  class="w-12 h-12 object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div
                  v-else
                  class="w-12 h-12 bg-gradient-to-br from-[#2B6CB0] to-[#1e4f87] rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:from-[#F9A825] group-hover:to-[#e6941f] shadow-sm"
                >
                  <Icon name="lucide:package" class="w-6 h-6 text-white" />
                </div>
              </div>

              <!-- Active Indicator with KHGlobal Colors -->
              <div 
                v-if="category.sub_category?.length"
                class="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#F9A825] to-[#e6941f] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white dark:border-gray-800 group-hover:scale-110 transition-transform duration-200"
              >
                {{ category.sub_category.length }}
              </div>
            </div>

            <!-- Category Name -->
            <div class="text-center">
              <h3 class="text-xs font-semibold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-[#2B6CB0] dark:group-hover:text-[#F9A825] transition-colors duration-300">
                {{ category.name }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Show More Card with KHGlobal Styling -->
        <div
          v-if="categories.length > 8"
          @click="navigateTo('/categories')"
          class="flex-none group cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div class="w-20 flex flex-col items-center">
            <div class="relative w-20 h-20 mb-2">
              <div class="absolute inset-0 bg-gradient-to-br from-[#F9A825]/10 to-[#F9A825]/5 dark:from-[#F9A825]/20 dark:to-[#F9A825]/10 rounded-2xl shadow-sm group-hover:shadow-lg border-2 border-dashed border-[#2B6CB0]/30 dark:border-[#F9A825]/40 group-hover:border-[#F9A825] group-hover:bg-gradient-to-br group-hover:from-[#F9A825]/20 group-hover:to-[#F9A825]/10 transition-all duration-300"></div>
              <div class="relative w-full h-full flex items-center justify-center rounded-2xl">
                <div class="w-10 h-10 bg-gradient-to-r from-[#2B6CB0] to-[#1e4f87] rounded-full flex items-center justify-center group-hover:from-[#F9A825] group-hover:to-[#e6941f] transition-all duration-300">
                  <Icon name="lucide:arrow-right" class="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-xs font-semibold text-[#2B6CB0] dark:text-[#F9A825] group-hover:text-[#F9A825] dark:group-hover:text-[#2B6CB0] transition-colors duration-300">
                View All
              </h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicators with KHGlobal Colors -->
      <div v-if="scrollIndicators.length > 1" class="flex justify-center mt-4 space-x-2">
        <div
          v-for="(indicator, index) in scrollIndicators"
          :key="`indicator-${index}`"
          :class="[
            'h-1.5 rounded-full transition-all duration-300',
            indicator.active 
              ? 'w-8 bg-gradient-to-r from-[#2B6CB0] to-[#1e4f87] shadow-sm' 
              : 'w-1.5 bg-gray-300 dark:bg-gray-600 hover:bg-[#F9A825]/40 cursor-pointer'
          ]"
          @click="scrollToPage(index)"
        />
      </div>
    </div>

    <!-- Empty State with KHGlobal Styling -->
    <div v-else class="px-6">
      <div class="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/10 border-2 border-dashed border-[#2B6CB0]/30 dark:border-[#2B6CB0]/40 rounded-2xl p-8 text-center">
        <div class="w-16 h-16 bg-gradient-to-br from-[#2B6CB0]/10 to-[#2B6CB0]/5 dark:from-[#2B6CB0]/20 dark:to-[#2B6CB0]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#2B6CB0]/20">
          <Icon name="lucide:package" class="w-8 h-8 text-[#2B6CB0] dark:text-[#F9A825]" />
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Categories Yet</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm">Categories will appear here when available.</p>
        <button 
          @click="fetchCategories"
          class="mt-4 bg-gradient-to-r from-[#2B6CB0] to-[#1e4f87] hover:from-[#F9A825] hover:to-[#e6941f] text-white px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
        >
          Refresh Categories
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SubCategory {
  id: string
  name: string
  slug: string
  image?: string
  sort?: number
  user_created: string
}

interface Category {
  id: string
  name: string
  slug: string
  image?: string
  sort?: number
  status: string
  sub_category?: SubCategory[]
}

interface CategoriesResponse {
  data: Category[]
}

// State
const categories = ref<Category[]>([])
const pending = ref(true)
const error = ref<Error | null>(null)
const scrollContainer = ref<HTMLElement>()

// Touch handling
const touchStartX = ref(0)
const touchStartTime = ref(0)
const isScrolling = ref(false)

// Scroll indicators
const scrollIndicators = ref<{ active: boolean }[]>([])

// Fetch categories
const fetchCategories = async () => {
  try {
    pending.value = true
    error.value = null
    
    const response = await useApi<CategoriesResponse>('/items/categories', {
      method: 'GET',
      params: {
        filter: { status: { _eq: 'published' } },
        fields: '*,sub_category.id,sub_category.user_created,sub_category.sort,sub_category.name,sub_category.slug,sub_category.image',
        sort: ['sort', 'name'],
        limit: 20 // Limit for performance
      }
    })
    
    categories.value = response.data || []
    updateScrollIndicators()
  } catch (err) {
    error.value = err as Error
    console.error('Error fetching categories:', err)
  } finally {
    pending.value = false
  }
}

// Navigation with enhanced UX
const navigateToCategory = (category: Category) => {
  // Add haptic feedback for mobile
  if ('vibrate' in navigator) {
    navigator.vibrate(10)
  }
  
  // Add visual feedback
  const target = event?.currentTarget as HTMLElement
  if (target) {
    target.style.transform = 'scale(0.95)'
    setTimeout(() => {
      target.style.transform = ''
    }, 100)
  }
  
  navigateTo(`/categories/${category.slug}`)
}

// Touch handlers for smooth mobile interaction
const onTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
  touchStartTime.value = Date.now()
  isScrolling.value = false
}

const onTouchMove = (e: TouchEvent) => {
  if (Math.abs(e.touches[0].clientX - touchStartX.value) > 5) {
    isScrolling.value = true
  }
}

const onTouchEnd = (e: TouchEvent) => {
  const touchEndX = e.changedTouches[0].clientX
  const touchDuration = Date.now() - touchStartTime.value
  const distance = Math.abs(touchEndX - touchStartX.value)
  
  // If it was a quick swipe, add momentum
  if (touchDuration < 300 && distance > 30 && scrollContainer.value) {
    const direction = touchEndX < touchStartX.value ? 1 : -1
    const scrollAmount = Math.min(distance * 2, 200)
    
    scrollContainer.value.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    })
  }
}

// Update scroll indicators
const updateScrollIndicators = () => {
  if (!scrollContainer.value || !categories.value.length) return
  
  const container = scrollContainer.value
  const itemWidth = 96 // w-20 + gap
  const visibleWidth = container.clientWidth
  const totalWidth = categories.value.length * itemWidth
  const maxScroll = totalWidth - visibleWidth
  
  if (maxScroll <= 0) {
    scrollIndicators.value = []
    return
  }
  
  const indicatorCount = Math.ceil(totalWidth / visibleWidth)
  scrollIndicators.value = Array.from({ length: indicatorCount }, (_, i) => ({
    active: i === 0
  }))
}

// Scroll to specific page
const scrollToPage = (pageIndex: number) => {
  if (!scrollContainer.value) return
  
  const container = scrollContainer.value
  const visibleWidth = container.clientWidth
  const targetScroll = pageIndex * visibleWidth
  
  container.scrollTo({
    left: targetScroll,
    behavior: 'smooth'
  })
}

// Handle scroll for indicators
const onScroll = () => {
  if (!scrollContainer.value || !scrollIndicators.value.length) return
  
  const container = scrollContainer.value
  const scrollLeft = container.scrollLeft
  const visibleWidth = container.clientWidth
  const currentPage = Math.round(scrollLeft / visibleWidth)
  
  scrollIndicators.value.forEach((indicator, index) => {
    indicator.active = index === currentPage
  })
}

// Handle resize
const windowWidth = ref(0)

const updateWindowSize = () => {
  if (process.client) {
    windowWidth.value = window.innerWidth
  }
}

onMounted(async () => {
  await fetchCategories()
  
  updateWindowSize()
  if (process.client) {
    window.addEventListener('resize', updateWindowSize)
  }
  
  // Setup scroll indicators after DOM update
  nextTick(() => {
    updateScrollIndicators()
  })
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', updateWindowSize)
  }
})

watch(windowWidth, () => {
  nextTick(() => {
    updateScrollIndicators()
  })
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Smooth scrolling for touch devices */
.scrollbar-hide {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Enhanced mobile touch feedback with KHGlobal colors */
@media (hover: none) and (pointer: coarse) {
  .group:active {
    transform: scale(0.95) !important;
    transition-duration: 0.1s;
  }
  
  .group:active .bg-gradient-to-br {
    background: linear-gradient(135deg, #F9A825, #e6941f) !important;
  }
  
  /* Prevent text selection on touch */
  .group {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
  }
}

/* Optimized for different screen sizes */
@media (max-width: 640px) {
  .group .w-20 {
    width: 4.5rem; /* Slightly smaller on very small screens */
  }
}

/* Custom gradients for KHGlobal brand */
.khglobal-primary {
  background: linear-gradient(135deg, #2B6CB0 0%, #1e4f87 100%);
}

.khglobal-accent {
  background: linear-gradient(135deg, #F9A825 0%, #e6941f 100%);
}

/* Subtle animations */
@keyframes khglobal-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-khglobal-pulse {
  animation: khglobal-pulse 2s infinite;
}
</style>