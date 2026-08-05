import { Item, ItemActions, ItemContent, ItemTitle } from "@/components/ui/item"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useAppData, useAppDispatch } from "@/app/context/AppContext"

import { useSession } from "next-auth/react"
import { Pill, PillIndicator } from "./Pill"

export function Settings() {
  const { sheetState } = useAppData()
  const { data: session, status } = useSession()
  const dispatch = useAppDispatch()
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline" size="sm">
        <ItemContent>
          <ItemTitle>
            {status === "authenticated" ? (
              <Pill variant="outline" className="gap-2">
                <PillIndicator pulse variant="success" />
                Online
              </Pill>
            ) : (
              <Pill variant="destructive" className="gap-2">
                <PillIndicator pulse variant="error" />
                Offline
              </Pill>
            )}
          </ItemTitle>
        </ItemContent>
        <ItemActions>
          <Avatar
            onClick={() => {
              console.log("Avatar clicked")
              dispatch?.({
                type: "SET_SHEET_STATE",
                payload: {
                  isOpen: !sheetState.isOpen,
                  context: "settings",
                },
              })
            }}
            className="bg-primary text-primary-foreground ring-green-700 hover:bg-primary/80"
          >
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback>PD</AvatarFallback>
          </Avatar>
        </ItemActions>
      </Item>
    </div>
  )
}
