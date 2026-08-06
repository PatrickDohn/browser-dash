"use client"

import * as React from "react"

import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { useGoogleCalendar } from "@/hooks/useGmailCalendar"
import { GCalEvent } from "@/types/googleCalendar"

interface CalEventType {
  calendar: string
  attendees: {
    email: string
    responseStatus: string
  }[]
  description: string
  start: {
    dateTime: string
    timeZone: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
  status: string
  summary: string
}

export function CustomCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const { data: events, isPending, error } = useGoogleCalendar()

  if (error) return <p>Failed to load calendar</p>
  if (isPending) return <p>LOAIDNG....</p>
  // console.log(events)

  const getEvents = (events: GCalEvent[]) => {
    const result = []

    for (let i = 0; i < events.length; i++) {
      const items = events[i].items.map((cal) => ({
        calendar: events[i].summary,
        attendees: cal.attendees,
        description: cal.description,
        start: cal.start,
        end: cal.end,
        status: cal.status,
        summary: cal.summary,
      }))
      result.push(...items)
    }

    return result
  }
  console.log("!!!", getEvents(events))
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg"
      captionLayout="dropdown"
      components={{
        DayButton: ({ children, modifiers, day, ...props }) => {
          return (
            <CalendarDayButton day={day} modifiers={modifiers} {...props}>
              {children}
              {!modifiers.outside && <span>8</span>}
            </CalendarDayButton>
          )
        },
      }}
    />
  )
}
