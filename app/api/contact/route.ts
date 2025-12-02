import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message, company } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Lütfen tüm gerekli alanları doldurun.' },
        { status: 400 }
      )
    }

    // Resend ile email gönder
    const { data, error } = await resend.emails.send({
      from: 'SCE Digital CRM <onboarding@resend.dev>',
      to: ['sce@scegrup.com'],
      subject: `İletişim Formu: ${subject || 'Yeni Mesaj'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Yeni İletişim Mesajı</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1f2937; margin-top: 0;">Gönderen Bilgileri</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Ad Soyad:</td>
                  <td style="padding: 10px 0; color: #1f2937;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">E-posta:</td>
                  <td style="padding: 10px 0; color: #1f2937;"><a href="mailto:${email}" style="color: #667eea;">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Telefon:</td>
                  <td style="padding: 10px 0; color: #1f2937;">${phone}</td>
                </tr>
                ` : ''}
                ${company ? `
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Şirket:</td>
                  <td style="padding: 10px 0; color: #1f2937;">${company}</td>
                </tr>
                ` : ''}
                ${subject ? `
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Konu:</td>
                  <td style="padding: 10px 0; color: #1f2937;">${subject}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h2 style="color: #1f2937; margin-top: 0;">Mesaj</h2>
              <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
              <p>Bu mesaj SCE Digital CRM iletişim formu üzerinden gönderilmiştir.</p>
              <p style="margin-top: 10px;">
                <strong>SCE INNOVATION LTD. ŞTİ.</strong><br>
                Çetin Emeç Bulvarı 25/3 Çankaya, Ankara<br>
                <a href="tel:+908508881889" style="color: #667eea;">+90 0850 888 1 889</a> | 
                <a href="mailto:sce@scegrup.com" style="color: #667eea;">sce@scegrup.com</a>
              </p>
            </div>
          </div>
        </div>
      `
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'E-posta gönderilemedi.' },
        { status: 500 }
      )
    }

    // Lead olarak da kaydet
    try {
      const { prisma } = await import('@/lib/prisma')
      await prisma.lead.create({
        data: {
          name,
          email,
          phone: phone || '',
          company: company || '',
          source: 'Website Contact Form',
          message: message || '',
          score: 60,
          status: 'pending'
        }
      })
    } catch (leadError) {
      console.error('Lead creation error:', leadError)
      // Email gönderildi, lead kaydedilemese de devam et
    }

    return NextResponse.json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi!',
      emailId: data?.id
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}
