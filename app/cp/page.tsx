"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ControlPanelPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to chat with settings open
    router.push("/chat?settings=open");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-muted-foreground">Redirecting to settings...</p>
    </div>
  );
}

