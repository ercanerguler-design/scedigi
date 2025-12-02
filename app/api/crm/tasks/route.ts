import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    tasks: [
      { id: 1, title: 'Follow up with Ahmet', dueDate: '2025-12-05', priority: 'high' },
      { id: 2, title: 'Send proposal to Zeynep', dueDate: '2025-12-06', priority: 'medium' },
    ]
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({
      success: true,
      task: { id: Date.now(), ...body }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Task creation failed' },
      { status: 500 }
    )
  }
}
