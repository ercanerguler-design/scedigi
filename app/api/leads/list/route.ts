import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const limit = parseInt(searchParams.get('limit') || '10')

  const leads = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      company: 'ABC Tech',
      email: 'ahmet@abctech.com',
      score: 85,
      status: 'hot'
    },
    {
      id: 2,
      name: 'Zeynep Kaya',
      company: 'XYZ Danışmanlık',
      email: 'zeynep@xyz.com',
      score: 72,
      status: 'warm'
    },
  ]

  const filtered = status ? leads.filter(l => l.status === status) : leads

  return NextResponse.json({
    leads: filtered.slice(0, limit),
    total: filtered.length
  })
}
