import { useAppData, useAppDispatch } from "@/app/context/AppContext"

import { Sheet, SheetTrigger } from "@/components/ui/sheet"

import { Content } from "./sheetData/Content"

export function SheetDemo() {
  const { sheetState } = useAppData()
  const dispatch = useAppDispatch()

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
