<!-- components/EventForm -->
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
      <div class="max-w-7xl mx-auto px-6 py-2">
        <div class="flex ">
          <div class="relative group">
           <img class="w-16  " src="/images/111.png" alt="">
          </div>
          <div>
            <h1 class="text-2xl kantumruy-pro font-bold bg-gradient-to-r from-gray-900 via-red-600 to-red-600 bg-clip-text text-transparent">
             ពិព័រណ៍សៀវភៅ និងការងារ 
            </h1>
            <p class="text-sm text-gray-600">Book and Career Expo</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Progress Indicator -->
    <div class="relative z-10 max-w-6xl mx-auto px-6 pt-3">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center space-x-4">
          <!-- Step 1 -->
          <div class="flex items-center">
            <div :class="[
              'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
              currentStep >= 1 ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
            ]">
              1
            </div>
            <span :class="[
              'ml-2 text-sm font-medium transition-colors',
              currentStep >= 1 ? 'text-red-600' : 'text-gray-500'
            ]">
              Select Events
            </span>
          </div>

          <!-- Progress Line -->
          <div :class="[
            'flex-1 h-1 mx-4 rounded-full transition-all duration-500',
            currentStep >= 2 ? 'bg-red-600' : 'bg-gray-200'
          ]"></div>

          <!-- Step 2 -->
          <div class="flex items-center">
            <div :class="[
              'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
              currentStep >= 2 ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
            ]">
              2
            </div>
            <span :class="[
              'ml-2 text-sm font-medium transition-colors',
              currentStep >= 2 ? 'text-red-600' : 'text-gray-500'
            ]">
              Registration
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="relative z-10 max-w-6xl mx-auto px-6 pb-12 pt-2">
      <!-- Step 1: Event Selection -->
      <div v-if="currentStep === 1" class="relative">
        <!-- Subtle Glow Effect -->
        <div class="absolute -inset-1 bg-gradient-to-r from-red-200 to-indigo-200 rounded-3xl blur opacity-30"></div>
        
        <!-- Event Selection Container -->
        <div class="relative bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl">
          <!-- Header -->
          <div class="bg-gradient-to-r from-red-600 to-red-700 px-8 py-8 border-b border-red-500">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:calendar-days" class="w-8 h-8 text-white" />
                <h3 class="text-2xl font-bold text-white kantumruy-pro ">ជ្រើសរើសព្រឹត្តិការណ៍</h3>
              </div>
              <div class="flex items-center space-x-2 text-sm text-red-100">
                <span>Step 1 of 2</span>
              </div>
            </div>
          </div>

          <div class="p-8">
            <p class="text-green-600 text-sm md:text-lg mb-8 text-center kantumruy-pro font-bold">
              ជ្រើសរើសផ្នែកព្រឹត្តិការណ៍ដែលអ្នកចាប់អារម្មណ៍ក្នុងការចូលរួម។ អ្នកអាចជ្រើសរើសផ្នែកជាច្រើន។
            </p>

            <!-- Event Sections Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 kantumruy-pro font-bold">
              <div 
                v-for="event in eventOptions" 
                :key="event.id"
                @click="toggleEventSelection(event.id)"
                :class="[
                  'relative cursor-pointer p-6 border-2 rounded-2xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1',
                  selectedEvents.includes(event.id) 
                    ? 'border-red-500 bg-red-50 shadow-lg shadow-red-200/50' 
                    : 'border-gray-200 bg-white hover:border-red-300'
                ]"
              >
                <!-- Selection Indicator -->
                <div class="absolute top-4 right-4">
                  <div :class="[
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200',
                    selectedEvents.includes(event.id)
                      ? 'border-red-500 bg-red-500'
                      : 'border-gray-300 bg-white'
                  ]">
                    <Icon 
                      v-if="selectedEvents.includes(event.id)" 
                      name="heroicons:check" 
                      class="w-4 h-4 text-white" 
                    />
                  </div>
                </div>

                <!-- Event Content -->
                <div class="pr-8">
                  <h4 class="text-sm md:text-lg font-bold text-gray-900 mb-2">
                    {{ event.name }}
                  </h4>
                  <p class="text-xs text-gray-600">
                    Click to {{ selectedEvents.includes(event.id) ? 'remove from' : 'add to' }} your selection
                  </p>
                </div>

                <!-- Hover Effect -->
                <div :class="[
                  'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300',
                  'bg-gradient-to-br from-red-500/5 to-transparent',
                  selectedEvents.includes(event.id) ? 'opacity-100' : 'hover:opacity-50'
                ]"></div>
              </div>
            </div>

            <!-- Selected Events Summary -->
            <div v-if="selectedEvents.length > 0" class="bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
              <div class="flex items-center space-x-2 mb-2">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-600" />
                <span class="text-green-800 font-medium">
                  Selected {{ selectedEvents.length }} event{{ selectedEvents.length === 1 ? '' : 's' }}
                </span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="eventId in selectedEvents" 
                  :key="eventId"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 border border-green-200"
                >
                  {{ getEventName(eventId) }}
                  <button 
                    @click.stop="toggleEventSelection(eventId)"
                    class="ml-2 hover:bg-green-200 rounded-full p-0.5"
                  >
                    <Icon name="heroicons:x-mark" class="w-3 h-3" />
                  </button>
                </span>
              </div>
            </div>

            <!-- Next Button -->
            <div class="text-center kantumruy-pro">
              <button 
                @click="nextStep"
                :disabled="selectedEvents.length === 0"
                class="px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl  text-white font-bold text-lg shadow-xl hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 hover:shadow-2xl transform hover:-translate-y-1 disabled:hover:transform-none"
              >
                <div class="flex items-center space-x-3 kantumruy-pro text-md">
                  <span>បន្តទៅការចុះឈ្មោះ</span>
                  <Icon name="heroicons:arrow-right" class="w-5 h-5" />
                </div>
              </button>
              <p v-if="selectedEvents.length === 0" class="text-sm kantumruy-pro font-bold text-red-500 mt-3">
                សូមជ្រើសរើសយ៉ាងហោចណាស់ 1 កម្មវិធីដែលអ្នកចង់ចូលរួម។
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Registration Form -->
      <div v-if="currentStep === 2" class="relative">
        <!-- Subtle Glow Effect -->
        <div class="absolute -inset-1 bg-gradient-to-r from-red-200 to-indigo-200 rounded-3xl blur opacity-30"></div>
        
        <!-- Main Form Container -->
        <div class="relative bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl">
          <!-- Form Header -->
          <div class="bg-gradient-to-r from-red-600 to-red-700 px-8 py-8 border-b border-red-500">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:document-text" class="w-8 h-8 text-white" />
                <h3 class="text-2xl font-bold text-white kantumruy-pro">ចុះឈ្មោះ</h3>
              </div>
              <div class="flex items-center space-x-2 text-sm text-red-100">
                <Icon name="heroicons:shield-check" class="w-4 h-4" />
                <span>Step 2 of 2</span>
              </div>
            </div>
          </div>

          <form @submit.prevent="submitApplication" class="p-8 space-y-12">
            <!-- Selected Events Summary -->
            <section class="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div class="flex items-center space-x-2 mb-3">
                <Icon name="heroicons:calendar-days" class="w-5 h-5 text-blue-600" />
                <h4 class="text-lg font-bold text-blue-900">Selected Event Sections</h4>
              </div>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="eventId in selectedEvents" 
                  :key="eventId"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200"
                >
                  {{ getEventName(eventId) }}
                </span>
              </div>
              <button 
                type="button"
                @click="previousStep"
                class="mt-3 text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Change selection
              </button>
            </section>

            <!-- Personal Information -->
            <section class="space-y-8">
              <div class="flex items-center space-x-3 mb-8">
                <div class="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Icon name="heroicons:user" class="w-5 h-5 text-white" />
                </div>
                <h4 class="text-xl font-bold text-gray-900 kantumruy-pro">ព័ត៌មានផ្ទាល់ខ្លួន</h4>
                <div class="flex-1 h-px bg-gradient-to-r from-red-300 to-transparent"></div>
              </div>
              
              <div class="grid lg:grid-cols-2 gap-8">
                <!-- Full Name -->
                <div class="space-y-3">
                  <label class="block text-sm font-semibold text-gray-800 kantumruy-pro">
                    ឈ្មោះ (Name) <span class="text-red-500">*</span>
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
                  <label class="block text-sm font-semibold text-gray-800 kantumruy-pro">
                    លេខទូរស័ព្ទ (Phone) <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="XXX-XXX-XXXX"
                    class="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 hover:border-gray-400 hover:bg-white"
                    required
                  />
                </div>

                <!-- Gender -->
                <div class="space-y-3">
                  <label class="block text-sm font-semibold text-gray-800 kantumruy-pro">
                    ភេទ (Gender) <span class="text-red-500">*</span>
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
                  <label class="block text-sm font-semibold text-gray-800 kantumruy-pro">
                    មុខតំណែងការងារ (Job Position) <span class="text-red-500">*</span>
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

            <!-- Action Buttons -->
            <section class="">
              <div class="flex flex-col sm:flex-row gap-4">
                <!-- Back Button -->
                <!-- Submit Button -->
                <button 
                  type="submit"
                  :disabled="!isFormValid || isSubmitting"
                  class="flex-1 relative overflow-hidden p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl text-white font-bold text-lg shadow-xl hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 hover:shadow-2xl transform hover:-translate-y-1 disabled:hover:transform-none"
                >
                  <div v-if="isSubmitting" class="flex items-center justify-center space-x-3">
                    <div class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting Registration...</span>
                  </div>
                  <div v-else class="flex items-center justify-center space-x-3 text-sm kantumruy-pro font-bold">
                    <Icon name="heroicons:paper-airplane" class="w-6 h-6" />
                    <span>បញ្ជូនការចុះឈ្មោះ</span>
                  </div>
                </button>
                  <NuxtLink 
                  type="button"
                  @click="previousStep"
                  class="sm:w-auto px-8 py-4  transition-all cursor-pointer  duration-300 focus:outline-none "
                >
                  <div class="flex items-center text-sm justify-center space-x-3 kantumruy-pro">
                    <Icon name="heroicons:arrow-left" class="w-5 h-5" />
                    <span>ត្រឡប់ក្រោយ (Back)</span>
                  </div>
                </NuxtLink>
              </div>
              
              <p class="text-sm text-gray-600 text-center mt-4">
                By completing this registration, you agree to our terms and conditions.
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
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Registration Complete!</h3>
            <p class="text-gray-700 mb-8 leading-relaxed">
              Thank you for registering! You've successfully signed up for {{ selectedEvents.length }} event section{{ selectedEvents.length === 1 ? '' : 's' }}.
            </p>
            <button 
              @click="resetFormAndModal"
              class="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg hover:shadow-xl"
            >
              Register Another Person
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
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Registration Failed</h3>
            <p class="text-gray-700 mb-8 leading-relaxed">
              {{ errorMessage }}
            </p>
            <button 
              @click="showErrorModal = false"
              class="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl text-white font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg hover:shadow-xl"
            >
              Try Again
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
import type { IEventSection } from '~/types/event_sectin';
import type { IGender } from '~/types/gender';
import type { IJob } from '~/types/job';


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

// Methods
const handleImageError = () => {
  imageError.value = true
}
// Fetch event sections with error handling
let eventSections: IEventSection[] = [];
try {
  const eventResponse = await (<Promise<IResponse<IEventSection[]>>>(
    useApi(
      `/items/event_section?filter[status]=published&fields=id,name`,
      { method: 'GET' }
    )
  ));
  eventSections = eventResponse.data || [];
} catch (error) {
  eventSections = [];
}

// Fetch job positions with error handling
let jobPositions: IJob[] = [];
try {
  const jobResponse = await (<Promise<IResponse<IJob[]>>>(
    useApi(
      `/items/job?filter[status]=published&fields=id,name,name_kh`,
      { method: 'GET' }
    )
  ));
  jobPositions = jobResponse.data || [];
} catch (error) {
  jobPositions = [];
}

// Fetch gender options from settings with error handling  
let genderSettingsData: IGender[] = [];
try {
  const genderResponse = await (<Promise<IResponse<IGender[]>>>(
    useApi(
      `/items/settings?filter[status]=published&fields=gender,gender_kh`,
      { method: 'GET' }
    )
  ));
  genderSettingsData = genderResponse.data || [];
} catch (error) {
  genderSettingsData = [];
}

// Parse gender options from the settings
const genderOptions = computed(() => {
  if (genderSettingsData && genderSettingsData.length > 0) {
    return genderSettingsData.map((setting: any, index: number) => ({
      id: setting.id || (index + 1),
      name: setting.gender && setting.gender_kh 
        ? `${setting.gender} (${setting.gender_kh})`
        : setting.gender || setting.gender_kh || `Option ${index + 1}`
    }));
  }
  
  return [
    { id: 1, name: 'Male (ប្រុស)' },
    { id: 2, name: 'Female (ស្រី)' },
    { id: 3, name: 'Other (ផ្សេងៗ)' },
    { id: 4, name: 'Prefer not to say (មិនចង់បញ្ជាក់)' }
  ];
});

// Job options computed property
const jobOptions = computed(() => {
  return jobPositions.map(job => ({
    id: job.id,
    name: job.name && job.name_kh 
      ? `${job.name} (${job.name_kh})`
      : job.name || job.name_kh || 'Unknown Position'
  }));
});

// Job options computed property
// const jobOptions = computed(() => {
//   return jobPositions || [];
// });

// Event options computed property
const eventOptions = computed(() => {
  return eventSections || [];
});

// Step management
const currentStep = ref(1);

// Selected events
const selectedEvents = ref<number[]>([]);

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
         form.job !== '' &&
         selectedEvents.value.length > 0;
});

// Helper functions
const toggleEventSelection = (eventId: number) => {
  const index = selectedEvents.value.indexOf(eventId);
  if (index > -1) {
    selectedEvents.value.splice(index, 1);
  } else {
    selectedEvents.value.push(eventId);
  }
};

const getEventName = (eventId: number) => {
  const event = eventOptions.value.find(e => e.id === eventId);
  return event?.name || 'Unknown Event';
};

const nextStep = () => {
  if (selectedEvents.value.length > 0) {
    currentStep.value = 2;
  }
};

const previousStep = () => {
  currentStep.value = 1;
};

// Reset form function
const resetForm = () => {
  form.name = '';
  form.phone = '';
  form.gender = '';
  form.job = '';
  selectedEvents.value = [];
  currentStep.value = 1;
};

const resetFormAndModal = () => {
  showSuccessModal.value = false;
  resetForm();
};

// Submit application function
const submitApplication = async () => {
  if (!isFormValid.value) return;
  
  isSubmitting.value = true;
  
  try {
    // Prepare event section relations for many-to-many
    const evtSections = selectedEvents.value.map(eventId => ({
      event_section_id: eventId
    }));
    
    // Prepare data for submission
    const submissionData = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      gender: parseInt(form.gender),
      job: parseInt(form.job),
      evt_section: evtSections,
      status: 'published'
    };
    
    console.log('Submitting form data:', submissionData);
    
    // Submit to Directus API
    const response = await $fetch('/items/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
      baseURL: 'https://admin.baksey.asia'
    });
    
    console.log('API Response:', response);
    
    // Show success modal
    showSuccessModal.value = true;
    
  } catch (error) {
    console.error('Submission error:', error);
    
    // Set user-friendly error messages
    let userMessage = 'Something went wrong. Please try again.';
    
    if (error?.data?.errors) {
        userMessage = error.data.errors[0]?.message || 'There was an error submitting your registration. Please try again.';
    } else if (error?.response?.data?.errors) {
        userMessage = error.response.data.errors[0]?.message || 'There was an error submitting your registration. Please try again.';
    } else if (error?.message) {
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
    
    errorMessage.value = userMessage;
    showErrorModal.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

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

/* Step transition animations */
.step-transition-enter-active,
.step-transition-leave-active {
  transition: all 0.3s ease-in-out;
}

.step-transition-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.step-transition-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Event card selection animation */
.event-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.event-card:hover {
  transform: translateY(-4px) scale(1.02);
}

.event-card.selected {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(239, 68, 68, 0.1), 0 10px 10px -5px rgba(239, 68, 68, 0.04);
}

/* Progress indicator animation */
.progress-line {
  background: linear-gradient(90deg, #ef4444 var(--progress, 0%), #e5e7eb var(--progress, 0%));
  transition: all 0.5s ease-in-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid.lg\\:grid-cols-3 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  
  .grid.md\\:grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  
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
  
  .text-3xl {
    font-size: 1.875rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
}

@media (max-width: 640px) {
  .flex.items-center.justify-between {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .flex.items-center.space-x-4 {
    width: 100%;
    justify-content: space-between;
  }
  
  .progress-line {
    width: 100px;
    margin: 0 1rem;
  }
}

/* Loading states */
.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .animate-pulse,
  .animate-bounce,
  .animate-spin {
    animation: none !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .border-gray-200 {
    border-color: #000;
  }
  
  .text-gray-600 {
    color: #000;
  }
  
  .bg-gray-50 {
    background-color: #fff;
  }
}

/* Focus visible for better keyboard navigation */
button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid #ef4444;
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .absolute,
  .fixed {
    position: static;
  }
  
  .shadow-xl,
  .shadow-2xl {
    box-shadow: none;
  }
  
  .bg-gradient-to-r {
    background: #ef4444 !important;
  }
}

/*  */

@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.loading-shimmer {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 200px 100%;
  animation: shimmer 2s infinite;
}

/* Pulse animation for progress bars */
@keyframes progressPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Custom border gradient */
.border-gradient-to-r {
  border: 4px solid;
  border-image: linear-gradient(to right, #f87171, #ec4899) 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  /* .aspect-[3/4] { aspect-ratio: 4/5; }  Removed invalid selector */
  
  .grid.md\\:grid-cols-3 {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .w-20.h-20 {
    width: 4rem;
    height: 4rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-spin,
  .animate-pulse,
  .animate-bounce {
    animation: none;
  }
}
</style>