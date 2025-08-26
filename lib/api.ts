import { prisma } from "./prisma"

// Events API functions
export async function getEvents(limit = 10, offset = 0, includeComments = false) {
  const baseQuery = {
    take: limit,
    skip: offset,
    orderBy: { createdAt: "desc" as const },
  }

  if (includeComments) {
    return await prisma.websiteEvent.findMany({
      ...baseQuery,
      include: {
        comments: {
          where: { isApproved: true },
          orderBy: { createdAt: "desc" },
          take: 5, // Limit comments per event
        },
        creator: {
          select: { name: true },
        },
      },
    })
  }

  // Default: fetch events without comments for better performance
  return await prisma.websiteEvent.findMany({
    ...baseQuery,
    include: {
      creator: {
        select: { name: true },
      },
      _count: {
        select: { comments: { where: { isApproved: true } } },
      },
    },
  })
}

export async function getEventById(id: string) {
  return await prisma.websiteEvent.findUnique({
    where: { id },
    include: {
      comments: {
        where: { isApproved: true },
        orderBy: { createdAt: "desc" },
        take: 10, // Limit comments for single event view
      },
      creator: {
        select: { name: true },
      },
    },
  })
}

export async function addEventComment(eventId: string, name: string, email: string, comment: string) {
  return await prisma.websiteEventComment.create({
    data: {
      eventId,
      name,
      email,
      comment,
      isApproved: false,
    },
  })
}

// News API functions
export async function getNews(limit = 10, offset = 0, includeComments = false) {
  const baseQuery = {
    take: limit,
    skip: offset,
    orderBy: { createdAt: "desc" as const },
  }

  if (includeComments) {
    return await prisma.websiteNews.findMany({
      ...baseQuery,
      include: {
        comments: {
          where: { isApproved: true },
          orderBy: { createdAt: "desc" },
          take: 5, // Limit comments per news article
        },
        creator: {
          select: { name: true },
        },
      },
    })
  }

  // Default: fetch news without comments for better performance
  return await prisma.websiteNews.findMany({
    ...baseQuery,
    include: {
      creator: {
        select: { name: true },
      },
      _count: {
        select: { comments: { where: { isApproved: true } } },
      },
    },
  })
}

export async function getNewsById(id: string) {
  return await prisma.websiteNews.findUnique({
    where: { id },
    include: {
      comments: {
        where: { isApproved: true },
        orderBy: { createdAt: "desc" },
        take: 10, // Limit comments for single news view
      },
      creator: {
        select: { name: true },
      },
    },
  })
}

export async function addNewsComment(newsId: string, name: string, email: string, comment: string) {
  return await prisma.websiteNewsComment.create({
    data: {
      newsId,
      name,
      email,
      comment,
      isApproved: false,
    },
  })
}

// Newsletter functions
export async function getNewsletterSubscribers() {
  return await prisma.newsletter.findMany({
    select: { email: true },
  })
}

export async function addNewsletterSubscriber(email: string) {
  return await prisma.newsletter.upsert({
    where: { email },
    update: {},
    create: { email },
  })
}

// Related content functions
export async function getRelatedEvents(currentEventId: string, limit = 3) {
  return await prisma.websiteEvent.findMany({
    where: {
      id: { not: currentEventId },
    },
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      activity: true,
      description: true,
      date: true,
      place: true,
      photos: true,
      createdAt: true,
      creator: {
        select: { name: true },
      },
    },
  })
}

export async function getRelatedNews(currentNewsId: string, limit = 3) {
  return await prisma.websiteNews.findMany({
    where: {
      id: { not: currentNewsId },
    },
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      photos: true,
      createdAt: true,
      creator: {
        select: { name: true },
      },
    },
  })
}
