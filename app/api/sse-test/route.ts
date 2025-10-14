export const runtime = "nodejs";

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const enc = new TextEncoder();
      const send = (obj: unknown) => controller.enqueue(enc.encode(`data:${JSON.stringify(obj)}\n\n`));
      let i = 0;
      const id = setInterval(() => {
        if (i < 5) {
          send({ delta: `chunk-${i++}` });
        } else {
          send({ done: true });
          clearInterval(id);
          controller.close();
        }
      }, 300);
    },
  });
  
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache"
    }
  });
}

