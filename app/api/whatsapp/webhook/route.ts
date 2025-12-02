import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  // Webhook verification
  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }

  return new NextResponse('Forbidden', { status: 403 })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Process WhatsApp webhook events
    console.log('WhatsApp webhook received:', body)

    const { entry } = body
    if (entry && entry[0]?.changes) {
      const change = entry[0].changes[0]
      const { messages } = change.value

      if (messages) {
        const message = messages[0]
        // Handle incoming message
        console.log('Incoming message:', message)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
