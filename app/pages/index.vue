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
      <!-- <div class="text-center mb-8">
        <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-50 to-red-50 rounded-full border border-red-200 mb-8 shadow-sm">
          <Icon name="heroicons:sparkles" class="w-4 h-4 text-red-500 mr-2" />
          <span class="text-sm text-red-700 font-medium">Join the Future of Work</span>
        </div>
        <h2 class="max-sm:text-4xl text-5xl kantumruy-pro max-sm:leading-normal font-bold bg-gradient-to-r from-gray-900 via-red-600 to-indigo-600 bg-clip-text text-transparent mb-6 p-5">
         អាជីពក្នុងក្តីស្រមៃរបស់អ្នកកំពុងរង់ចាំ
        </h2>
      </div> -->

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
                    <option v-for="g in genderOptions" :key="g.id" :value="g.id" class="bg-white text-gray-900">
                      {{ g.name }}
                    </option>
                  </select>
                </div>

                <!-- Job Position -->
                <div class="space-y-3">
                  <label class="block text-sm font-semibold text-gray-800">
                    Job Position <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.job"
                    class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 hover:border-gray-400 hover:bg-white"
                    required
                  >
                    <option value="" class="bg-white text-gray-700">Select job position</option>
                    <option v-for="j in jobOptions" :key="j.id" :value="j.id" class="bg-white text-gray-900">
                      {{ j.name }}
                    </option>
                  </select>
                </div>
              </div>
            </section>

            <!-- Submit Button -->
            <section class="pt-8">
              <button 
                type="submit"
                :disabled="!isFormValid || isSubmitting"
                class="w-full relative overflow-hidden px-8 py-6 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl text-white font-bold text-lg shadow-xl hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 hover:shadow-2xl transform hover:-translate-y-1 disabled:hover:transform-none"
              >
                <div v-if="isSubmitting" class="flex items-center justify-center space-x-3">
                  <div class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting Application...</span>
                </div>
                <div v-else class="flex items-center justify-center space-x-3">
                  <Icon name="heroicons:paper-airplane" class="w-6 h-6" />
                  <span>Submit Application</span>
                </div>
              </button>
              
              <p class="text-sm text-gray-600 text-center mt-4">
                By submitting this form, you agree to our terms and conditions.
              </p>
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

      <!-- Error Modal -->
      <div v-if="showErrorModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
        <div class="relative bg-white border border-gray-200 rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div class="absolute -inset-1 bg-gradient-to-r from-red-200 to-pink-200 rounded-3xl blur opacity-20"></div>
          <div class="relative text-center">
            <div class="mx-auto w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Icon name="heroicons:exclamation-triangle" class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Submission Failed</h3>
            <p class="text-gray-700 mb-8 leading-relaxed">
              {{ errorMessage }}
            </p>
            <button 
              @click="showErrorModal = false"
              class="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl text-white font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg hover:shadow-xl"
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
import { ref, reactive, computed } from 'vue';
import type { IResponse } from '~/types/api';
import type { IGender } from '~/types/gender';
import type { IJob } from '~/types/job';

// Fetch job positions with error handling
let jobPositions: IJob[] = [];
try {
  const jobResponse = await (<Promise<IResponse<IJob[]>>>(
    useApi(
      `/items/job?filter[status]=published&fields=id,name`,
      { method: 'GET' }
    )
  ));
  jobPositions = jobResponse.data || [];
} catch (error) {
  console.error('Error fetching job positions:', error);
  jobPositions = [];
}

// Fetch gender options from settings with error handling  
let genderSettingsData: IGender[] = [];
try {
  const genderResponse = await (<Promise<IResponse<IGender[]>>>(
    useApi(
      `/items/settings?filter[status]=published&fields=gender`,
      { method: 'GET' }
    )
  ));
  genderSettingsData = genderResponse.data || [];
} catch (error) {
  console.error('Error fetching gender settings:', error);
  genderSettingsData = [];
}

// Parse gender options from the settings
const genderOptions = computed(() => {
  // Debug: log the actual data structure
  console.log('genderSettingsData:', genderSettingsData);
  
  // Check if we have data - each gender option is a separate record
  if (genderSettingsData && genderSettingsData.length > 0) {
    return genderSettingsData.map((setting: any, index: number) => ({
      id: setting.id || (index + 1),
      name: setting.gender || `Option ${index + 1}`
    }));
  }
  
  // Fallback gender options
  return [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'Other' },
    { id: 4, name: 'Prefer not to say' }
  ];
});

// Job options computed property
const jobOptions = computed(() => {
  return jobPositions || [];
});

// Form reactive state
const form = reactive({
  name: '',
  phone: '',
  gender: '',
  job: ''
});

// Component state
const isSubmitting = ref(false);
const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const errorMessage = ref('');

// Form validation
const isFormValid = computed(() => {
  return form.name.trim() !== '' && 
         form.phone.trim() !== '' && 
         form.gender !== '' && 
         form.job !== '';
});

// Reset form function
const resetForm = () => {
  form.name = '';
  form.phone = '';
  form.gender = '';
  form.job = '';
};

// Submit application function
const submitApplication = async () => {
  if (!isFormValid.value) return;
  
  isSubmitting.value = true;
  
  try {
    // Prepare data for submission
    const submissionData = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      gender: parseInt(form.gender),
      job: parseInt(form.job),
      status: 'published'
    };
    
    console.log('Form values before submission:', form);
    console.log('Submitting form data:', submissionData);
    
    // Submit to Directus API with explicit content type
    const response = await $fetch('/items/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
      baseURL: 'http://147.93.159.71:8058'
    });
    
    console.log('API Response:', response);
    
    // Show success modal and reset form
    showSuccessModal.value = true;
    resetForm();
    
  } catch (error) {
    // Set user-friendly error messages based on the error type
    let userMessage = 'Something went wrong. Please try again.';
    
    if (error?.data?.errors) {
        userMessage = error.data.errors[0]?.message || 'There was an error submitting your application. Please try again.';
    } else if (error?.response?.data?.errors) {
        userMessage = error.response.data.errors[0]?.message || 'There was an error submitting your application. Please try again.';
    } else if (error?.message) {
        // Customize common error messages to be more user-friendly
        if (error.message.includes('fetch') || error.message.includes('network')) {
            userMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
        } else if (error.message.includes('timeout')) {
            userMessage = 'Request timed out. Please try again.';
        } else if (error.message.includes('404')) {
            userMessage = 'Service not found. Please contact support.';
        } else if (error.message.includes('500')) {
            userMessage = 'Server error. Please try again later.';
        } else {
            userMessage = 'An unexpected error occurred. Please try again.';
        }
    }
    
    // Set the error message for the modal
    errorMessage.value = userMessage;
    // Show error modal
    showErrorModal.value = true;
}finally {
    isSubmitting.value = false;
  }
};
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

::-webkit-scrollbar-thumb {
  background: rgba(147, 51, 234, 0.5);
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

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>