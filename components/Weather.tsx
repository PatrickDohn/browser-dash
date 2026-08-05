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
import {
  ArrowDown,
  ArrowUp,
  Droplets,
  Sunrise,
  Sunset,
  Wind,
} from "lucide-react"
import { moonPhaseIcons } from "@/app/constants/weather"

export function Weather() {
  const { isPending, error, data } = useQuery({
    queryKey: ["weather"],
    queryFn: () =>
      fetch(`https://wttr.in/Allentown?format=j1`).then((res) => res.json()),
  })

  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  const current = data.current_condition[0]
  const today = data.weather[0]
  const astronomy = today.astronomy[0]

  console.log("Weather Data:", data)

  return (
    <Card className="mb-4 overflow-hidden border-0 bg-linear-to-br from-sky-500 via-sky-600 to-indigo-700 py-0 text-white shadow-lg">
      <CardHeader className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold tracking-tight text-white">
              {current.temp_F}°
            </CardTitle>
            <CardDescription className="mt-1 text-base text-sky-100">
              {current.weatherDesc[0].value}
            </CardDescription>
          </div>
          <CardAction>
            <img
              src={current.weatherIconUrl[0].value}
              alt={current.weatherDesc[0].value}
              className="size-15 rounded-xl bg-white/10 p-1 backdrop-blur-sm"
            />
          </CardAction>
        </div>
      </CardHeader>

      <CardContent className="mt-2 grid grid-cols-2 gap-3 border-t border-white/15 py-4 pb-0">
        <div className="flex flex-col items-center gap-1">
          <Wind className="size-4 text-sky-200" />
          <span className="text-sm font-medium">
            {current.windspeedMiles} mph
          </span>
          <span className="text-xs text-sky-200">Wind</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Droplets className="size-4 text-sky-200" />
          <span className="text-sm font-medium">{current.humidity}%</span>
          <span className="text-xs text-sky-200">Humidity</span>
        </div>
        <div className="col-span-2 flex items-center justify-center gap-1">
          <img
            src={
              moonPhaseIcons[astronomy.moon_phase] ||
              "https://img.icons8.com/?size=100&id=H083uKcKQDpF&format=png&color=000000"
            }
            alt={current.weatherDesc[0].value}
            className="size-12 rounded-xl p-1"
          />
          <span className="text-sm font-medium">{astronomy.moon_phase}</span>
        </div>
      </CardContent>

      <CardFooter className="justify-between border-t border-white/15 bg-black/10 py-3">
        <div className="flex items-center gap-1.5 text-sm">
          <ArrowUp className="size-3.5 text-sky-200" />
          <span className="font-medium">{today.maxtempF}°</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <ArrowDown className="size-3.5 text-sky-200" />
          <span className="font-medium">{today.mintempF}°</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <Sunrise className="size-3.5 text-sky-200" />
          <span className="font-medium">{astronomy.sunrise}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <Sunset className="size-3.5 text-sky-200" />
          <span className="font-medium">{astronomy.sunset}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
