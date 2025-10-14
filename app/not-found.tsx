import Link from "next/link";
export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
      <section className="w-full max-w-lg px-6 py-12">
        <h1 className="text-4xl font-semibold tracking-tight mb-3">404</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition"
          >
            Go Home
          </Link>

          <Link
            href="/app/chat"
            className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 transition"
          >
            Open Chat
          </Link>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-xs text-gray-500">
          <p>UsureRU</p>
        </div>
      </section>
    </main>
  );
}
