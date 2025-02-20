"use client"

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
import { PlusCircle, SearchIcon } from "lucide-react"

interface Lease {
  id: string
  tenantName: string
  propertyName: string
  startDate: string
  endDate: string
  monthlyRent: number
  status: "Active" | "Expiring Soon" | "Expired" | "Terminated"
}

const dummyLeases: Lease[] = [
  {
    id: "1",
    tenantName: "John Doe",
    propertyName: "Sunset Apartments, Unit 101",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    monthlyRent: 1200,
    status: "Active",
  },
  {
    id: "2",
    tenantName: "Jane Smith",
    propertyName: "Ocean View Condos, Unit 305",
    startDate: "2023-03-15",
    endDate: "2024-03-14",
    monthlyRent: 1500,
    status: "Active",
  },
  {
    id: "3",
    tenantName: "Bob Johnson",
    propertyName: "Mountain Lodge, Cabin 7",
    startDate: "2022-07-01",
    endDate: "2023-06-30",
    status: "Expiring Soon",
    monthlyRent: 1000,
  },
  {
    id: "4",
    tenantName: "Alice Brown",
    propertyName: "City Center Lofts, Unit 202",
    startDate: "2022-01-01",
    endDate: "2022-12-31",
    status: "Expired",
    monthlyRent: 1800,
  },
  {
    id: "5",
    tenantName: "Charlie Wilson",
    propertyName: "Parkview Apartments, Unit 405",
    startDate: "2023-05-01",
    endDate: "2024-04-30",
    status: "Active",
    monthlyRent: 1300,
  },
]

const Leases: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [leases, setLeases] = useState<Lease[]>(dummyLeases)

  const filteredLeases = leases.filter(
    (lease) =>
      (lease.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lease.propertyName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || lease.status.toLowerCase() === statusFilter.toLowerCase()),
  )

  const handleAddLease = (newLease: Lease) => {
    setLeases([...leases, { ...newLease, id: (leases.length + 1).toString() }])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lease Agreements</CardTitle>
          <CardDescription>View and manage property lease agreements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="search">Search:</Label>
              <div className="relative">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search tenant or property..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expiring soon">Expiring Soon</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Monthly Rent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeases.map((lease) => (
                <TableRow key={lease.id}>
                  <TableCell>{lease.tenantName}</TableCell>
                  <TableCell>{lease.propertyName}</TableCell>
                  <TableCell>{lease.startDate}</TableCell>
                  <TableCell>{lease.endDate}</TableCell>
                  <TableCell>#{lease.monthlyRent}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        lease.status === "Active"
                          ? "default"
                          : lease.status === "Expiring Soon"
                            ? "secondary"
                            : lease.status === "Expired"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {lease.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost">View</Button>
                    <Button variant="ghost">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredLeases.length} of {leases.length} leases
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
            <AddLeaseDialog onAddLease={handleAddLease} />
            <Button variant="outline">Generate Lease Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface AddLeaseDialogProps {
  onAddLease: (lease: Lease) => void
}

const AddLeaseDialog: React.FC<AddLeaseDialogProps> = ({ onAddLease }) => {
  const [newLease, setNewLease] = useState<Partial<Lease>>({
    tenantName: "",
    propertyName: "",
    startDate: "",
    endDate: "",
    monthlyRent: 0,
    status: "Active",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddLease(newLease as Lease)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Lease
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Lease</DialogTitle>
          <DialogDescription>Enter the details for the new lease agreement.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tenantName" className="text-right">
                Tenant Name
              </Label>
              <Input
                id="tenantName"
                value={newLease.tenantName}
                onChange={(e) => setNewLease({ ...newLease, tenantName: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="propertyName" className="text-right">
                Property
              </Label>
              <Input
                id="propertyName"
                value={newLease.propertyName}
                onChange={(e) => setNewLease({ ...newLease, propertyName: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={newLease.startDate}
                onChange={(e) => setNewLease({ ...newLease, startDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={newLease.endDate}
                onChange={(e) => setNewLease({ ...newLease, endDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="monthlyRent" className="text-right">
                Monthly Rent
              </Label>
              <Input
                id="monthlyRent"
                type="number"
                value={newLease.monthlyRent}
                onChange={(e) => setNewLease({ ...newLease, monthlyRent: Number.parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Lease</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Leases

