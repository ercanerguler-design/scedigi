import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Tüm alanları doldurun' },
        { status: 400 }
      )
    }

    // Mevcut kullanıcıyı getir
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      )
    }

    // Mevcut şifreyi kontrol et
    const isValidPassword = await bcrypt.compare(currentPassword, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Mevcut şifre yanlış' },
        { status: 400 }
      )
    }

    // Yeni şifreyi hashle
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Şifreyi güncelle
    await prisma.user.update({
      where: { email: session.user.email },
      data: { password: hashedPassword }
    })

    return NextResponse.json({
      success: true,
      message: 'Şifre başarıyla güncellendi'
    })
  } catch (error) {
    console.error('Password update error:', error)
    return NextResponse.json(
      { error: 'Şifre güncellenemedi' },
      { status: 500 }
    )
  }
}
