import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all services
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const district = searchParams.get('district')

    const where: any = { isActive: true }
    if (city) where.city = city
    if (district) where.district = district

    const services = await prisma.service.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

// POST create new service (admin only)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, address, city, district, phone, email, workingHours, services, latitude, longitude } = body

    if (!name || !address || !city || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        address,
        city,
        district,
        phone,
        email,
        workingHours,
        services: services || [],
        latitude,
        longitude
      }
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
