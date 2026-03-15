"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  AudioLinesIcon,
  GalleryVerticalEndIcon,
  LayoutDashboard,
  ShieldIcon,
  TerminalIcon,
} from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      title: "Heroes",
      url: "/admin/heroes",
      icon: <ShieldIcon />,
      items: [
        { title: "Lista", url: "/admin/heroes" },
        { title: "Registrar", url: "/admin/heroes/register" },
        { title: "Buscar", url: "/admin/heroes/search" },
      ],
    },
    {
      title: "tareas",
      url: "/admin/tasks",
      icon: <ShieldIcon />,
      items: [
        { title: "Lista", url: "/admin/tasks" },
        { title: "Registrar", url: "/admin/heroes/register" },
        { title: "Buscar", url: "/admin/heroes/search" },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: <FrameIcon />,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: <PieChartIcon />,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: <MapIcon />,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} label="Navegación" />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
