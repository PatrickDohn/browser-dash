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
import { Button } from "./ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function Search() {
  const [value, setValue] = React.useState<string>("")

  const goSearch = () => {
    window.location.href = `https://www.google.com/search?q=${value}`
  }

  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="inline-start-input">Google</FieldLabel>
      <InputGroup className="h-12! w-full! rounded-2xl">
        <InputGroupInput
          className="text-xl!"
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
                  size="icon-xs"
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
                <DropdownMenuItem>Open location</DropdownMenuItem>
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
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Copy path</DropdownMenuItem>
                <DropdownMenuItem>Open location</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription></FieldDescription>
    </Field>
  )
}
