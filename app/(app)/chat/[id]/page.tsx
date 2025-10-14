"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { MessageList } from "@/components/chat/message-list";
import { ChatComposer } from "@/components/chat/chat-composer";
import { useChatStore } from "@/lib/store";

export default function ChatIdPage() {
  const params = useParams();
  const router = useRouter();
  const { conversations, selectChat, getActiveConversation } = useChatStore();
  const chatId = params.id as string;

  useEffect(() => {
    const chat = conversations.find((c) => c.id === chatId);
    if (!chat) {
      // Chat doesn't exist, redirect to app root
      router.push("/app");
    } else {
      selectChat(chatId);
    }
  }, [chatId, conversations, selectChat, router]);

  const activeConversation = getActiveConversation();

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <MessageList messages={activeConversation.messages || []} />
      <ChatComposer />
    </>
  );
}

