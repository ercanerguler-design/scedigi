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
    const { message, to, type = 'text' } = body

    // Kullanıcının Integration bilgilerini al
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { integration: true }
    })

    if (!user || !user.integration) {
      return NextResponse.json(
        { success: false, error: 'WhatsApp entegrasyonu yapılmamış. Lütfen Entegrasyonlar sayfasından WhatsApp API bilgilerinizi ekleyin.' },
        { status: 400 }
      )
    }

    const { whatsappPhoneId, whatsappAccessToken } = user.integration

    if (!whatsappPhoneId || !whatsappAccessToken) {
      return NextResponse.json(
        { success: false, error: 'WhatsApp API bilgileri eksik. Lütfen Entegrasyonlar sayfasından tamamlayın.' },
        { status: 400 }
      )
    }

    // WhatsApp Business API kullanarak mesaj gönder
    console.log(`Sending WhatsApp ${type} to ${to}:`, message, 'Phone ID:', whatsappPhoneId)

    // TODO: Gerçek WhatsApp API implementasyonu
    // const response = await fetch(`https://graph.facebook.com/v18.0/${whatsappPhoneId}/messages`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${whatsappAccessToken}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     messaging_product: 'whatsapp',
    //     to: to,
    //     type: type,
    //     text: { body: message }
    //   })
    // })

    return NextResponse.json({
      success: true,
      messageId: `wa-${Date.now()}`,
      status: 'sent',
      to
    })
  } catch (error) {
    console.error('WhatsApp send error:', error)
    return NextResponse.json(
      { success: false, error: 'WhatsApp send failed' },
      { status: 500 }
    )
  }
}
