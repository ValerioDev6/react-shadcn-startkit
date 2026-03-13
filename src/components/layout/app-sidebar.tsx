import { useLayout } from "@/core/context/layout-provider"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar"
import { sidebarData } from "./data/sidebar-data"
import { NavGroup } from "./nav-group"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"

const AppSidebar = () => {
  const { collapsible, variant } = useLayout()
  return (
    <>
      <Sidebar collapsible={collapsible} variant={variant}>
        <SidebarHeader>
          <TeamSwitcher teams={sidebarData.teams}></TeamSwitcher>
        </SidebarHeader>
        <SidebarContent>
          {sidebarData.navGroups.map((props) => (
            <NavGroup key={props.title} {...props} />
          ))}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={sidebarData.user} />
        </SidebarFooter>
      </Sidebar>
    </>
  )
}

export default AppSidebar
