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

    // Fetch leads data
    const [leads, avgScore] = await Promise.all([
      prisma.lead.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.lead.aggregate({
        where: whereClause,
        _avg: { score: true }
      })
    ])

    // Group by status
    const byStatus = leads.reduce((acc: any[], lead) => {
      const existing = acc.find(item => item.status === lead.status)
      if (existing) {
        existing.count++
      } else {
        acc.push({ status: lead.status, count: 1 })
      }
      return acc
    }, [])

    // Group by source
    const bySource = leads.reduce((acc: any[], lead) => {
      const source = lead.source || 'unknown'
      const existing = acc.find(item => item.source === source)
      if (existing) {
        existing.count++
      } else {
        acc.push({ source, count: 1 })
      }
      return acc
    }, [])

    return NextResponse.json({
      totalLeads: leads.length,
      byStatus,
      bySource,
      avgScore: avgScore._avg.score || 0,
      recentLeads: leads.slice(0, 10)
    })
  } catch (error) {
    console.error('Error generating lead report:', error)
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 })
  }
}
