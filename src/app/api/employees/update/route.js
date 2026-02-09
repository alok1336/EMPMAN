import { db } from "@/lib/db";

export async function PATCH(req) {
  try {
    const body = await req.json();

    const {
      emp_id,
      employee_code,
      first_name,
      last_name,
      mobile,
      email,
      department,
      designation,
      status,
    } = body;

    if (!emp_id) {
      return new Response(
        JSON.stringify({ error: "Employee id is required" }),
        { status: 400 }
      );
    }

    await db.query(
      `UPDATE employees SET
        employee_code = ?, first_name = ?, last_name = ?, mobile = ?,
        email = ?, department = ?, designation = ?, status = ?
      WHERE emp_id = ?`,
      [
        employee_code, first_name, last_name, mobile,
        email, department, designation, status,
        emp_id,
      ]
    );

    return new Response(
      JSON.stringify({ message: "Employee updated successfully" }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
