// hooks/useGmailMessages.ts
"use client"

import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

interface GmailMessage {
  id: string
  snippet: string
  payload: {
    headers: { name: string; value: string }[]
  }
}

export function useGmailMessages() {
  const { data: session, status } = useSession()

  return useQuery({
    queryKey: ["gmail-messages", session?.accessToken],
    queryFn: async () => {
      // 1. Get list of message IDs
      const baseUrl = "https://gmail.googleapis.com/gmail/v1/users/me/messages"
      const params = new URLSearchParams({
        maxResults: "3",
        q: "in:inbox -category:{social promotions updates forums}",
      })
      const listRes = await fetch(`${baseUrl}?${params.toString()}`, {
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      })
      if (!listRes.ok) throw new Error("Failed to fetch messages list")
      const listData = await listRes.json()

      // 2. Fetch full details for each message in parallel
      const messages: GmailMessage[] = await Promise.all(
        listData.messages.map(async (msg: { id: string }) => {
          const res = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
            { headers: { Authorization: `Bearer ${session?.accessToken}` } }
          )
          if (!res.ok) throw new Error(`Failed to fetch message ${msg.id}`)
          return res.json()
        })
      )

      return messages
    },
    enabled: status === "authenticated" && !!session?.accessToken,
  })
}
