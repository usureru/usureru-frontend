"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useChatStore } from "@/lib/store";
import { 
  User, 
  Settings as SettingsIcon, 
  Activity,
  X,
  BarChart3
} from "lucide-react";

interface ControlPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Section = "usage" | "preferences" | "session" | "diagnostics";

interface UsageStats {
  tokensToday: number;
  tokensWeek: number;
  tokensMonth: number;
  requestsToday: number;
  requestsWeek: number;
  requestsMonth: number;
  lastReset: string;
}

interface DiagnosticsData {
  runtime?: string;
  node?: string;
  backendBaseUrl?: string;
  name?: string;
  version?: string;
}

export function ControlPanel({ open, onOpenChange }: ControlPanelProps) {
  const [activeSection, setActiveSection] = useState<Section>("usage");
  const { detailedMode, setDetailedMode, resetAllData } = useChatStore();
  const [usageStats, setUsageStats] = useState<UsageStats>({
    tokensToday: 0,
    tokensWeek: 0,
    tokensMonth: 0,
    requestsToday: 0,
    requestsWeek: 0,
    requestsMonth: 0,
    lastReset: new Date().toISOString(),
  });
  const [diagnostics, setDiagnostics] = useState<DiagnosticsData>({});
  const [streamingEvents, setStreamingEvents] = useState<string[]>([]);
  const [isTestingStream, setIsTestingStream] = useState(false);

  // Load usage stats from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("usageStats");
    if (stored) {
      setUsageStats(JSON.parse(stored));
    }
  }, [open]);

  // Load diagnostics data
  useEffect(() => {
    if (open && activeSection === "diagnostics") {
      fetch("/api/status")
        .then(res => res.json())
        .then(data => setDiagnostics(data))
        .catch(err => console.error("Failed to load diagnostics:", err));
    }
  }, [open, activeSection]);

  const handleResetData = () => {
    if (confirm("Are you sure you want to reset all demo data? This will clear all conversations and usage statistics.")) {
      resetAllData();
      const newStats: UsageStats = {
        tokensToday: 0,
        tokensWeek: 0,
        tokensMonth: 0,
        requestsToday: 0,
        requestsWeek: 0,
        requestsMonth: 0,
        lastReset: new Date().toISOString(),
      };
      setUsageStats(newStats);
      localStorage.setItem("usageStats", JSON.stringify(newStats));
      onOpenChange(false);
    }
  };

  const handleTestStreaming = async () => {
    setIsTestingStream(true);
    setStreamingEvents([]);
    
    try {
      const response = await fetch("/api/sse-test");
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      const events: string[] = [];

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n\n");
          
          for (const line of lines) {
            if (line.startsWith("data:")) {
              const data = line.replace("data:", "").trim();
              if (data) {
                events.push(data);
                if (events.length > 5) events.shift(); // Keep only last 5
              }
            }
          }
        }
      }

      setStreamingEvents(events);
    } catch (error) {
      console.error("Streaming test failed:", error);
      setStreamingEvents(["Error: Failed to connect to streaming endpoint"]);
    } finally {
      setIsTestingStream(false);
    }
  };

  const sections = [
    { id: "usage" as Section, label: "Usage", icon: BarChart3 },
    { id: "preferences" as Section, label: "Preferences", icon: SettingsIcon },
    { id: "session" as Section, label: "Session", icon: User },
    { id: "diagnostics" as Section, label: "Diagnostics", icon: Activity },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[600px] p-0">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 border-r bg-muted/30 p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Settings</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-background shadow-sm font-medium"
                        : "hover:bg-background/50 text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeSection === "usage" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Usage Statistics</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your token and request usage
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Tokens Used</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Today</span>
                        <span className="text-lg font-semibold">{usageStats.tokensToday.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">This Week</span>
                        <span className="text-lg font-semibold">{usageStats.tokensWeek.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">This Month</span>
                        <span className="text-lg font-semibold">{usageStats.tokensMonth.toLocaleString()}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Requests</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Today</span>
                        <span className="text-lg font-semibold">{usageStats.requestsToday}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">This Week</span>
                        <span className="text-lg font-semibold">{usageStats.requestsWeek}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">This Month</span>
                        <span className="text-lg font-semibold">{usageStats.requestsMonth}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <p className="text-xs text-muted-foreground">
                  Note: Usage statistics are stored locally and reset when you clear demo data.
                </p>
              </div>
            )}

            {activeSection === "preferences" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Preferences</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize your chat experience
                  </p>
                </div>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="response-mode" className="text-base font-medium">
                        Response Mode
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {detailedMode ? "Detailed responses with comprehensive explanations" : "Concise responses for quick answers"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">Concise</span>
                      <Switch
                        id="response-mode"
                        checked={detailedMode}
                        onCheckedChange={setDetailedMode}
                      />
                      <span className="text-sm font-medium">Detailed</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeSection === "session" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Session</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your profile and data
                  </p>
                </div>

                <Card className="p-6">
                  <h4 className="text-sm font-semibold mb-4">Profile</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Name</span>
                      <span className="text-sm font-medium">Demo User</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Email</span>
                      <span className="text-sm font-medium">demo@example.com</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="text-sm font-semibold mb-2">Data Management</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Reset all demo data including conversations, messages, and usage statistics.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleResetData}
                    className="w-full"
                  >
                    Reset Demo Data
                  </Button>
                </Card>
              </div>
            )}

            {activeSection === "diagnostics" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Diagnostics</h3>
                  <p className="text-sm text-muted-foreground">
                    System information and streaming tests
                  </p>
                </div>

                <Card className="p-6">
                  <h4 className="text-sm font-semibold mb-4">System Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Application</span>
                      <span className="text-sm font-medium">{diagnostics.name || "Loading..."}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Version</span>
                      <span className="text-sm font-medium">{diagnostics.version || "Loading..."}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Runtime</span>
                      <span className="text-sm font-medium">{diagnostics.runtime || "Loading..."}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Node Version</span>
                      <span className="text-sm font-medium">{diagnostics.node || "Loading..."}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Backend URL</span>
                      <span className="text-sm font-medium truncate max-w-xs">
                        {diagnostics.backendBaseUrl || "Loading..."}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="text-sm font-semibold mb-2">Streaming Test</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Test the Server-Sent Events (SSE) streaming endpoint
                  </p>
                  <Button 
                    onClick={handleTestStreaming}
                    disabled={isTestingStream}
                    className="w-full mb-4"
                  >
                    {isTestingStream ? "Testing..." : "Test Streaming"}
                  </Button>

                  {streamingEvents.length > 0 && (
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-xs font-semibold mb-2 text-muted-foreground">
                        Last {streamingEvents.length} events:
                      </p>
                      <div className="space-y-1 font-mono text-xs">
                        {streamingEvents.map((event, i) => (
                          <div key={i} className="text-foreground">
                            {event}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

