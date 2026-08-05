import { Button } from "@/components/ui/button"

import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import SignInButton from "../auth/GoogleAuth"

export const SettingsSheet = () => {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Settings</SheetTitle>
        <SignInButton />
      </SheetHeader>
      <div className="grid flex-1 auto-rows-min gap-6 px-4">Hello</div>
      <SheetFooter>
        <Button type="submit">Save changes</Button>
        <SheetClose render={<Button variant="outline">Close</Button>} />
      </SheetFooter>
    </SheetContent>
  )
}
