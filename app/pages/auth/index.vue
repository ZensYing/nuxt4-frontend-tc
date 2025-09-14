<!-- app/pages/auth/index.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    
    <!-- Main Container -->
    <div class="relative w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <Icon name="lucide:shopping-bag" class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900">Multi-Vendor Store</h1>
        <p class="text-gray-600 mt-1">Your marketplace destination</p>
      </div>

      <!-- Auth Card -->
      <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
        <!-- Tab Switcher -->
        <div class="flex bg-gray-100 rounded-2xl p-1 mb-8">
          <button
            @click="activeTab = 'signin'"
            :class="[
              'flex-1 py-3 px-4 text-sm font-medium rounded-xl transition-all duration-300',
              activeTab === 'signin'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            Sign In
          </button>
          <button
            @click="activeTab = 'signup'"
            :class="[
              'flex-1 py-3 px-4 text-sm font-medium rounded-xl transition-all duration-300',
              activeTab === 'signup'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            Sign Up
          </button>
        </div>

        <!-- Sign In Form -->
        <form v-if="activeTab === 'signin'" @submit.prevent="handleSignIn" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div class="relative">
              <Icon name="lucide:mail" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="signInForm.email"
                type="email"
                required
                class="w-full pl-10 pr-4 py-3 border text-gray-900 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div class="relative">
              <Icon name="lucide:lock" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="signInForm.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full pl-10 pr-12 py-3 border text-gray-900 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              class="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span v-if="!isLoading">Sign In</span>
            <div v-else class="flex items-center justify-center">
              <Icon name="lucide:loader-2" class="w-4 h-4 animate-spin mr-2" />
              Signing in...
            </div>
          </button>
        </form>

        <!-- Sign Up Form -->
        <form v-else @submit.prevent="handleSignUp" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                v-model="signUpForm.first_name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="John"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                v-model="signUpForm.last_name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div class="relative">
              <Icon name="lucide:mail" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="signUpForm.email"
                type="email"
                required
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div class="relative">
              <Icon name="lucide:phone" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="signUpForm.phone"
                type="tel"
                required
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
            <select
              v-model="signUpForm.account_type"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select account type</option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div class="relative">
              <Icon name="lucide:lock" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="signUpForm.password"
                :type="showPassword ? 'text' : 'password'"
                required
                minlength="6"
                class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Create a password"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
              </button>
            </div>
            <div class="mt-2">
              <div class="flex space-x-1">
                <div
                  v-for="i in 4"
                  :key="i"
                  :class="[
                    'h-1 flex-1 rounded-full transition-colors duration-200',
                    passwordStrength >= i ? 'bg-green-500' : 'bg-gray-200'
                  ]"
                ></div>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                {{ passwordStrengthText }}
              </p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <div class="relative">
              <Icon name="lucide:lock" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="signUpForm.confirmPassword"
                type="password"
                required
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Confirm your password"
              />
            </div>
            <p v-if="passwordMismatch" class="text-xs text-red-500 mt-1">
              Passwords do not match
            </p>
          </div>

          <div class="flex items-start">
            <input
              v-model="agreeToTerms"
              type="checkbox"
              required
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
            />
            <span class="ml-2 text-sm text-gray-600">
              I agree to the 
              <button type="button" class="text-blue-600 hover:text-blue-800 font-medium">Terms of Service</button>
              and 
              <button type="button" class="text-blue-600 hover:text-blue-800 font-medium">Privacy Policy</button>
            </span>
          </div>

          <button
            type="submit"
            :disabled="isLoading || !isFormValid"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span v-if="!isLoading">Create Account</span>
            <div v-else class="flex items-center justify-center">
              <Icon name="lucide:loader-2" class="w-4 h-4 animate-spin mr-2" />
              Creating account...
            </div>
          </button>
        </form>

        <!-- Social Sign In -->
        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              class="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <Icon name="lucide:chrome" class="w-5 h-5" />
              <span class="ml-2">Google</span>
            </button>
            <button
              type="button"
              class="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <Icon name="lucide:facebook" class="w-5 h-5" />
              <span class="ml-2">Facebook</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-8">
        <p class="text-sm text-gray-500">
          Protected by advanced security measures
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useAuthStore } from '~/store/useAuthStore'

// Define page meta
definePageMeta({
  layout: false,
  middleware: 'guest'
})

// Directus role IDs - move these to a config file or environment variables for better management
const ROLE_IDS = {
  vendor: '827fc9e6-9d85-4176-b638-13c31213c9cb',
  customer: '0cc8efcd-d54e-4e35-8a78-6cc9ea0305ea'
} as const

// Initialize store reference
let authStore: any = null

// Reactive state
const activeTab = ref<'signin' | 'signup'>('signin')
const showPassword = ref(false)
const isLoading = ref(false)
const rememberMe = ref(false)
const agreeToTerms = ref(false)

// Form data
const signInForm = ref({
  email: '',
  password: ''
})

const signUpForm = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  account_type: '' as 'customer' | 'vendor' | ''
})

// Computed properties
const passwordStrength = computed(() => {
  const password = signUpForm.value.password
  let strength = 0
  
  if (password.length >= 6) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  
  return strength
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (strength === 0) return 'Enter a password'
  if (strength === 1) return 'Weak password'
  if (strength === 2) return 'Fair password'
  if (strength === 3) return 'Good password'
  return 'Strong password'
})

const passwordMismatch = computed(() => {
  return signUpForm.value.confirmPassword && 
         signUpForm.value.password !== signUpForm.value.confirmPassword
})

const isFormValid = computed(() => {
  if (activeTab.value === 'signin') {
    return signInForm.value.email && signInForm.value.password
  } else {
    return signUpForm.value.first_name &&
           signUpForm.value.last_name &&
           signUpForm.value.email &&
           signUpForm.value.phone &&
           signUpForm.value.password &&
           signUpForm.value.confirmPassword &&
           signUpForm.value.account_type &&
           signUpForm.value.password === signUpForm.value.confirmPassword &&
           agreeToTerms.value
  }
})

// Methods
const handleSignIn = async () => {
  if (isLoading.value || !authStore) return
  
  isLoading.value = true
  
  try {
    await authStore.login({
      email: signInForm.value.email,
      password: signInForm.value.password
    })
    
    // Success - navigation handled by auth store
    const toast = useToast()
    toast?.add({
      title: 'Welcome back!',
      description: 'You have been successfully signed in.',
      color: 'primary'
    })
  } catch (error: any) {
    const toast = useToast()
    toast?.add({
      title: 'Sign In Failed',
      description: error.message || 'Please check your credentials and try again.',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}

const handleSignUp = async () => {
  if (isLoading.value || !isFormValid.value || !authStore) return
  
  isLoading.value = true
  
  try {
    // Get the correct role ID based on account type
    const roleId = signUpForm.value.account_type === 'vendor' 
      ? ROLE_IDS.vendor 
      : ROLE_IDS.customer
    
    // Register user with correct role ID
    await useApiPost('/users', {
      first_name: signUpForm.value.first_name,
      last_name: signUpForm.value.last_name,
      email: signUpForm.value.email,
      phone: signUpForm.value.phone,
      password: signUpForm.value.password,
      role: roleId // Use the UUID instead of string
    })
    
    // Auto sign in after registration
    await authStore.login({
      email: signUpForm.value.email,
      password: signUpForm.value.password
    })
    
    const toast = useToast()
    toast?.add({
      title: 'Account Created!',
      description: 'Welcome to our marketplace. Your account has been created successfully.',
      color: 'primary'
    })
  } catch (error: any) {
    const toast = useToast()
    toast?.add({
      title: 'Registration Failed',
      description: error.message || 'Unable to create account. Please try again.',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}

// Watch for tab changes to reset forms
watch(activeTab, () => {
  // Reset forms when switching tabs
  signInForm.value = { email: '', password: '' }
  signUpForm.value = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    account_type: ''
  }
  showPassword.value = false
  agreeToTerms.value = false
})

// Initialize auth store and check authentication
onMounted(async () => {
  // Wait for next tick to ensure Pinia is available
  await nextTick()
  
  try {
    authStore = useAuthStore()
    
    // Check if user is already authenticated
    const isAuth = await authStore.checkAuth()
    if (isAuth) {
      navigateTo('/')
    }
  } catch (error) {
    console.log('Auth check error in auth page:', error)
    // Continue to show auth page if there's an error
  }
})
</script>