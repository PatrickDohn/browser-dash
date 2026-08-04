"use client"

import { Paperclip, PictureInPictureIcon, PlusCircle } from "lucide-react"

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
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
          <Popover>
            <PopoverTrigger className="h-7 gap-1 rounded-none px-2.5">
              <PlusCircle />
            </PopoverTrigger>
            <PopoverContent className={"w-fit rounded-2xl"} align="start">
              <PopoverHeader>
                <PopoverTitle></PopoverTitle>
                <PopoverDescription>
                  <>
                    <Button className="rounded-3xl" variant={"ghost"}>
                      <PictureInPictureIcon />
                      Upload Image
                    </Button>
                  </>
                  <>
                    <Button className="rounded-3xl" variant={"ghost"}>
                      <Paperclip />
                      Upload File
                    </Button>
                  </>
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription></FieldDescription>
    </Field>
  )
}
