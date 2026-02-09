import { db } from "@/lib/db";

export async function POST(req) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid or empty JSON body" }),
        { status: 400 }
      );
    }

    const {
      employee_code,
      first_name,
      last_name,
      father_name,
      mother_name,
      gender,
      date_of_birth,
      mobile,
      alternate_mobile,
      email,
      address,
      city,
      state,
      country,
      pincode,
      department,
      designation,
      joining_date,
      employment_type,
      salary,
      status,
      emergency_contact_name,
      emergency_contact_number,
    } = body;

    if (!employee_code || !first_name || !mobile) {
      return new Response(
        JSON.stringify({ error: "Required fields missing" }),
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO employees (
        employee_code, first_name, last_name, father_name, mother_name,
        gender, date_of_birth, mobile, alternate_mobile, email, address,
        city, state, country, pincode, department, designation, joining_date,
        employment_type, salary, status, emergency_contact_name, emergency_contact_number
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(query, [
      employee_code, first_name, last_name, father_name, mother_name,
      gender, date_of_birth, mobile, alternate_mobile, email, address,
      city, state, country, pincode, department, designation, joining_date,
      employment_type, salary, status, emergency_contact_name, emergency_contact_number
    ]);

    return Response.json({ message: "Employee created successfully" });

  } catch (error) {
  console.error("EMPLOYEE CREATE ERROR ", error);
  return new Response(
    JSON.stringify({ error: error.message }),
    { status: 500 }
  );
}
}
