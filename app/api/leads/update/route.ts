import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, name, email, phone, company, message, source, status, score } = body

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        company,
        message,
        source,
        status,
        score
      }
    })

    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json({ success: false, error: 'Failed to update lead' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { id } = body

    await prisma.lead.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Lead deleted' })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete lead' }, { status: 500 })
  }
}
