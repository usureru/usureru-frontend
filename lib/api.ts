export async function getStatus() {
  const res = await fetch("/api/_status", { cache: "no-store" });
  return res.json();
}

