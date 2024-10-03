import { defineEventHandler, getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = query.url as string

  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'URL is required',
    })
  }

  const encodedUrl = encodeURIComponent(url)
  const apiUrl = `https://mr-apis.com/api/downloader/igm?url=${encodedUrl}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `API responded with status ${response.status}`,
      })
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw createError({
        statusCode: 500,
        statusMessage: 'API did not return JSON',
      })
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching Instagram video:', error)
    if (error instanceof Error && 'statusCode' in error) {
      throw error // Re-throw H3 errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch video data',
    })
  }
})