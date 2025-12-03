import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
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
    const { imageUrl, caption, location } = body

    // Kullanıcının Integration bilgilerini al
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { integration: true }
    })

    if (!user || !user.integration) {
      return NextResponse.json(
        { success: false, error: 'Instagram entegrasyonu yapılmamış. Lütfen Entegrasyonlar sayfasından Instagram API bilgilerinizi ekleyin.' },
        { status: 400 }
      )
    }

    const { instagramAccessToken, instagramBusinessId } = user.integration

    if (!instagramAccessToken || !instagramBusinessId) {
      return NextResponse.json(
        { success: false, error: 'Instagram API bilgileri eksik. Lütfen Entegrasyonlar sayfasından tamamlayın.' },
        { status: 400 }
      )
    }

    // Instagram Graph API kullanarak post oluştur
    console.log('Posting to Instagram:', caption, 'Business ID:', instagramBusinessId)

    // TODO: Gerçek Instagram API implementasyonu
    // const response = await fetch(`https://graph.facebook.com/v18.0/${instagramBusinessId}/media`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     image_url: imageUrl,
    //     caption: caption,
    //     access_token: instagramAccessToken
    //   })
    // })

    return NextResponse.json({
      success: true,
      postId: `ig-${Date.now()}`,
      message: 'Instagram post created successfully',
      url: 'https://instagram.com/p/example'
    })
  } catch (error) {
    console.error('Instagram post error:', error)
    return NextResponse.json(
      { success: false, error: 'Instagram post failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    posts: [
      { id: 1, caption: 'Yaz koleksiyonu 2025 ☀️', likes: 842, comments: 34 },
      { id: 2, caption: 'Özel indirimler devam ediyor!', likes: 623, comments: 21 },
    ],
    stats: {
      followers: 12500,
      posts: 156,
      engagement: 6.8
    }
  })
}
