import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET all proposals for user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const proposals = await prisma.proposal.findMany({
      where: { userId: user.id },
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(proposals)
  } catch (error) {
    console.error('Error fetching proposals:', error)
    return NextResponse.json({ error: 'Failed to fetch proposals' }, { status: 500 })
  }
}

// POST create new proposal
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    const { title, clientName, clientEmail, clientPhone, validUntil, notes, items, tax } = body

    if (!title || !clientName || !clientEmail || !validUntil || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice), 0)
    const taxAmount = tax || (subtotal * 0.18) // Default 18% VAT
    const total = subtotal + taxAmount

    const proposal = await prisma.proposal.create({
      data: {
        title,
        clientName,
        clientEmail,
        clientPhone,
        validUntil: new Date(validUntil),
        notes,
        subtotal,
        tax: taxAmount,
        total,
        userId: user.id,
        items: {
          create: items.map((item: any) => ({
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.quantity * item.unitPrice
          }))
        }
      },
      include: { items: true }
    })

    return NextResponse.json(proposal, { status: 201 })
  } catch (error) {
    console.error('Error creating proposal:', error)
    return NextResponse.json({ error: 'Failed to create proposal' }, { status: 500 })
  }
}
