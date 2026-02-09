"use client";

export default function EmpCard({ employee }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2"
    style={{
      backgroundColor:"#213C51",
      color:"#F1E6C9",
    }}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">
          {employee.employee_code} - {employee.first_name} {employee.last_name}
        </h2>
        <span className="text-sm text-gray-500">
          ID: {employee.emp_id}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-sm text-gray-600"
          style={{
            color:"#EAEFEF",
          }}>Mobile</p>
          <p className="font-medium">{employee.mobile}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600"
          style={{
            color:"#EAEFEF"
          }}>Email</p>
          <p className="font-medium">{employee.email || "—"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600"
          style={{
            color:"#EAEFEF"
          }}>Department</p>
          <p className="font-medium">{employee.department || "—"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600"
          style={{
            color:"#EAEFEF"
          }}>Designation</p>
          <p className="font-medium">{employee.designation || "—"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600"
          style={{
            color:"#EAEFEF"
          }}>Status</p>
          <p className="font-medium">{employee.status || "—"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600"
          style={{
            color:"#EAEFEF"
          }}>Joining</p>
          <p className="font-medium">{employee.joining_date || "—"}</p>
        </div>
      </div>
    </div>
  );
}
