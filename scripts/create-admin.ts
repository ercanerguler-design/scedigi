import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Creating admin user...')

  const hashedPassword = await bcrypt.hash('Admin123!', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@sceinnovation.com' },
    update: {},
    create: {
      email: 'admin@sceinnovation.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin'
    }
  })

  console.log('Admin user created:', {
    email: admin.email,
    name: admin.name,
    role: admin.role
  })

  console.log('\nAdmin Login Credentials:')
  console.log('Email: admin@sceinnovation.com')
  console.log('Password: Admin123!')
}

main()
  .catch((e) => {
    console.error('Error creating admin:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
