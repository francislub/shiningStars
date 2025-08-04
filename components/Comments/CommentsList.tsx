"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, User, Calendar } from "lucide-react"

interface Comment {
  id: string
  name: string | null
  email: string | null
  comment: string
  createdAt: string
}

interface CommentsListProps {
  comments: Comment[]
  title?: string
}

export default function CommentsList({ comments, title = "Comments" }: CommentsListProps) {
  if (comments.length === 0) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          {title} ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-b-0">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{comment.name || "Anonymous"}</span>
              <Calendar className="h-4 w-4 text-gray-500 ml-auto" />
              <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
