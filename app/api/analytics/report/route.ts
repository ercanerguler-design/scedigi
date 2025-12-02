import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const metrics = searchParams.get('metrics')?.split(',')

  return NextResponse.json({
    report: {
      period: { start: startDate, end: endDate },
      metrics: {
        pageviews: 245800,
        visitors: 12453,
        sessions: 18924,
        bounceRate: 42.3,
        avgSessionDuration: 204, // seconds
        conversions: 342
      },
      channels: [
        { name: 'Organic Search', visitors: 5820, conversions: 145 },
        { name: 'Social Media', visitors: 3245, conversions: 82 },
        { name: 'Direct', visitors: 2134, conversions: 68 },
        { name: 'Email', visitors: 1254, conversions: 47 }
      ]
    }
  })
}
