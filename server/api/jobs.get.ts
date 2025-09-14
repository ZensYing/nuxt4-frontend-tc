type Job = {
  id: string
  name: string
  name_kh: string
}

type JobResponse = {
  data: Job[]
}

export default defineEventHandler(async (event) => {
  const { data } = await $fetch<JobResponse>('/items/job', {
    baseURL: 'https://admin.baksey.asia',
    params: {
      'filter[status]': 'published',
      'fields': 'id,name,name_kh'
    },
    headers: {
      'Authorization': `Bearer ${process.env.DIRECTUS_TOKEN}`
    }
  })
  
  return { data }
})