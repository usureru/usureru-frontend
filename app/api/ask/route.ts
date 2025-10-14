export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const target = `${process.env.BACKEND_URL}/ask`;
  
  const upstream = await fetch(target, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "text/event-stream"
    },
    body: JSON.stringify(body),
  });
  
  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

