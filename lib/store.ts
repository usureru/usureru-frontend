"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Conversation, Message } from "./types";

interface ChatStore {
  conversations: Conversation[];
  activeConversationId: string | null;
  isStreaming: boolean;
  detailedMode: boolean;
  
  createChat: () => string;
  deleteChat: (id: string) => void;
  renameChat: (id: string, title: string) => void;
  selectChat: (id: string) => void;
  sendMessage: (content: string) => Promise<void>;
  setDetailedMode: (detailed: boolean) => void;
  getActiveConversation: () => Conversation | undefined;
  resetAllData: () => void;
  trackUsage: (messageLength: number) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      isStreaming: false,
      detailedMode: false,

      createChat: () => {
        const id = `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newChat: Conversation = {
          id,
          title: "New Chat",
          updated_at: new Date().toISOString(),
          messages: [],
        };
        
        set((state) => ({
          conversations: [newChat, ...state.conversations],
          activeConversationId: id,
        }));
        
        return id;
      },

      deleteChat: (id: string) => {
        set((state) => {
          const newConversations = state.conversations.filter((c) => c.id !== id);
          const newActiveId = state.activeConversationId === id 
            ? (newConversations[0]?.id || null)
            : state.activeConversationId;
          
          return {
            conversations: newConversations,
            activeConversationId: newActiveId,
          };
        });
      },

      renameChat: (id: string, title: string) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, title } : c
          ),
        }));
      },

      selectChat: (id: string) => {
        set({ activeConversationId: id });
      },

      sendMessage: async (content: string) => {
        const { activeConversationId } = get();
        if (!activeConversationId) return;

        // Add user message
        const userMessage: Message = {
          id: `msg-${Date.now()}-user`,
          role: "user",
          content,
          created_at: new Date().toISOString(),
        };

        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === activeConversationId
              ? {
                  ...c,
                  messages: [...(c.messages || []), userMessage],
                  title: c.messages?.length === 0 ? content.slice(0, 50) : c.title,
                  updated_at: new Date().toISOString(),
                }
              : c
          ),
          isStreaming: true,
        }));

        // Track usage
        get().trackUsage(content.length);

        // Simulate streaming assistant reply
        const assistantMessage: Message = {
          id: `msg-${Date.now()}-assistant`,
          role: "assistant",
          content: "",
          created_at: new Date().toISOString(),
        };

        // Add empty assistant message
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === activeConversationId
              ? {
                  ...c,
                  messages: [...(c.messages || []), assistantMessage],
                }
              : c
          ),
        }));

        // Fake streaming response
        const fakeResponse = `Thank you for your message! This is a simulated streaming response to demonstrate the chat interface. Your message was: "${content}". 

This is a mock response that streams word by word to show the typing effect. In a real application, this would connect to an actual AI backend service.

Here are some features of this chat interface:
- Create multiple conversations
- Rename and delete chats
- Search through your conversations
- Toggle between concise and detailed modes
- Fully responsive design

Feel free to continue chatting to test the interface!`;

        const words = fakeResponse.split(" ");
        const delay = Math.random() * 400 + 800; // 800-1200ms total, distributed

        for (let i = 0; i < words.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, delay / words.length));
          
          set((state) => ({
            conversations: state.conversations.map((c) =>
              c.id === activeConversationId
                ? {
                    ...c,
                    messages: c.messages?.map((m) =>
                      m.id === assistantMessage.id
                        ? { ...m, content: words.slice(0, i + 1).join(" ") }
                        : m
                    ),
                    updated_at: new Date().toISOString(),
                  }
                : c
            ),
          }));
        }

        set({ isStreaming: false });
      },

      setDetailedMode: (detailed: boolean) => {
        set({ detailedMode: detailed });
      },

      getActiveConversation: () => {
        const { conversations, activeConversationId } = get();
        return conversations.find((c) => c.id === activeConversationId);
      },

      resetAllData: () => {
        set({
          conversations: [],
          activeConversationId: null,
          isStreaming: false,
          detailedMode: false,
        });
      },

      trackUsage: (messageLength: number) => {
        // Estimate tokens as message length / 4
        const estimatedTokens = Math.ceil(messageLength / 4);
        
        // Get or create usage stats
        const stored = localStorage.getItem("usageStats");
        const stats = stored ? JSON.parse(stored) : {
          tokensToday: 0,
          tokensWeek: 0,
          tokensMonth: 0,
          requestsToday: 0,
          requestsWeek: 0,
          requestsMonth: 0,
          lastReset: new Date().toISOString(),
        };

        // Increment counters
        stats.tokensToday += estimatedTokens;
        stats.tokensWeek += estimatedTokens;
        stats.tokensMonth += estimatedTokens;
        stats.requestsToday += 1;
        stats.requestsWeek += 1;
        stats.requestsMonth += 1;

        // Save back to localStorage
        localStorage.setItem("usageStats", JSON.stringify(stats));
      },
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        conversations: state.conversations,
        activeConversationId: state.activeConversationId,
        detailedMode: state.detailedMode,
      }),
    }
  )
);

