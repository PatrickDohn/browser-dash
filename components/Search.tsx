/* eslint-disable @next/next/no-img-element */
"use client"

import {
  MoreHorizontal,
  Paperclip,
  PictureInPictureIcon,
  PlusCircle,
} from "lucide-react"

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Separator } from "./ui/separator"

export function Search() {
  const [value, setValue] = React.useState<string>("")
  const searchEngine = [
    {
      engine: "google",
      title: "Google",
      query: `https://www.google.com/search`,
      icon: "https://img.icons8.com/?size=100&id=17949&format=png&color=000000",
    },
    {
      engine: "duckduckgo",
      title: "DuckDuckGo",
      query: `https://duckduckgo.com/`,
      icon: "https://img.icons8.com/?size=100&id=aCxtdnEsaDQD&format=png&color=000000",
    },
  ]
  const [engine, setEngine] = React.useState<{
    engine: string
    title: string
    query: string
    icon: string
  }>(searchEngine[0])

  const buildquery = (engine: {
    engine: string
    title: string
    query: string
    icon: string
  }) => {
    switch (engine.engine) {
      case "google":
        return `${engine.query}?q=${value}`
      case "duckduckgo":
        return `${engine.query}?q=${encodeURIComponent(value)}&kp=-1&kl=us-en`
    }
  }

  const goSearch = () => {
    window.open(buildquery(engine), "_blank", "noopener,noreferrer")
  }

  return (
    <Field className="max-w-lg">
      <FieldLabel htmlFor="inline-start-input">
        <img
          src={engine.icon}
          alt={engine.engine}
          className="size-8 rounded-xl"
        />
        {engine.title}
      </FieldLabel>
      <InputGroup className="h-12! w-full! rounded-2xl">
        <InputGroupInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") goSearch()
          }}
          id="inline-start-input"
          placeholder="Search..."
        />
        <InputGroupAddon align="inline-start">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  aria-label="More"
                  size="icon-sm"
                >
                  <PlusCircle />
                </InputGroupButton>
              }
            />
            <DropdownMenuContent align="start" sideOffset={8} alignOffset={-4}>
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-xs">
                  <PictureInPictureIcon />
                  Upload Image
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs">
                  <Paperclip />
                  Upload File
                </DropdownMenuItem>
                <Separator orientation="horizontal" />
                <DropdownMenuItem className="text-xs">
                  Open location
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
        <InputGroupAddon align={"inline-end"}>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  aria-label="More"
                  size="icon-xs"
                >
                  <MoreHorizontal />
                </InputGroupButton>
              }
            />
            <DropdownMenuContent align="end" sideOffset={8} alignOffset={-4}>
              <DropdownMenuGroup>
                {searchEngine.map((item, i) => (
                  <DropdownMenuItem
                    onClick={() => {
                      setEngine(item)
                    }}
                    key={i}
                  >
                    {item.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription></FieldDescription>
    </Field>
  )
}
