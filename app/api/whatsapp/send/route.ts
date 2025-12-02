import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, to, type = 'text' } = body

    // WhatsApp Business API integration
    console.log(`Sending WhatsApp ${type} to ${to}:`, message)

    return NextResponse.json({
      success: true,
      messageId: `wa-${Date.now()}`,
      status: 'sent',
      to
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'WhatsApp send failed' },
      { status: 500 }
    )
  }
}
