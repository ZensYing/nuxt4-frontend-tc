<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isLoading"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-stone-900/50 backdrop-blur-md"
      >
        <div class="bg-white rounded-2xl shadow-2xl border border-stone-200 p-8 max-w-sm mx-4">
          <div class="text-center">
            <!-- Animated Logo/Spinner -->
            <div class="relative w-16 h-16 mx-auto mb-6">
              <div class="absolute inset-0 border-4 border-amber-200 rounded-full"></div>
              <div class="absolute inset-0 border-4 border-amber-600 rounded-full border-t-transparent animate-spin"></div>
              <div class="absolute inset-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                </svg>
              </div>
            </div>

            <!-- Loading Message -->
            <h3 class="text-lg font-semibold text-stone-900 mb-2">
              {{ loadingMessage }}
            </h3>
            
            <!-- Progress Dots -->
            <div class="flex justify-center space-x-1">
              <div 
                v-for="i in 3" 
                :key="i"
                class="w-2 h-2 bg-amber-600 rounded-full animate-pulse"
                :style="{ animationDelay: `${(i - 1) * 0.2}s` }"
              ></div>
            </div>
          </div>
        </div>~
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { isLoading, loadingMessage } = useGlobalLoading()
</script>