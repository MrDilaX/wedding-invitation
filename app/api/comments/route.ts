import { NextRequest, NextResponse } from "next/server";

// Vercel KV - install with: pnpm add @vercel/kv
// This will work automatically when deployed to Vercel with KV database attached
let kv: any = null;
try {
  kv = require("@vercel/kv");
} catch {}

export interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

// Fallback in-memory store for local dev
const localComments: Comment[] = [];

export async function GET() {
  try {
    if (kv) {
      const comments = await kv.lrange("comments", 0, 49);
      return NextResponse.json(comments.map((c: string) => JSON.parse(c)));
    }
    return NextResponse.json(localComments);
  } catch {
    return NextResponse.json(localComments);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, message } = body;
    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Name and message required" }, { status: 400 });
    }
    const comment: Comment = {
      id: Date.now().toString(),
      name: name.trim().slice(0, 80),
      message: message.trim().slice(0, 500),
      timestamp: Date.now(),
    };
    if (kv) {
      await kv.lpush("comments", JSON.stringify(comment));
    } else {
      localComments.unshift(comment);
    }
    return NextResponse.json(comment, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
