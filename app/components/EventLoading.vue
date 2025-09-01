<!-- EventLoading.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-rose-50 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-1/2 -left-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-500/5 rounded-full blur-2xl animate-bounce delay-500"></div>
      <div class="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-400/8 rounded-full blur-xl animate-pulse delay-2000"></div>
    </div>

    <!-- Floating Books Animation -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-20 animate-float-1">
        <div class="w-8 h-10 bg-gradient-to-b from-red-400 to-red-500 rounded-sm shadow-lg transform rotate-12"></div>
      </div>
      <div class="absolute top-32 right-32 animate-float-2">
        <div class="w-6 h-8 bg-gradient-to-b from-pink-400 to-pink-500 rounded-sm shadow-lg transform -rotate-12"></div>
      </div>
      <div class="absolute bottom-40 left-40 animate-float-3">
        <div class="w-7 h-9 bg-gradient-to-b from-rose-400 to-rose-500 rounded-sm shadow-lg transform rotate-45"></div>
      </div>
      <div class="absolute bottom-60 right-20 animate-float-1">
        <div class="w-5 h-7 bg-gradient-to-b from-red-500 to-red-600 rounded-sm shadow-lg transform -rotate-45"></div>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
      <!-- Event Poster Image -->
      <div class="text-center mb-12">
        <!-- Poster Container -->
        <div class="relative mb-8 group">
          <div class="absolute -inset-2 bg-gradient-to-r from-red-300 to-pink-300 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div class="relative bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl p-4 shadow-2xl">
            <img 
              src="/images/compress-load.jpg" 
              alt="Book and Career Expo - កម្ពុជាឡើកទី១" 
              class="w-full max-w-md mx-auto rounded-2xl shadow-lg"
              @error="handleImageError"
              v-show="!imageError"
            />
            <!-- Fallback if image fails to load -->
            <div v-show="imageError" class="w-full max-w-md mx-auto p-8 text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h1 class="text-xl font-bold kantumruy-pro bg-gradient-to-r from-red-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
                ពិព័រណ៍សៀវភៅ និងការងារ
              </h1>
              <p class="text-gray-600 text-sm">Book and Career Expo</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading Content -->
      <div class="max-w-md w-full">
        <!-- Main Loading Animation -->
        <div class="relative mb-8">
          <div class="w-24 h-24 mx-auto relative">
            <!-- Outer Ring -->
            <div class="absolute inset-0 border-4 border-red-200 rounded-full"></div>
            <!-- Animated Ring -->
            <div class="absolute inset-0 border-4 border-t-red-500 border-r-pink-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <!-- Inner Circle -->
            <div class="absolute inset-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Loading Message -->
        <div class="text-center mb-8">
          <h3 class="text-lg font-semibold text-gray-800 mb-2 transition-all duration-300 kantumruy-pro">
            {{ currentLoadingMessage }}
          </h3>
          <p class="text-gray-600 text-sm transition-all duration-500">
            {{ currentTip }}
          </p>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="absolute bottom-8 left-0 right-0">
        <div class="text-center">
          <div class="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Secure Registration System</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props to receive loading states from parent
interface Props {
  eventSectionLoaded?: boolean
  jobsLoaded?: boolean
  settingsLoaded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  eventSectionLoaded: false,
  jobsLoaded: false,
  settingsLoaded: false
})

// Loading messages in Khmer and English
const loadingMessages = [
  'កំពុងរៀបចំព្រឹត្តិការណ៍...',
  'Loading event data...',
  'កំពុងផ្ទុកព័ត៌មាន...',
  'Preparing registration form...',
  'សូមរង់ចាំបន្តិច...',
  'Almost ready...'
]

// Tips for users
const tips = [
  'អ្នកអាចជ្រើសរើសព្រឹត្តិការណ៍ច្រើនបាន',
  'You can select multiple event sections',
  'ការចុះឈ្មោះមានសុវត្ថិភាព ១០០%',
  'Registration is 100% secure and encrypted',
  'ព័ត៌មានរបស់អ្នកនឹងត្រូវបានរក្សាទុក',
  'Your information will be kept confidential'
]

// Local state
const imageError = ref(false)
const currentMessageIndex = ref(0)
const currentTipIndex = ref(0)

// Methods
const handleImageError = () => {
  imageError.value = true
}

// Computed properties
const overallProgress = computed(() => {
  let progress = 0
  if (props.eventSectionLoaded) progress += 33.33
  if (props.jobsLoaded) progress += 33.33
  if (props.settingsLoaded) progress += 33.34
  return progress
})

const currentLoadingMessage = computed(() => {
  return loadingMessages[currentMessageIndex.value] || 'Loading...'
})

const currentTip = computed(() => {
  return tips[currentTipIndex.value] || 'Please wait...'
})

onMounted(() => {
  // Cycle through loading messages
  const messageInterval = setInterval(() => {
    currentMessageIndex.value = (currentMessageIndex.value + 1) % loadingMessages.length
  }, 2000)

  // Cycle through tips
  const tipInterval = setInterval(() => {
    currentTipIndex.value = (currentTipIndex.value + 1) % tips.length
  }, 3000)

  // Clean up intervals when component unmounts
  onUnmounted(() => {
    clearInterval(messageInterval)
    clearInterval(tipInterval)
  })
})
</script>

<style scoped>
/* Floating animations for books */
@keyframes float-1 {
  0%, 100% { transform: translateY(0px) rotate(12deg); }
  50% { transform: translateY(-20px) rotate(12deg); }
}

@keyframes float-2 {
  0%, 100% { transform: translateY(0px) rotate(-12deg); }
  50% { transform: translateY(-15px) rotate(-12deg); }
}

@keyframes float-3 {
  0%, 100% { transform: translateY(0px) rotate(45deg); }
  50% { transform: translateY(-25px) rotate(45deg); }
}

.animate-float-1 {
  animation: float-1 3s ease-in-out infinite;
}

.animate-float-2 {
  animation: float-2 4s ease-in-out infinite;
}

.animate-float-3 {
  animation: float-3 5s ease-in-out infinite;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-2xl {
    font-size: 1.25rem;
  }
  
  .w-24.h-24 {
    width: 5rem;
    height: 5rem;
  }
  
  .p-6 {
    padding: 1rem;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .animate-spin,
  .animate-pulse,
  .animate-bounce,
  .animate-float-1,
  .animate-float-2,
  .animate-float-3 {
    animation: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .bg-white\/80 {
    background-color: white;
  }
  
  .text-gray-600 {
    color: #000;
  }
}
</style>