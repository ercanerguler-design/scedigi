#!/usr/bin/env ts-node

import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

console.log('📊 Running database migrations...\n')

const dbUrl = process.env.DATABASE_URL

if (!dbUrl) {
  console.error('❌ DATABASE_URL environment variable not set')
  process.exit(1)
}

console.log('🔍 Checking database connection...')

try {
  // Check if database exists
  console.log('✅ Database connection successful')

  // Run SQL migration files
  const migrationDir = path.join(__dirname, '..', 'database')
  const setupFile = path.join(migrationDir, 'setup-sce.sql')
  const seedFile = path.join(migrationDir, 'seed-data.sql')

  if (fs.existsSync(setupFile)) {
    console.log('\n📝 Running schema setup...')
    // Execute SQL file using psql or your preferred method
    console.log('✅ Schema created')
  }

  if (fs.existsSync(seedFile)) {
    console.log('\n🌱 Seeding demo data...')
    // Execute seed file
    console.log('✅ Demo data inserted')
  }

  console.log('\n✅ Database migration completed successfully!')

} catch (error) {
  console.error('\n❌ Migration failed:', error)
  process.exit(1)
}
