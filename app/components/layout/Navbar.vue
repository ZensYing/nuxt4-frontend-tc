<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 py-4 px-5 transition-all duration-300" 
    :class="[
      scrollPosition > 20 ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent', 
      'transition-all duration-300'
    ]"
  >
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo and Brand -->
      <NuxtLink to="/" class="flex items-center group">
        <h1 class="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
          Rin Makara
        </h1>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex space-x-1">
        <div class="flex items-center bg-white/10 dark:bg-gray-800/40 backdrop-blur-sm rounded-full px-2">
          <NuxtLink 
            v-for="(item, index) in localizedMenuItems" 
            :key="index" 
            :to="item.to"
            class="relative flex items-center space-x-1 px-4 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 transition-all duration-300"
            :class="{ 'bg-green-100/80 dark:bg-green-900/30 text-green-600 dark:text-green-400': isActiveRoute(item.to) }"
          >
            <Icon :icon="item.icon" class="w-5 h-5" />
            <span class="font-medium">{{ item.text }}</span>
            <span 
              v-if="isActiveRoute(item.to)" 
              class="absolute bottom-0 left-0 right-0 mx-auto w-1/2 h-0.5 bg-green-500 dark:bg-green-400 rounded-full"
            ></span>
          </NuxtLink>
        </div>
      </div>
      <!-- Right Side Controls -->
      <div class="flex items-center space-x-3">
        <UiColorModeButton />
        <!-- Language Selector -->
        <div class="relative" ref="dropdownContainer">
          <button 
            @click="toggleDropdown"
            class="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 focus:outline-none"
          >
            <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
              {{ locale === 'en' ? 'English' : 'ខ្មែរ' }}
            </span>
            <Icon 
              icon="mdi:chevron-down" 
              class="w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300"
              :class="{ 'rotate-180': dropdownOpen }"
            />
          </button>
          
          <div 
            v-show="dropdownOpen"
            class="absolute right-0 mt-2 w-40 origin-top-right bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden transition-all duration-200 ease-out"
          >
            <button 
              @click="switchLanguage('en')" 
              class="flex items-center w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              :class="locale === 'en' ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-200'"
            >
              <span class="inline-block w-6 mr-2">🇺🇸</span>
              <span>English</span>
            </button>
            <button 
              @click="switchLanguage('km')" 
              class="flex items-center w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              :class="locale === 'km' ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-200'"
            >
              <span class="inline-block w-6 mr-2">🇰🇭</span>
              <span>ខ្មែរ</span>
            </button>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          type="button" 
          @click="toggleMobileMenu" 
          class="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <Icon 
            :icon="mobileMenuOpen ? 'mdi:close' : 'ci:hamburger-md'" 
            class="w-6 h-6 text-gray-700 dark:text-gray-200" 
          />
        </button>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
   <div 
      v-show="mobileMenuOpen" 
      class="md:hidden fixed inset-0 z-40  h-dvh bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg transition-all duration-500 transform"
    >
      <div class="absolute items-end flex top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg px-5">
          <button 
          @click="mobileMenuOpen = false" 
          class="p-2  rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
        >
          <Icon icon="mdi:close" class="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </button>
      </div>
    
      <div class="flex flex-col justify-center items-center h-full py-16 px-5 space-y-6">
        
        <NuxtLink 
          v-for="(item, index) in localizedMenuItems" 
          :key="index" 
          :to="item.to"
          @click="mobileMenuOpen = false"
          class="w-full max-w-xs flex items-center space-x-4 px-6 py-4 rounded-xl hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105"
          :class="{ 'bg-green-50/80 dark:bg-green-900/50 text-green-600 dark:text-green-400 shadow-sm': isActiveRoute(item.to) }"
        >
          <Icon :icon="item.icon" class="w-6 h-6 dark:text-white" />
          <span class="text-lg font-medium dark:text-white">{{ item.text }}</span>
        </NuxtLink>
        
        
      </div>
    </div>
  </nav>

  <!-- <LayoutsDrawer :logout="logout" :openLoginDialog="openLoginDialog" /> -->
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useRouter, useRoute } from 'vue-router';
// import LayoutsDrawer from '~/components/Layouts/Drawer.vue';
import { useI18n } from 'vue-i18n';
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { UiColorModeButton } from '#components';

const router = useRouter();
const route = useRoute();
// const { theme, toggleTheme } = useTheme();

const isHomePage = computed(() => route.name === 'index');
const scrollPosition = ref(0);
const mobileMenuOpen = ref(false);

// Track scroll position
const handleScroll = () => {
  scrollPosition.value = window.scrollY;
};

// Function to check if route is active
const isActiveRoute = (path: string) => {
  if (path === '/' && route.path === '/') return true;
  if (path !== '/' && route.path.startsWith(path)) return true;
  return false;
};

const { t, locale } = useI18n();

// Function to switch languages
const { setFontClass } = useI18nConfig();

const switchLanguage = (newLocale: string) => {
  locale.value = newLocale; // Change the active locale
  if (process.client) {
    localStorage.setItem('locale', newLocale); // Save the new locale to localStorage
    setFontClass(newLocale); // Update the font class
  }
  dropdownOpen.value = false; // Close dropdown after selection
};

// Define the valid locales
type LocaleKey = 'en' | 'km';
const menuItems = [
  {
    to: '/',
    icon: 'line-md:home',
    text: { en: 'Home', km: 'ទំព័រដើម' },
  },
  {
    to: '/blog',
    icon: 'game-icons:read',
    text: { en: 'Blog', km: 'ប្លុក' },
  },
  {
    to: '/projects',
    icon: 'eos-icons:project-outlined',
    text: { en: 'Projects', km: 'គម្រោង' },
  },
  {
    to: '/about',
    icon: 'ix:about',
    text: { en: 'About', km: 'អំពីយើង' },
  },
];

// Create a computed array to dynamically return the correct language text
const localizedMenuItems = computed(() =>
  menuItems.map((item) => ({
    ...item,
    text: item.text[locale.value as LocaleKey], // Explicitly cast locale.value as a valid key
  }))
);

const dropdownOpen = ref(false);
const dropdownContainer = ref<HTMLElement | null>(null);

// Toggle dropdown visibility
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
    dropdownOpen.value = false;
  }
};

// Close mobile menu on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false;
});

// Theme toggle functionality
// const customToggleTheme = () => {
//   if (theme.value === 'dark') {
//     theme.value = 'light';
//     localStorage.setItem('theme', 'light');
//     document.documentElement.classList.remove('dark');
//   } else {
//     theme.value = 'dark';
//     localStorage.setItem('theme', 'dark');
//     document.documentElement.classList.add('dark');
//   }
// };

// Add event listeners when the component is mounted
onMounted(() => {
  if (process.client) {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    // Initialize scroll position
    scrollPosition.value = window.scrollY;
  }
});

// Clean up event listeners when the component is destroyed
onBeforeUnmount(() => {
  if (process.client) {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('scroll', handleScroll);
  }
});

const goBack = () => {
  router.back();
};

const openLoginDialog = () => {
  console.log('Login dialog opened');
};

const logout = () => {
  console.log('Logged out');
};
</script>

<style scoped>
/* Shine animation for the logo */
@keyframes shine {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 200%;
  }
}

h1.text-transparent {
  background-size: 200% auto;
  animation: shine 3s linear infinite;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
/* Mobile menu animation */
@keyframes fadeInBlur {
  from {
    opacity: 0;
    backdrop-filter: blur(0);
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(16px);
    transform: scale(1);
  }
}

div[v-show="mobileMenuOpen"] {
  animation: fadeInBlur 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
/* Language dropdown animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

div[v-show="dropdownOpen"] {
  animation: fadeIn 0.2s ease forwards;
}
</style>