import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT
        emp_id,
        employee_code,
        first_name,
        last_name,
        mobile,
        email,
        department,
        designation,
        status,
        joining_date
      FROM employees
      ORDER BY emp_id DESC
    `);

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("FETCH EMPLOYEES ERROR ", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
