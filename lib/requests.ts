import request, { gql } from "graphql-request";

import {
  GetPostsArgs,
  GetPostsResponse,
  SubscribeToNewsletterResponse,
  PublicationName,
  GetPostBySlugResponse,
  Post,
} from "@/lib/types";


export async function getBlogName() {
  const query = gql`
    query getBlogName($publicationId: ObjectId!) {
      publication(id: $publicationId) {
        title
        displayTitle
        favicon
      }
    }
  `;
}

export async function getPosts({ first = 9, pageParam = "" }: GetPostsArgs) {
  const query = gql`
    query Publication {
    publication(host: "bugemauniversity.hashnode.dev") {
      isTeam
      title
      posts(first: 3) {
        edges {
          node {
            title
            brief
            url
            slug
            content{
              text
            }
            coverImage {
              url
            }
            publishedAt
            reactionCount
            author {
              name
              profilePicture
              tagline
            }
          }
        }
      }
    }
  }
  `;
}

export async function subscribeToNewsletter(email: string) {
  const mutation = gql`
    mutation subscribeToNewsletter($publicationId: ObjectId!, $email: String!) {
      subscribeToNewsletter(
        input: { email: $email, publicationId: $publicationId }
      ) {
        status
      }
    }
  `;
}
