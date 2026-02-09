"use client";

import { useEffect, useState } from "react";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const res = await fetch("/api/employees");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    const res = await fetch(`/api/employees/delete?id=${id}`, {
      method: "DELETE",
    });

    const result = await res.json();
    alert(result.message);

    fetchEmployees();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee List (Admin)</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Code</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Mobile</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.emp_id}>
              <td className="border p-2">{emp.emp_id}</td>
              <td className="border p-2">{emp.employee_code}</td>
              <td className="border p-2">{emp.first_name}</td>
              <td className="border p-2">{emp.mobile}</td>
              <td className="border p-2">{emp.email}</td>
              <td className="border p-2">
                <button
                  className="mr-2 px-3 py-1 rounded bg-blue-500 text-white"
                  onClick={() => alert("Edit feature coming next")}
                >
                  Edit
                </button>

                <button
                  className="px-3 py-1 rounded bg-red-500 text-white"
                  onClick={() => deleteEmployee(emp.emp_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
