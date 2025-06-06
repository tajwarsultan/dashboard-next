"use client"

import { useState } from "react"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Search,
  UserPlus,
  Filter,
  MoreVertical 
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Buyer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: "active" | "inactive"
}

export default function BuyersPage() {
  const [buyers, setBuyers] = useState<Buyer[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 890",
      company: "Tech Corp",
      status: "active",
    },
    {
      id: "2",
      name: "Ser Doe",
      email: "sere@example.com",
      phone: "+1 234 567 870",
      company: "Tech Corp",
      status: "active",
    },
    {
      id: "3",
      name: "John Pon",
      email: "pon@example.com",
      phone: "+1 234 567 890",
      company: "Tech Corp",
      status: "active",
    },
    {
      id: "4",
      name: "John Sogo",
      email: "sogo@example.com",
      phone: "+1 234 567 890",
      company: "Tech Corp",
      status: "inactive",
    },
  ])

  const handleDelete = (id: string) => {
    setBuyers(buyers.filter(buyer => buyer.id !== id))
  }

  const handleEdit = (buyer: Buyer) => {
    console.log("Editing buyer:", buyer)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Buyers</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Buyer
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search buyers..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {buyers.map((buyer) => (
            <TableRow key={buyer.id}>
              <TableCell>{buyer.name}</TableCell>
              <TableCell>{buyer.email}</TableCell>
              <TableCell>{buyer.phone}</TableCell>
              <TableCell>{buyer.company}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  buyer.status === "active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {buyer.status}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(buyer)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(buyer.id)}
                      className="text-red-600"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
