"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginMod from "../app/component/LoginMod";
import SignMod from "../app/component/SignMod";

export default function Home() {
  const router = useRouter();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [role, setRole] = useState("user");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6"
    style={{
      backgroundColor:"#93B1B5"
    }
    }>
      <h1 className="text-3xl font-bold" style={{
      Color:"#0B2E33",
      fontSize:"40px"
    }
    }>Welcome to the System System</h1>

      <div className="flex gap-4"
       style={{display:"flex",flexDirection:"column"}}>
        <button
          className="btn"
          style={{
              width:"300px",
  height:"50px",
  margin:"auto",
  backgroundColor: "#0B2E33",
  color: "#B8E3E9",
  fontSize: "20px"
          }}
          onClick={() => {
            setRole("user");
            setShowSignup(true);
          }}
        >
          Sign Up
        </button>

        <button
          className="btn"
           style={{
              width:"300px",
  height:"50px",
  margin:"auto",
  backgroundColor: "#0B2E33",
  color: "#B8E3E9",
  fontSize: "20px"
          }}
          onClick={() => {
            setRole("user");
            setShowLogin(true);
          }}
        >
          User Login
        </button>

        <button
          className="btn"
           style={{
              width:"300px",
  height:"50px",
  margin:"auto",
  backgroundColor: "#0B2E33",
  color: "#B8E3E9",
  fontSize: "20px"
          }}
          onClick={() => {
            setRole("admin");
            setShowLogin(true);
          }}
        >
          Admin Login
        </button>
      </div>

      {showLogin && (
        <LoginMod
          role={role}
          close={() => setShowLogin(false)}
        />
      )}

      {showSignup && (
        <SignMod
          close={() => setShowSignup(false)}
        />
      )}
    </div>
  );
}
