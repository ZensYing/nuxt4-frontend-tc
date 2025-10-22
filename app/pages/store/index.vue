<template>
  <div class="min-h-screen bg-stone-50">
    <!-- Header Section -->
    <div class="bg-white border-b border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <button
            @click="navigateTo('/')"
            class="flex items-center text-stone-600 hover:text-stone-900 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 class="text-xl font-semibold text-stone-900">All Stores</h1>
          <div class="w-24"></div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Stats Section -->
      <div class="mb-8">
        <!-- Search Bar -->
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div class="flex-1 max-w-lg">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search stores..."
                class="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div class="flex gap-3">
            <select
              v-model="sortBy"
              class="px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm"
            >
              <option value="name">Sort by Name</option>
              <option value="date_created">Sort by Date</option>
              <option value="owner">Sort by Owner</option>
            </select>

            <select
              v-model="sortOrder"
              class="px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm"
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl border border-stone-200 p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-stone-600">Total Stores</p>
                <p class="text-2xl font-semibold text-stone-900">{{ stores.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-stone-200 p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-stone-600">Active Vendors</p>
                <p class="text-2xl font-semibold text-stone-900">{{ uniqueVendors }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-stone-200 p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-stone-600">Locations</p>
                <p class="text-2xl font-semibold text-stone-900">{{ uniqueLocations }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-16">
        <div class="text-center">
          <div class="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-stone-600">Loading stores...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredStores.length === 0 && !isLoading" class="text-center py-16">
        <div class="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-stone-900 mb-2">No stores found</h3>
        <p class="text-stone-600 mb-6">
          {{ searchQuery ? 'No stores match your search.' : 'No stores are available yet.' }}
        </p>
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Clear Search
        </button>
      </div>

      <!-- Stores Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="store in filteredStores"
          :key="store.id"
          class="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-200 group"
        >
          <!-- Store Image -->
          <div class="relative h-40 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
            <img
              v-if="store.image"
              :src="useImg(store.image)"
              :alt="store.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center"
            >
              <svg class="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            
            <!-- Status Badge -->
            <div class="absolute top-3 right-3">
              <span
                :class="[
                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                  store.status === 'active' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-red-100 text-red-700'
                ]"
              >
                <div 
                  :class="[
                    'w-1.5 h-1.5 rounded-full mr-1',
                    store.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'
                  ]"
                ></div>
                {{ store.status === 'active' ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>

          <!-- Store Content -->
          <div class="p-5">
            <!-- Store Name -->
            <h3 class="text-lg font-semibold text-stone-900 mb-3 group-hover:text-amber-600 transition-colors">
              {{ store.name || 'Unnamed Store' }}
            </h3>
            
            <!-- Owner Info -->
            <div class="flex items-center space-x-3 mb-4">
              <img
                v-if="store.owner?.avatar"
                :src="useImg(store.owner.avatar)"
                :alt="`${store.owner.first_name} ${store.owner.last_name}`"
                class="w-8 h-8 rounded-full object-cover"
              />
              <div
                v-else
                class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"
              >
                <span class="text-xs font-medium text-white">
                  {{ store.owner?.first_name?.charAt(0) }}{{ store.owner?.last_name?.charAt(0) }}
                </span>
              </div>
              <div>
                <p class="text-sm font-medium text-stone-900">
                  {{ store.owner?.first_name }} {{ store.owner?.last_name }}
                </p>
                <p class="text-xs text-stone-500">Store Owner</p>
              </div>
            </div>

            <!-- Store Details -->
            <div class="space-y-2 mb-4">
              <div v-if="store.location || store.address" class="flex items-center text-sm text-stone-600">
                <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span class="truncate">{{ store.location || store.address || 'Location not specified' }}</span>
              </div>

              <div class="flex items-center text-sm text-stone-600">
                <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z" />
                </svg>
                <span>Opened {{ formatDate(store.date_created) }}</span>
              </div>
            </div>

            <!-- Description -->
            <p v-if="store.description" class="text-stone-600 text-sm mb-4 line-clamp-2">
              {{ store.description }}
            </p>

            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button
                @click="viewStore(store)"
                class="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
              >
                View Store
              </button>
              
              <button
                @click="contactStore(store)"
                class="px-4 py-2 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
                title="Contact Store"
              >
                <svg class="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
}

// Vendor role ID
const VENDOR_ROLE_ID = '827fc9e6-9d85-4176-b638-13c31213c9cb'

// State
const stores = ref<any[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const sortBy = ref('name')
const sortOrder = ref('asc')

// Computed properties
const filteredStores = computed(() => {
  let filtered = [...stores.value]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(store => 
      store.name?.toLowerCase().includes(query) ||
      store.description?.toLowerCase().includes(query) ||
      store.location?.toLowerCase().includes(query) ||
      store.address?.toLowerCase().includes(query) ||
      `${store.owner?.first_name} ${store.owner?.last_name}`.toLowerCase().includes(query)
    )
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let aValue, bValue

    switch (sortBy.value) {
      case 'name':
        aValue = a.name || ''
        bValue = b.name || ''
        break
      case 'date_created':
        aValue = new Date(a.date_created)
        bValue = new Date(b.date_created)
        break
      case 'owner':
        aValue = `${a.owner?.first_name} ${a.owner?.last_name}` || ''
        bValue = `${b.owner?.first_name} ${b.owner?.last_name}` || ''
        break
      default:
        aValue = a.name || ''
        bValue = b.name || ''
    }

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortOrder.value === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  return filtered
})

const uniqueVendors = computed(() => {
  const vendors = new Set(stores.value.map(store => store.owner?.id).filter(Boolean))
  return vendors.size
})

const uniqueLocations = computed(() => {
  const locations = new Set(
    stores.value
      .map(store => store.location || store.address)
      .filter(Boolean)
      .map(loc => loc.split(',')[0].trim())
  )
  return locations.size
})

// Methods
const fetchStores = async () => {
  isLoading.value = true
  
  try {
    const response = await useApi<{ data: any[] }>('/users', {
      method: 'GET',
      params: {
        'filter[role][_eq]': VENDOR_ROLE_ID,
        'fields': 'id,first_name,last_name,email,phone,avatar,date_created,status,title,address,store_name,thumbnail',
        'sort': 'date_created'
      }
    })

    stores.value = response.data.map((vendor: any) => ({
      id: vendor.id,
      name: vendor.title || `${vendor.first_name}'s Store`,
      description: `Welcome to ${vendor.first_name}'s marketplace store`,
      store_name: vendor.store_name,
      location: vendor.address?.city && vendor.address?.state 
        ? `${vendor.address.city}, ${vendor.address.state}` 
        : null,
      address: vendor.address ? 
        [vendor.address.street, vendor.address.city, vendor.address.state].filter(Boolean).join(', ') 
        : null,
      phone: vendor.phone,
      email: vendor.email,
      status: vendor.status || 'active',
      date_created: vendor.date_created,
      owner: {
        id: vendor.id,
        first_name: vendor.first_name,
        last_name: vendor.last_name,
        avatar: vendor.avatar
      },
      image: vendor.avatar
    }))

  } catch (error: any) {
    console.error('Error fetching stores:', error)
    
    const toast = useToast()
    toast?.add({
      title: 'Error Loading Stores',
      description: error.message || 'Unable to load stores. Please try again.',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}

const viewStore = (store: any) => {
  const { getStoreUrl } = useStoreUrl()
  const url = getStoreUrl(store)
  navigateTo(url)
}

const contactStore = (store: any) => {
  const toast = useToast()
  toast?.add({
    title: 'Contact Feature',
    description: 'Contact functionality coming soon!',
    color: 'info'
  })
}

// Initialize
onMounted(async () => {
  await fetchStores()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>