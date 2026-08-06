import { Button } from "@/components/ui/button"

import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import SignInButton from "../auth/GoogleAuth"
import { Separator } from "../ui/separator"

export const SettingsSheet = () => {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Settings</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-1.5 p-6">
        <SignInButton />
        <Separator />
        <h2 className="text-base font-medium text-foreground">
          Widget Selection
        </h2>
        <ul>
          <li>Calendar</li>
          <li>Favirotes</li>
          <li>Gmail</li>
          <li>Weather</li>
          <li>Notes</li>
          <li>Github</li>
        </ul>
      </div>
      <SheetFooter>
        <Button type="submit">Save changes</Button>
        <SheetClose render={<Button variant="outline">Close</Button>} />
      </SheetFooter>
    </SheetContent>
  )
}
