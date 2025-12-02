import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { event, properties, userId } = body

    // Track analytics event
    console.log('Analytics event:', event, properties)

    return NextResponse.json({
      success: true,
      event,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Tracking failed' },
      { status: 500 }
    )
  }
}
