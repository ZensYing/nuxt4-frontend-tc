<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/20 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-bold text-white">AI Recruitment Platform</h1>
          <div class="flex space-x-4">
            <button 
              v-for="(section, index) in sections" 
              :key="index"
              @click="currentSlide = index"
              :class="[
                'px-3 py-1 rounded-full text-sm transition-all',
                currentSlide === index 
                  ? 'bg-blue-600 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              ]"
            >
              {{ section.nav }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="pt-20">
      <!-- Hero Section -->
      <section v-if="currentSlide === 0" class="min-h-screen flex items-center justify-center px-4">
        <div class="text-center max-w-4xl mx-auto">
          <div class="mb-8">
            <UIcon name="i-heroicons-cpu-chip" class="w-20 h-20 text-blue-400 mx-auto mb-6" />
          </div>
          <h1 class="text-6xl font-bold text-white mb-6 leading-tight">
            AI-Powered <span class="text-blue-400">Recruitment</span> Platform
          </h1>
          <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Revolutionary recruitment solutions that leverage artificial intelligence to transform how companies find talent and candidates discover opportunities.
          </p>
          <div class="flex justify-center space-x-4">
            <UButton size="lg" @click="currentSlide = 1" class="bg-blue-600 hover:bg-blue-700">
              Explore Business Models
            </UButton>
            <UButton size="lg" variant="outline" @click="currentSlide = 2" class="border-white/30 text-white hover:bg-white/10">
              View AI Features
            </UButton>
          </div>
        </div>
      </section>

      <!-- Business Models Section -->
      <section v-if="currentSlide === 1" class="min-h-screen py-20 px-4">
        <div class="container mx-auto max-w-6xl">
          <h2 class="text-4xl font-bold text-white text-center mb-16">Core Business Models</h2>
          
          <div class="grid md:grid-cols-2 gap-8 mb-16">
            <!-- Niche-Focused Platforms -->
            <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all">
              <UIcon name="i-heroicons-target" class="w-12 h-12 text-blue-400 mb-4" />
              <h3 class="text-2xl font-bold text-white mb-4">Niche-Focused Platforms</h3>
              <div class="space-y-3">
                <div class="flex items-center text-gray-300">
                  <UIcon name="i-heroicons-code-bracket" class="w-5 h-5 text-green-400 mr-3" />
                  Tech talent marketplace with AI skill assessment
                </div>
                <div class="flex items-center text-gray-300">
                  <UIcon name="i-heroicons-heart" class="w-5 h-5 text-red-400 mr-3" />
                  Healthcare professional recruitment with credential verification
                </div>
                <div class="flex items-center text-gray-300">
                  <UIcon name="i-heroicons-globe-alt" class="w-5 h-5 text-blue-400 mr-3" />
                  Remote work specialists with cultural fit matching
                </div>
                <div class="flex items-center text-gray-300">
                  <UIcon name="i-heroicons-wrench-screwdriver" class="w-5 h-5 text-orange-400 mr-3" />
                  Blue-collar job board with location-based matching
                </div>
              </div>
            </div>

            <!-- Premium Service Tiers -->
            <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all">
              <UIcon name="i-heroicons-star" class="w-12 h-12 text-yellow-400 mb-4" />
              <h3 class="text-2xl font-bold text-white mb-4">Premium Service Tiers</h3>
              <div class="space-y-3">
                <div class="flex items-center text-gray-300">
                  <UIcon name="i-heroicons-document-text" class="w-5 h-5 text-gray-400 mr-3" />
                  Basic job posting (free/low cost)
                </div>
                <div class="flex items-center text-gray-300">
                  <UIcon name="i-heroicons-cpu-chip" class="w-5 h-5 text-blue-400 mr-3" />
                  AI-enhanced candidate screening (premium)
                </div>
                <div class="flex items-center text-gray-300">
                  <UIcon name="i-heroicons-megaphone" class="w-5 h-5 text-purple-400 mr-3" />
                  Custom recruitment campaigns (enterprise)
                </div>
                <div class="flex items-center text-gray-300">
                  <UIcon name="i-heroicons-building-office" class="w-5 h-5 text-green-400 mr-3" />
                  White-label solutions for agencies
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-center space-x-4">
            <UButton @click="currentSlide = 0" variant="outline" class="border-white/30 text-white">
              Back to Overview
            </UButton>
            <UButton @click="currentSlide = 2" class="bg-blue-600 hover:bg-blue-700">
              View AI Features
            </UButton>
          </div>
        </div>
      </section>

      <!-- AI Features Section -->
      <section v-if="currentSlide === 2" class="min-h-screen py-20 px-4">
        <div class="container mx-auto max-w-6xl">
          <h2 class="text-4xl font-bold text-white text-center mb-16">AI Integration Features</h2>
          
          <div class="grid lg:grid-cols-3 gap-8">
            <!-- For Employers -->
            <div class="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/30">
              <UIcon name="i-heroicons-building-office-2" class="w-12 h-12 text-blue-400 mb-4" />
              <h3 class="text-2xl font-bold text-white mb-6">For Employers</h3>
              <div class="space-y-4">
                <div class="text-gray-300">
                  <UIcon name="i-heroicons-document-magnifying-glass" class="w-4 h-4 inline mr-2 text-blue-400" />
                  Resume screening and ranking algorithms
                </div>
                <div class="text-gray-300">
                  <UIcon name="i-heroicons-calendar" class="w-4 h-4 inline mr-2 text-blue-400" />
                  Automated interview scheduling
                </div>
                <div class="text-gray-300">
                  <UIcon name="i-heroicons-chart-bar" class="w-4 h-4 inline mr-2 text-blue-400" />
                  Skill gap analysis for job descriptions
                </div>
                <div class="text-gray-300">
                  <UIcon name="i-heroicons-currency-dollar" class="w-4 h-4 inline mr-2 text-blue-400" />
                  Salary benchmarking based on market data
                </div>
                <div class="text-gray-300">
                  <UIcon name="i-heroicons-trophy" class="w-4 h-4 inline mr-2 text-blue-400" />
                  Predictive candidate success scoring
                </div>
              </div>
            </div>

            <!-- For Job Seekers -->
            <div class="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30">
              <UIcon name="i-heroicons-user" class="w-12 h-12 text-green-400 mb-4" />
              <h3 class="text-2xl font-bold text-white mb-6">For Job Seekers</h3>
              <div class="space-y-4">
                <div class="text-gray-300">
                  <UIcon name="i-heroicons-document-text" class="w-4 h-4 inline mr-2 text-green-400" />
                  Resume optimization suggestions
                </div>
                <div class="text-gray-300">
                  <UIcon name="i-heroicons-academic-cap" class="w-4 h-4 inline mr-2 text-green-400" />
                  Skill assessment and certification paths
                </div>
                <div class="text-gray-300">
                  <UIcon name="i-heroicons-chat-bubble-left-right" class="w-4 h-4 inline mr-2 text-green-400" />
                  Interview practice with AI feedback
                </div>
                <div class="text-gray-300">
                  <UIcon name="i-heroicons-arrow-trending-up" class="w-4 h-4 inline mr-2 text-green-400" />
                  Career path recommendations
                </div>
                <div class="text-gray-300">
                  <UIcon name="i-heroicons-heart" class="w-4 h-4 inline mr-2 text-green-400" />
                  Personalized job matching
                </div>
              </div>
            </div>

            <!-- For Platform Efficiency -->
            <div class="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/30">
              <UIcon name="i-heroicons-cog-6-tooth" class="w-12 h-12 text-purple-400 mb-4" />
              <h3 class="text-2xl font-bold text-white mb-6">Platform Efficiency</h3>
              <div class="space-y-4">
                <div class="text-gray-300">
                  <UIcon name="i-heroicons-document-duplicate" class="w-4 h-4 inline mr-2 text-purple-400" />
                  Duplicate posting detection
                </div>
                <div class="text-gray-300">
                  <UIcon name="i-heroicons-tag" class="w-4 h-4 inline mr-2 text-purple-400" />
                  Automated job categorization
                </div>
                <div class="text-gray-300">
                  <UIcon name="i-heroicons-shield-check" class="w-4 h-4 inline mr-2 text-purple-400" />
                  Fraud prevention systems
                </div>
                <div class="text-gray-300">
                  <UIcon name="i-heroicons-banknotes" class="w-4 h-4 inline mr-2 text-purple-400" />
                  Dynamic pricing optimization
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex justify-center space-x-4 mt-12">
            <UButton @click="currentSlide = 1" variant="outline" class="border-white/30 text-white">
              Back to Business Models
            </UButton>
            <UButton @click="currentSlide = 3" class="bg-blue-600 hover:bg-blue-700">
              View Revenue Streams
            </UButton>
          </div>
        </div>
      </section>

      <!-- Revenue Streams Section -->
      <section v-if="currentSlide === 3" class="min-h-screen py-20 px-4">
        <div class="container mx-auto max-w-6xl">
          <h2 class="text-4xl font-bold text-white text-center mb-16">Revenue Streams</h2>
          
          <div class="grid lg:grid-cols-3 gap-8 mb-12">
            <!-- Direct Income -->
            <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <UIcon name="i-heroicons-banknotes" class="w-12 h-12 text-green-400 mb-4" />
              <h3 class="text-2xl font-bold text-white mb-6">Direct Income</h3>
              <div class="space-y-3">
                <div class="text-gray-300">• Job posting fees (tiered pricing)</div>
                <div class="text-gray-300">• Premium candidate database access</div>
                <div class="text-gray-300">• Featured listing upgrades</div>
                <div class="text-gray-300">• Recruitment agency subscriptions</div>
              </div>
            </div>

            <!-- AI-Powered Services -->
            <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <UIcon name="i-heroicons-cpu-chip" class="w-12 h-12 text-blue-400 mb-4" />
              <h3 class="text-2xl font-bold text-white mb-6">AI-Powered Services</h3>
              <div class="space-y-3">
                <div class="text-gray-300">• Custom screening assessments <span class="text-green-400">($50-200/assessment)</span></div>
                <div class="text-gray-300">• Bulk candidate analysis <span class="text-green-400">($500-2000/month)</span></div>
                <div class="text-gray-300">• Integration APIs for HR systems</div>
                <div class="text-gray-300">• White-label AI tools licensing</div>
              </div>
            </div>

            <!-- Data Monetization -->
            <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <UIcon name="i-heroicons-chart-pie" class="w-12 h-12 text-purple-400 mb-4" />
              <h3 class="text-2xl font-bold text-white mb-6">Data Monetization</h3>
              <div class="space-y-3">
                <div class="text-gray-300">• Anonymized market insights reports</div>
                <div class="text-gray-300">• Salary trend analysis subscriptions</div>
                <div class="text-gray-300">• Industry skill demand forecasting</div>
                <div class="text-gray-300">• Compliance and audit services</div>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex justify-center space-x-4">
            <UButton @click="currentSlide = 2" variant="outline" class="border-white/30 text-white">
              Back to AI Features
            </UButton>
            <UButton @click="currentSlide = 4" class="bg-blue-600 hover:bg-blue-700">
              View Competitive Advantages
            </UButton>
          </div>
        </div>
      </section>

      <!-- Competitive Advantages Section -->
      <section v-if="currentSlide === 4" class="min-h-screen py-20 px-4">
        <div class="container mx-auto max-w-6xl">
          <h2 class="text-4xl font-bold text-white text-center mb-16">Competitive Advantages</h2>
          
          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <!-- Speed & Efficiency -->
            <div class="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-sm rounded-2xl p-8 border border-orange-400/30">
              <UIcon name="i-heroicons-bolt" class="w-12 h-12 text-orange-400 mb-4" />
              <h3 class="text-2xl font-bold text-white mb-6">Speed & Efficiency</h3>
              <div class="space-y-4">
                <div class="flex items-start text-gray-300">
                  <UIcon name="i-heroicons-lightning-bolt" class="w-5 h-5 text-orange-400 mr-3 mt-0.5" />
                  <span>Instant candidate matching</span>
                </div>
                <div class="flex items-start text-gray-300">
                  <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-orange-400 mr-3 mt-0.5" />
                  <span>Automated reference checking</span>
                </div>
                <div class="flex items-start text-gray-300">
                  <UIcon name="i-heroicons-chart-bar" class="w-5 h-5 text-orange-400 mr-3 mt-0.5" />
                  <span>Real-time market rate analysis</span>
                </div>
                <div class="flex items-start text-gray-300">
                  <UIcon name="i-heroicons-document-check" class="w-5 h-5 text-orange-400 mr-3 mt-0.5" />
                  <span>Quick compliance verification</span>
                </div>
              </div>
            </div>

            <!-- Quality Improvements -->
            <div class="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-8 border border-cyan-400/30">
              <UIcon name="i-heroicons-star" class="w-12 h-12 text-cyan-400 mb-4" />
              <h3 class="text-2xl font-bold text-white mb-6">Quality Improvements</h3>
              <div class="space-y-4">
                <div class="flex items-start text-gray-300">
                  <UIcon name="i-heroicons-scale" class="w-5 h-5 text-cyan-400 mr-3 mt-0.5" />
                  <span>Bias reduction in screening</span>
                </div>
                <div class="flex items-start text-gray-300">
                  <UIcon name="i-heroicons-heart" class="w-5 h-5 text-cyan-400 mr-3 mt-0.5" />
                  <span>Better culture-fit predictions</span>
                </div>
                <div class="flex items-start text-gray-300">
                  <UIcon name="i-heroicons-puzzle-piece" class="w-5 h-5 text-cyan-400 mr-3 mt-0.5" />
                  <span>Skills-based matching over keyword matching</span>
                </div>
                <div class="flex items-start text-gray-300">
                  <UIcon name="i-heroicons-trophy" class="w-5 h-5 text-cyan-400 mr-3 mt-0.5" />
                  <span>Performance prediction modeling</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Key Metrics Dashboard -->
          <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
            <h3 class="text-2xl font-bold text-white mb-6 text-center">Expected Performance Metrics</h3>
            <div class="grid md:grid-cols-4 gap-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-400 mb-2">75%</div>
                <div class="text-gray-300">Faster Hiring Process</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-green-400 mb-2">60%</div>
                <div class="text-gray-300">Better Candidate Fit</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-400 mb-2">40%</div>
                <div class="text-gray-300">Reduced Screening Time</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-orange-400 mb-2">85%</div>
                <div class="text-gray-300">Client Satisfaction Rate</div>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex justify-center space-x-4">
            <UButton @click="currentSlide = 3" variant="outline" class="border-white/30 text-white">
              Back to Revenue Streams
            </UButton>
            <UButton @click="currentSlide = 5" class="bg-blue-600 hover:bg-blue-700">
              Technical Implementation
            </UButton>
          </div>
        </div>
      </section>

      <!-- Technical Implementation Section -->
      <section v-if="currentSlide === 5" class="min-h-screen py-20 px-4">
        <div class="container mx-auto max-w-6xl">
          <h2 class="text-4xl font-bold text-white text-center mb-16">Technical Implementation with Nuxt 4</h2>
          
          <div class="grid lg:grid-cols-2 gap-8 mb-12">
            <!-- Tech Stack -->
            <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <UIcon name="i-heroicons-code-bracket" class="w-12 h-12 text-green-400 mb-4" />
              <h3 class="text-2xl font-bold text-white mb-6">Core Technology Stack</h3>
              <div class="space-y-4">
                <div class="text-gray-300">
                  <span class="text-green-400 font-semibold">Frontend:</span> Nuxt 4, Vue 3, TypeScript, Tailwind CSS
                </div>
                <div class="text-gray-300">
                  <span class="text-blue-400 font-semibold">UI Framework:</span> @nuxt/ui for consistent components
                </div>
                <div class="text-gray-300">
                  <span class="text-purple-400 font-semibold">AI Integration:</span> OpenAI API, TensorFlow.js, Supabase Vector
                </div>
                <div class="text-gray-300">
                  <span class="text-orange-400 font-semibold">Backend:</span> Nitro server, Prisma ORM, PostgreSQL
                </div>
                <div class="text-gray-300">
                  <span class="text-red-400 font-semibold">Analytics:</span> Google Analytics 4, Mixpanel
                </div>
                <div class="text-gray-300">
                  <span class="text-cyan-400 font-semibold">Deployment:</span> Vercel, Docker, Redis caching
                </div>
              </div>
            </div>

            <!-- Key Features -->
            <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <UIcon name="i-heroicons-rocket-launch" class="w-12 h-12 text-blue-400 mb-4" />
              <h3 class="text-2xl font-bold text-white mb-6">Implementation Features</h3>
              <div class="space-y-4">
                <div class="text-gray-300">
                  <span class="text-blue-400">•</span> Server-side rendering for SEO optimization
                </div>
                <div class="text-gray-300">
                  <span class="text-green-400">•</span> Real-time chat with WebSocket integration
                </div>
                <div class="text-gray-300">
                  <span class="text-purple-400">•</span> Progressive Web App (PWA) capabilities
                </div>
                <div class="text-gray-300">
                  <span class="text-orange-400">•</span> Multi-language support with @nuxtjs/i18n
                </div>
                <div class="text-gray-300">
                  <span class="text-red-400">•</span> Advanced image optimization with @nuxt/image
                </div>
                <div class="text-gray-300">
                  <span class="text-cyan-400">•</span> Automated testing with @nuxt/test-utils
                </div>
              </div>
            </div>
          </div>

          <!-- Development Timeline -->
          <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
            <h3 class="text-2xl font-bold text-white mb-6 text-center">Development Timeline</h3>
            <div class="grid md:grid-cols-4 gap-6">
              <div class="text-center">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-white font-bold">1</span>
                </div>
                <h4 class="text-lg font-semibold text-white mb-2">Phase 1 (4-6 weeks)</h4>
                <div class="text-gray-300 text-sm">MVP Development: Core platform, user auth, basic job posting</div>
              </div>
              <div class="text-center">
                <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-white font-bold">2</span>
                </div>
                <h4 class="text-lg font-semibold text-white mb-2">Phase 2 (6-8 weeks)</h4>
                <div class="text-gray-300 text-sm">AI Integration: Resume parsing, candidate matching algorithms</div>
              </div>
              <div class="text-center">
                <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-white font-bold">3</span>
                </div>
                <h4 class="text-lg font-semibold text-white mb-2">Phase 3 (4-6 weeks)</h4>
                <div class="text-gray-300 text-sm">Advanced Features: Analytics dashboard, premium services</div>
              </div>
              <div class="text-center">
                <div class="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-white font-bold">4</span>
                </div>
                <h4 class="text-lg font-semibold text-white mb-2">Phase 4 (3-4 weeks)</h4>
                <div class="text-gray-300 text-sm">Launch Preparation: Testing, optimization, deployment</div>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex justify-center space-x-4">
            <UButton @click="currentSlide = 4" variant="outline" class="border-white/30 text-white">
              Back to Advantages
            </UButton>
            <UButton @click="currentSlide = 0" class="bg-blue-600 hover:bg-blue-700">
              Back to Start
            </UButton>
          </div>
        </div>
      </section>
    </div>

    <!-- Slide Indicator -->
    <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
      <button 
        v-for="(section, index) in sections" 
        :key="index"
        @click="currentSlide = index"
        :class="[
          'w-3 h-3 rounded-full transition-all',
          currentSlide === index ? 'bg-blue-400' : 'bg-white/30 hover:bg-white/50'
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Page configuration
definePageMeta({
  title: 'AI Recruitment Platform Presentation',
  description: 'Comprehensive presentation of AI-powered recruitment website business models and features'
})

// Reactive state
const currentSlide = ref(0)

// Sections configuration
const sections = [
  { nav: 'Overview', title: 'AI-Powered Recruitment Platform' },
  { nav: 'Business Models', title: 'Core Business Models' },
  { nav: 'AI Features', title: 'AI Integration Features' },
  { nav: 'Revenue', title: 'Revenue Streams' },
  { nav: 'Advantages', title: 'Competitive Advantages' },
  { nav: 'Technical', title: 'Technical Implementation' }
]

// Keyboard navigation
onMounted(() => {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' && currentSlide.value > 0) {
      currentSlide.value--
    } else if (event.key === 'ArrowRight' && currentSlide.value < sections.length - 1) {
      currentSlide.value++
    }
  }
  
  window.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})

// Auto-advance slides (optional - can be toggled)
const autoAdvance = ref(false)
const autoAdvanceInterval = ref<NodeJS.Timeout | null>(null)

const toggleAutoAdvance = () => {
  autoAdvance.value = !autoAdvance.value
  
  if (autoAdvance.value) {
    autoAdvanceInterval.value = setInterval(() => {
      if (currentSlide.value < sections.length - 1) {
        currentSlide.value++
      } else {
        currentSlide.value = 0 // Loop back to start
      }
    }, 10000) // 10 seconds per slide
  } else if (autoAdvanceInterval.value) {
    clearInterval(autoAdvanceInterval.value)
    autoAdvanceInterval.value = null
  }
}

// Smooth scroll to section when slide changes
watch(currentSlide, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// SEO and meta management
useSeoMeta({
  title: 'AI Recruitment Platform - Business Presentation',
  ogTitle: 'AI-Powered Recruitment Platform',
  description: 'Comprehensive business model presentation for AI-powered recruitment solutions with Nuxt 4 implementation details.',
  ogDescription: 'Revolutionary recruitment platform leveraging artificial intelligence for better hiring outcomes.',
  ogImage: '/images/recruitment-platform-og.jpg',
  twitterCard: 'summary_large_image',
})

// Analytics tracking for slide progression
const trackSlideView = (slideIndex: number, slideName: string) => {
  // Google Analytics 4 event tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'slide_view', {
      slide_index: slideIndex,
      slide_name: slideName,
      presentation: 'ai_recruitment_platform'
    })
  }
  
  // Optional: Mixpanel tracking
  if (typeof window !== 'undefined' && (window as any).mixpanel) {
    (window as any).mixpanel.track('Slide Viewed', {
      slide_index: slideIndex,
      slide_name: slideName,
      timestamp: new Date().toISOString()
    })
  }
}

// Track slide changes
watch(currentSlide, (newSlide) => {
  trackSlideView(newSlide, sections[newSlide].title)
})

// Presentation controls
const isPresentationMode = ref(false)
const togglePresentationMode = () => {
  isPresentationMode.value = !isPresentationMode.value
  
  if (isPresentationMode.value) {
    document.documentElement.requestFullscreen?.()
  } else {
    document.exitFullscreen?.()
  }
}

// Export/share functionality
const sharePresentation = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'AI Recruitment Platform Presentation',
        text: 'Check out this AI-powered recruitment platform business model presentation',
        url: window.location.href
      })
    } catch (error) {
      console.log('Share failed:', error)
    }
  } else {
    // Fallback: copy URL to clipboard
    await navigator.clipboard.writeText(window.location.href)
    // Show toast notification (assuming you have a toast system)
    console.log('URL copied to clipboard')
  }
}

// Print presentation as PDF (optional)
const printPresentation = () => {
  window.print()
}

// Cleanup on unmount
onUnmounted(() => {
  if (autoAdvanceInterval.value) {
    clearInterval(autoAdvanceInterval.value)
  }
})

// Computed properties for enhanced UX
const isFirstSlide = computed(() => currentSlide.value === 0)
const isLastSlide = computed(() => currentSlide.value === sections.length - 1)
const currentSection = computed(() => sections[currentSlide.value])
const progressPercentage = computed(() => 
  ((currentSlide.value + 1) / sections.length) * 100
)

// Touch/swipe navigation for mobile
let touchStartX = 0
let touchEndX = 0

const handleTouchStart = (event: TouchEvent) => {
  touchStartX = event.changedTouches[0].screenX
}

const handleTouchEnd = (event: TouchEvent) => {
  touchEndX = event.changedTouches[0].screenX
  handleSwipeGesture()
}

const handleSwipeGesture = () => {
  const swipeThreshold = 50
  const swipeDistance = touchEndX - touchStartX
  
  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0 && !isFirstSlide.value) {
      // Swipe right - go to previous slide
      currentSlide.value--
    } else if (swipeDistance < 0 && !isLastSlide.value) {
      // Swipe left - go to next slide
      currentSlide.value++
    }
  }
}

// Add touch event listeners on mount
onMounted(() => {
  document.addEventListener('touchstart', handleTouchStart)
  document.addEventListener('touchend', handleTouchEnd)
  
  onUnmounted(() => {
    document.removeEventListener('touchstart', handleTouchStart)
    document.removeEventListener('touchend', handleTouchEnd)
  })
})
</script>