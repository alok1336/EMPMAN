import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  const { username, password } = await req.json();

  const [users] = await db.query(
    "SELECT * FROM users WHERE username = ? AND role='USER'",
    [username]
  );

  if (users.length === 0) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const user = users[0];

  if (user.password !== password) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({
    message: "Login successful",
    user: { id: user.id, username: user.username },
  });

  // Set cookie
  res.cookies.set("user", username, {
    maxAge: 60 * 60 * 24, // 1 day
  });

  return res;
}
