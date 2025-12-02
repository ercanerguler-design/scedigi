import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Bildirim ayarlarını basit bir şekilde localStorage/cookie'de sakla
// Gerçek uygulamada bunlar veritabanında saklanmalı

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { emailNotifications, leadNotifications, campaignNotifications, weeklyReport } = body

    // TODO: Veritabanına kaydet
    // Şimdilik başarılı dön
    
    return NextResponse.json({
      success: true,
      message: 'Bildirim ayarları güncellendi',
      settings: {
        emailNotifications,
        leadNotifications,
        campaignNotifications,
        weeklyReport
      }
    })
  } catch (error) {
    console.error('Notification update error:', error)
    return NextResponse.json(
      { error: 'Ayarlar güncellenemedi' },
      { status: 500 }
    )
  }

}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // TODO: Veritabanından çek
    // Şimdilik default değerler dön
    
    return NextResponse.json({
      emailNotifications: true,
      leadNotifications: true,
      campaignNotifications: false,
      weeklyReport: true
    })
  } catch (error) {
    console.error('Notification fetch error:', error)
    return NextResponse.json(
      { error: 'Ayarlar alınamadı' },
      { status: 500 }
    )
  }
}
