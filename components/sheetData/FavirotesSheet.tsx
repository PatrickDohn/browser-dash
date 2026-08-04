import { useAppData } from "@/app/context/AppContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "../ui/item"
import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"

export const FarvirotesSheet = () => {
  const { favirotes } = useAppData()
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Favirotes</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </SheetDescription>
      </SheetHeader>
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        {favirotes.map((favorite, index) => (
          <Item
            key={index}
            variant="outline"
            size="xs"
            className="mb-2 rounded-lg border-2"
            render={
              <Link href={favorite.link} target="_blank">
                <ItemMedia>
                  <img
                    src={favorite.icon}
                    alt={favorite.title}
                    className="size-5"
                  />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{favorite.title}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon className="size-4" />
                </ItemActions>
              </Link>
            }
          />
        ))}
      </div>
      <SheetFooter>
        <Button type="submit">Save changes</Button>
        <SheetClose render={<Button variant="outline">Close</Button>} />
      </SheetFooter>
    </SheetContent>
  )
}
