<template>
  <div class="w-full max-w-full">
    <!-- Loading state -->
    <div v-if="pending" class="w-full">
      <div class="relative overflow-hidden rounded-xl h-72 md:h-80 bg-gradient-to-br from-stone-100 to-stone-200">
        <!-- Shimmer effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer">
        </div>

        <!-- Content skeleton -->
        <div class="absolute inset-0 flex items-center">
          <div class="container mx-auto px-6 max-w-6xl">
            <div class="max-w-2xl space-y-4">
              <!-- Title skeleton -->
              <div class="space-y-3">
                <div class="h-8 md:h-12 bg-stone-300 rounded-lg animate-pulse"></div>
                <div class="h-6 md:h-8 bg-stone-300 rounded-lg w-3/4 animate-pulse"></div>
              </div>

              <!-- Description skeleton -->
              <div class="space-y-2 mt-6">
                <div class="h-4 bg-stone-300/80 rounded animate-pulse"></div>
                <div class="h-4 bg-stone-300/80 rounded w-5/6 animate-pulse"></div>
              </div>

              <!-- Button skeleton -->
              <div class="mt-8">
                <div class="h-10 w-32 bg-stone-300 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation arrows skeleton -->
        <div class="hidden md:block absolute left-4 top-1/2 -translate-y-1/2">
          <div class="w-10 h-10 bg-stone-300/60 rounded-lg animate-pulse"></div>
        </div>
        <div class="hidden md:block absolute right-4 top-1/2 -translate-y-1/2">
          <div class="w-10 h-10 bg-stone-300/60 rounded-lg animate-pulse"></div>
        </div>

        <!-- Dots skeleton -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-2 bg-stone-300/80 rounded-full animate-pulse"></div>
            <div class="w-2 h-2 bg-stone-300/60 rounded-full animate-pulse"></div>
            <div class="w-2 h-2 bg-stone-300/60 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="w-full">
      <div class="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-3">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01" />
          </svg>
        </div>
        <p class="text-red-800 font-medium text-sm">Failed to load banners</p>
        <button @click="fetchBanners" class="mt-2 text-red-600 hover:text-red-700 text-sm underline">
          Try again
        </button>
      </div>
    </div>
    <!-- Banner carousel -->
    <div v-else-if="banners?.length" ref="carouselRef" class="group relative overflow-hidden rounded-xl"
      @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @touchstart="handleTouchStart"
      @touchend="handleTouchEnd">
      <div class="flex transition-transform duration-500 ease-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div v-for="(banner, index) in banners" :key="banner.id" class="w-full min-w-full flex-shrink-0 relative">
          <!-- Banner content -->
          <div class="relative h-72 md:h-80 overflow-hidden">
            <!-- Background image -->
            <img v-if="banner.thumbnail" :src="useImg(banner.thumbnail)" :alt="banner.title"
              class="absolute inset-0 w-full h-full object-cover" loading="lazy" />

            <!-- Simple overlay -->
            <div class="absolute inset-0 bg-black/40"></div>

            <!-- Content -->
            <div class="absolute inset-0 flex items-center">
              <div class="container mx-auto px-6 max-w-6xl">
                <div class="max-w-2xl text-white">
                  <h2 class="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
                    {{ banner.title }}
                  </h2>

                  <div v-if="banner.description"
                    class="text-sm md:text-base text-white/90 mb-6 leading-relaxed line-clamp-2"
                    v-html="banner.description"></div>

                  <NuxtLink v-if="banner.link" :to="banner.link"
                    class="inline-flex items-center px-6 py-2.5 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    Shop Now
                    <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation arrows - Desktop only -->
      <template v-if="banners.length > 1">
        <button @click="previousSlide"
          class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200 backdrop-blur-sm"
          aria-label="Previous banner">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button @click="nextSlide"
          class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200 backdrop-blur-sm"
          aria-label="Next banner">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </template>

      <!-- Dots indicator -->
      <div v-if="banners.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div class="flex items-center space-x-2">
          <button v-for="(banner, index) in banners" :key="`dot-${banner.id}`" @click="goToSlide(index)"
            class="transition-all duration-200" :aria-label="`Go to banner ${index + 1}`">
            <div :class="[
              'rounded-full transition-all duration-200',
              currentSlide === index
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/60 hover:bg-white/80'
            ]" />
          </button>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="w-full">
      <div class="rounded-xl border-2 border-dashed border-stone-200 bg-stone-50 p-12 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 mb-4">
          <svg class="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-stone-900 mb-2">No banners available</h3>
        <p class="text-stone-600 mb-4">Banners will appear here when published.</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Banner {
  id: number
  status: string
  sort: number | null
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null
  thumbnail: string
  title: string
  description: string
  link: string | null
}

interface BannerResponse {
  data: Banner[]
}

interface Props {
  autoplay?: boolean
  autoplayInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: true,
  autoplayInterval: 5000
})

// State
const currentSlide = ref(0)
const autoplayTimer = ref<NodeJS.Timeout | null>(null)
const isHovered = ref(false)
const carouselRef = ref<HTMLElement>()

// Touch handling
const touchStartX = ref(0)
const touchEndX = ref(0)

// Global loading integration
const { apiCall } = useApiWithLoading()

// Banner data state
const bannersResponse = ref<BannerResponse | null>(null)
const pending = ref(true)
const error = ref<Error | null>(null)

// Fetch banners with global loading
const fetchBanners = async () => {
  try {
    pending.value = true
    error.value = null

    const response = await apiCall<BannerResponse>('/items/banner', {
      method: 'GET',
      params: {
        filter: { status: { _eq: 'published' } },
        sort: ['sort', 'date_created'],
        fields: ['id', 'thumbnail', 'title', 'description', 'link']
      }
    }, 'Loading banners...')

    bannersResponse.value = response
  } catch (err) {
    error.value = err as Error
    console.error('Error fetching banners:', err)
  } finally {
    pending.value = false
  }
}

// Computed
const banners = computed(() => bannersResponse.value?.data || [])

// Navigation methods
const nextSlide = () => {
  if (banners.value.length > 1) {
    currentSlide.value = (currentSlide.value + 1) % banners.value.length
  }
}

const previousSlide = () => {
  if (banners.value.length > 1) {
    currentSlide.value = currentSlide.value === 0
      ? banners.value.length - 1
      : currentSlide.value - 1
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetAutoplay()
}

// Autoplay functionality
const startAutoplay = () => {
  if (props.autoplay && banners.value.length > 1 && !isHovered.value) {
    autoplayTimer.value = setInterval(nextSlide, props.autoplayInterval)
  }
}

const stopAutoplay = () => {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value)
    autoplayTimer.value = null
  }
}

const resetAutoplay = () => {
  stopAutoplay()
  startAutoplay()
}

// Event handlers
const handleMouseEnter = () => {
  isHovered.value = true
  stopAutoplay()
}

const handleMouseLeave = () => {
  isHovered.value = false
  startAutoplay()
}

const handleTouchStart = (e: TouchEvent) => {
  if (e.touches.length > 0) {
    touchStartX.value = e.touches[0].clientX
  }
}

const handleTouchEnd = (e: TouchEvent) => {
  if (e.changedTouches.length > 0) {
    touchEndX.value = e.changedTouches[0].clientX

    const diff = touchStartX.value - touchEndX.value
    const threshold = 50

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide()
      } else {
        previousSlide()
      }
    }
  }
}

// Lifecycle
onMounted(async () => {
  await fetchBanners()
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})

// Watch for banner changes to reset autoplay
watch(() => banners.value.length, () => {
  currentSlide.value = 0
  resetAutoplay()
})
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

button:focus-visible {
  outline: 2px solid #0ea5e9;
  outline-offset: 2px;
}
</style>