import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = query.url as string

  if (!url) {
    throw createError({
      statusCode: 400,
      message: 'URL parameter is required',
    })
  }

  try {
    const response = await $fetch('https://mr-apis.com/api/downloader/fbv', {
      method: 'GET',
      params: { url },
    })
    return response
  } catch (error) {
    console.error('Error fetching Facebook video data:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch video information',
    })
  }
})