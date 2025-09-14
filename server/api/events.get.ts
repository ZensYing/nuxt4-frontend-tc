type EventSection = {
  id: string
  name: string
}

type EventSectionResponse = {
  data: EventSection[]
}

export default defineEventHandler(async (event) => {
  const { data } = await $fetch<EventSectionResponse>('/items/event_section', {
    baseURL: 'https://admin.baksey.asia',
    params: {
      'filter[status]': 'published',
      'fields': 'id,name'
    },
    headers: {
      'Authorization': `Bearer ${process.env.DIRECTUS_TOKEN}`
    }
  })

  return { data }
})