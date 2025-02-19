import type React from "react"
import { Building, PenToolIcon as Tool, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
} from "recharts"

const Overview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,024</div>
            <p className="text-xs text-muted-foreground">+15 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Rent #</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#89,204</div>
            <p className="text-xs text-muted-foreground">Due in next 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Maintenance</CardTitle>
            <Tool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Open requests</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <OccupancyTrendChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Financial Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <FinancialTrendChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const OccupancyTrendChart: React.FC = () => {
  const data = [
    { month: "Jan", occupancy: 85 },
    { month: "Feb", occupancy: 88 },
    { month: "Mar", occupancy: 90 },
    { month: "Apr", occupancy: 92 },
    { month: "May", occupancy: 95 },
    { month: "Jun", occupancy: 93 },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="occupancy" stroke="black" fill="" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

const FinancialTrendChart: React.FC = () => {
  const data = [
    { month: "Jan", revenue: 50000, expenses: 40000 },
    { month: "Feb", revenue: 55000, expenses: 42000 },
    { month: "Mar", revenue: 58000, expenses: 45000 },
    { month: "Apr", revenue: 62000, expenses: 48000 },
    { month: "May", revenue: 65000, expenses: 50000 },
    { month: "Jun", revenue: 68000, expenses: 52000 },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="gray" />
        <Bar dataKey="expenses" fill="black" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Overview

