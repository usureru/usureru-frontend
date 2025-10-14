# UsureRU - AI Chat Assistant

A modern, feature-rich chat application built with Next.js 15, React 19, and TypeScript. This application provides an intelligent chat interface with streaming responses, multiple conversation management, and a beautiful responsive design.

## Live Demo
- Primary: https://usureru.com
- Backup:  https://usureru-frontend.vercel.app

## Features

### Core Functionality
- **Real-time Streaming Responses**: Messages stream word-by-word for a natural conversation flow
- **Multiple Conversations**: Create, manage, and switch between multiple chat sessions
- **Conversation Management**: Rename and delete conversations with ease
- **Search Functionality**: Search through your conversation history
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices

### User Interface
- **Modern UI Components**: Built with Radix UI and styled with Tailwind CSS
- **Collapsible Sidebar**: Toggle sidebar visibility for focused conversations
- **Settings Panel**: Configure response modes and view usage statistics
- **Empty States**: Helpful prompts when starting new conversations
- **Markdown Support**: Full markdown rendering in chat messages

### Technical Features
- **Server-Sent Events (SSE)**: Real-time streaming using SSE for efficient data transfer
- **Client-Side State Management**: Zustand for efficient and simple state management
- **Type Safety**: Full TypeScript implementation for robust code
- **API Routes**: Next.js API routes for backend functionality
- **Mock AI Backend**: Simulated AI responses for demonstration purposes

## Technology Stack

- **Next.js 15.5.5**: React framework with App Router
- **React 19.1.0**: Latest React with improved performance
- **TypeScript 5**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Zustand**: Lightweight state management
- **Lucide React**: Beautiful icon library
- **React Markdown**: Markdown rendering with GitHub Flavored Markdown support

## Installation & Development

### Prerequisites
- Node.js 20+ 
- pnpm (recommended) or npm

### Setup

1. Install dependencies:
```bash
pnpm install
```

2. Run development server:
```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
cd .next/standalone
HOSTNAME=0.0.0.0 PORT=3000 node server.js
```

## Project Structure

```
chat-app/
├── app/                          # Next.js App Router
│   ├── (app)/                   # App layout group
│   │   ├── layout.tsx           # Main app layout with sidebar
│   │   └── chat/
│   │       ├── page.tsx         # Empty chat state
│   │       └── [id]/page.tsx    # Individual chat page
│   ├── api/                     # API routes
│   │   ├── _status/             # Health check endpoint
│   │   ├── _sse-test/           # SSE testing endpoint
│   │   └── ask/                 # Chat message endpoint
│   ├── signin/                  # Sign in page
│   ├── signup/                  # Sign up page
│   ├── page.tsx                 # Landing page
│   └── layout.tsx               # Root layout
├── components/
│   ├── chat/                    # Chat-specific components
│   │   ├── app-topbar.tsx       # Top navigation bar
│   │   ├── chat-sidebar.tsx     # Conversation sidebar
│   │   ├── message-list.tsx     # Message display
│   │   ├── chat-composer.tsx    # Message input
│   │   └── control-panel.tsx    # Settings panel
│   └── ui/                      # Reusable UI components
├── lib/
│   ├── types.ts                 # TypeScript type definitions
│   ├── api.ts                   # API client utilities
│   ├── sse.ts                   # Server-Sent Events utilities
│   ├── store.ts                 # Zustand state management
│   └── utils.ts                 # Utility functions
└── public/                      # Static assets
```

## API Endpoints

GET /api/status
Health check; returns JSON with name, version, buildTime, runtime.

GET /api/sse-test
Server-Sent Events test; streams lines starting with "data:".

POST /api/ask
Main chat endpoint (mock for now; swap to real AI later).

Request:
```json
{
  "message": "Hello, how are you?",
  "conversationId": "chat-123456",
  "mode": "detailed"
}
```
Response: streamed SSE.

## Key Features Implementation

### Message Streaming
The application uses Server-Sent Events (SSE) to stream messages from the backend to the frontend, providing a smooth real-time experience.

### Conversation Management
Conversations are stored in browser localStorage and managed through Zustand state management.

### Responsive Design
Built with Tailwind CSS breakpoints for optimal viewing on all devices.

## Customization

### Connecting to a Real AI Backend

Replace the mock API in `app/api/ask/route.ts` with your AI service (e.g., OpenAI, Anthropic, etc.).

## Deployment

The application is deployed and accessible at:
**https://3000-iam127sv8kde9pgva140v-2e5ec838.manusvm.computer**

## License

MIT License

---

**Made with ❤️ using Next.js and React**

