import { NextRequest, NextResponse } from "next/server";

// In-memory fallback for local dev (resets on server restart)
const localStore: { id: string; name: string; message: string; timestamp: number }[] = [];

async function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(url);
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS wishes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        message TEXT NOT NULL,
        timestamp BIGINT NOT NULL
      )
    `;
    return sql;
  } catch {
    return null;
  }
}

export async function GET() {
  const sql = await getDb();
  if (!sql) return NextResponse.json(localStore.slice(0, 50));
  try {
    const rows = await sql`SELECT * FROM wishes ORDER BY timestamp DESC LIMIT 50`;
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json(localStore);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, message } = body;
    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Name and message required" }, { status: 400 });
    }
    const comment = {
      id: Date.now().toString(),
      name: String(name).trim().slice(0, 80),
      message: String(message).trim().slice(0, 500),
      timestamp: Date.now(),
    };
    const sql = await getDb();
    if (sql) {
      await sql`
        INSERT INTO wishes (id, name, message, timestamp)
        VALUES (${comment.id}, ${comment.name}, ${comment.message}, ${comment.timestamp})
      `;
    } else {
      localStore.unshift(comment);
    }
    return NextResponse.json(comment, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
