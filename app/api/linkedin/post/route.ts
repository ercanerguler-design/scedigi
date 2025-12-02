import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { content } = body

    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN
    
    if (!accessToken) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'LinkedIn Access Token bulunamadı. Lütfen önce LinkedIn ile bağlantı kurun.',
          needsAuth: true
        },
        { status: 401 }
      )
    }

    // Önce kullanıcı bilgilerini al
    const profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    const userId = profileResponse.data.sub

    // LinkedIn'de post paylaş
    const postResponse = await axios.post(
      'https://api.linkedin.com/v2/ugcPosts',
      {
        author: `urn:li:person:${userId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content
            },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    )

    return NextResponse.json({
      success: true,
      postId: postResponse.data.id,
      message: 'Post LinkedIn\'de başarıyla paylaşıldı! 🎉'
    })
  } catch (error: any) {
    console.error('LinkedIn post error:', error.response?.data || error.message)
    
    if (error.response?.status === 401) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'LinkedIn token süresi dolmuş. Lütfen yeniden bağlantı kurun.',
          needsAuth: true 
        },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Post paylaşılamadı' 
      },
      { status: 500 }
    )
  }
}
