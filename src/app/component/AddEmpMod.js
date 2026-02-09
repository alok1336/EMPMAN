"use client";

import { useState } from "react";

export default function AddEmpModal({ close, refresh }) {
  const [form, setForm] = useState({
    employee_code: "",
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    department: "",
    designation: "",
    employment_type: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/employees/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to add employee");
      return;
    }

    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[420px]">
        <h2 className="text-xl font-bold mb-4">Add Employee</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="input" name="employee_code" placeholder="Employee Code" onChange={handleChange} />
          <input className="input" name="first_name" placeholder="First Name" onChange={handleChange} />
          <input className="input" name="last_name" placeholder="Last Name" onChange={handleChange} />
          <input className="input" name="mobile" placeholder="Mobile" onChange={handleChange} />
          <input className="input" name="email" placeholder="Email" onChange={handleChange} />
          <input className="input" name="city" placeholder="City" onChange={handleChange} />
          <input className="input" name="state" placeholder="State" onChange={handleChange} />
          <input className="input" name="address" placeholder="Address" onChange={handleChange} />
          <input className="input" name="department" placeholder="Department" onChange={handleChange} />
          <input className="input" name="designation" placeholder="Designation" onChange={handleChange} />

          <select
            name="employment_type"
            className="input"
            onChange={handleChange}
          >
            <option value="">Employment Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Contract">Contract</option>
          </select>

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={close} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
