"use client"

import * as React from "react"
import {
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"

import { cva, type VariantProps } from "class-variance-authority"

import { useAppData, useAppDispatch } from "@/app/context/AppContext"

import { Calendar } from "@/components/ui/calendar"
import { useGoogleCalendar } from "@/hooks/useGmailCalendar"
import { filterCalEvents } from "@/utils/filterCalEvents"
import { CalEventType } from "@/types/googleCalendar"
import { Balloon, CalendarDays } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export function CustomCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const { data: events, isPending, error } = useGoogleCalendar()

  if (error) return <p>Failed to load calendar</p>
  if (isPending) return <p>LOAIDNG....</p>
  const filterEvents = filterCalEvents(events)

  const getEventDateString = (event: CalEventType) => {
    const raw = event.start.dateTime ?? event.start.date ?? ""
    return raw.slice(0, 10) // "2026-08-06" either way
  }

  const buildEventsByDay = (filterEvents: CalEventType[]) => {
    const map = new Map<string, CalEventType[]>()
    for (const event of filterEvents) {
      const dateStr = getEventDateString(event)
      if (!dateStr) continue
      if (!map.has(dateStr)) map.set(dateStr, [])
      map.get(dateStr)!.push(event)
    }
    return map
  }

  const eventsByDay = buildEventsByDay(filterEvents)
  // console.log(events)

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="[--cell-size:--spacing(12)] md:[--cell-size:--spacing(10)]"
      captionLayout="dropdown"
      components={{
        DayButton: ({ children, modifiers, day, ...props }) => {
          return (
            <CalendarDayButton
              day={day}
              modifiers={modifiers}
              events={
                eventsByDay.get(day.date.toISOString().slice(0, 10)) ?? []
              }

              {...props}
            >
              {children}
            </CalendarDayButton>
          )
        },
      }}
    />
  )
}

const calendarDayEventsVariants = cva(
  "absolute z-10 flex items-center justify-center gap-0.5",
  {
    variants: {
      side: {
        top: "-top-1",
        bottom: "-bottom-1",
      },
      align: {
        start: "-left-1",
        end: "-right-1",
      },
    },
    defaultVariants: {
      side: "top",
      align: "end",
    },
  }
)

function CalendarDayEvents({
  side = "top",
  align = "end",
  className,
  events,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof calendarDayEventsVariants> & {
    events: CalEventType[]
  }) {
  if (events.length === 0) return null

  return (
    <div
      data-slot="calendar-day-events"
      data-side={side}
      data-align={align}
      className={cn(calendarDayEventsVariants({ side, align }), className)}
      {...props}
    >
      {events.map((event, i) => (
        <div
          key={i}
          className="flex size-4 items-center justify-center rounded-full bg-accent ring-1"
        >
          {event.calendar.includes("Holiday") ? (
            <Balloon className="size-2" />
          ) : (
            <CalendarDays className="size-2" />
          )}
        </div>
      ))}
    </div>
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  events = [],
  children,
  ...props
}: React.ComponentProps<typeof DayButton> & {
  locale?: Partial<Locale>
  events?: CalEventType[]
}) {
  const defaultClassNames = getDefaultClassNames()
  const dispatch = useAppDispatch()
  const { sheetState } = useAppData()
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-has-events={events.length > 0}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[has-events=true]:font-semibold data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
      onClick={() =>
        events.length !== 0
          ? dispatch?.({
              type: "SET_SHEET_STATE",
              payload: {
                isOpen: !sheetState.isOpen,
                context: "calendar",
                eventData: events,
              },
            })
          : null
      }
    >
      {children}
      <CalendarDayEvents events={events} />
    </Button>
  )
}

export { Calendar, CalendarDayButton, CalendarDayEvents }
