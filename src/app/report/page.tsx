"use client";

import { useState } from "react";
import {
  Send,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
];

export default function DashboardPage() {
  const [report, setReport] = useState({
    category: "",
    priority: "",
    description: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [issueHistory, setIssueHistory] = useState(mockIssueHistory);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = () => {
    if (!report.category || !report.priority || !report.description) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const newIssue = {
        id: issueHistory.length + 1,
        title: report.description.substring(0, 50) + "...",
        category: report.category,
        priority: report.priority,
        status: "open",
        date: new Date().toISOString().split("T")[0],
      };

      setIssueHistory([newIssue, ...issueHistory]);
      setLoading(false);
      setReport({ category: "", priority: "", description: "", file: null });
    }, 1500);
  };

  const filteredIssues = issueHistory.filter((issue) =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                Summary of issues and statistics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Open Issues</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">5</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>In Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">3</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Closed Issues</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">12</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "issues":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Issue Management</CardTitle>
              <CardDescription>
                Manage and track all reported issues.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Search issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="space-y-2">
                  {filteredIssues.map((issue) => (
                    <Card key={issue.id}>
                      <CardHeader>
                        <CardTitle>{issue.title}</CardTitle>
                        <CardDescription>
                          {issue.category} · {issue.priority} · {issue.status}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "report":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Report New Issue</CardTitle>
              <CardDescription>
                Submit a new issue for tracking and resolution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={report.category}
                    onValueChange={(val) =>
                      setReport({ ...report, category: val })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug">Bug</SelectItem>
                      <SelectItem value="feature">Feature</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
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
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    placeholder="Describe the issue..."
                    value={report.description}
                    onChange={(e) =>
                      setReport({ ...report, description: e.target.value })
                    }
                  />
                </div>

                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Issue
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 pt-20 w-full">
      <div className="border-b mb-4">
        <div className="flex gap-4">
          <button
            className={`py-2 px-4 ${
              activeTab === "overview"
                ? "border-b-2 border-blue-500 font-medium"
                : ""
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "issues"
                ? "border-b-2 border-blue-500 font-medium"
                : ""
            }`}
            onClick={() => setActiveTab("issues")}
          >
            Issue Management
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "report"
                ? "border-b-2 border-blue-500 font-medium"
                : ""
            }`}
            onClick={() => setActiveTab("report")}
          >
            Report New Issue
          </button>
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
}