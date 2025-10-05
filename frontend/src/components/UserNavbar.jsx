import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-sky-900 p-2 text-white justify-between items-center">
      <div className="flex flex-row justify-between p-3 items-center gap-10">
        <div className="flex flex-row justify-between items-center gap-8">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/books">Books</Link>
          <Link to="/my-reviews">My Reviews</Link>
          <Link to="/borrow/history">Borrow History</Link>
          <Link to="/profile">Profile</Link>

        </div>
        <div>
          <button onClick={handleLogout} className="bg-red-500 p-2 cursor-pointer hover:bg-red-400">Logout</button>
        </div>
      </div>
    </div>
  );
}
