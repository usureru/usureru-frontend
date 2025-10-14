import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    name: "UsureRU",
    version: process.env.NEXT_PUBLIC_APP_VERSION || null,
    buildTime: process.env.VERCEL_DEPLOYMENT_TIME || process.env.BUILD_TIME || null,
    runtime: process.env.NEXT_RUNTIME || "nodejs",
    node: typeof process !== "undefined" ? process.version : null,
    backendBaseUrl: process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || null,
  });
}

