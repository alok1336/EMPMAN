import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT 1");
    return Response.json({ message: "DB Connected ✅" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
