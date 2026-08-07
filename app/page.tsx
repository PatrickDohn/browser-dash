"use client"

import { SheetDemo } from "@/components/AppSheet"
import { CustomCalendar } from "@/components/Calendar"
import { Search } from "@/components/Search"
import { Settings } from "@/components/Settings"
import { TabsLine } from "@/components/Tab"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Weather } from "@/components/Weather"

export default function Page() {
  return (
    <div className="grid h-screen grid-cols-4 gap-4 p-6 sm:grid-cols-1 md:grid-cols-4">
      <div className="col-span-1 rounded-lg p-4">
        <Card className="mb-4 p-0">
          <CardContent className="p-0">
            <CustomCalendar />
          </CardContent>
        </Card>
        <Separator orientation="horizontal" className="mt-4 mb-4 h-full" />
        <Card>
          <CardHeader>
            <CardTitle>Notes pad?</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
      <div className="col-span-2 flex flex-col justify-between gap-4 rounded-lg border-4 p-4 pb-0">
        <div className="">
          <TabsLine />
        </div>
        <Separator orientation="horizontal" className="h-full" />
        <div className="flex items-center justify-center gap-2">
          <Search />
        </div>
        <Separator orientation="horizontal" className="h-full" />
        <Card className="">
          <CardHeader>
            <CardTitle>News? Tech related?</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <SheetDemo />
      </div>
      <div className="col-span-1 gap-4 rounded-lg p-4">
        <Settings />
        <Separator orientation="horizontal" className="mt-4 mb-4 h-full" />
        <Weather />
        <Separator orientation="horizontal" className="mt-4 mb-4 h-full" />
        <Card>
          <CardHeader>
            <CardTitle>Github info?</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
