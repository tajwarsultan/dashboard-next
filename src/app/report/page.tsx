"use client";

import { useState } from "react";
import { Bug, Send, Flag, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ReportingPage() {
  const [report, setReport] = useState<{
    category: string;
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

  const handleSubmit = () => {
    if (!report.category || !report.priority || !report.description) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReport({ category: "", priority: "", description: "", file: null });
    }, 1500);
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold flex items-center space-x-2">
        <Flag className="w-6 h-6" /> <span>Report an Issue</span>
      </h1>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Report Details</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              onValueChange={(val) => setReport({ ...report, category: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bug">
                  <Bug className="w-5 h-5 inline" /> Bug Report
                </SelectItem>
                <SelectItem value="feature">🚀 Feature Request</SelectItem>
                <SelectItem value="other">📝 Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <Select
              onValueChange={(val) => setReport({ ...report, priority: val })}
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
              placeholder="Describe the issue..."
              value={report.description}
              onChange={(e) =>
                setReport({ ...report, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Attach Screenshot (Optional)</Label>
            <Input
              type="file"
              onChange={(e) =>
                setReport({ ...report, file: e.target.files?.[0] || null })
              }
            />
            {report.file && (
              <div className="flex items-center space-x-2 mt-2">
                <p className="text-sm text-gray-600">{report.file.name}</p>
                <button
                  onClick={() => setReport({ ...report, file: null })}
                  className="text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={handleSubmit}
              className="w-full flex items-center space-x-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span>{loading ? "Submitting..." : "Submit Report"}</span>
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setReport({
                  category: "",
                  priority: "",
                  description: "",
                  file: null,
                })
              }
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
