import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { leadId, updates } = body

    console.log(`Updating lead ${leadId}:`, updates)

    return NextResponse.json({
      success: true,
      leadId,
      updates,
      message: 'Lead updated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Lead update failed' },
      { status: 500 }
    )
  }
}
