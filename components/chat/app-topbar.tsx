"use client";

import { Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppTopbarProps {
  onSettingsClick: () => void;
  onMenuClick: () => void;
}

export function AppTopbar({ onSettingsClick, onMenuClick }: AppTopbarProps) {
  return (
    <div className="h-14 border-b bg-background flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">UsureRU</h1>
      </div>
      <Button variant="ghost" size="icon" onClick={onSettingsClick}>
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
}

