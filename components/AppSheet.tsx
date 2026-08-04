import { useAppData, useAppDispatch } from "@/app/context/AppContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Content } from "./sheetData/Content"

export function SheetDemo() {
  const { sheetState } = useAppData()
  const dispatch = useAppDispatch()
  console.log("Sheet State:", sheetState.isOpen, sheetState.context) // Log the current sheet state
  return (
    <Sheet
      open={sheetState.isOpen}
      onOpenChange={() => {
        dispatch?.({
          type: "SET_SHEET_STATE",
          payload: {
            isOpen: !sheetState.isOpen,
            context: sheetState.isOpen ? null : sheetState.context,
          },
        })
      }}
    >
      <SheetTrigger />

      <Content content={sheetState.context} />
    </Sheet>
  )
}
