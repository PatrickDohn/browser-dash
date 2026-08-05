/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useGmailMessages } from "@/hooks/useGmailMessages"

function getHeader(message: any, name: string) {
  return message.payload.headers.find((h: any) => h.name === name)?.value ?? ""
}

export default function InboxPreview() {
  const { data: messages, isPending, error } = useGmailMessages()

  if (isPending) return <p>Loading emails...</p>
  if (error) return <p>Failed to load emails</p>

  return (
    <ul className="flex flex-col gap-2">
      {messages?.map((msg) => (
        <li key={msg.id} className="border-b pb-2">
          <p className="font-medium">{getHeader(msg, "From")}</p>
          <p className="text-sm text-gray-600">{getHeader(msg, "Subject")}</p>
          <p className="truncate text-sm text-gray-400">{msg.snippet}</p>
        </li>
      ))}
    </ul>
  )
}
