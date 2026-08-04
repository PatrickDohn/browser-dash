/* eslint-disable @next/next/no-img-element */
"use client"
import { useQuery } from "@tanstack/react-query"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

export function Weather() {
  const { isPending, error, data } = useQuery({
    queryKey: ["weather"],
    queryFn: () =>
      fetch(`https://wttr.in/Allentown?format=j1`).then((res) => res.json()),
  })

  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-2xl">
          {data.current_condition[0].temp_F}°
        </CardTitle>
        <CardDescription>
          {data.current_condition[0].weatherDesc[0].value}
        </CardDescription>
        <CardAction>
          <img
            src={data.current_condition[0].weatherIconUrl[0].value}
            alt="Weather Icon"
            className="size-15 rounded-lg"
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex justify-between gap-2">
        <div className="flex flex-col gap-2"></div>
        <div className="flex flex-col gap-2">
          Moon: {data.weather[0].astronomy[0].moon_phase}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <div className="flex flex-col gap-2">
          Day High: {data.weather[0].maxtempF}° | Day Low:{" "}
          {data.weather[0].mintempF}°
        </div>
      </CardFooter>
    </Card>
  )
}
