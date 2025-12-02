import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all dealers
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const district = searchParams.get('district')

    const where: any = { isActive: true }
    if (city) where.city = city
    if (district) where.district = district

    const dealers = await prisma.dealer.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(dealers)
  } catch (error) {
    console.error('Error fetching dealers:', error)
    return NextResponse.json({ error: 'Failed to fetch dealers' }, { status: 500 })
  }
}

// POST create new dealer (admin only)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, address, city, district, phone, email, website, workingHours, products, latitude, longitude } = body

    if (!name || !address || !city || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const dealer = await prisma.dealer.create({
      data: {
        name,
        description,
        address,
        city,
        district,
        phone,
        email,
        website,
        workingHours,
        products: products || [],
        latitude,
        longitude
      }
    })

    return NextResponse.json(dealer, { status: 201 })
  } catch (error) {
    console.error('Error creating dealer:', error)
    return NextResponse.json({ error: 'Failed to create dealer' }, { status: 500 })
  }
}
