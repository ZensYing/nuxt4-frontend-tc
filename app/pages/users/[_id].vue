<!-- app/pages/users/[_id].vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <button
              @click="navigateTo('/')"
              class="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Icon name="lucide:arrow-left" class="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
          <h1 class="text-xl font-semibold text-gray-900">Profile Settings</h1>
          <div class="w-24"></div> <!-- Spacer for centering -->
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Profile Header Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
        <!-- Cover Image -->
        <div class="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative">
          <div class="absolute inset-0 bg-black/20"></div>
        </div>
        
        <!-- Profile Info -->
        <div class="relative px-6 pb-6">
          <!-- Avatar -->
          <div class="flex items-start justify-between">
            <div class="relative -mt-16">
              <div class="relative">
                <img
                  v-if="user?.avatar"
                  :src="useImg(user.avatar)"
                  :alt="`${user.first_name} ${user.last_name}`"
                  class="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover bg-white"
                />
                <div
                  v-else
                  class="w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                >
                  <span class="text-2xl font-bold text-white">
                    {{ user?.first_name?.charAt(0) }}{{ user?.last_name?.charAt(0) }}
                  </span>
                </div>
                
                <!-- Upload overlay -->
                <button
                  @click="triggerFileInput"
                  class="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
                >
                  <Icon name="lucide:camera" class="w-6 h-6 text-white" />
                </button>
                
                <input
                  ref="avatarInput"
                  type="file"
                  accept="image/*"
                  @change="handleAvatarUpload"
                  class="hidden"
                />
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex space-x-3 mt-4">
              <button
                v-if="!isEditing"
                @click="startEditing"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md"
              >
                <Icon name="lucide:edit-3" class="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              
              <template v-else>
                <button
                  @click="saveProfile"
                  :disabled="isSaving"
                  class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors shadow-md"
                >
                  <Icon v-if="!isSaving" name="lucide:save" class="w-4 h-4 mr-2" />
                  <Icon v-else name="lucide:loader-2" class="w-4 h-4 mr-2 animate-spin" />
                  {{ isSaving ? 'Saving...' : 'Save Changes' }}
                </button>
                
                <button
                  @click="cancelEditing"
                  class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors shadow-md"
                >
                  <Icon name="lucide:x" class="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </template>
            </div>
          </div>
          
          <!-- User Info -->
          <div class="mt-4">
            <div class="flex items-center space-x-3 mb-2">
              <h2 class="text-2xl font-bold text-gray-900">
                {{ user?.first_name }} {{ user?.last_name }}
              </h2>
              <span
                :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                  user?.role?.name === 'vendor' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                ]"
              >
                <Icon 
                  :name="user?.role?.name === 'vendor' ? 'lucide:store' : 'lucide:user'" 
                  class="w-4 h-4 mr-1" 
                />
                {{ user?.role?.name?.charAt(0).toUpperCase() + user?.role?.name?.slice(1) }}
              </span>
            </div>
            <p class="text-gray-600 flex items-center">
              <Icon name="lucide:mail" class="w-4 h-4 mr-2" />
              {{ user?.email }}
            </p>
            <p v-if="user?.phone" class="text-gray-600 flex items-center mt-1">
              <Icon name="lucide:phone" class="w-4 h-4 mr-2" />
              {{ user?.phone }}
            </p>
          </div>
        </div>
      </div>

      <!-- Profile Form -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Information -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Personal Information -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div class="flex items-center mb-6">
              <Icon name="lucide:user" class="w-5 h-5 text-blue-600 mr-3" />
              <h3 class="text-lg font-semibold text-gray-900">Personal Information</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  v-model="profileForm.first_name"
                  :disabled="!isEditing"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  v-model="profileForm.last_name"
                  :disabled="!isEditing"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  placeholder="Enter your last name"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  v-model="profileForm.email"
                  :disabled="!isEditing"
                  type="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  v-model="profileForm.phone"
                  :disabled="!isEditing"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Title/Position</label>
                <input
                  v-model="profileForm.title"
                  :disabled="!isEditing"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  placeholder="e.g., Store Manager, Customer, etc."
                />
              </div>
            </div>
          </div>

          <!-- Address Information -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div class="flex items-center mb-6">
              <Icon name="lucide:map-pin" class="w-5 h-5 text-blue-600 mr-3" />
              <h3 class="text-lg font-semibold text-gray-900">Address Information</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                  v-model="profileForm.address.street"
                  :disabled="!isEditing"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  placeholder="Enter your street address"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  v-model="profileForm.address.city"
                  :disabled="!isEditing"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  placeholder="Enter your city"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                <input
                  v-model="profileForm.address.state"
                  :disabled="!isEditing"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  placeholder="Enter your state/province"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">ZIP/Postal Code</label>
                <input
                  v-model="profileForm.address.zip"
                  :disabled="!isEditing"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  placeholder="Enter your ZIP/postal code"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  v-model="profileForm.address.country"
                  :disabled="!isEditing"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="KH">Cambodia</option>
                  <!-- Add more countries as needed -->
                </select>
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div class="flex items-center mb-6">
              <Icon name="lucide:shield" class="w-5 h-5 text-blue-600 mr-3" />
              <h3 class="text-lg font-semibold text-gray-900">Security Settings</h3>
            </div>
            
            <div class="space-y-4">
              <button
                @click="showPasswordModal = true"
                class="flex items-center justify-between w-full p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center">
                  <Icon name="lucide:lock" class="w-5 h-5 text-gray-600 mr-3" />
                  <div class="text-left">
                    <p class="font-medium text-gray-900">Change Password</p>
                    <p class="text-sm text-gray-600">Update your account password</p>
                  </div>
                </div>
                <Icon name="lucide:chevron-right" class="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Account Status -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Account Type</span>
                <span
                  :class="[
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    user?.role?.name === 'vendor' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  ]"
                >
                  {{ user?.role?.name?.charAt(0).toUpperCase() + user?.role?.name?.slice(1) }}
                </span>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Status</span>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                  Active
                </span>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Member Since</span>
                <span class="text-sm text-gray-900">
                  {{ formatDate(user?.date_created) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <button
                @click="navigateTo('/')"
                class="w-full flex items-center px-4 py-3 text-left bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <Icon name="lucide:home" class="w-5 h-5 text-blue-600 mr-3" />
                <span class="text-blue-700 font-medium">Go to Dashboard</span>
              </button>
              
              <button
                v-if="user?.role?.name === 'vendor'"
                class="w-full flex items-center px-4 py-3 text-left bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors"
              >
                <Icon name="lucide:store" class="w-5 h-5 text-purple-600 mr-3" />
                <span class="text-purple-700 font-medium">Manage Store</span>
              </button>
              
              <button
                class="w-full flex items-center px-4 py-3 text-left bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
              >
                <Icon name="lucide:shopping-cart" class="w-5 h-5 text-green-600 mr-3" />
                <span class="text-green-700 font-medium">View Orders</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Password Change Modal -->
    <div v-if="showPasswordModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50 transition-opacity" @click="showPasswordModal = false"></div>
        
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Change Password</h3>
            <button
              @click="showPasswordModal = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </div>
          
          <form @submit.prevent="changePassword" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                v-model="passwordForm.current"
                type="password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter current password"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                v-model="passwordForm.new"
                type="password"
                required
                minlength="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter new password"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                v-model="passwordForm.confirm"
                type="password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Confirm new password"
              />
              <p v-if="passwordForm.new !== passwordForm.confirm && passwordForm.confirm" class="text-xs text-red-500 mt-1">
                Passwords do not match
              </p>
            </div>
            
            <div class="flex space-x-3 pt-4">
              <button
                type="submit"
                :disabled="isChangingPassword || passwordForm.new !== passwordForm.confirm"
                class="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span v-if="!isChangingPassword">Change Password</span>
                <span v-else class="flex items-center justify-center">
                  <Icon name="lucide:loader-2" class="w-4 h-4 animate-spin mr-2" />
                  Changing...
                </span>
              </button>
              
              <button
                type="button"
                @click="showPasswordModal = false"
                class="flex-1 bg-gray-600 text-white py-3 px-4 rounded-xl hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useAuthStore } from '~/store/useAuthStore'

// Define page meta
definePageMeta({
  middleware: 'auth'
})

// Initialize
const config = useRuntimeConfig()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

// State
const isEditing = ref(false)
const isSaving = ref(false)
const showPasswordModal = ref(false)
const isChangingPassword = ref(false)
const avatarInput = ref<HTMLInputElement>()

// Forms
const profileForm = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  title: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  }
})

const passwordForm = reactive({
  current: '',
  new: '',
  confirm: ''
})

// Methods
const initializeForm = () => {
  if (user.value) {
    profileForm.first_name = user.value.first_name || ''
    profileForm.last_name = user.value.last_name || ''
    profileForm.email = user.value.email || ''
    profileForm.phone = user.value.phone || ''
    profileForm.title = user.value.title || ''
    
    // Initialize address
    if (user.value.address && typeof user.value.address === 'object') {
      profileForm.address.street = user.value.address.street || ''
      profileForm.address.city = user.value.address.city || ''
      profileForm.address.state = user.value.address.state || ''
      profileForm.address.zip = user.value.address.zip || ''
      profileForm.address.country = user.value.address.country || ''
    }
  }
}

const startEditing = () => {
  isEditing.value = true
  initializeForm()
}

const cancelEditing = () => {
  isEditing.value = false
  initializeForm()
}

const saveProfile = async () => {
  if (!user.value) return
  
  isSaving.value = true
  
  try {
    await authStore.updateUserProfile({
      first_name: profileForm.first_name,
      last_name: profileForm.last_name,
      email: profileForm.email,
      phone: profileForm.phone,
      title: profileForm.title,
      address: profileForm.address
    })
    
    isEditing.value = false
    
    const toast = useToast()
    toast?.add({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
      color: 'primary'
    })
  } catch (error: any) {
    const toast = useToast()
    toast?.add({
      title: 'Update Failed',
      description: error.message || 'Unable to update profile. Please try again.',
      color: 'error'
    })
  } finally {
    isSaving.value = false
  }
}

const triggerFileInput = () => {
  avatarInput.value?.click()
}

const handleAvatarUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    const toast = useToast()
    toast?.add({
      title: 'Invalid File',
      description: 'Please select a valid image file.',
      color: 'error'
    })
    return
  }
  
  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    const toast = useToast()
    toast?.add({
      title: 'File Too Large',
      description: 'Please select an image smaller than 5MB.',
      color: 'error'
    })
    return
  }
  
  try {
    await authStore.updateUserProfile({}, file)
    
    const toast = useToast()
    toast?.add({
      title: 'Avatar Updated',
      description: 'Your profile picture has been updated successfully.',
      color: 'primary'
    })
  } catch (error: any) {
    const toast = useToast()
    toast?.add({
      title: 'Upload Failed',
      description: error.message || 'Unable to update avatar. Please try again.',
      color: 'error'
    })
  }
  
  // Reset input
  target.value = ''
}

const changePassword = async () => {
  if (passwordForm.new !== passwordForm.confirm) {
    const toast = useToast()
    toast?.add({
      title: 'Password Mismatch',
      description: 'New passwords do not match.',
      color: 'error'
    })
    return
  }
  
  isChangingPassword.value = true
  
  try {
    // Call password change API
    await useApiPost('/auth/password/change', {
      current_password: passwordForm.current,
      new_password: passwordForm.new
    })
    
    showPasswordModal.value = false
    
    // Reset form
    passwordForm.current = ''
    passwordForm.new = ''
    passwordForm.confirm = ''
    
    const toast = useToast()
    toast?.add({
      title: 'Password Changed',
      description: 'Your password has been successfully updated.',
      color: 'primary'
    })
  } catch (error: any) {
    const toast = useToast()
    toast?.add({
      title: 'Password Change Failed',
      description: error.message || 'Unable to change password. Please check your current password.',
      color: 'error'
    })
  } finally {
    isChangingPassword.value = false
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Initialize on mount
onMounted(async () => {
  await nextTick()
  
  if (!user.value) {
    await authStore.fetchUser()
  }
  
  initializeForm()
})
</script>

<style scoped>
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(0,0,0,.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>