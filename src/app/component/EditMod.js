"use client";

export default function EditModal({ employee, close, onUpdated }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      employee_code: e.target.employee_code.value,
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value,
      department: e.target.department.value,
      designation: e.target.designation.value,
      status: e.target.status.value,
    };

    const res = await fetch("/api/employees/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emp_id: employee.emp_id, ...body }),
    });

    const data = await res.json();
    alert(data.message || data.error);

    if (res.ok) {
      onUpdated(data.updated);
      close();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4">Edit Employee</h2>

        <input defaultValue={employee.employee_code} name="employee_code" className="input mb-2" />
        <input defaultValue={employee.first_name} name="first_name" className="input mb-2" />
        <input defaultValue={employee.last_name} name="last_name" className="input mb-2" />
        <input defaultValue={employee.email} name="email" className="input mb-2" />
        <input defaultValue={employee.mobile} name="mobile" className="input mb-2" />
        <input defaultValue={employee.department} name="department" className="input mb-2" />
        <input defaultValue={employee.designation} name="designation" className="input mb-2" />
        <input defaultValue={employee.status} name="status" className="input mb-2" />

        <div className="flex justify-between mt-4">
          <button type="button" className="btn" onClick={close}>
            Cancel
          </button>
          <button type="submit" className="btn bg-green-600">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
