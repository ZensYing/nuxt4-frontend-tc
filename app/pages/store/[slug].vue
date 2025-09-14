<!-- app/pages/store/[slug].vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
    <!-- Header Section -->
    <div class="bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <button
              @click="navigateTo('/store')"
              class="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Icon name="lucide:arrow-left" class="w-5 h-5 mr-2" />
              Back to Stores
            </button>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Store Status Badge -->
            <span
              v-if="store"
              :class="[
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                store.status === 'active' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              ]"
            >
              <div 
                :class="[
                  'w-2 h-2 rounded-full mr-1',
                  store.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                ]"
              ></div>
              {{ store.status === 'active' ? 'Active' : 'Inactive' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-24">
      <div class="text-center">
        <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
        <p class="text-gray-600">Loading store details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-2xl mx-auto px-4 py-24 text-center">
      <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="lucide:alert-circle" class="w-12 h-12 text-red-600" />
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Store Not Found</h3>
      <p class="text-gray-600 mb-6">{{ error }}</p>
      <button
        @click="navigateTo('/store')"
        class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
      >
        Browse All Stores
      </button>
    </div>

    <!-- Store Content -->
    <div v-else-if="store" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Store Hero Section -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
        <div class="relative">
          <!-- Store Cover Image -->
          <div class="h-64 md:h-80 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
            <img
              v-if="store.image"
              :src="useImg(store.image)"
              :alt="store.name"
              class="w-full h-full object-cover"
              @load="console.log('Image loaded successfully:', useImg(store.image))"
              @error="console.error('Image failed to load:', useImg(store.image), 'Original ID:', store.image)"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center"
            >
              <Icon name="lucide:store" class="w-24 h-24 text-white opacity-80" />
            </div>
            
            <!-- Overlay for better text readability -->
            <div class="absolute inset-0 bg-black/40 bg-opacity-20 z-10"></div>
            
            <!-- Store Title Overlay -->
            <div class="absolute bottom-0 left-0 right-0 p-8 text-white z-20">
              <h1 class="text-4xl font-bold mb-2 drop-shadow-lg">
                {{ store.name || 'Unnamed Store' }}
              </h1>
              <div class="flex items-center space-x-4">
                <div class="flex items-center">
                  <Icon name="lucide:calendar" class="w-4 h-4 mr-2" />
                  <span class="text-sm">Opened {{ formatDate(store.date_created) }}</span>
                </div>
                <div v-if="store.location" class="flex items-center">
                  <Icon name="lucide:map-pin" class="w-4 h-4 mr-2" />
                  <span class="text-sm">{{ store.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Store Description -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">About This Store</h2>
            <p class="text-gray-700 leading-relaxed">
              {{ store.description || `Welcome to ${store.name}. We're excited to serve you with quality products and excellent customer service.` }}
            </p>
          </div>

          <!-- Store Products Section (Placeholder) -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-semibold text-gray-900">Featured Products</h2>
              <button class="text-blue-600 hover:text-blue-700 font-medium text-sm">
                View All Products
              </button>
            </div>
            
            <!-- Products Grid (Placeholder) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="i in 4"
                :key="i"
                class="bg-gray-50 rounded-xl p-6 text-center border-2 border-dashed border-gray-200"
              >
                <Icon name="lucide:package" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p class="text-gray-500 text-sm">Product {{ i }}</p>
                <p class="text-xs text-gray-400 mt-1">Coming Soon</p>
              </div>
            </div>
          </div>

          <!-- Store Reviews Section (Placeholder) -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">Customer Reviews</h2>
            <div class="text-center py-8">
              <Icon name="lucide:star" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p class="text-gray-500">No reviews yet</p>
              <p class="text-xs text-gray-400 mt-1">Be the first to leave a review!</p>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Store Owner Info -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Store Owner</h3>
            
            <div class="flex items-center space-x-4 mb-4">
              <div class="relative">
                <img
                  v-if="store.owner?.avatar"
                  :src="useImg(store.owner.avatar)"
                  :alt="`${store.owner.first_name} ${store.owner.last_name}`"
                  class="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div
                  v-else
                  class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-gray-200"
                >
                  <span class="text-lg font-semibold text-white">
                    {{ store.owner?.first_name?.charAt(0) }}{{ store.owner?.last_name?.charAt(0) }}
                  </span>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">
                  {{ store.owner?.first_name }} {{ store.owner?.last_name }}
                </h4>
                <p class="text-sm text-gray-600">Store Owner</p>
              </div>
            </div>

            <button
              @click="contactOwner"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Contact Owner
            </button>
          </div>

          <!-- Store Contact Information -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            
            <div class="space-y-3">
              <!-- Address -->
              <div v-if="store.location || store.address" class="flex items-start">
                <Icon name="lucide:map-pin" class="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="text-sm font-medium text-gray-900">Address</p>
                  <p class="text-sm text-gray-600">{{ store.address || store.location }}</p>
                </div>
              </div>

              <!-- Phone -->
              <div v-if="store.phone" class="flex items-start">
                <Icon name="lucide:phone" class="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="text-sm font-medium text-gray-900">Phone</p>
                  <a
                    :href="`tel:${store.phone}`"
                    class="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {{ store.phone }}
                  </a>
                </div>
              </div>

              <!-- Email -->
              <div v-if="store.email" class="flex items-start">
                <Icon name="lucide:mail" class="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="text-sm font-medium text-gray-900">Email</p>
                  <a
                    :href="`mailto:${store.email}`"
                    class="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {{ store.email }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Store Stats -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Store Statistics</h3>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Products</span>
                <span class="font-semibold text-gray-900">0</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Reviews</span>
                <span class="font-semibold text-gray-900">0</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Rating</span>
                <span class="font-semibold text-gray-900">N/A</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Member Since</span>
                <span class="font-semibold text-gray-900">{{ formatDateShort(store.date_created) }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div class="space-y-2">
              <button
                @click="followStore"
                class="w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Follow Store
              </button>
              <button
                @click="shareStore"
                class="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Share Store
              </button>
              <button
                @click="reportStore"
                class="w-full text-red-600 py-2 px-4 rounded-xl hover:bg-red-50 transition-colors text-sm font-medium"
              >
                Report Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// Define page meta
// definePageMeta({
//   middleware: 'auth'
// })

// Get route params - using slug instead of id
const route = useRoute()
const storeSlug = route.params.slug as string
const { parseStoreSlug } = useStoreUrl()

// State
const store = ref<any>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

// Vendor role ID
const VENDOR_ROLE_ID = '827fc9e6-9d85-4176-b638-13c31213c9cb'

// Utility functions
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatDateShort = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'short' 
  })
}

// Methods
// Updated fetchStore method for [slug].vue with Khmer support
const fetchStore = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const { parseStoreSlug, getSearchVariations, formatStoreSlug, transliterateKhmer } = useStoreUrl()
    const { slug: searchSlug, storeId } = parseStoreSlug(storeSlug.replace('@', ''))
    
    console.log('Original slug:', storeSlug)
    console.log('Parsed slug:', searchSlug)
    console.log('Store ID:', storeId)
    
    let foundVendor = null
    
    // Strategy 1: If we have a store ID, try to find by ID first
    if (storeId) {
      try {
        const response = await useApi<{ data: any[] }>('/users', {
          method: 'GET',
          params: {
            'fields': 'id,first_name,last_name,email,phone,avatar,date_created,status,title,description,address,thumbnail,store_name',
            'filter[role][_eq]': VENDOR_ROLE_ID,
            'filter[id][_contains]': storeId, // Partial match on ID
            'limit': 5
          }
        })

        if (response.data && response.data.length > 0) {
          // Find exact ID match or close match
          foundVendor = response.data.find(vendor => 
            vendor.id.toLowerCase().includes(storeId.toLowerCase())
          ) || response.data[0]
          
          console.log('Found vendor by ID:', foundVendor?.store_name || foundVendor?.title)
        }
      } catch (idError) {
        console.log('ID search failed, trying other methods:', idError)
      }
    }
    
    // Strategy 2: If no ID match, get all vendors and match locally
    if (!foundVendor) {
      const response = await useApi<{ data: any[] }>('/users', {
        method: 'GET',
        params: {
          'fields': 'id,first_name,last_name,email,phone,avatar,date_created,status,title,description,address,thumbnail,store_name',
          'filter[role][_eq]': VENDOR_ROLE_ID,
          'sort': 'date_created'
        }
      })

      if (!response.data || response.data.length === 0) {
        throw new Error('No vendors found')
      }

      const searchVariations = getSearchVariations(searchSlug)
      console.log('Search variations:', searchVariations)

      // Try multiple matching strategies
      for (const vendor of response.data) {
        const vendorStoreName = vendor.store_name || vendor.title || `${vendor.first_name}s Store`
        const vendorSlug = formatStoreSlug(vendorStoreName)
        
        // Strategy 2a: Direct slug match
        if (vendorSlug === searchSlug) {
          foundVendor = vendor
          console.log('Found direct slug match:', vendorStoreName)
          break
        }
        
        // Strategy 2b: Match against search variations
        for (const variation of searchVariations) {
          if (vendorSlug === variation || 
              vendorSlug.includes(variation) || 
              variation.includes(vendorSlug)) {
            foundVendor = vendor
            console.log('Found variation match:', vendorStoreName, 'with variation:', variation)
            break
          }
        }
        
        if (foundVendor) break
        
        // Strategy 2c: Transliterate vendor name and compare
        const transliteratedVendorName = transliterateKhmer(vendorStoreName.toLowerCase())
        const transliteratedSearch = transliterateKhmer(searchSlug)
        
        if (transliteratedVendorName.includes(transliteratedSearch) ||
            transliteratedSearch.includes(transliteratedVendorName)) {
          foundVendor = vendor
          console.log('Found transliteration match:', vendorStoreName)
          break
        }
        
        // Strategy 2d: Original store_name contains search (for Khmer text)
        if (vendor.store_name && 
            (vendor.store_name.toLowerCase().includes(searchSlug) ||
             searchSlug.includes(vendor.store_name.toLowerCase()))) {
          foundVendor = vendor
          console.log('Found original name match:', vendor.store_name)
          break
        }
      }
    }
    
    // Strategy 3: Fuzzy matching for Khmer text
    if (!foundVendor) {
      const response = await useApi<{ data: any[] }>('/users', {
        method: 'GET',
        params: {
          'fields': 'id,first_name,last_name,email,phone,avatar,date_created,status,title,description,address,thumbnail,store_name',
          'filter[role][_eq]': VENDOR_ROLE_ID,
          'sort': 'date_created'
        }
      })

      // Try matching by first few characters (useful for Khmer)
      const searchPrefix = searchSlug.substring(0, 3)
      
      for (const vendor of response.data) {
        const vendorName = vendor.store_name || vendor.title || `${vendor.first_name}s Store`
        const vendorPrefix = formatStoreSlug(vendorName).substring(0, 3)
        
        if (searchPrefix === vendorPrefix) {
          foundVendor = vendor
          console.log('Found prefix match:', vendorName)
          break
        }
      }
    }

    if (!foundVendor) {
      throw new Error('Store not found or user is not a vendor')
    }

    const vendor = foundVendor

    // Debug logging
    console.log('Final vendor data:', vendor)
    console.log('Store name:', vendor.store_name)
    console.log('Title:', vendor.title)

    // Transform vendor data into store format
    store.value = {
      id: vendor.id,
      name: vendor.store_name || vendor.title || `${vendor.first_name}'s Store`,
      description: vendor.description || `Welcome to ${vendor.first_name}'s marketplace store. We offer quality products and excellent customer service.`,
      store_name: vendor.store_name,
      location: vendor.address?.city && vendor.address?.state 
        ? `${vendor.address.city}, ${vendor.address.state}` 
        : null,
      address: vendor.address ? 
        [vendor.address.street, vendor.address.city, vendor.address.state, vendor.address.zip].filter(Boolean).join(', ') 
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
      image: vendor.thumbnail || vendor.avatar
    }

  } catch (apiError: any) {
    console.error('Error fetching store:', apiError)
    
    if (apiError.response?.status === 404 || apiError.message.includes('not found')) {
      error.value = 'This store could not be found. It may have been removed or the link is incorrect.'
    } else if (apiError.response?.status === 403) {
      error.value = 'You do not have permission to view this store.'
    } else {
      error.value = apiError.message || 'Unable to load store details. Please try again later.'
    }

    const toast = useToast()
    toast?.add({
      title: 'Error Loading Store',
      description: error.value,
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}
const contactOwner = () => {
  if (store.value?.email) {
    window.open(`mailto:${store.value.email}`, '_blank')
  } else {
    const toast = useToast()
    toast?.add({
      title: 'Contact Information Unavailable',
      description: 'No contact information available for this store owner.',
      color: 'warning'
    })
  }
}

const followStore = () => {
  const toast = useToast()
  toast?.add({
    title: 'Feature Coming Soon',
    description: 'Store following functionality will be available soon!',
    color: 'info'
  })
}

const shareStore = () => {
  if (navigator.share) {
    navigator.share({
      title: store.value?.name,
      text: `Check out ${store.value?.name} on our marketplace!`,
      url: window.location.href,
    })
  } else {
    // Fallback to copying URL to clipboard
    navigator.clipboard.writeText(window.location.href)
    const toast = useToast()
    toast?.add({
      title: 'Link Copied',
      description: 'Store link has been copied to your clipboard!',
      color: 'success'
    })
  }
}

const reportStore = () => {
  const toast = useToast()
  toast?.add({
    title: 'Report Store',
    description: 'Report functionality coming soon. Please contact support if you need immediate assistance.',
    color: 'warning'
  })
}

// Initialize
onMounted(async () => {
  if (!storeSlug) {
    error.value = 'Invalid store URL'
    isLoading.value = false
    return
  }
  
  await fetchStore()
})

// Set dynamic page title
useHead({
  title: computed(() => {
    if (store.value) {
      return `${store.value.name} - Store Details`
    }
    return 'Store Details'
  }),
  meta: [
    {
      name: 'description',
      content: computed(() => {
        if (store.value) {
          return store.value.description || `Visit ${store.value.name} on our marketplace.`
        }
        return 'Store details page'
      })
    }
  ]
})
</script>
<style scoped>
/* Add any additional custom styles here if needed */
</style>