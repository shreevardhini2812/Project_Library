import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center p-2 bg-sky-900 p-5 text-white">
        
          <nav className="flex flex-row gap-8">
      <Link to="/admin/home">Home</Link>
      <Link to="/admin/books">Manage Books</Link>
      <Link to="/admin/manage-reviews">Manage Reviews</Link>
      {/* <Link to="/admin/borrow-history">Borrow History</Link> */}
      <Link to="/admin/profile">Profile</Link>
    </nav>
        
        <div>
          <button onClick={handleLogout} className="bg-red-500 p-2 cursor-pointer hover:bg-red-400">Logout</button>
          
        </div>
      </div>
    </div>
  );
}
