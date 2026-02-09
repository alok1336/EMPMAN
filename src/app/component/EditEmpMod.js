"use client";

import { useState } from "react";

export default function EditEmpModal({ employee, close, refresh }) {
  const [form, setForm] = useState({
    employee_code: employee.employee_code || "",
    first_name: employee.first_name || "",
    last_name: employee.last_name || "",
    mobile: employee.mobile || "",
    email: employee.email || "",
    city: employee.city || "",
    state: employee.state || "",
    address: employee.address || "",
    department: employee.department || "",
    designation: employee.designation || "",
    employment_type: employee.employment_type || "",
    status: employee.status || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/employees/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emp_id: employee.emp_id, 
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || data.message || "Update failed ");
        setLoading(false);
        return;
      }

      alert("Employee updated successfully ");
      refresh(); 
      close();  
    } catch (err) {
      console.error(err);
      alert("Something went wrong ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Employee</h2>

        <form onSubmit={handleUpdate} className="space-y-3">
          <input className="input" name="employee_code" value={form.employee_code} placeholder="Employee Code" onChange={handleChange} />
          <input className="input" name="first_name" value={form.first_name} placeholder="First Name" onChange={handleChange} />
          <input className="input" name="last_name" value={form.last_name} placeholder="Last Name" onChange={handleChange} />
          <input className="input" name="mobile" value={form.mobile} placeholder="Mobile" onChange={handleChange} />
          <input className="input" name="email" value={form.email} placeholder="Email" onChange={handleChange} />
          <input className="input" name="city" value={form.city} placeholder="City" onChange={handleChange} />
          <input className="input" name="state" value={form.state} placeholder="State" onChange={handleChange} />
          <input className="input" name="address" value={form.address} placeholder="Address" onChange={handleChange} />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 border rounded"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
