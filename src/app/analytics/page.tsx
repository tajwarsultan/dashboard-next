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
  { month: 'Jan', users: 400, sessions: 240 },
  { month: 'Feb', users: 300, sessions: 139 },
  { month: 'Mar', users: 200, sessions: 980 },
  { month: 'Apr', users: 278, sessions: 390 },
  { month: 'May', users: 189, sessions: 480 },
  { month: 'Jun', users: 239, sessions: 380 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <h3 className="text-lg font-medium">Total Users</h3>
          <p className="text-3xl font-bold">1,606</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-medium">Active Sessions</h3>
          <p className="text-3xl font-bold">2,609</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-medium">Conversion Rate</h3>
          <p className="text-3xl font-bold">8.5%</p>
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
    </div>
  );
}
