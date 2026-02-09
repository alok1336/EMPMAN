"use client";

import { useState } from "react";
import EditEmpModal from "../component/EditEmpMod";
import EmailModal from "../component/EmailMod";

export default function EmpTab({ employees, refresh }) {
  const [editEmp, setEditEmp] = useState(null);
  const [emailEmp, setEmailEmp] = useState(null);

  const handleDelete = async (emp_id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/employees/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emp_id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Delete failed");
      }

      alert("Employee deleted successfully ");
      refresh(); 
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto border rounded bg-white">
        <table className="min-w-max border-collapse text-sm w-full">
          <thead className="sticky top-0 z-50 bg-gray-200">
            <tr>
              <th className="sticky left-0 z-50 bg-gray-200 px-3 py-2 border border-red-500 min-w-[70px]">
                Sr No
              </th>
              <th className="px-3 py-2 border min-w-[80px]">Emp ID</th>
              <th className="px-3 py-2 border min-w-[140px]">Employee Code</th>
              <th className="px-3 py-2 border">First Name</th>
              <th className="px-3 py-2 border">Last Name</th>
              <th className="px-3 py-2 border">Mobile</th>
              <th className="px-3 py-2 border">Email</th>
              <th className="px-3 py-2 border">City</th>
              <th className="px-3 py-2 border">State</th>
              <th className="px-3 py-2 border">Country</th>
              <th className="px-3 py-2 border">Address</th>
              <th className="px-3 py-2 border">Spouse Name</th>
              <th className="px-3 py-2 border">Children</th>
              <th className="px-3 py-2 border">Emergency Contact Name</th>
              <th className="px-3 py-2 border">Emergency Contact Number</th>
              <th className="px-3 py-2 border">Employment Type</th>
              <th className="px-3 py-2 border">Joining Date</th>
              <th className="px-3 py-2 border">Experience</th>
              <th className="px-3 py-2 border">Salary</th>
              <th className="px-3 py-2 border">Manager Name</th>
              <th className="px-3 py-2 border">Department</th>
              <th className="px-3 py-2 border">Designation</th>
              <th className="px-3 py-2 border">Status</th>

              <th className="sticky right-0 z-50 bg-gray-200 px-4 py-2 border border-red-500 min-w-[240px]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.emp_id} className="hover:bg-gray-50">
                <td className="sticky left-0 z-40 bg-white px-3 py-2 border border-red-500 min-w-[70px]">
                  {index + 1}
                </td>

                <td className="px-3 py-2 border">{emp.emp_id}</td>
                <td className="px-3 py-2 border">{emp.employee_code}</td>
                <td className="px-3 py-2 border">{emp.first_name}</td>
                <td className="px-3 py-2 border">{emp.last_name}</td>
                <td className="px-3 py-2 border">{emp.mobile}</td>
                <td className="px-3 py-2 border">{emp.email}</td>
                <td className="px-3 py-2 border">{emp.city}</td>
                <td className="px-3 py-2 border">{emp.state}</td>
                <td className="px-3 py-2 border">{emp.country}</td>
                <td className="px-3 py-2 border">{emp.address}</td>
                <td className="px-3 py-2 border">{emp.spouse_name}</td>
                <td className="px-3 py-2 border">{emp.children_count}</td>
                <td className="px-3 py-2 border">
                  {emp.emergency_contact_name}
                </td>
                <td className="px-3 py-2 border">
                  {emp.emergency_contact_number}
                </td>
                <td className="px-3 py-2 border">{emp.employment_type}</td>
                <td className="px-3 py-2 border">{emp.joining_date}</td>
                <td className="px-3 py-2 border">{emp.experience}</td>
                <td className="px-3 py-2 border">{emp.salary}</td>
                <td className="px-3 py-2 border">{emp.manager_name}</td>
                <td className="px-3 py-2 border">{emp.department}</td>
                <td className="px-3 py-2 border">{emp.designation}</td>
                <td className="px-3 py-2 border">{emp.status}</td>

                <td className="sticky right-0 z-40 bg-white px-4 py-2 border border-red-500 min-w-[240px]">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditEmp(emp)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                      style={{
                            backgroundColor:"rgb(149, 173, 191)",
                            color:"black",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(emp.emp_id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                      style={{
                            backgroundColor:"#213C51",
                            color:"#rgb(149, 173, 191)",
                      }}
                    >
                      
                      Delete
                    </button>

                  <button
                   onClick={() => setEmailEmp(emp)}
                   className="px-3 py-1 bg-green-600 text-white rounded"
                   style={{
                            backgroundColor:"#F1E6C9" ,
                            color:"#213C51",
                      }}
                       >
                      Email
                     </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {emailEmp && (
       <EmailModal
            employee={emailEmp}
             close={() => setEmailEmp(null)}
              />
             )}


      {editEmp && (
        <EditEmpModal
          employee={editEmp}
          close={() => setEditEmp(null)}
          refresh={refresh}
          
        />
      )}
    </>
  );
}
