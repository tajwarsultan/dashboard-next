'use client';

import { useState } from 'react';
import { 
  Bug, 
  Flag, 
  LineChart, 
  Plus, 
  ArrowRight,  
  AlertTriangle,
  CheckCircle,
  Users,
  Activity,
  Search,
  Bell
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function HomePage() {
  const [stats] = useState({
    totalReports: 156,
    openIssues: 23,
    resolvedIssues: 133,
    criticalIssues: 5,
    averageResolutionTime: '2.4 days'
  });

  const [recentActivity] = useState([
    {
      id: 'BUG-421',
      title: 'Login page not responsive on mobile',
      type: 'bug',
      status: 'open',
      priority: 'high',
      assignee: {
        name: 'Alex Johnson',
        avatar: '/api/placeholder/32/32'
      },
      updatedAt: '2 hours ago'
    },
    {
      id: 'FEAT-128',
      title: 'Add dark mode support',
      type: 'feature',
      status: 'in-progress',
      priority: 'medium',
      assignee: {
        name: 'Taylor Smith',
        avatar: '/api/placeholder/32/32'
      },
      updatedAt: '5 hours ago'
    },
    {
      id: 'BUG-420',
      title: 'Data not refreshing automatically',
      type: 'bug',
      status: 'resolved',
      priority: 'critical',
      assignee: {
        name: 'Morgan Lee',
        avatar: '/api/placeholder/32/32'
      },
      updatedAt: '1 day ago'
    }
  ]);

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

  const [teamPerformance] = useState([
    { name: 'Backend Team', resolved: 58, total: 65 },
    { name: 'Frontend Team', resolved: 42, total: 50 },
    { name: 'QA Team', resolved: 33, total: 41 }
  ]);

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Header with Search and Notifications */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search issues..."
            className="pl-8 pr-4 py-2 rounded-md w-full border border-input bg-background"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Avatar>
            <AvatarImage src="/api/placeholder/32/32" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>

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

      {/* Stats Section - Enhanced with more metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-red-500">{stats.criticalIssues}</h3>
              <p className="text-muted-foreground">Critical Issues</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold">{stats.averageResolutionTime}</h3>
              <p className="text-muted-foreground">Avg. Resolution Time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two-column layout for main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <Link href={`/issue/${item.id}`}>
                            <span className="font-mono text-sm text-muted-foreground">{item.id}</span>
                          </Link>
                          <Badge variant={item.status === 'open' ? 'destructive' : 
                                         item.status === 'in-progress' ? 'warning' : 'success'}>
                            {item.status}
                          </Badge>
                          <Badge variant="outline">{item.priority}</Badge>
                        </div>
                        <Link href={`/issue/${item.id}`}>
                          <span className="font-medium hover:underline">{item.title}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">{item.updatedAt}</div>
                        <div className="flex items-center gap-1">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={item.assignee.avatar} alt={item.assignee.name} />
                            <AvatarFallback>{item.assignee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{item.assignee.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href="/reports" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Reports
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Team Performance */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {teamPerformance.map((team, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{team.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {team.resolved}/{team.total} issues ({Math.round((team.resolved / team.total) * 100)}%)
                      </span>
                    </div>
                    <Progress value={(team.resolved / team.total) * 100} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - 1/3 width */}
        <div className="space-y-6">
          {/* Priority Issues */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Priority Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="font-medium">BUG-421</span>
                  </div>
                  <Badge variant="destructive">Critical</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="font-medium">BUG-419</span>
                  </div>
                  <Badge variant="warning">High</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href="/priority" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  View All Priority Issues
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Quick Actions Section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.link}>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    {action.icon}
                    {action.title}
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>API Server</span>
                  <Badge variant="success" className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Operational
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Database</span>
                  <Badge variant="success" className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Operational
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Authentication</span>
                  <Badge variant="success" className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Operational
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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