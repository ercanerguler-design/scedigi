import { NextResponse } from 'next/server'

// LinkedIn OAuth callback handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}?error=linkedin_auth_failed`)
  }

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}?error=no_code`)
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: process.env.LINKEDIN_CLIENT_ID || '',
        client_secret: process.env.LINKEDIN_CLIENT_SECRET || '',
        redirect_uri: 'http://localhost:3001/api/linkedin/callback',
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.access_token) {
      // Store token (in production, save to database)
      console.log('LinkedIn Access Token:', tokenData.access_token)
      console.log('Expires in:', tokenData.expires_in, 'seconds')
      
      return new NextResponse(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>LinkedIn Bağlantısı Başarılı</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                padding: 40px;
                max-width: 700px;
                margin: 0 auto;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
              }
              .container {
                background: white;
                padding: 40px;
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
              }
              h1 {
                color: #0077b5;
                margin: 0 0 20px 0;
                font-size: 28px;
              }
              .success {
                color: #10b981;
                font-size: 48px;
                margin-bottom: 10px;
              }
              .token-box {
                background: #f8fafc;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border: 2px solid #e2e8f0;
              }
              code {
                word-break: break-all;
                font-family: 'Courier New', monospace;
                font-size: 13px;
                color: #0f172a;
                display: block;
                line-height: 1.6;
              }
              .info {
                background: #fef3c7;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #f59e0b;
              }
              .button {
                display: inline-block;
                padding: 14px 28px;
                background: #0077b5;
                color: white;
                text-decoration: none;
                border-radius: 8px;
                margin-top: 20px;
                font-weight: 600;
                transition: all 0.3s;
              }
              .button:hover {
                background: #005885;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,119,181,0.4);
              }
              .steps {
                margin: 20px 0;
                padding: 0;
                list-style: none;
              }
              .steps li {
                padding: 10px 0;
                padding-left: 30px;
                position: relative;
              }
              .steps li:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: #10b981;
                font-weight: bold;
                font-size: 18px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="success">✅</div>
              <h1>LinkedIn Bağlantısı Başarılı!</h1>
              <p>Access Token başarıyla alındı.</p>
              
              <div class="info">
                <strong>⏱️ Token Süresi:</strong> ${Math.floor(tokenData.expires_in / 86400)} gün (${tokenData.expires_in} saniye)
              </div>

              <h3>📋 Yapılacaklar:</h3>
              <ol class="steps">
                <li>Aşağıdaki token'ı kopyalayın</li>
                <li><code>.env.local</code> dosyasını açın</li>
                <li><code>LINKEDIN_ACCESS_TOKEN=""</code> satırını bulun</li>
                <li>Token'ı tırnak içine yapıştırın</li>
                <li>Dosyayı kaydedin</li>
                <li>Uygulamayı yeniden başlatın</li>
              </ol>

              <div class="token-box">
                <strong>Access Token:</strong>
                <code id="token">${tokenData.access_token}</code>
              </div>

              <button onclick="copyToken()" class="button" style="background: #10b981; margin-right: 10px;">
                📋 Token'ı Kopyala
              </button>
              <a href="/dashboard/social-media" class="button">
                🏠 Dashboard'a Dön
              </a>

              <script>
                function copyToken() {
                  const token = document.getElementById('token').textContent;
                  navigator.clipboard.writeText(token).then(() => {
                    alert('✅ Token kopyalandı! Şimdi .env.local dosyasına yapıştırın.');
                  });
                }
              </script>
            </div>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      })
    } else {
      throw new Error('Access token alınamadı')
    }
  } catch (error) {
    console.error('LinkedIn OAuth error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}?error=token_exchange_failed`)
  }
}
