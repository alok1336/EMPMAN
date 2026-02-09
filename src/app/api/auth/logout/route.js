import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  res.cookies.set("user", "", { maxAge: 0 });
  res.cookies.set("admin", "", { maxAge: 0 });

  return res;
}
