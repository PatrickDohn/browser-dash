"use client"

import { CalEventType } from "@/types/googleCalendar"
import { createContext, ReactNode, useContext, useReducer } from "react"

type SheetContext = "favorites" | "analytics" | "settings" | "calendar" | null

interface AppProviderProps {
  children: ReactNode
}

interface Favirotes {
  link: string
  title: string
  description: string
  icon: string
}

interface AppProps {
  favirotes: Favirotes[]
  sheetState: {
    isOpen: boolean
    context: SheetContext
    eventData?: CalEventType[]
  }
}

// Actions
export type AppActions =
  | {
      type: "ADD_FAVORITE"
      payload: Favirotes
    }
  | {
      type: "SET_SHEET_STATE"
      payload: {
        isOpen: boolean
        context: SheetContext
        eventData?: CalEventType[]
      }
    }

// Create the context
const AppContext = createContext<AppProps | null>(null)

// Dispatch context
const AppDispatchContext = createContext<React.Dispatch<AppActions> | null>(
  null
)

// Provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [appData, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext value={appData}>
      <AppDispatchContext value={dispatch}>{children}</AppDispatchContext>
    </AppContext>
  )
}

export function useAppData() {
  const context = useContext(AppContext)
  if (context == null) {
    throw new Error("useAppData must be used within an AppProvider")
  }
  return context
}

// Dispatch Hook
export function useAppDispatch() {
  return useContext(AppDispatchContext)
}

function appReducer(state: AppProps, action: AppActions): AppProps {
  switch (action.type) {
    case "ADD_FAVORITE":
      return {
        ...state, // Spread the existing state
        favirotes: [...state.favirotes, action.payload], // Add the new favorite to the existing array
      } // Return the updated state
    case "SET_SHEET_STATE":
      return {
        ...state,
        sheetState: action.payload,
      }
    default:
      return state // Return the current state for unrecognized actions
  }
}

const initialState: AppProps = {
  favirotes: [
    {
      link: "https://www.google.com",
      title: "Google",
      description: "Search the web with Google.",
      icon: "https://www.google.com/favicon.ico",
    },
    {
      link: "https://www.youtube.com",
      title: "YouTube",
      description: "Watch videos on YouTube.",
      icon: "https://www.youtube.com/favicon.ico",
    },
    {
      link: "https://www.github.com",
      title: "GitHub",
      description: "Collaborate on code with GitHub.",
      icon: "https://github.githubassets.com/favicons/favicon.svg",
    },
    {
      link: "https://ui.shadcn.com",
      title: "shadcn/ui",
      description:
        "A collection of beautiful and customizable UI components for React.",
      icon: "https://ui.shadcn.com/favicon.ico",
    },
    {
      link: "https://www.reddit.com",
      title: "Reddit",
      description: "Dive into the world of Reddit.",
      icon: "https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png",
    },
    {
      link: "https://www.twitter.com",
      title: "Twitter",
      description: "Stay updated with the latest tweets.",
      icon: "https://abs.twimg.com/favicons/twitter.ico",
    },
    {
      link: "https://tuiparts.sh",
      title: "TUI Parts",
      description: "Explore TUI Parts for terminal UI components.",
      icon: "https://tuiparts.sh/favicon.ico",
    },
    {
      link: "https://www.kibo-ui.com/components/status",
      title: "Kibo UI",
      description: "A modern React component library for building UIs.",
      icon: "https://www.kibo-ui.com/favicon.ico",
    },
    {
      link: "https://www.linkedin.com",
      title: "LinkedIn",
      description: "Connect with professionals on LinkedIn.",
      icon: "https://static.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico",
    },
  ],
  sheetState: {
    isOpen: false,
    context: null,
  },
}
