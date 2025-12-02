#!/usr/bin/env ts-node

import { execSync } from 'child_process'

console.log('🚀 Starting SCE Digital Platform Deployment...\n')

try {
  // Build the application
  console.log('📦 Building application...')
  execSync('npm run build', { stdio: 'inherit' })

  // Run database migrations
  console.log('\n📊 Running database migrations...')
  execSync('npm run migrate', { stdio: 'inherit' })

  // Deploy to production
  console.log('\n🌐 Deploying to production...')
  // Add your deployment commands here
  // Example: execSync('vercel --prod', { stdio: 'inherit' })

  console.log('\n✅ Deployment completed successfully!')
  console.log('🎉 Your platform is now live!')

} catch (error) {
  console.error('\n❌ Deployment failed:', error)
  process.exit(1)
}
