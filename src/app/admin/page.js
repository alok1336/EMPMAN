"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmpTab from "../component/EmpTab";
import AddEmpModal from "../component/AddEmpMod";
import SearchBar from "../component/SearchBar"; 

export default function AdminPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState(""); 

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) router.replace("/");
  }, [router]);

  const fetchEmployees = async () => {
    setLoading(true);
    const res = await fetch("/api/employees");
    const data = await res.json();
    setEmployees(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("admin");
    router.push("/");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }


  const filteredEmployees = employees.filter((emp) =>
    emp.emp_id.toString().includes(search) ||
    emp.employee_code.toLowerCase().includes(search.toLowerCase()) ||
    emp.first_name.toLowerCase().includes(search.toLowerCase()) ||
    emp.last_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin – Panel</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded"
          style={{
            backgroundColor:"#213C51",
            color:"#F1E6C9",
          }}
        >
          Logout
        </button>
      </div>

      <div className="mb-4">
        <SearchBar
          value={search}
          onChange={(val) => setSearch(val)}
          placeholder="Search by ID, code, or name"
        />
      </div>

      <EmpTab employees={filteredEmployees} refresh={fetchEmployees} />

      <button
        onClick={() => setShowAdd(true)}
        className="fixed bottom-6 left-6 px-5 py-3 bg-green-600 text-white rounded-lg shadow-lg"
        style={{
          backgroundColor:"#213C51",
          color:"#F1E6C9",
        }}
      >
        ➕ Add
      </button>


      {showAdd && (
        <AddEmpModal
          close={() => setShowAdd(false)}
          refresh={fetchEmployees}
        />
      )}
    </div>
  );
}
