import { db } from "@/lib/db";

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { emp_id } = body;

    if (!emp_id) {
      return new Response(
        JSON.stringify({ error: "Employee ID is required" }),
        { status: 400 }
      );
    }

    await db.query(
      "DELETE FROM employees WHERE emp_id = ?",
      [emp_id]
    );

    return new Response(
      JSON.stringify({ message: "Employee deleted successfully" }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
