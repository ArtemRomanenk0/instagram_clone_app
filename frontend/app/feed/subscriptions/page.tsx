'use client'

import Feed from "@/app/scr/components/Feed"



export default function SubscriptionsFeed() {
  return (
    <Feed endpoint="/api/v1/posts/feed" />
  )
}