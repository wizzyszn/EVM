import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { Badge } from "@/components/ui/badge"
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
  import { Separator } from "@/components/ui/separator"
  import { ScrollArea } from "@/components/ui/scroll-area"
  import { User, Building, Mail, Phone, Key } from "lucide-react"
import { Row } from "@tanstack/react-table"
import { UserInt } from "@/types"
 type ViewTenantProps = {
    onClose : ()=>void,
    open : boolean,
    rowData : Row<UserInt["user"]> | null
 }
  export default function ViewTenant({rowData, open, onClose}: ViewTenantProps) {
    
    console.log(rowData?.original.properties)
    const getRoleBadgeColor = (role: UserInt["user"]["role"]) => {
      switch (role) {
        case "admin":
          return "bg-red-500"
        case "tenant":
          return "bg-green-500"
        default:
          return "bg-gray-500"
      }
    }
  
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>User Information</DialogTitle>
            <DialogDescription>Detailed information about the user.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {rowData?.original.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Badge className={getRoleBadgeColor(rowData?.original.role as ("admin" | "tenant"))}>{rowData?.original.role}</Badge>
                  
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{rowData?.original.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{rowData?.original.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <span>••••••••</span>
                </div>
                <Separator />
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                </div>
                <Separator />
                
              </CardContent>
            </Card>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    )
  }
  
  