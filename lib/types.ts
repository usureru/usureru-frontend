export type Conversation = {
  id: string;
  title: string;
  updated_at?: string;
  messages?: Message[];
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
};

