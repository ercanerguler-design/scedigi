import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET single proposal
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const proposal = await prisma.proposal.findUnique({
      where: { id: params.id },
      include: { items: true }
    })

    if (!proposal) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 })
    }

    return NextResponse.json(proposal)
  } catch (error) {
    console.error('Error fetching proposal:', error)
    return NextResponse.json({ error: 'Failed to fetch proposal' }, { status: 500 })
  }
}

// PUT update proposal status
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { status } = body

    if (!['draft', 'sent', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const proposal = await prisma.proposal.update({
      where: { id: params.id },
      data: { status },
      include: { items: true }
    })

    return NextResponse.json(proposal)
  } catch (error) {
    console.error('Error updating proposal:', error)
    return NextResponse.json({ error: 'Failed to update proposal' }, { status: 500 })
  }
}

// DELETE proposal
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.proposal.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Proposal deleted successfully' })
  } catch (error) {
    console.error('Error deleting proposal:', error)
    return NextResponse.json({ error: 'Failed to delete proposal' }, { status: 500 })
  }
}
