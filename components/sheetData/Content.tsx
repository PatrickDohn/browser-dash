import { FarvirotesSheet } from "./FavirotesSheet"

interface ContentProps {
  content: string | null
}

export const Content = ({ content }: ContentProps) => {
  switch (content) {
    case "favorites":
      return <FarvirotesSheet />
    case "analytics":
      return <div>Analytics Sheet Content</div>
    default:
      return null
  }
}
