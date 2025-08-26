import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendCommentNotification } from "@/lib/email-service"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, email, comment } = await request.json()
    const newsId = params.id

    // Validate input
    if (!comment || comment.trim().length === 0) {
      return NextResponse.json({ error: "Comment is required" }, { status: 400 })
    }

    // Get the news details for the email
    const news = await prisma.websiteNews.findUnique({
      where: { id: newsId },
      select: { title: true, id: true },
    })

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 })
    }

    // Create the comment
    const newComment = await prisma.websiteNewsComment.create({
      data: {
        newsId,
        name: name || "Anonymous",
        email: email || null,
        comment: comment.trim(),
        isApproved: false, // Comments need approval
      },
    })

    // Send notification email to admin
    try {
      await sendCommentNotification(
        "news",
        news.title,
        news.id,
        name || "Anonymous",
        email || "No email provided",
        comment.trim(),
      )
      console.log("✅ Comment notification email sent to admin")
    } catch (emailError) {
      console.error("❌ Failed to send comment notification email:", emailError)
      // Don't fail the comment creation if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Comment submitted successfully and is awaiting approval",
      comment: {
        id: newComment.id,
        name: newComment.name,
        comment: newComment.comment,
        createdAt: newComment.createdAt,
        isApproved: newComment.isApproved,
      },
    })
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json({ error: "Failed to submit comment" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const newsId = params.id

    // Get approved comments only
    const comments = await prisma.websiteNewsComment.findMany({
      where: {
        newsId,
        isApproved: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        comment: true,
        createdAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      comments,
    })
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}
