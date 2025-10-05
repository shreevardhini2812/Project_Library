import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password, role: "user" });
      alert("Registered - please login");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative left-100 top-25 w-160 h-110 bg-sky-900 p-2">
      <h2 className="justify-center text-center items-center text-5xl p-10 text-white">Register</h2>
      <form onSubmit={submit} className="flex flex-col gap-5 justify-center text-center items-center">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className=" bg-gray-100 w-70 h-13 p-2"/>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className=" bg-gray-100 w-70 h-13 p-2"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className=" bg-gray-100 w-70 h-13 p-2"/>
        <button type="submit" className="p-3 text-white text-xl cursor-pointer hover:bg-white hover:text-black">Register</button>
        
      
      </form>
    </div>
  );
}
