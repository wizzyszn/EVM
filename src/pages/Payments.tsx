import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, SearchIcon } from "lucide-react"

interface Payment {
  id: string
  tenantName: string
  propertyName: string
  amount: number
  date: string
  status: "Paid" | "Pending" | "Overdue"
}

const dummyPayments: Payment[] = [
  {
    id: "1",
    tenantName: "John Doe",
    propertyName: "Sunset Apartments, Unit 101",
    amount: 1200,
    date: "2023-06-01",
    status: "Paid",
  },
  {
    id: "2",
    tenantName: "Jane Smith",
    propertyName: "Ocean View Condos, Unit 305",
    amount: 1500,
    date: "2023-06-05",
    status: "Paid",
  },
  {
    id: "3",
    tenantName: "Bob Johnson",
    propertyName: "Mountain Lodge, Cabin 7",
    amount: 1000,
    date: "2023-06-10",
    status: "Pending",
  },
  {
    id: "4",
    tenantName: "Alice Brown",
    propertyName: "City Center Lofts, Unit 202",
    amount: 1800,
    date: "2023-05-31",
    status: "Overdue",
  },
  {
    id: "5",
    tenantName: "Charlie Wilson",
    propertyName: "Parkview Apartments, Unit 405",
    amount: 1300,
    date: "2023-06-15",
    status: "Paid",
  },
]

const Payments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredPayments = dummyPayments.filter(
    (payment) =>
      (payment.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.propertyName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || payment.status.toLowerCase() === statusFilter),
  )

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Overview</CardTitle>
          <CardDescription>View and manage property payments</CardDescription>
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
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.tenantName}</TableCell>
                  <TableCell>{payment.propertyName}</TableCell>
                  <TableCell>#{payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment.status === "Paid"
                          ? "default"
                          : payment.status === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPayments.length} of {dummyPayments.length} payments
            </p>
            <p className="font-semibold">Total: #{totalAmount.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Schedule Payment
            </Button>
            <Button variant="outline">Generate Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Payments

