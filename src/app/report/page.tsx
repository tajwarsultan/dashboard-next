"use client";

import { useState, useEffect } from "react";
import {
  Bug,
  Send,
  Flag,
  Loader2,
  X,
  Clock,
  CheckCircle2,
  ClipboardList,
  Search,
  Bell,
  User,
  Settings,
  AlertTriangle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RovingFocusGroup } from "@radix-ui/react-roving-focus";

// Mock data for issue history
const mockIssueHistory = [
  {
    id: 1,
    title: "Login page not loading properly",
    category: "bug",
    priority: "high",
    status: "open",
    date: "2025-03-18",
  },
  {
    id: 2,
    title: "Add dark mode support",
    category: "feature",
    priority: "medium",
    status: "in-progress",
    date: "2025-03-17",
  },
  {
    id: 3,
    title: "Documentation update needed",
    category: "other",
    priority: "low",
    status: "closed",
    date: "2025-03-15",
  },
  {
    id: 4,
    title: "API response timeout",
    category: "bug",
    priority: "high",
    status: "open",
    date: "2025-03-14",
  },
  {
    id: 5,
    title: "UI alignment issues on mobile",
    category: "bug",
    priority: "medium",
    status: "closed",
    date: "2025-03-12",
  },
];

// Mock data for statistics
const mockStatistics = {
  openIssues: 8,
  inProgressIssues: 5,
  closedIssues: 12,
  totalIssues: 25,
  categoryBreakdown: { bug: 14, feature: 7, other: 4 },
  priorityBreakdown: { high: 9, medium: 11, low: 5 },
  responseTimeAvg: "4.2 hours",
  resolutionTimeAvg: "2.3 days",
};

// Mock notifications
const mockNotifications = [
  { id: 1, message: "New high priority bug reported", time: "10 minutes ago" },
  { id: 2, message: "Issue #1234 has been resolved", time: "2 hours ago" },
  { id: 3, message: "Team meeting in 30 minutes", time: "3 hours ago" },
];

export default function DashboardPage() {
  const [report, setReport] = useState<{
    category: "bug" | "feature" | "other" | "";
    priority: string;
    description: string;
    file: File | null;
  }>({
    category: "",
    priority: "",
    description: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [issueHistory, setIssueHistory] = useState(mockIssueHistory);
  const [statistics, setStatistics] = useState(mockStatistics);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [notifications, setNotifications] = useState(mockNotifications);
  const [darkMode, setDarkMode] = useState(false);

  // Handle theme change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSubmit = () => {
    if (!report.category || !report.priority || !report.description) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // Add new issue to history
      const newIssue = {
        id: issueHistory.length + 1,
        title:
          report.description.substring(0, 50) +
          (report.description.length > 50 ? "..." : ""),
        category: report.category,
        priority: report.priority,
        status: "open",
        date: new Date().toISOString().split("T")[0],
      };

      setIssueHistory([newIssue, ...issueHistory]);

      // Update statistics
      setStatistics({
        ...statistics,
        openIssues: statistics.openIssues + 1,
        totalIssues: statistics.totalIssues + 1,
        categoryBreakdown: {
          ...statistics.categoryBreakdown,
          [report.category as "bug" | "feature" | "other"]:
            statistics.categoryBreakdown[
              report.category as "bug" | "feature" | "other"
            ] + 1,
        },
        priorityBreakdown: {
          ...statistics.priorityBreakdown,
          [report.priority as "high" | "medium" | "low"]:
            statistics.priorityBreakdown[
              report.priority as "high" | "medium" | "low"
            ] + 1,
        },
      });

      setLoading(false);
      setReport({ category: "", priority: "", description: "", file: null });
    }, 1500);
  };

  const markIssueInProgress = (id: number) => {
    const updatedHistory = issueHistory.map((issue) => {
      if (issue.id === id && issue.status === "open") {
        return { ...issue, status: "in-progress" };
      }
      return issue;
    });

    setIssueHistory(updatedHistory);

    // Update statistics
    setStatistics({
      ...statistics,
      openIssues: statistics.openIssues - 1,
      inProgressIssues: statistics.inProgressIssues + 1,
    });
  };

  const closeIssue = (id: number) => {
    const updatedHistory = issueHistory.map((issue) => {
      if (issue.id === id && issue.status !== "closed") {
        // const oldStatus = issue.status;
        return { ...issue, status: "closed" };
      }
      return issue;
    });

    setIssueHistory(updatedHistory);

    // Update statistics accordingly
    // (This is simplified, in a real app you'd need to check the previous status)
    setStatistics({
      ...statistics,
      openIssues: Math.max(0, statistics.openIssues - 1),
      inProgressIssues: Math.max(0, statistics.inProgressIssues - 1),
      closedIssues: statistics.closedIssues + 1,
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const filteredIssues = issueHistory.filter((issue) => {
    const matchesSearch = issue.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-50 dark:bg-red-900/20";
      case "medium":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      case "low":
        return "text-green-500 bg-green-50 dark:bg-green-900/20";
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-800";
    }
  };

  const getStatusColor = (status: "open" | "in-progress" | "closed") => {
    switch (status) {
      case "open":
        return "text-blue-500 bg-blue-50 dark:bg-blue-900/20";
      case "in-progress":
        return "text-purple-500 bg-purple-50 dark:bg-purple-900/20";
      case "closed":
        return "text-green-500 bg-green-50 dark:bg-green-900/20";
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-800";
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50"
      }`}
    >
      <header className="border-b dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center">
              <ClipboardList className="w-6 h-6 mr-2" />
              <span>Issue Tracker Dashboard</span>
            </h1>

            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="flex justify-between items-start py-2"
                      >
                        <div>
                          <p>{notification.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No new notifications
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "☀️" : "🌙"}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">John Doe</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="issues">Issue Management</TabsTrigger>
            <TabsTrigger value="report">Report New Issue</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Open Issues
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statistics.openIssues}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {statistics.openIssues > 5
                      ? "Action required"
                      : "Within acceptable range"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    In Progress
                  </CardTitle>
                  <Clock className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statistics.inProgressIssues}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Actively being worked on
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Closed Issues
                  </CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statistics.closedIssues}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Successfully resolved
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg. Response Time
                  </CardTitle>
                  <Clock className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statistics.responseTimeAvg}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    First response to new issues
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Issue Breakdown by Category</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex justify-between mb-2">
                      <span>Bugs</span>
                      <span>
                        {statistics.categoryBreakdown.bug} (
                        {Math.round(
                          (statistics.categoryBreakdown.bug /
                            statistics.totalIssues) *
                            100
                        )}
                        %)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                      <div
                        className="bg-red-500 h-2.5 rounded-full"
                        style={{
                          width: `${Math.round(
                            (statistics.categoryBreakdown.bug /
                              statistics.totalIssues) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>

                    <div className="flex justify-between mb-2">
                      <span>Feature Requests</span>
                      <span>
                        {statistics.categoryBreakdown.feature} (
                        {Math.round(
                          (statistics.categoryBreakdown.feature /
                            statistics.totalIssues) *
                            100
                        )}
                        %)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{
                          width: `${Math.round(
                            (statistics.categoryBreakdown.feature /
                              statistics.totalIssues) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>

                    <div className="flex justify-between mb-2">
                      <span>Other</span>
                      <span>
                        {statistics.categoryBreakdown.other} (
                        {Math.round(
                          (statistics.categoryBreakdown.other /
                            statistics.totalIssues) *
                            100
                        )}
                        %)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{
                          width: `${Math.round(
                            (statistics.categoryBreakdown.other /
                              statistics.totalIssues) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {issueHistory.slice(0, 4).map((issue) => (
                      <div
                        key={issue.id}
                        className="flex items-start space-x-4"
                      >
                        <div
                          className={`flex-shrink-0 rounded-full p-1 ${
                            issue.status === "open"
                              ? "bg-blue-100 text-blue-700"
                              : issue.status === "in-progress"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {issue.status === "open" ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : issue.status === "in-progress" ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{issue.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {issue.status === "open"
                              ? "New issue reported"
                              : issue.status === "in-progress"
                              ? "Issue being worked on"
                              : "Issue resolved"}{" "}
                            · {issue.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" asChild>
                    <TabsTrigger value="issues">View all issues</TabsTrigger>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Alert className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <AlertTitle>System Maintenance</AlertTitle>
              <AlertDescription>
                Scheduled maintenance will occur on March 25, 2025 from 2:00 AM
                - 4:00 AM (UTC). The issue tracker will be unavailable during
                this time.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Issues Tab */}
          <TabsContent value="issues" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search issues..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2 w-full md:w-auto">
                <Label htmlFor="status-filter" className="whitespace-nowrap">
                  Status:
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter" className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Issues</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                        <th className="p-4 font-medium">Issue</th>
                        <th className="p-4 font-medium">Category</th>
                        <th className="p-4 font-medium">Priority</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Date</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-800">
                      {filteredIssues.length > 0 ? (
                        filteredIssues.map((issue) => (
                          <tr
                            key={issue.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                          >
                            <td className="p-4">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="link" className="p-0 h-auto">
                                    {issue.title}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Issue Details</DialogTitle>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div>
                                      <h3 className="font-medium">Title</h3>
                                      <p>{issue.title}</p>
                                    </div>
                                    <div>
                                      <h3 className="font-medium">Category</h3>
                                      <p className="capitalize">
                                        {issue.category}
                                      </p>
                                    </div>
                                    <div>
                                      <h3 className="font-medium">Priority</h3>
                                      <p className="capitalize">
                                        {issue.priority}
                                      </p>
                                    </div>
                                    <div>
                                      <h3 className="font-medium">Status</h3>
                                      <p className="capitalize">
                                        {issue.status}
                                      </p>
                                    </div>
                                    <div>
                                      <h3 className="font-medium">
                                        Date Reported
                                      </h3>
                                      <p>{issue.date}</p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </td>
                            <td className="p-4 capitalize">
                              {issue.category === "bug" ? (
                                <span className="flex items-center">
                                  <Bug className="w-4 h-4 mr-1" /> Bug
                                </span>
                              ) : issue.category === "feature" ? (
                                <span>🚀 Feature</span>
                              ) : (
                                <span>📝 Other</span>
                              )}
                            </td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                  issue.priority as "high" | "medium" | "low"
                                )}`}
                              >
                                {issue.priority === "high"
                                  ? "🔴 High"
                                  : issue.priority === "medium"
                                  ? "🟡 Medium"
                                  : "🟢 Low"}
                              </span>
                            </td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  issue.status as
                                    | "open"
                                    | "in-progress"
                                    | "closed"
                                )}`}
                              >
                                {issue.status === "open"
                                  ? "Open"
                                  : issue.status === "in-progress"
                                  ? "In Progress"
                                  : "Closed"}
                              </span>
                            </td>
                            <td className="p-4">{issue.date}</td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                {issue.status === "open" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      markIssueInProgress(issue.id)
                                    }
                                  >
                                    Start
                                  </Button>
                                )}
                                {issue.status !== "closed" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => closeIssue(issue.id)}
                                  >
                                    Close
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="p-4 text-center text-gray-500"
                          >
                            No issues found matching your filters
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report Tab */}
          <TabsContent value="report">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Flag className="w-5 h-5 mr-2" /> Report an Issue
                </CardTitle>
                <CardDescription>
                  Fill out the form below to submit a new issue report
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={report.category}
                    onValueChange={(val: "bug" | "feature" | "other") =>
                      setReport({ ...report, category: val })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug">
                        <div className="flex items-center">
                          <Bug className="w-5 h-5 mr-2" /> Bug Report
                        </div>
                      </SelectItem>
                      <SelectItem value="feature">
                        🚀 Feature Request
                      </SelectItem>
                      <SelectItem value="other">📝 Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={report.priority}
                    onValueChange={(val) =>
                      setReport({ ...report, priority: val })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">🟢 Low</SelectItem>
                      <SelectItem value="medium">🟡 Medium</SelectItem>
                      <SelectItem value="high">🔴 High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe the issue in detail..."
                    value={report.description}
                    onChange={(e) =>
                      setReport({ ...report, description: e.target.value })
                    }
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Steps to Reproduce (for bugs)</Label>
                  <Textarea
                    placeholder="Step 1: ...\nStep 2: ...\nStep 3: ..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Expected Behavior</Label>
                  <Input placeholder="What should happen?" />
                </div>

                <div className="space-y-2">
                  <Label>Actual Behavior</Label>
                  <Input placeholder="What happened instead?" />
                </div>

                <div className="space-y-2">
                  <Label>Attach Screenshots or Files (Optional)</Label>
                  <Input
                    type="file"
                    onChange={(e) =>
                      setReport({
                        ...report,
                        file: e.target.files?.[0] || null,
                      })
                    }
                    multiple
                  />
                  {report.file && (
                    <div className="flex items-center space-x-2 mt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {report.file.name}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReport({ ...report, file: null })}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Issue
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Tabs defaultValue="overview">
          <RovingFocusGroup orientation="horizontal">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="issues">Issue Management</TabsTrigger>
              <TabsTrigger value="report">Report New Issue</TabsTrigger>
            </TabsList>
          </RovingFocusGroup>

          <TabsContent value="overview">...</TabsContent>
          <TabsContent value="issues">...</TabsContent>
          <TabsContent value="report">...</TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
