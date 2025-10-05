import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      const user = data.user;
      if (user?.role === "admin") 
        {
          alert("Logged in successfully");
          navigate("/admin");
        }
      else 
        {
          alert("Logged in successfully");
          navigate("/dashboard");
        }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative left-120 top-40 w-100 bg-sky-900 p-5">
      <h1 className="justify-center text-center items-center text-5xl p-10 text-white">Login</h1>
      <form onSubmit={submit} className="flex flex-col gap-5 justify-center text-center items-center">
        <input placeholder="Email" className=" bg-gray-100 w-70 h-13 p-2" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="bg-gray-100 w-70 h-13 p-2" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit" className="p-3 text-white text-xl cursor-pointer hover:bg-white hover:text-black" >Submit</button>
      </form>
    </div>
  );
}
