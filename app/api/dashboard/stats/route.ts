import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
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

    // Fetch all stats in parallel
    const [
      totalLeads,
      qualifiedLeads,
      avgLeadScore,
      activeCampaigns,
      totalProposals,
      proposalValue,
      completedTasks,
      totalTasks
    ] = await Promise.all([
      // Total leads
      prisma.lead.count({
        where: { userId: user.id }
      }),
      // Qualified leads
      prisma.lead.count({
        where: { 
          userId: user.id,
          status: 'qualified'
        }
      }),
      // Average lead score
      prisma.lead.aggregate({
        where: { userId: user.id },
        _avg: { score: true }
      }),
      // Active campaigns
      prisma.campaign.count({
        where: { 
          userId: user.id,
          status: 'active'
        }
      }),
      // Total proposals
      prisma.proposal.count({
        where: { userId: user.id }
      }),
      // Proposal value sum
      prisma.proposal.aggregate({
        where: { userId: user.id },
        _sum: { total: true }
      }),
      // Completed tasks
      prisma.task.count({
        where: { 
          userId: user.id,
          completed: true
        }
      }),
      // Total tasks
      prisma.task.count({
        where: { userId: user.id }
      })
    ])

    // Calculate conversion rate (qualified / total leads)
    const conversionRate = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0

    return NextResponse.json({
      totalLeads,
      qualifiedLeads,
      avgLeadScore: avgLeadScore._avg.score || 0,
      activeCampaigns,
      totalProposals,
      proposalValue: proposalValue._sum.total || 0,
      completedTasks,
      totalTasks,
      conversionRate
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
