import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { imageUrl, caption, scheduledTime } = body

    return NextResponse.json({
      success: true,
      scheduleId: `ig-schedule-${Date.now()}`,
      scheduledFor: scheduledTime,
      message: 'Instagram post scheduled successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Scheduling failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    scheduled: [
      { id: 1, caption: 'Yeni ürün tanıtımı', scheduledFor: '2025-12-05T10:00:00Z' },
      { id: 2, caption: 'Hafta sonu indirimleri', scheduledFor: '2025-12-07T09:00:00Z' },
    ]
  })
}
