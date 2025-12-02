import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, source, message, score = 50 } = body

    // Create new lead
    const lead = {
      id: Date.now(),
      name,
      email,
      phone: phone || '',
      company: company || '',
      source: source || 'Direct',
      score,
      status: score > 70 ? 'hot' : score > 50 ? 'warm' : 'cold',
      message: message || '',
      createdAt: new Date().toISOString()
    }

    console.log('New lead created:', lead)

    return NextResponse.json({
      success: true,
      lead,
      message: 'Lead başarıyla oluşturuldu!'
    })
  } catch (error) {
    console.error('Lead creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Lead oluşturulamadı' },
      { status: 500 }
    )
  }
}
