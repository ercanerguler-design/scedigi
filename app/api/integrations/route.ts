import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Fetch user's integrations
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { integration: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Return integration data (credentials are already stored securely)
    return NextResponse.json({
      integration: user.integration || null
    })

  } catch (error) {
    console.error('Error fetching integrations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch integrations' },
      { status: 500 }
    )
  }
}

// POST - Create or update integrations
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const data = await request.json()

    // Create or update integration
    const integration = await prisma.integration.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        // Twitter
        twitterApiKey: data.twitterApiKey,
        twitterApiSecret: data.twitterApiSecret,
        twitterAccessToken: data.twitterAccessToken,
        twitterAccessSecret: data.twitterAccessSecret,
        twitterBearerToken: data.twitterBearerToken,
        // LinkedIn
        linkedinClientId: data.linkedinClientId,
        linkedinClientSecret: data.linkedinClientSecret,
        linkedinAccessToken: data.linkedinAccessToken,
        // Instagram
        instagramAccessToken: data.instagramAccessToken,
        instagramBusinessId: data.instagramBusinessId,
        // WhatsApp
        whatsappPhoneId: data.whatsappPhoneId,
        whatsappAccessToken: data.whatsappAccessToken,
        // Google Ads
        googleAdsClientId: data.googleAdsClientId,
        googleAdsClientSecret: data.googleAdsClientSecret,
        googleAdsDeveloperToken: data.googleAdsDeveloperToken
      },
      update: {
        // Twitter
        twitterApiKey: data.twitterApiKey,
        twitterApiSecret: data.twitterApiSecret,
        twitterAccessToken: data.twitterAccessToken,
        twitterAccessSecret: data.twitterAccessSecret,
        twitterBearerToken: data.twitterBearerToken,
        // LinkedIn
        linkedinClientId: data.linkedinClientId,
        linkedinClientSecret: data.linkedinClientSecret,
        linkedinAccessToken: data.linkedinAccessToken,
        // Instagram
        instagramAccessToken: data.instagramAccessToken,
        instagramBusinessId: data.instagramBusinessId,
        // WhatsApp
        whatsappPhoneId: data.whatsappPhoneId,
        whatsappAccessToken: data.whatsappAccessToken,
        // Google Ads
        googleAdsClientId: data.googleAdsClientId,
        googleAdsClientSecret: data.googleAdsClientSecret,
        googleAdsDeveloperToken: data.googleAdsDeveloperToken,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      integration
    })

  } catch (error) {
    console.error('Error saving integrations:', error)
    return NextResponse.json(
      { error: 'Failed to save integrations' },
      { status: 500 }
    )
  }
}
