import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    contacts: [
      { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', type: 'lead' },
      { id: 2, name: 'Zeynep Kaya', email: 'zeynep@example.com', type: 'customer' },
    ]
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({
      success: true,
      contact: { id: Date.now(), ...body }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Contact creation failed' },
      { status: 500 }
    )
  }
}
