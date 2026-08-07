import { CalEventType, GCalEvent } from "@/types/googleCalendar"

/**
 * Takes events from every user calendar and return
 * a nicely formatted object with all events.
 * @param events GCalEvent
 * @returns CalEventType[]
 */
export const filterCalEvents = (events: GCalEvent[]): CalEventType[] => {
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
