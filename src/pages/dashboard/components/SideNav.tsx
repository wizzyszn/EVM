import type React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Bell,
  Building,
  FileText,
  HelpCircle,
  Home,
  PieChart,
  Settings,
  PenToolIcon as Tool,
  User,
  DollarSign,
} from "lucide-react"

// Note: You'll need to create these UI components or import them from a UI library
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  { icon: Home, label: "Overview", path: "" },
  { icon: User, label: "Tenants", path: "tenants" },
  { icon: Building, label: "Properties", path: "properties" },
  { icon: FileText, label: "Leases", path: "leases" },
  { icon: DollarSign, label: "Payments", path: "payments" },
  { icon: Tool, label: "Maintenance", path: "maintenance" },
  { icon: PieChart, label: "Reports", path: "reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: HelpCircle, label: "Help/Support", path: "/help" },
]

interface SideNavProps {
  activeItem?: string
  setActiveItem: (item: string) => void
}

const SideNav: React.FC<SideNavProps> = ({ setActiveItem }) => {
  const location = useLocation()

  return (
    <Sidebar className="border-r bg-white">
      <SidebarHeader className="border-b px-2 py-3">
        <h2 className="text-xl font-bold text-black">EVM</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    onClick={() => setActiveItem(item.label)}
                  >
                    <Link to={item.path}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default SideNav

