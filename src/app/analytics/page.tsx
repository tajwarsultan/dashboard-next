'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';

const data = [
  { month: 'Jan', users: 400, sessions: 240, revenue: 52000, transactions: 1200, avgOrderValue: 43.33 },
  { month: 'Feb', users: 300, sessions: 139, revenue: 45000, transactions: 980, avgOrderValue: 45.91 },
  { month: 'Mar', users: 200, sessions: 980, revenue: 61000, transactions: 1500, avgOrderValue: 40.67 },
  { month: 'Apr', users: 278, sessions: 390, revenue: 55000, transactions: 1300, avgOrderValue: 42.31 },
  { month: 'May', users: 189, sessions: 480, revenue: 48000, transactions: 1100, avgOrderValue: 43.64 },
  { month: 'Jun', users: 239, sessions: 380, revenue: 58000, transactions: 1400, avgOrderValue: 41.43 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Financial Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <h3 className="text-lg font-medium">Monthly Revenue</h3>
          <p className="text-3xl font-bold">$58,000</p>
          <p className="text-sm text-green-600">↑ 12.3% vs last month</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-medium">Avg Transaction Value</h3>
          <p className="text-3xl font-bold">$41.43</p>
          <p className="text-sm text-red-600">↓ 5.1% vs last month</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-medium">Total Transactions</h3>
          <p className="text-3xl font-bold">1,400</p>
          <p className="text-sm text-green-600">↑ 27.3% vs last month</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">User Growth</h3>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Session Overview</h3>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sessions" fill="#82ca9d" />
          </BarChart>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 mt-5">
          <h3 className="text-lg font-medium mb-4">Revenue Trends</h3>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </Card>

        <Card className="p-4 mt-5">
          <h3 className="text-lg font-medium mb-4">Average Order Value</h3>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="avgOrderValue"
              stroke="#dc2626"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </Card>
      </div>
    </div>
  );
}
