// Utility functions for sending email notifications using real database data

export interface NotificationResult {
    success: boolean
    message: string
    emailsSent?: number
    emailsFailed?: number
    totalSubscribers?: number
  }
  
  /**
   * Send notification for new event using database ID
   */
  export async function sendEventNotification(eventId: string): Promise<NotificationResult> {
    try {
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"
  
      const response = await fetch(`${baseUrl}/api/newsletter/send-new-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "event",
          contentId: eventId,
        }),
      })
  
      const result = await response.json()
      return result
    } catch (error) {
      console.error("Failed to send event notification:", error)
      return {
        success: false,
        message: error.message,
      }
    }
  }
  
  /**
   * Send notification for new news using database ID
   */
  export async function sendNewsNotification(newsId: string): Promise<NotificationResult> {
    try {
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"
  
      const response = await fetch(`${baseUrl}/api/newsletter/send-new-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "news",
          contentId: newsId,
        }),
      })
  
      const result = await response.json()
      return result
    } catch (error) {
      console.error("Failed to send news notification:", error)
      return {
        success: false,
        message: error.message,
      }
    }
  }
  
  /**
   * Send notification for any content type using database ID
   */
  export async function sendContentNotification(type: "event" | "news", contentId: string): Promise<NotificationResult> {
    if (type === "event") {
      return sendEventNotification(contentId)
    } else {
      return sendNewsNotification(contentId)
    }
  }
  
  /**
   * Trigger webhook for new content
   */
  export async function triggerContentWebhook(type: "event" | "news", contentId: string): Promise<NotificationResult> {
    try {
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"
  
      const response = await fetch(`${baseUrl}/api/webhook/new-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
          action: "created",
          contentId: contentId,
        }),
      })
  
      const result = await response.json()
      return result
    } catch (error) {
      console.error("Failed to trigger webhook:", error)
      return {
        success: false,
        message: error.message,
      }
    }
  }
  