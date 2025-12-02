import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'twitter-bot',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
}
