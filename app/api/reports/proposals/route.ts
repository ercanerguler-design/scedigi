import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Parse date range from query params
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const dateFilter: any = {}
    if (startDate) {
      dateFilter.gte = new Date(startDate)
    }
    if (endDate) {
      dateFilter.lte = new Date(endDate)
    }

    const whereClause: any = { userId: user.id }
    if (Object.keys(dateFilter).length > 0) {
      whereClause.createdAt = dateFilter
    }

    // Fetch proposals data
    const [proposals, totalValue, avgValue] = await Promise.all([
      prisma.proposal.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.proposal.aggregate({
        where: whereClause,
        _sum: { totalAmount: true }
      }),
      prisma.proposal.aggregate({
        where: whereClause,
        _avg: { totalAmount: true }
      })
    ])

    // Group by status with values
    const byStatus = proposals.reduce((acc: any[], proposal) => {
      const existing = acc.find(item => item.status === proposal.status)
      if (existing) {
        existing.count++
        existing.value += proposal.totalAmount
      } else {
        acc.push({ 
          status: proposal.status, 
          count: 1,
          value: proposal.totalAmount
        })
      }
      return acc
    }, [])

    return NextResponse.json({
      totalProposals: proposals.length,
      byStatus,
      totalValue: totalValue._sum.totalAmount || 0,
      avgValue: avgValue._avg.totalAmount || 0,
      recentProposals: proposals.slice(0, 10)
    })
  } catch (error) {
    console.error('Error generating proposal report:', error)
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 })
  }
}
