<template>
  <!-- Show loading while data is being fetched -->
  <EventLoading 
    v-if="isLoading" 
    :event-section-loaded="eventSectionsReady" 
    :jobs-loaded="jobsReady" 
    :settings-loaded="settingsReady" 
  />
  
  <!-- Show main form when loading complete -->
  <EventForm v-else />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { IResponse } from '~/types/api'
import type { IEventSection } from '~/types/event_sectin'
import type { IGender } from '~/types/gender'
import type { IJob } from '~/types/job'

// Loading states for individual components
const eventSectionsReady = ref(false)
const jobsReady = ref(false)
const settingsReady = ref(false)

// Overall loading state
const isLoading = computed(() => {
  return !eventSectionsReady.value || !jobsReady.value || !settingsReady.value
})

// Simulate data loading on mount
onMounted(async () => {
  try {
    // Load event sections
    setTimeout(() => {
      eventSectionsReady.value = true
    }, 500)

    // Load job positions
    setTimeout(() => {
      jobsReady.value = true
    }, 500)

    // Load settings
    setTimeout(() => {
      settingsReady.value = true
    }, 500)

  } catch (error) {
    console.error('Error loading initial data:', error)
    // Even on error, we'll show the form after a delay
    setTimeout(() => {
      eventSectionsReady.value = true
      jobsReady.value = true
      settingsReady.value = true
    }, 3000)
  }
})

// If you want to actually load real data, replace the setTimeout calls above with:
/*
onMounted(async () => {
  try {
    // Load event sections
    const eventResponse = await $fetch<IResponse<IEventSection[]>>(
      '/items/event_section?filter[status]=published&fields=id,name',
      { baseURL: 'https://admin.baksey.asia' }
    )
    eventSectionsReady.value = true

    // Load job positions
    const jobResponse = await $fetch<IResponse<IJob[]>>(
      '/items/job?filter[status]=published&fields=id,name',
      { baseURL: 'https://admin.baksey.asia' }
    )
    jobsReady.value = true

    // Load settings
    const settingsResponse = await $fetch<IResponse<IGender[]>>(
      '/items/settings?filter[status]=published&fields=gender',
      { baseURL: 'https://admin.baksey.asia' }
    )
    settingsReady.value = true

  } catch (error) {
    console.error('Error loading data:', error)
    // Set all to ready even on error to show the form
    eventSectionsReady.value = true
    jobsReady.value = true
    settingsReady.value = true
  }
})
*/
</script>