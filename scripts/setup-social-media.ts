#!/usr/bin/env ts-node

console.log('🔧 Setting up Social Media Automation...\n')

const configs = [
  {
    platform: 'Twitter',
    envVars: ['TWITTER_API_KEY', 'TWITTER_API_SECRET', 'TWITTER_BEARER_TOKEN']
  },
  {
    platform: 'Instagram',
    envVars: ['INSTAGRAM_ACCESS_TOKEN', 'INSTAGRAM_BUSINESS_ACCOUNT_ID']
  },
  {
    platform: 'LinkedIn',
    envVars: ['LINKEDIN_CLIENT_ID', 'LINKEDIN_CLIENT_SECRET']
  },
  {
    platform: 'WhatsApp',
    envVars: ['WHATSAPP_PHONE_NUMBER_ID', 'WHATSAPP_ACCESS_TOKEN']
  }
]

let allConfigured = true

configs.forEach(config => {
  console.log(`\n📱 Checking ${config.platform} configuration...`)
  
  const missingVars = config.envVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    console.log(`  ⚠️  Missing environment variables:`)
    missingVars.forEach(v => console.log(`     - ${v}`))
    allConfigured = false
  } else {
    console.log(`  ✅ ${config.platform} configured successfully`)
  }
})

if (!allConfigured) {
  console.log('\n⚠️  Some platforms are not fully configured.')
  console.log('Please add missing environment variables to .env.local file.')
} else {
  console.log('\n✅ All social media platforms configured successfully!')
  console.log('🎉 You can now use social media automation features.')
}
