<template>
  <div class="min-h-screen bg-white relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-1/2 -left-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-bounce delay-500"></div>
    </div>

    <!-- Modern Header -->
    <header class="relative z-10 backdrop-blur-xl bg-white/80 border-b border-gray-200 sticky top-0 shadow-sm">
      <div class="max-w-7xl mx-auto px-6 py-6">
        <div class="flex items-center space-x-4">
          <div class="relative group">
           <img class="w-20" src="/images/111.png" alt="">
          </div>
          <div>
            <h1 class="text-3xl kantumruy-pro font-bold bg-gradient-to-r from-gray-900 via-red-600 to-red-600 bg-clip-text text-transparent">
             ពិព័រណ៍សៀវភៅ និងការងារ 
            </h1>
            <p class="text-sm text-gray-600">Book and Career Expo</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 max-w-6xl mx-auto px-6 py-12">
      <!-- Hero Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-50 to-red-50 rounded-full border border-red-200 mb-8 shadow-sm">
          <Icon name="heroicons:sparkles" class="w-4 h-4 text-red-500 mr-2" />
          <span class="text-sm text-red-700 font-medium">Join the Future of Work</span>
        </div>
        <h2 class="max-sm:text-4xl text-5xl kantumruy-pro max-sm:leading-normal font-bold bg-gradient-to-r from-gray-900 via-red-600 to-indigo-600 bg-clip-text text-transparent mb-6 p-5">
         អាជីពក្នុងក្តីស្រមៃរបស់អ្នកកំពុងរង់ចាំ
        </h2>
        <!-- <p class="text-xl .kantumruy-pro-light text-gray-700 max-w-3xl mx-auto leading-relaxed">
         ឱកាសប្រកបដោយភាពច្នៃប្រឌិតនៅក្នុងពិព័រណ៍ក្រុមហ៊ុនផ្តាច់មុខរបស់យើង។ 
        </p> -->
      </div>

      <!-- Application Form Card -->
      <div class="relative">
        <!-- Subtle Glow Effect -->
        <div class="absolute -inset-1 bg-gradient-to-r from-red-200 to-indigo-200 rounded-3xl blur opacity-30"></div>
        
        <!-- Main Form Container -->
        <div class="relative bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl">
          <!-- Form Header -->
          <div class="bg-gradient-to-r from-red-600 to-red-700 px-8 py-8 border-b border-red-500">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:document-text" class="w-8 h-8 text-white" />
                <h3 class="text-2xl font-bold text-white">Application Form</h3>
              </div>
              <div class="flex items-center space-x-2 text-sm text-red-100">
                <Icon name="heroicons:shield-check" class="w-4 h-4" />
                <span>Secure & Encrypted</span>
              </div>
            </div>
          </div>

          <form @submit.prevent="submitApplication" class="p-8 space-y-12">
            <!-- Personal Information -->
            <section class="space-y-8">
              <div class="flex items-center space-x-3 mb-8">
                <div class="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Icon name="heroicons:user" class="w-5 h-5 text-white" />
                </div>
                <h4 class="text-xl font-bold text-gray-900">Personal Information</h4>
                <div class="flex-1 h-px bg-gradient-to-r from-red-300 to-transparent"></div>
              </div>
              
              <div class="grid lg:grid-cols-2 gap-8">
                <!-- Full Name -->
                <div class="space-y-3">
                  <label class="block text-sm font-semibold text-gray-800">
                    Full Name <span class="text-red-500">*</span>
                  </label>
                  <div class="relative group">
                    <input
                      v-model="form.name"
                      type="text"
                      placeholder="Enter your full name"
                      class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 hover:border-gray-400 hover:bg-white"
                      required
                    />
                  </div>
                </div>

                <!-- Phone -->
                <div class="space-y-3">
                  <label class="block text-sm font-semibold text-gray-800">
                    Phone Number <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="(855) XXX-XXXX"
                    class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 hover:border-gray-400 hover:bg-white"
                    required
                  />
                </div>

                <!-- Email -->
                <div class="space-y-3">
                  <label class="block text-sm font-semibold text-gray-800">
                    Email Address
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="your.email@example.com"
                    class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 hover:border-gray-400 hover:bg-white"
                  />
                </div>

                <!-- Gender -->
                <div class="space-y-3">
                  <label class="block text-sm font-semibold text-gray-800">
                    Gender <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.gender"
                    class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 hover:border-gray-400 hover:bg-white"
                    required
                  >
                    <option value="" class="bg-white text-gray-700">Select gender</option>
                    <option value="male" class="bg-white text-gray-900">Male</option>
                    <option value="female" class="bg-white text-gray-900">Female</option>
                    <option value="other" class="bg-white text-gray-900">Other</option>
                    <option value="prefer_not_to_say" class="bg-white text-gray-900">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </section>

            <!-- Position Information -->
            <section class="space-y-8">
              <div class="flex items-center space-x-3 mb-8">
                <div class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-sm">
                  <Icon name="heroicons:building-office" class="w-5 h-5 text-white" />
                </div>
                <h4 class="text-xl font-bold text-gray-900">Position Information</h4>
                <div class="flex-1 h-px bg-gradient-to-r from-indigo-300 to-transparent"></div>
              </div>
              
              <div class="grid lg:grid-cols-2 gap-8">
                <!-- Job Category -->
                <div class="space-y-3">
                  <label class="block text-sm font-semibold text-gray-800">
                    Job Category <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.category"
                    @change="onCategoryChange"
                    class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-400 hover:bg-white"
                    required
                  >
                    <option value="" class="bg-white text-gray-700">Select job category</option>
                    <option v-for="category in jobCategories" :key="category.value" :value="category.value" class="bg-white text-gray-900">
                      {{ category.label }}
                    </option>
                  </select>
                </div>

                <!-- Position -->
                <div class="space-y-3">
                  <label class="block text-sm font-semibold text-gray-800">
                    Position <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.position"
                    :disabled="!form.category"
                    class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-400 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
                    required
                  >
                    <option value="" class="bg-white text-gray-700">Select position</option>
                    <option v-for="position in availablePositions" :key="position.value" :value="position.value" class="bg-white text-gray-900">
                      {{ position.label }}
                    </option>
                  </select>
                </div>
              </div>
            </section>

            <!-- File Upload Section -->
            <section class="space-y-8">
              <div class="flex items-center space-x-3 mb-8">
                <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-sm">
                  <Icon name="heroicons:document-arrow-up" class="w-5 h-5 text-white" />
                </div>
                <h4 class="text-xl font-bold text-gray-900">Documents</h4>
                <div class="flex-1 h-px bg-gradient-to-r from-purple-300 to-transparent"></div>
              </div>
              
              <div class="grid lg:grid-cols-2 gap-8">
                <!-- CV Upload -->
                <div class="space-y-3">
                  <label class="block text-sm font-semibold text-gray-800">
                    CV/Resume <span class="text-red-500">*</span>
                  </label>
                  <div 
                    class="relative group cursor-pointer"
                    @dragover.prevent
                    @drop.prevent="handleDrop($event, 'cv')"
                    @click="$refs.cvInput?.click()"
                  >
                    <div class="border-2 border-dashed border-gray-300 rounded-2xl p-8 bg-gray-50 hover:border-red-400 hover:bg-red-50 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg">
                      <div class="text-center">
                        <div class="relative mx-auto w-16 h-16 mb-4">
                          <div class="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                          <Icon name="heroicons:cloud-arrow-up" class="relative w-16 h-16 text-red-500 mx-auto group-hover:text-red-600 transition-colors" />
                        </div>
                        <p class="text-lg font-medium text-gray-900 mb-2">
                          {{ form.cv ? form.cv.name : 'Drop your CV here or click to browse' }}
                        </p>
                        <p class="text-sm text-gray-600">PDF, DOC, DOCX up to 10MB</p>
                      </div>
                    </div>
                    <input
                      ref="cvInput"
                      type="file"
                      class="hidden"
                      accept=".pdf,.doc,.docx"
                      @change="handleFileChange($event, 'cv')"
                      required
                    />
                  </div>
                </div>

                <!-- Cover Letter Upload -->
                <div class="space-y-3">
                  <label class="block text-sm font-semibold text-gray-800">
                    Cover Letter
                  </label>
                  <div 
                    class="relative group cursor-pointer"
                    @dragover.prevent
                    @drop.prevent="handleDrop($event, 'coverLetter')"
                    @click="$refs.coverLetterInput?.click()"
                  >
                    <div class="border-2 border-dashed border-gray-300 rounded-2xl p-8 bg-gray-50 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg">
                      <div class="text-center">
                        <div class="relative mx-auto w-16 h-16 mb-4">
                          <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                          <Icon name="heroicons:document-plus" class="relative w-16 h-16 text-purple-500 mx-auto group-hover:text-purple-600 transition-colors" />
                        </div>
                        <p class="text-lg font-medium text-gray-900 mb-2">
                          {{ form.coverLetter ? form.coverLetter.name : 'Drop your cover letter here (optional)' }}
                        </p>
                        <p class="text-sm text-gray-600">PDF, DOC, DOCX up to 10MB</p>
                      </div>
                    </div>
                    <input
                      ref="coverLetterInput"
                      type="file"
                      class="hidden"
                      accept=".pdf,.doc,.docx"
                      @change="handleFileChange($event, 'coverLetter')"
                    />
                  </div>
                </div>
              </div>
            </section>

            <!-- Terms and Submit -->
            <section class="pt-8 border-t border-gray-200">
              <div class="space-y-8">
                <!-- Terms Checkbox -->
                <div class="flex items-start space-x-3">
                  <div class="relative flex-shrink-0 mt-1">
                    <input
                      v-model="form.termsAccepted"
                      type="checkbox"
                      class="w-5 h-5 bg-white border-2 border-gray-300 rounded focus:ring-2 focus:ring-red-500 text-red-600"
                      required
                    />
                  </div>
                  <label class="text-sm text-gray-700 leading-relaxed">
                    I agree to the 
                    <a href="#" class="text-red-600 hover:text-red-700 font-medium underline underline-offset-2">Terms and Conditions</a> 
                    and 
                    <a href="#" class="text-red-600 hover:text-red-700 font-medium underline underline-offset-2">Privacy Policy</a>
                    <span class="text-red-500 ml-1">*</span>
                  </label>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 justify-end">
                  <button
                    type="button"
                    @click="resetForm"
                    class="px-8 py-4 bg-gray-100 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-200 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Reset Form
                  </button>
                  <button
                    type="submit"
                    :disabled="!isFormValid || isSubmitting"
                    class="relative group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white font-semibold hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <div class="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-700 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
                    <div class="relative flex items-center justify-center space-x-2">
                      <Icon v-if="!isSubmitting" name="heroicons:paper-airplane" class="w-5 h-5" />
                      <div v-if="isSubmitting" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>{{ isSubmitting ? 'Submitting...' : 'Submit Application' }}</span>
                    </div>
                  </button>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>

      <!-- Success Modal -->
      <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
        <div class="relative bg-white border border-gray-200 rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div class="absolute -inset-1 bg-gradient-to-r from-green-200 to-emerald-200 rounded-3xl blur opacity-20"></div>
          <div class="relative text-center">
            <div class="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Icon name="heroicons:check" class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h3>
            <p class="text-gray-700 mb-8 leading-relaxed">
              Thank you for your interest in joining our team. We'll review your application and get back to you soon.
            </p>
            <button 
              @click="showSuccessModal = false"
              class="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg hover:shadow-xl"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// SEO and meta tags
useHead({
  title: 'Career Application - Join Our Team | Future of Work 2025',
  meta: [
    { name: 'description', content: 'Apply for exciting career opportunities at our innovative company expo event. Submit your application and join the future of work.' },
    { name: 'keywords', content: 'career, job application, company expo, employment, CV submission, future jobs, innovation' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})

// Form reactive state
const form = reactive({
  name: '',
  phone: '',
  email: '',
  gender: '',
  category: '',
  position: '',
  cv: null as File | null,
  coverLetter: null as File | null,
  termsAccepted: false
})

// Component state
const isSubmitting = ref(false)
const showSuccessModal = ref(false)

// Form options
const jobCategories = [
  { label: 'Information Technology', value: 'it' },
  { label: 'Marketing & Sales', value: 'marketing' },
  { label: 'Finance & Accounting', value: 'finance' },
  { label: 'Human Resources', value: 'hr' },
  { label: 'Operations', value: 'operations' },
  { label: 'Customer Service', value: 'customer_service' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Design & Creative', value: 'design' }
]

const positionsByCategory = {
  it: [
    { label: 'Software Developer', value: 'software_developer' },
    { label: 'Frontend Developer', value: 'frontend_developer' },
    { label: 'Backend Developer', value: 'backend_developer' },
    { label: 'DevOps Engineer', value: 'devops_engineer' },
    { label: 'Data Analyst', value: 'data_analyst' },
    { label: 'System Administrator', value: 'system_admin' }
  ],
  marketing: [
    { label: 'Marketing Manager', value: 'marketing_manager' },
    { label: 'Digital Marketing Specialist', value: 'digital_marketing' },
    { label: 'Content Creator', value: 'content_creator' },
    { label: 'Sales Representative', value: 'sales_rep' },
    { label: 'Brand Manager', value: 'brand_manager' }
  ],
  finance: [
    { label: 'Accountant', value: 'accountant' },
    { label: 'Financial Analyst', value: 'financial_analyst' },
    { label: 'Bookkeeper', value: 'bookkeeper' },
    { label: 'Finance Manager', value: 'finance_manager' }
  ],
  hr: [
    { label: 'HR Specialist', value: 'hr_specialist' },
    { label: 'Recruitment Specialist', value: 'recruitment' },
    { label: 'HR Manager', value: 'hr_manager' },
    { label: 'Training Coordinator', value: 'training_coordinator' }
  ],
  operations: [
    { label: 'Operations Manager', value: 'operations_manager' },
    { label: 'Project Manager', value: 'project_manager' },
    { label: 'Quality Assurance', value: 'qa' },
    { label: 'Supply Chain Specialist', value: 'supply_chain' }
  ],
  customer_service: [
    { label: 'Customer Service Representative', value: 'cs_rep' },
    { label: 'Customer Success Manager', value: 'cs_manager' },
    { label: 'Technical Support', value: 'tech_support' }
  ],
  engineering: [
    { label: 'Mechanical Engineer', value: 'mechanical_engineer' },
    { label: 'Electrical Engineer', value: 'electrical_engineer' },
    { label: 'Civil Engineer', value: 'civil_engineer' },
    { label: 'Quality Engineer', value: 'quality_engineer' }
  ],
  design: [
    { label: 'UI/UX Designer', value: 'ui_ux_designer' },
    { label: 'Graphic Designer', value: 'graphic_designer' },
    { label: 'Product Designer', value: 'product_designer' },
    { label: 'Creative Director', value: 'creative_director' }
  ]
}

// Computed properties
const availablePositions = computed(() => {
  return form.category ? positionsByCategory[form.category as keyof typeof positionsByCategory] || [] : []
})

const isFormValid = computed(() => {
  return form.name && 
         form.phone && 
         form.gender && 
         form.category && 
         form.position && 
         form.cv && 
         form.termsAccepted
})

// Methods
const onCategoryChange = () => {
  form.position = '' // Reset position when category changes
}

const handleFileChange = (event: Event, type: 'cv' | 'coverLetter') => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    
    // File size validation (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB')
      return
    }
    
    // File type validation
    const allowedTypes = ['.pdf', '.doc', '.docx']
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!allowedTypes.includes(fileExtension)) {
      alert('Please upload only PDF, DOC, or DOCX files')
      return
    }
    
    form[type] = file
  }
}

const handleDrop = (event: DragEvent, type: 'cv' | 'coverLetter') => {
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    const file = event.dataTransfer.files[0]
    
    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB')
      return
    }
    
    const allowedTypes = ['.pdf', '.doc', '.docx']
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!allowedTypes.includes(fileExtension)) {
      alert('Please upload only PDF, DOC, or DOCX files')
      return
    }
    
    form[type] = file
  }
}

const resetForm = () => {
  Object.assign(form, {
    name: '',
    phone: '',
    email: '',
    gender: '',
    category: '',
    position: '',
    cv: null,
    coverLetter: null,
    termsAccepted: false
  })
  
  // Reset file inputs
  const cvInput = document.querySelector('input[type="file"]') as HTMLInputElement
  if (cvInput) cvInput.value = ''
}

const submitApplication = async () => {
  if (!isFormValid.value) return
  
  isSubmitting.value = true
  
  try {
    // Create FormData for file upload
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('phone', form.phone)
    formData.append('email', form.email || '')
    formData.append('gender', form.gender)
    formData.append('category', form.category)
    formData.append('position', form.position)
    
    if (form.cv) {
      formData.append('cv', form.cv)
    }
    if (form.coverLetter) {
      formData.append('coverLetter', form.coverLetter)
    }
    
    // TODO: Replace with your actual API endpoint
    // const response = await $fetch('/api/applications', {
    //   method: 'POST',
    //   body: formData
    // })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    showSuccessModal.value = true
    resetForm()
    
  } catch (error) {
    console.error('Error submitting application:', error)
    alert('There was an error submitting your application. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// Template refs
const cvInput = ref<HTMLInputElement>()
const coverLetterInput = ref<HTMLInputElement>()
</script>

<style scoped>
/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(147, 51, 234, 0.7);
}

/* Smooth animations */
* {
  transition: all 0.2s ease;
}

/* Focus states for accessibility */
input:focus,
select:focus,
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.5);
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Pulse animation for background elements */
@keyframes pulse {
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
}

/* Bounce animation for floating elements */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Custom gradient animations */
.animate-gradient {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* File upload hover effects */
.file-upload-area:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(147, 51, 234, 0.3);
}

/* Button hover effects */
button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Form field focus glow */
input:focus,
select:focus {
  box-shadow: 
    0 0 0 2px rgba(147, 51, 234, 0.5),
    0 4px 12px rgba(147, 51, 234, 0.2);
}

/* Success modal entrance animation */
.modal-enter {
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid.lg\\:grid-cols-2 {
    gap: 1.5rem;
  }
  
  .px-8 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .py-8 {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
}

/* High contrast mode support */

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}


::-webkit-scrollbar-thumb {
  background: rgba(147, 51, 234, 0.5);
  border-radius: 4px;
}
</style>