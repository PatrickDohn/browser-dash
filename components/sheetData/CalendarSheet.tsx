import { Button } from "@/components/ui/button"

import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { useAppData } from "@/app/context/AppContext"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

import { Label } from "../ui/label"
import {
  BadgeCheckIcon,
  ChevronRightIcon,
  CircleX,
  TextAlignStart,
  Users,
} from "lucide-react"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "../ui/item"

const confirmationCheck = (status: string) => {
  console.log(status, "STATUS")
  switch (status) {
    case "accepted":
      return <BadgeCheckIcon className="size-5 text-emerald-500" />
    case "declined":
      return <CircleX className="size-5 text-red-500" />
    default:
      return null
  }
}

function formatEventRange(start: string | undefined, end: string | undefined) {
  if (start === undefined || end == undefined) {
    return ""
  }

  const sDate = new Date(start)
  const eDate = new Date(end)
  const datePart = sDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }) // "Friday, August 7"

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  const startTime = timeFormatter.format(sDate) // "12:30 PM"
  const endTime = timeFormatter.format(eDate) // "2:00 PM"

  return `${datePart}⋅${startTime} – ${endTime}`
}

export const CalendarSheet = () => {
  const { sheetState } = useAppData()
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Calendar</SheetTitle>
      </SheetHeader>
      {sheetState.eventData !== null
        ? sheetState.eventData?.map((event, i) => (
            <Card key={i} className="w-full max-w-sm ring-2">
              <CardHeader>
                <CardTitle>{event.summary}</CardTitle>
                <CardDescription className="flex flex-col">
                  <p>
                    {formatEventRange(event.start.dateTime, event.end.dateTime)}
                  </p>
                </CardDescription>
                <CardAction></CardAction>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">
                        <TextAlignStart size={12} />
                        {event.description}
                      </Label>
                    </div>
                  </div>
                  {event.calendar.includes("Holiday") ||
                  event.attendees === undefined ? null : (
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">
                          <Users size={12} />
                          {event.attendees.length} Guests
                        </Label>
                      </div>
                      {event.attendees.map((a, i) => (
                        <div key={i}>
                          <Item
                            variant="outline"
                            size="xs"
                            render={
                              <a href="#">
                                <ItemMedia>
                                  {confirmationCheck(a.responseStatus)}
                                </ItemMedia>
                                <ItemContent>
                                  <ItemTitle>{a.email}</ItemTitle>
                                </ItemContent>
                                <ItemActions>
                                  <ChevronRightIcon className="size-4" />
                                </ItemActions>
                              </a>
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                  Go to google
                </Button>
              </CardFooter>
            </Card>
          ))
        : null}

      <SheetFooter>
        <SheetClose render={<Button variant="outline">Close</Button>} />
      </SheetFooter>
    </SheetContent>
  )
}
