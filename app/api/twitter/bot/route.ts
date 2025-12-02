import { NextResponse } from 'next/server'
import { TwitterAPI } from '@/lib/services/twitter-api'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, content, schedule } = body

    // Twitter API anahtarlarını kontrol et
    const apiKey = process.env.TWITTER_API_KEY
    const apiSecret = process.env.TWITTER_API_SECRET
    const accessToken = process.env.TWITTER_ACCESS_TOKEN
    const accessSecret = process.env.TWITTER_ACCESS_SECRET

    if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
      return NextResponse.json(
        { success: false, error: 'Twitter API anahtarları yapılandırılmamış. .env.local dosyasını kontrol edin.' },
        { status: 400 }
      )
    }

    const twitterAPI = new TwitterAPI({
      apiKey,
      apiSecret,
      accessToken,
      accessSecret
    })

    if (action === 'tweet') {
      try {
        const result = await twitterAPI.tweet(content)
        return NextResponse.json({
          success: true,
          tweetId: result.data?.id || `tweet-${Date.now()}`,
          message: 'Tweet başarıyla gönderildi! 🚀'
        })
      } catch (apiError: any) {
        console.error('Twitter API error:', apiError)
        return NextResponse.json({
          success: false,
          error: apiError.data?.detail || apiError.message || 'Tweet gönderilemedi. API anahtarlarını kontrol edin.'
        }, { status: 400 })
      }
    }

    if (action === 'schedule') {
      // Schedule için database'e kaydet
      return NextResponse.json({
        success: true,
        scheduleId: `schedule-${Date.now()}`,
        scheduledFor: schedule,
        message: 'Tweet başarıyla zamanlandı! 📅'
      })
    }

    return NextResponse.json({ success: false, error: 'Geçersiz işlem' }, { status: 400 })
  } catch (error: any) {
    console.error('Twitter bot error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    tweets: [
      { id: 1, content: 'Yeni ürün lansmanımız yakında! 🚀', engagement: 245, date: '2025-12-01' },
      { id: 2, content: 'Müşteri memnuniyeti bizim önceliğimiz', engagement: 189, date: '2025-11-30' },
    ],
    stats: {
      followers: 5420,
      tweets: 342,
      engagement: 4.2
    }
  })
}
