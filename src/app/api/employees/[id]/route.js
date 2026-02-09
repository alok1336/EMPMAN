import { db } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const emp_id = params.id;

    const [rows] = await db.query(
      `SELECT * FROM employees WHERE emp_id = ?`,
      [emp_id]
    );

    return new Response(JSON.stringify(rows[0]), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
