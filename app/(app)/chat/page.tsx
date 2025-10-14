"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/lib/store";
import { MessageList } from "@/components/chat/message-list";
import { ChatComposer } from "@/components/chat/chat-composer";

export default function ChatPage() {
  const router = useRouter();
  const { conversations, createChat } = useChatStore();

  useEffect(() => {
    // If no conversations exist, create one and redirect
    if (conversations.length === 0) {
      const newChatId = createChat();
      router.push(`/chat/${newChatId}`);
    } else {
      // Redirect to the first conversation
      router.push(`/chat/${conversations[0].id}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MessageList messages={[]} />
      <ChatComposer />
    </>
  );
}

