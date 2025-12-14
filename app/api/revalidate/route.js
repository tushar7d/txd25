import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    // Verify the webhook secret
    const secret = request.headers.get('x-sanity-webhook-secret')

    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Invalid webhook secret' },
        { status: 401 }
      )
    }

    // Get the webhook payload
    const body = await request.json()

    // Extract the document type from the webhook
    const documentType = body._type

    console.log('Revalidating for document type:', documentType)

    // Revalidate based on document type
    if (documentType === 'work') {
      revalidatePath('/', 'layout') // Revalidate entire site
      revalidatePath('/work')
      console.log('✅ Revalidated: /, /work')
    } else if (documentType === 'writing') {
      revalidatePath('/', 'layout') // Revalidate entire site
      revalidatePath('/writing')
      console.log('✅ Revalidated: /, /writing')
    } else {
      // Revalidate everything if document type is unknown
      revalidatePath('/', 'layout')
      console.log('✅ Revalidated: entire site')
    }

    return NextResponse.json({
      revalidated: true,
      documentType,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Error revalidating', message: error.message },
      { status: 500 }
    )
  }
}
