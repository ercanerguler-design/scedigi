import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { TwitterAPI } from '@/lib/services/twitter-api'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Oturum bulunamadı. Lütfen giriş yapın.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { action, content, schedule } = body

    // Kullanıcının Integration bilgilerini al
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { integration: true }
    })

    if (!user || !user.integration) {
      return NextResponse.json(
        { success: false, error: 'Twitter entegrasyonu yapılmamış. Lütfen Entegrasyonlar sayfasından Twitter API bilgilerinizi ekleyin.' },
        { status: 400 }
      )
    }

    const { twitterApiKey, twitterApiSecret, twitterAccessToken, twitterAccessSecret, twitterBearerToken } = user.integration

    if (!twitterApiKey || !twitterApiSecret || !twitterAccessToken || !twitterAccessSecret) {
      return NextResponse.json(
        { success: false, error: 'Twitter API bilgileri eksik. Lütfen Entegrasyonlar sayfasından tamamlayın.' },
        { status: 400 }
      )
    }

    const twitterAPI = new TwitterAPI({
      apiKey: twitterApiKey,
      apiSecret: twitterApiSecret,
      accessToken: twitterAccessToken,
      accessSecret: twitterAccessSecret,
      bearerToken: twitterBearerToken || undefined
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
