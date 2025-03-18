'use client';

import { useState } from 'react';
import { Bug, Flag, LineChart, Plus, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import Link from 'next/link';

export default function HomePage() {
  const [stats] = useState({
    totalReports: 156,
    openIssues: 23,
    resolvedIssues: 133
  });

  const quickActions = [
    {
      title: "Report Bug",
      icon: <Bug className="w-5 h-5" />,
      description: "Submit a new bug report",
      link: "/report?type=bug"
    },
    {
      title: "Feature Request",
      icon: <Plus className="w-5 h-5" />,
      description: "Suggest a new feature",
      link: "/report?type=feature"
    },
    {
      title: "View Reports",
      icon: <LineChart className="w-5 h-5" />,
      description: "See all submitted reports",
      link: "/reports"
    }
  ];

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 pb-8">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
          <Flag className="w-8 h-8" />
          <span>Issue Tracking System</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Track, manage, and resolve issues efficiently
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold">{stats.totalReports}</h3>
              <p className="text-muted-foreground">Total Reports</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold">{stats.openIssues}</h3>
              <p className="text-muted-foreground">Open Issues</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold">{stats.resolvedIssues}</h3>
              <p className="text-muted-foreground">Resolved Issues</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                {action.icon}
                <h3 className="font-semibold">{action.title}</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{action.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={action.link} className="w-full">
                <Button className="w-full flex items-center justify-between">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="pt-8 text-center">
        <Link href="/report">
          <Button size="lg" className="gap-2">
            <Flag className="w-5 h-5" />
            Create New Report
          </Button>
        </Link>
      </div>
    </div>
  );
}