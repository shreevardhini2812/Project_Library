import { useState } from "react";
import api from "../api";
import { useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import UserNavbar from "../components/UserNavbar";

export default function Profile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);
 
  


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setProfile(res.data);
        
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/auth/update-password", { oldPassword, newPassword });
      setMessage(res.data.message);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update password");
    }
  };


  if (!profile) return <p>Loading...</p>;

  return (
<div>
  {
    profile.role === "admin"?<AdminNavbar/>:<UserNavbar/>
  }
  
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded relative top-10">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {profile ? (
        <div className="mb-6">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    

      <form onSubmit={handleUpdatePassword}>
        <label className="block mb-2">Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
          required
        />

        <label className="block mb-2">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
          required
        />

        <button className="bg-sky-900 text-white px-4 py-2 rounded hover:bg-green-600">
          Update Password
        </button>
      </form>


      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
    </div>
  );
}
