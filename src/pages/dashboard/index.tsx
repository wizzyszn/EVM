import type React from "react"
import { useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import SideNav from "@/pages/dashboard/components/SideNav"

// Note: You'll need to create these UI components or import them from a UI library
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const {
    userInfo
  } = useSelector((state : RootState) =>state.user)
  const [activeItem, setActiveItem] = useState(() => {
    const path = location.pathname.split("/")[1]
    return path.charAt(0).toUpperCase() + path.slice(1) || "Overview"
  })

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 w-full">
        <SideNav activeItem={activeItem} setActiveItem={setActiveItem} />
        <SidebarInset className="flex flex-col flex-grow overflow-hidden">
          <header className="flex h-16 items-center justify-between border-b bg-white px-4">
            <div className="flex items-center">
              <SidebarTrigger />
              <div className="ml-4 w-64">
                <Input type="search" placeholder="Search..." className="w-full" />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>{userInfo?.user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    // Implement sign out logic here
                    // For example:
                    // signOut();
                    navigate("/signin")
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 overflow-auto p-6 h-[calc(100vh-4rem)]">
            <h1 className="mb-6 text-2xl font-bold">{activeItem}</h1>
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout

