import { NextResponse } from "next/server"
import { addEventComment } from "@/lib/api"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name, email, comment } = await request.json()

    if (!name || !email || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newComment = await addEventComment(params.id, name, email, comment)
    return NextResponse.json({
      message: "Comment submitted successfully. It will be visible after approval.",
      comment: newComment,
    })
  } catch (error) {
    console.error("Error adding event comment:", error)
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 })
  }
}
