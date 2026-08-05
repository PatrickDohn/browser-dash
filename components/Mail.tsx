/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useGmailMessages } from "@/hooks/useGmailMessages"
import { Item, ItemActions, ItemContent, ItemTitle } from "./ui/item"
import { CornerDownRight } from "lucide-react"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"

function getHeader(message: any, name: string): string {
  return message.payload.headers.find((h: any) => h.name === name)?.value ?? ""
}

function getRecieved(message: string): string[] {
  const msgArr = message.split("; ")
  const formattedDateTime = msgArr[1].trim()
  const date = new Date(formattedDateTime)
  const easternTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date)
  return easternTime.split(",")
}

export default function InboxPreview() {
  const { data: messages, isPending, error } = useGmailMessages()

  if (isPending)
    return (
      <div className="flex items-center gap-2">
        <Item variant="outline" size="sm">
          <Skeleton className="h-10 w-10 rounded-full" />

          <ItemTitle className="">
            <Skeleton className="h-4 w-20" />
          </ItemTitle>
          <Separator orientation="vertical" />
          <ItemContent className="w-12">
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-4 w-[250px]" />
          </ItemContent>
          <Separator orientation="vertical" />
          <ItemActions className="flex flex-col">
            <Skeleton className="h-10 w-10 rounded-full" />
          </ItemActions>
        </Item>
      </div>
    )
  if (error) return <p>Failed to load emails</p>

  return (
    <ul className="flex flex-col gap-2">
      {messages?.map((msg) => {
        const timerec = getHeader(msg, "Received")
        const fromInitials = getHeader(msg, "From").split(" ").slice(0, -1)
        const formatTime = getRecieved(timerec)

        const initials = fromInitials.map((word) => word[0]).join("")

        return (
          <Item key={msg.id} variant="outline" size="sm" className="text-white">
            <Avatar size="sm" className="bg-primary text-white">
              <AvatarFallback className="bg-primary text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <ItemTitle className="w-12 text-xs">
              {getHeader(msg, "From").split("<")[0]}
            </ItemTitle>
            <Separator orientation="vertical" />
            <ItemContent className="w-12">
              <p className="truncate text-xs font-bold text-primary">
                {getHeader(msg, "Subject")}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {msg.snippet}
              </p>
            </ItemContent>
            <Separator orientation="vertical" />
            <ItemActions className="flex flex-col">
              <p className="text-xs">{formatTime[1]}</p>
              <Button variant="outline" size="icon-sm">
                <CornerDownRight />
              </Button>
            </ItemActions>
          </Item>
        )
      })}
    </ul>
  )
}
