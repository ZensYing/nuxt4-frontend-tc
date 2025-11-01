<template>
  <div>
    <nav id="navbar" :class="scrollPosition == 0
      ? 'w-full flex items-center justify-between px-4 lg:px-8 py-2 fixed z-50 navbar'
      : 'w-full flex items-center justify-between px-4 lg:px-8 py-2 fixed z-50 bg-white dark:bg-dark filter drop-shadow-lg navbar'
      ">
      <div class="flex items-center p-0.5 rounded-full hover:ring-1 hover:ring-primary">
        <NuxtLink to="/">
          <!-- <div class=""><img src="/logo.png" alt="" width="60" /></div> -->
        </NuxtLink>
      </div>

      <div>
        <ul class="hidden lg:flex list-none">
          <!-- hot-news nuxtlink -->

          <li v-for="(i, n) in navItems" :key="n" class="relative group">
            <NuxtLink :to="i.slug === '' ? '/' : i.slug === 'hot-news' ? '/hot-news': i.slug === 'quickapp' ? '/quickapp'  : `/category/${i.slug}`" :class="`mx-4 hover:text-primary nav-items text-base ${scrollPosition == 0 &&
              ($route.name == 'index' ||
                $route.name == 'articles-article' ||
                $route.name == 'videos-video' ||
                $route.name == 'videos' ||
                $route.name == 'category-slug' ||
                $route.name == 'authors-author')
              ? 'text-white '
              : 'text-black dark:text-white'
              }`" exact-active-class="text-primary dark:text-primary font-semibold" exact>
              {{ i.name }}
              <Icon v-if="i.sub_categories && i.sub_categories.length > 0" icon="mdi:chevron-down"
                class="inline-block w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </NuxtLink>
            <ul v-if="i.sub_categories && i.sub_categories.length > 0"
              class="absolute hidden group-hover:block bg-white/70 backdrop-blur-sm dark:bg-dark shadow-lg rounded-lg p-2 z-10 w-52">
              <li v-for="(sub, index) in i.sub_categories" :key="index"
                class="px-4 py-2 text-black dark:text-white hover:font-bold hover:underline rounded-lg transition duration-300 ">
                <NuxtLink :to="`/category/${i.slug}/${sub.slug}`" class="block w-full" exact-active-class="font-bold">
                  {{ sub.name }}

                </NuxtLink>
              </li>
            </ul>
          </li>

          <!-- <li>
            <NuxtLink :to="`/videos`" :class="`mx-4 hover:text-primary nav-items text-base ${scrollPosition == 0 &&
              ($route.name == 'index' ||
                $route.name == 'articles-article' ||
                $route.name == 'videos-video' ||
                $route.name == 'videos' ||
                $route.name == 'category-slug' ||
                $route.name == 'authors-author')
              ? 'text-white '
              : 'text-black dark:text-white'
              }`" exact-active-class="text-primary dark:text-primary font-semibold" exact>
              វីដេអូ
            </NuxtLink>

          </li> -->
        </ul>
      </div>
      <div class="flex items-center">
        <div class="mr-4">
          <NuxtLink to="/search">
            <IconsSearch class="cursor-pointer" :scrollPosition="scrollPosition" />
          </NuxtLink>
        </div>

        <div class="mr-6 cursor-pointer">
          <button @click="
            $colorMode.preference =
            $colorMode.preference == 'dark' ? 'light' : 'dark'
            " v-if="$colorMode.preference == 'dark'">
            <IconsMoon :scrollPosition="scrollPosition" />
          </button>
          <button @click="
            $colorMode.preference =
            $colorMode.preference == 'dark' ? 'light' : 'dark'
            " v-else>
            <IconsSun :scrollPosition="scrollPosition" />
          </button>
        </div>

        <div>
          <IconsMenu class="cursor-pointer block lg:hidden" @click="toggleDrawer" :scrollPosition="scrollPosition" />
        </div>
      </div>
    </nav>
    <div class="h-screen w-full bg-primary dark:bg-gray-900 text-center fixed z-20 lg:hidden" v-if="drawer"
      data-aos="fade-left">
      <ul class="h-screen flex flex-col justify-center">
        <div v-for="(i, n) in navItems" :key="n" class="text-center h-12 group relative">
          <NuxtLink :to="i.slug === '' ? '/' : i.slug === 'hot-news' ? '/hot-news' : `/category/${i.slug}`"
            class="mx-4 text-white list-none block" exact-active-class="text-white font-bold text-sm" exact
            @click="closeDrawer">
            <li class="hover-nav">
              {{ i.name }}
              <Icon v-if="i.sub_categories && i.sub_categories.length > 0" icon="mdi:chevron-down"
                class="inline-block w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </li>

          </NuxtLink>

          <!-- Subcategories appear on hover -->
          <ul v-if="i.sub_categories && i.sub_categories.length > 0"
            class="absolute hidden group-hover:block bg-white/50 backdrop-blur-sm dark:bg-dark shadow-lg rounded-lg p-2 z-10 w-52 mx-auto mt-2 left-1/2 transform -translate-x-1/2">
            <li v-for="(sub, index) in i.sub_categories" :key="index"
              class="px-4 py-2 text-black dark:text-white hover:font-bold hover:underline rounded-lg transition duration-300">
              <NuxtLink :to="`/category/${i.slug}/${sub.slug}`" class="block w-full" exact-active-class="font-bold"
                @click="closeDrawer">
                {{ sub.name }}
              </NuxtLink>
            </li>
            <!-- QuickApp -->
           
          </ul>
        </div>
        <!-- QuickApp -->
        <div>
          <NuxtLink to="/quickapp" class=" text-white list-none" exact-active-class="text-white font-bold text-lg"
            exact @click="closeDrawer">
            <li class="hover-nav">QuickApp</li>
          </NuxtLink>
        </div>
        <!-- <div>
          <NuxtLink to="/videos" class="mx-4 text-white list-none" exact-active-class="text-white font-bold text-lg"
            exact @click="closeDrawer">
            <li class="hover-nav">វិដេអូ</li>
          </NuxtLink>
        </div> -->
      </ul>
    </div>


  </div>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { ICategory } from "~/types/category";

const scrollPosition = ref(0);
const lastScroll = ref(0);
const drawer = ref(false);

// ===== FETCH ENCRYPTED NAV ITEMS (Server-side Only) =====
const { data: navData } = await useAsyncData<ICategory[]>(
  "nav-secure",
  async () => {
    const res = await $fetch<{ data: ICategory[] }>("/api/nav")
    return res.data
  },
  { server: true } // ✅ this is the correct place for "server"
)




// ===== BUILD NAV ITEMS =====
const navItems = ref<ICategory[]>(navData.value ?? []);
const uniqueNavItems = [...new Map(navItems.value.map((i) => [i.id, i])).values()];

const home: ICategory = { name: "ទំព័រដើម", slug: "", thumbnail: "", articles: undefined, sub_categories: undefined };
const hotNews: ICategory = { name: "ព័ត៌មានថ្មីៗ", slug: "hot-news", thumbnail: "", articles: undefined, sub_categories: undefined };
const quickapp: ICategory = { name: "QuickApp", slug: "quickapp", thumbnail: "", articles: undefined, sub_categories: undefined };

navItems.value = uniqueNavItems;
navItems.value.unshift(hotNews);
navItems.value.unshift(home);
navItems.value.splice(navItems.value.length - 1, 0, quickapp);

// ===== DRAWER TOGGLE =====
const toggleDrawer = () => {
  drawer.value = !drawer.value;
  document.body.style.overflow = drawer.value ? "hidden" : "visible";
};
const closeDrawer = () => {
  drawer.value = false;
  document.body.style.overflow = "visible";
};
console.log("🧭 Navbar decrypted data:", navData.value)

// ===== SCROLL BEHAVIOR =====
const updateScroll = () => {
  scrollPosition.value = window.scrollY;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  navbar.style.top = scrollPosition.value === 0 ? "0" : scrollTop > lastScroll.value ? "-50%" : "0";
  lastScroll.value = scrollTop;
};

onMounted(() => window.addEventListener("scroll", updateScroll));
</script>



<style scoped>
.navbar {
  transition: top 0.5s ease-in-out;
}

.nav-items {
  position: relative;
}

.nav-items::after {
  content: '';
  position: absolute;
  background: #089cf4;
  height: 3px;
  width: 0;
  left: 0;
  bottom: -10px;
  transition: 0.5s;
}

.nav-items:hover::after {
  width: 100%;
}

.hover-nav {
  transition: 0.5s ease-in-out;
}

.hover-nav:hover {
  transform: scale(1.3);
  font-weight: bold;
}
</style>