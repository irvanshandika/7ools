import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const apiUrl = 'https://mr-apis.com/api/downloader/ytbv'
  
  console.log('Sending request to API with body:', body)

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    console.log('API Response Status:', response.status)
    console.log('API Response Headers:', Object.fromEntries(response.headers.entries()))

    const responseText = await response.text()
    console.log('Raw API response:', responseText)

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError)
      return { 
        status: 'error', 
        message: 'Invalid JSON response from API',
        rawResponse: responseText,
        responseStatus: response.status,
        responseHeaders: Object.fromEntries(response.headers.entries())
      }
    }

    if (!response.ok) {
      return {
        status: 'error',
        message: data.message || `API responded with status ${response.status}`,
        data: data,
        responseStatus: response.status,
        responseHeaders: Object.fromEntries(response.headers.entries())
      }
    }

    return data
  } catch (error) {
    console.error('Error in youtube-proxy:', error)
    return { 
      status: 'error', 
      message: error instanceof Error ? error.message : 'An unknown error occurred',
      details: error instanceof Error ? error.stack : undefined
    }
  }
})