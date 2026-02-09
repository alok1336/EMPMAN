
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = params;
  const { name, email, phone } = await req.json();

  await db.query(
    "UPDATE employees SET name=?, email=?, phone=? WHERE emp_id=?",
    [name, email, phone, id]
  );

  return NextResponse.json({ message: "Updated" });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await db.query("DELETE FROM employees WHERE emp_id=?", [id]);
  return NextResponse.json({ message: "Deleted" });
}
