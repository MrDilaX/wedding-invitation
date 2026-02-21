import { NextRequest, NextResponse } from "next/server";

async function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(url);
    await sql`
      CREATE TABLE IF NOT EXISTS rsvps (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        attending TEXT NOT NULL,
        guests INTEGER DEFAULT 1,
        dietary TEXT,
        message TEXT,
        created_at BIGINT NOT NULL
      )
    `;
    return sql;
  } catch { return null; }
}

const localStore: any[] = [];

export async function GET() {
  const sql = await getDb();
  if (!sql) return NextResponse.json(localStore);
  try {
    const rows = await sql`SELECT * FROM rsvps ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch { return NextResponse.json(localStore); }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, attending, guests, dietary, message } = body;
    if (!name?.trim() || !email?.trim() || !attending) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }
    const rsvp = {
      id: Date.now().toString(),
      name: String(name).trim().slice(0, 100),
      email: String(email).trim().slice(0, 100),
      attending: String(attending),
      guests: parseInt(guests) || 1,
      dietary: String(dietary || "").slice(0, 200),
      message: String(message || "").slice(0, 500),
      created_at: Date.now(),
    };
    const sql = await getDb();
    if (sql) {
      await sql`INSERT INTO rsvps (id,name,email,attending,guests,dietary,message,created_at)
        VALUES (${rsvp.id},${rsvp.name},${rsvp.email},${rsvp.attending},${rsvp.guests},${rsvp.dietary},${rsvp.message},${rsvp.created_at})`;
    } else {
      localStore.unshift(rsvp);
    }
    return NextResponse.json(rsvp, { status: 201 });
  } catch { return NextResponse.json({ error: "Server error" }, { status: 500 }); }
}
