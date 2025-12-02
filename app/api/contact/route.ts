import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, message } = body

    // Resend ile email gönder
    const { data, error } = await resend.emails.send({
      from: 'SCE Innovation <onboarding@resend.dev>', // Test için resend domain
      to: ['info@sceinnovation.com'], // Kendi emailinizi buraya koyun
      subject: `Yeni İletişim Formu - ${name}`,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Şirket:</strong> ${company}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Bu mesaj SCE Innovation web sitesinden gönderildi.</small></p>
      `
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { success: false, error: 'Email gönderilemedi' },
        { status: 500 }
      )
    }

    // Lead olarak da kaydet
    await fetch('http://localhost:3001/api/leads/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        company,
        source: 'Website Contact Form',
        message,
        score: 60
      })
    })

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
