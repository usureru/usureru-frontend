export async function ssePost(
  url: string,
  body: unknown,
  onMessage: (obj: unknown) => void,
  signal?: AbortSignal
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "text/event-stream"
    },
    body: JSON.stringify(body),
    signal
  });
  
  const reader = res.body!.getReader();
  const dec = new TextDecoder();
  let buf = "";
  
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    
    buf += dec.decode(value, { stream: true });
    const parts = buf.split("\n\n");
    buf = parts.pop() || "";
    
    for (const chunk of parts) {
      const line = chunk.trim();
      if (!line.startsWith("data:")) continue;
      try {
        onMessage(JSON.parse(line.replace(/^data:\s*/, "")));
      } catch {}
    }
  }
}

