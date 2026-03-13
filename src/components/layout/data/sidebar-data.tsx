import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  List,
  Plus,
  Search,
} from "lucide-react"
import { type SidebarData } from "../types"

export const sidebarData: SidebarData = {
  user: {
    name: "satnaing",
    email: "satnaingdev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Shadcn Admin",
      logo: Command,
      plan: "Vite + ShadcnUI",
    },
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/admin",
          icon: LayoutDashboard,
        },
        {
          title: "Heroes",
          icon: List,
          items: [
            {
              title: "Listar héroes",
              url: "/admin/heroes",
            },
            {
              title: "Registrar héroe",
              url: "/admin/heroes/register",
              icon: Plus,
            },
            {
              title: "Buscar héroe",
              url: "/admin/heroes/search",
              icon: Search,
            },
          ],
        },
      ],
    },
  ],
}
