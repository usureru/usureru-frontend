"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AppTopbar } from "@/components/chat/app-topbar";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ControlPanel } from "@/components/chat/control-panel";
import { Sheet, SheetContent } from "@/components/ui/sheet";

function SettingsHandler({ onSettingsOpen }: { onSettingsOpen: () => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("settings") === "open") {
      onSettingsOpen();
    }
  }, [searchParams, onSettingsOpen]);

  return null;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <AppTopbar
        onSettingsClick={() => setSettingsOpen(true)}
        onMenuClick={() => setMobileMenuOpen(true)}
      />
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <ChatSidebar />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <ChatSidebar />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>

      <Suspense fallback={null}>
        <SettingsHandler onSettingsOpen={() => setSettingsOpen(true)} />
      </Suspense>
      <ControlPanel open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}

