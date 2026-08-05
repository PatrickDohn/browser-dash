/* eslint-disable @next/next/no-img-element */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import Link from "next/link"

import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "./ui/item"
import { ChevronRightIcon } from "lucide-react"
import { useAppData, useAppDispatch } from "@/app/context/AppContext"
import { Button } from "./ui/button"
import InboxPreview from "./Mail"

export function TabsLine() {
  const { favirotes, sheetState } = useAppData()
  const dispatch = useAppDispatch()

  const topThree = favirotes.slice(0, 3)

  return (
    <Tabs defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger value="overview">Favorites</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardContent className="text-sm">
            {topThree.map((favorite, index) => (
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
            <Item
              size="xs"
              className="rounded-lg"
              render={
                <ItemContent>
                  <Button
                    onClick={() =>
                      dispatch?.({
                        type: "SET_SHEET_STATE",
                        payload: {
                          isOpen: !sheetState.isOpen,
                          context: "favorites",
                        },
                      })
                    }
                  >
                    <ItemTitle>View All Favorites</ItemTitle>
                  </Button>
                </ItemContent>
              }
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              <InboxPreview />
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You have 12 active projects and 3 pending tasks.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
