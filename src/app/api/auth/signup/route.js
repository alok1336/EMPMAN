import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  const { username, password } = await req.json();

  const [existing] = await db.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (existing.length > 0) {
    return NextResponse.json({ message: "User already exists" }, { status: 409 });
  }

  await db.query(
    "INSERT INTO users (username, password, role) VALUES (?, ?, 'USER')",
    [username, password]
  );

  const res = NextResponse.json({
    message: "User registered successfully",
  });

  res.cookies.set("user", username, {
    maxAge: 60 * 60 * 24,
  });

  return res;
}
