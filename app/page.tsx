import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, Shield, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold">UsureRU</h1>
          <nav className="flex gap-4">
            <Link href="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Your AI-Powered Chat Assistant
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Experience intelligent conversations with our advanced chat platform.
          Get instant answers, creative ideas, and helpful assistance.
        </p>
        <Link href="/signin">
          <Button size="lg" className="text-lg px-8 py-6">
            Get Started Free
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why Choose UsureRU?
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-card p-6 rounded-lg border">
            <MessageSquare className="h-12 w-12 mb-4 text-primary" />
            <h4 className="text-xl font-semibold mb-2">Smart Conversations</h4>
            <p className="text-muted-foreground">
              Engage in natural, context-aware conversations that understand your needs.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <Zap className="h-12 w-12 mb-4 text-primary" />
            <h4 className="text-xl font-semibold mb-2">Lightning Fast</h4>
            <p className="text-muted-foreground">
              Get instant responses with our optimized streaming technology.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <Shield className="h-12 w-12 mb-4 text-primary" />
            <h4 className="text-xl font-semibold mb-2">Secure & Private</h4>
            <p className="text-muted-foreground">
              Your conversations are encrypted and never shared with third parties.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <Users className="h-12 w-12 mb-4 text-primary" />
            <h4 className="text-xl font-semibold mb-2">Multi-Chat Support</h4>
            <p className="text-muted-foreground">
              Manage multiple conversations simultaneously with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 UsureRU. All rights reserved.
            </p>
            <nav className="flex gap-6 text-sm">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

