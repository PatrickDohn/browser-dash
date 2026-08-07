export interface GCalEvent {
  kind: string
  etag: string
  summary: string
  description: string
  updated: string
  timeZone: string
  accessRole: string
  defaultReminders: [
    {
      method: string
      minutes: number
    },
  ]
  nextPageToken: string
  nextSyncToken: string
  items: GCalEventItem[]
}

export interface GCalEventItem {
  kind: string
  etag: string
  id: string
  status: string
  attendees: {
    email: string
    responseStatus: string
  }[]
  htmlLink: string
  created: string
  updated: string
  summary: string
  description: string
  creator: {
    email: string
    displayName: string
    self: boolean
  }
  organizer: {
    email: string
    displayName: string
    self: boolean
  }
  start: {
    dateTime: string
    timeZone: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
  transparency: string
  visibility: string
  iCalUID: string
  sequence: number
  eventType: string
}

export interface GCalendar {
  kind: string
  etag: string
  summary: string
  description: string
  updated: string
  timezone: string
  accessRole: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultReminders: any[]
  nextPageToken: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
}

export interface CalEventType {
  calendar: string
  attendees: {
    email: string
    responseStatus: string
  }[]
  description: string
  start: { dateTime?: string; date?: string; timeZone?: string }
  end: { dateTime?: string; date?: string; timeZone?: string }
  status: string
  summary: string
}
