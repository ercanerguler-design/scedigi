import { NextResponse } from 'next/server'

// LinkedIn OAuth başlatma endpoint'i
export async function GET() {
  const clientId = process.env.LINKEDIN_CLIENT_ID
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3001'
  const redirectUri = `${baseUrl}/api/linkedin/callback`
  
  if (!clientId) {
    return NextResponse.json({ error: 'LinkedIn Client ID bulunamadı' }, { status: 400 })
  }

  // LinkedIn OAuth URL
  const scope = 'openid profile email w_member_social' // w_member_social = post paylaşma yetkisi
  const state = Math.random().toString(36).substring(7)
  
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `state=${state}&` +
    `scope=${encodeURIComponent(scope)}`

  return NextResponse.redirect(authUrl)
}
