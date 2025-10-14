"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/lib/store";

export default function AppPage() {
  const router = useRouter();
  const { conversations, createChat } = useChatStore();

  useEffect(() => {
    if (conversations.length > 0) {
      router.push(`/chat/${conversations[0].id}`);
    } else {
      const newChatId = createChat();
      router.push(`/chat/${newChatId}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center">
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
}

