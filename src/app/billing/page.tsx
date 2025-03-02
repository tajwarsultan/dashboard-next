import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
  const transactions = [
    { id: "INV001", date: "2025-02-20", amount: "$49.99", status: "Paid" },
    { id: "INV002", date: "2025-01-15", amount: "$49.99", status: "Paid" },
    { id: "INV003", date: "2024-12-10", amount: "$49.99", status: "Pending" },
  ];

  return (
    <div className="flex flex-col gap-4 w-full lg:p-6 mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Billing Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Current Plan</p>
              <p className="font-medium">Pro Plan - $49.99/month</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Next Payment</p>
              <p className="font-medium">March 20, 2025</p>
            </div>
            <div>
              <Switch id="autoRenew" defaultChecked />
              <label htmlFor="autoRenew" className="ml-2 text-sm">Auto-Renewal Enabled</label>
            </div>
            <div>
              <Button variant="destructive">Cancel Subscription</Button>
            </div>
            <div className="col-span-full mt-4">
              <p className="text-sm text-gray-600 mb-2">Usage This Month</p>
              <div className="flex gap-4">
                <div className="flex-1 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">API Calls</p>
                  <p className="font-medium">8,542 / 10,000</p>
                </div>
                <div className="flex-1 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Storage Used</p>
                  <p className="font-medium">2.1GB / 5GB</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-600">Expires 12/25</p>
              </div>
              <Badge>Default</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Card Number" />
              <Input placeholder="Card Holder Name" />
              <Input placeholder="Expiry Date (MM/YY)" />
              <Input placeholder="CVC" />
            </div>
            <Button className="w-full">Update Payment Method</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <Button variant="outline" size="sm">Download All</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.id}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>
                    <Badge variant={tx.status === 'Paid' ? 'default' : 'secondary'}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Download</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
