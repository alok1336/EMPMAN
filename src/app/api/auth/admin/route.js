import { ADMIN } from "@/lib/admin";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json(
        { message: "Username and password required" },
        { status: 400 }
      );
    }

    if (username !== ADMIN.username || password !== ADMIN.password) {
      return Response.json(
        { message: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    return Response.json({
      message: "Admin login successfull",
      admin: {
        username,
        role: "ADMIN",
      },
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
