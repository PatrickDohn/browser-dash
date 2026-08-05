import { FarvirotesSheet } from "./FavirotesSheet"
import { SettingsSheet } from "./SettingsSheet"

interface ContentProps {
  content: string | null
}

export const Content = ({ content }: ContentProps) => {
  switch (content) {
    case "favorites":
      return <FarvirotesSheet />
    case "analytics":
      return <div>Analytics Sheet Content</div>
    case "settings":
      return <SettingsSheet />
    default:
      return null
  }
}
