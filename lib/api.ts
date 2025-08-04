import { prisma } from "./prisma"

export async function getEvents(limit?: number) {
  try {
    const events = await prisma.websiteEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        comments: {
          where: { isApproved: true },
          orderBy: { createdAt: "desc" },
        },
        creator: {
          select: { name: true },
        },
      },
    })
    return events
  } catch (error) {
    console.error("Error fetching events:", error)
    return []
  }
}

export async function getEventById(id: string) {
  try {
    const event = await prisma.websiteEvent.findUnique({
      where: { id },
      include: {
        comments: {
          where: { isApproved: true },
          orderBy: { createdAt: "desc" },
        },
        creator: {
          select: { name: true },
        },
      },
    })
    return event
  } catch (error) {
    console.error("Error fetching event:", error)
    return null
  }
}

export async function getNews(limit?: number) {
  try {
    const news = await prisma.websiteNews.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        comments: {
          where: { isApproved: true },
          orderBy: { createdAt: "desc" },
        },
        creator: {
          select: { name: true },
        },
      },
    })
    return news
  } catch (error) {
    console.error("Error fetching news:", error)
    return []
  }
}

export async function getNewsById(id: string) {
  try {
    const news = await prisma.websiteNews.findUnique({
      where: { id },
      include: {
        comments: {
          where: { isApproved: true },
          orderBy: { createdAt: "desc" },
        },
        creator: {
          select: { name: true },
        },
      },
    })
    return news
  } catch (error) {
    console.error("Error fetching news:", error)
    return null
  }
}

export async function addEventComment(eventId: string, name: string, email: string, comment: string) {
  try {
    const newComment = await prisma.websiteEventComment.create({
      data: {
        eventId,
        name,
        email,
        comment,
        isApproved: false, // Comments need approval
      },
    })
    return newComment
  } catch (error) {
    console.error("Error adding event comment:", error)
    throw error
  }
}

export async function addNewsComment(newsId: string, name: string, email: string, comment: string) {
  try {
    const newComment = await prisma.websiteNewsComment.create({
      data: {
        newsId,
        name,
        email,
        comment,
        isApproved: false, // Comments need approval
      },
    })
    return newComment
  } catch (error) {
    console.error("Error adding news comment:", error)
    throw error
  }
}
