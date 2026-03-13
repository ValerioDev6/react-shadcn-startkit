import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRightIcon } from "lucide-react"
import { NavLink, useLocation } from "react-router"

function isActive(url: string, currentPath: string): boolean {
  return currentPath === url
}

function isParentActive(url: string, currentPath: string): boolean {
  return currentPath.startsWith(url + "/")
}

export function NavMain({
  items,
  label,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
    items?: { title: string; url: string }[]
  }[]
  label?: string
}) {
  const location = useLocation()

  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) =>
          !item.items?.length ? (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.url, location.pathname)}
                tooltip={item.title}
              >
                <NavLink to={item.url}>
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isParentActive(item.url, location.pathname)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    isActive={isActive(item.url, location.pathname)}
                    tooltip={item.title}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive(subItem.url, location.pathname)}
                        >
                          <NavLink to={subItem.url}>
                            <span>{subItem.title}</span>
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
