import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { SearchIcon, PlusCircle } from "lucide-react"

interface MaintenanceRequest {
  id: string
  tenantName: string
  propertyName: string
  description: string
  date: string
  status: "Open" | "In Progress" | "Completed"
  priority: "Low" | "Medium" | "High"
}

const dummyRequests: MaintenanceRequest[] = [
  {
    id: "1",
    tenantName: "John Doe",
    propertyName: "Sunset Apartments, Unit 101",
    description: "Leaky faucet in kitchen",
    date: "2023-06-01",
    status: "Open",
    priority: "Low",
  },
  {
    id: "2",
    tenantName: "Jane Smith",
    propertyName: "Ocean View Condos, Unit 305",
    description: "AC not working",
    date: "2023-06-05",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "3",
    tenantName: "Bob Johnson",
    propertyName: "Mountain Lodge, Cabin 7",
    description: "Broken window",
    date: "2023-06-10",
    status: "Open",
    priority: "Medium",
  },
  {
    id: "4",
    tenantName: "Alice Brown",
    propertyName: "City Center Lofts, Unit 202",
    description: "Clogged toilet",
    date: "2023-05-31",
    status: "Completed",
    priority: "High",
  },
  {
    id: "5",
    tenantName: "Charlie Wilson",
    propertyName: "Parkview Apartments, Unit 405",
    description: "Light fixture not working",
    date: "2023-06-15",
    status: "In Progress",
    priority: "Low",
  },
]

const Maintenance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredRequests = dummyRequests.filter(
    (request) =>
      (request.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || request.status.toLowerCase().replace(" ", "") === statusFilter),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Requests</CardTitle>
          <CardDescription>View and manage property maintenance requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="search">Search:</Label>
              <div className="relative">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search tenant, property, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="status">Status:</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="inprogress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.tenantName}</TableCell>
                  <TableCell>{request.propertyName}</TableCell>
                  <TableCell>{request.description}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "Completed"
                          ? "default"
                          : request.status === "In Progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.priority === "High"
                          ? "destructive"
                          : request.priority === "Medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {request.priority}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredRequests.length} of {dummyRequests.length} requests
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Maintenance Request
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Maintenance Request</DialogTitle>
                  <DialogDescription>Fill in the details for the new maintenance request.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tenant" className="text-right">
                      Tenant
                    </Label>
                    <Input id="tenant" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="property" className="text-right">
                      Property
                    </Label>
                    <Input id="property" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea id="description" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right">
                      Priority
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">Generate Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Maintenance

