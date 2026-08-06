"use client"

import { GCalEvent } from "@/types/googleCalendar"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

export function useGoogleCalendar() {
  const { data: session, status } = useSession()

  return useQuery({
    queryKey: ["calendar", session?.accessToken],
    queryFn: async () => {
      const listCalendars = await fetch(
        "https://www.googleapis.com/calendar/v3/users/me/calendarList",
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      )
      if (!listCalendars.ok) throw new Error("Failed to fetch calendar list")

      const listData = await listCalendars.json()

      const calendarEvents: GCalEvent[] = await Promise.all(
        listData.items.map(async (cal: { id: string }) => {
          const now = new Date()
          const timeMin = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
          ).toISOString()
          const timeMax = new Date(
            now.getFullYear() + 1,
            now.getMonth(),
            now.getDate()
          ).toISOString()

          const res = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(cal.id)}/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime`,
            {
              headers: { Authorization: `Bearer ${session?.accessToken}` },
            }
          )
          if (!res.ok) throw new Error(`Failed to fetch events ${cal.id}`)
          return res.json()
        })
      )
      return calendarEvents
    },
    enabled: status === "authenticated" && !!session?.accessToken,
  })
}
