"use client";

function SignMod({ close }) {
  const handleSignup = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    alert(data.message || data.error);

    if (res.ok) close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-xl w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>

        <input name="username" className="input" placeholder="Username" />
        <input name="password" type="password" className="input mt-2" placeholder="Password" />

        <button className="btn w-full mt-4">Create Account</button>
      </form>
    </div>
  );
}

export default SignMod;
