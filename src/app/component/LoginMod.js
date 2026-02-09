"use client";

import { useRouter } from "next/navigation";

function LoginMod({ role, close }) {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    const url =
      role === "admin"
        ? "/api/auth/admin"
        : "/api/auth/login";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    alert(data.message || data.error);

  if (!res.ok) return;

if (role === "admin") {
  localStorage.setItem("admin", JSON.stringify(data.admin));
  router.push("/admin");
} else {
  localStorage.setItem("user", JSON.stringify(data.user));
  router.push("/user");
}

close();

  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {role === "admin" ? "Admin Login" : "User Login"}
        </h2>

        <input name="username" className="input" placeholder="Username" />
        <input name="password" type="password" className="input mt-2" placeholder="Password" />

        <button className="btn w-full mt-4">Login</button>
      </form>
    </div>
  );
}

export default LoginMod;
