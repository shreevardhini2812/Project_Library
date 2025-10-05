import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Books from "./pages/Books.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import MyReviews from "./pages/MyReviews.jsx";
import ManageReviews from "./pages/ManageReviews.jsx";
import BorrowHistory from "./pages/BorrowHistory.jsx";
import ManageBooks from "./pages/ManageBooks.jsx";
import Profile from "./pages/Profile.jsx";
import AdminNavbar from "./components/AdminNavbar.jsx";
import './App.css';
import AdminHome from "./pages/AdminHome.jsx";

export default function App() {
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null;

  return (
    <Routes>
     
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={token ? <Navigate to={user?.role === "admin" ? "/admin" : "/dashboard"} /> : <Navigate to="/login" />} />

      


      <Route path="/books" element={<Books/>}/>
      <Route path="/book/:id" element={<BookDetails/>}/>
      <Route path="/my-reviews" element={<MyReviews/>}/>
      <Route path="/borrow/history" element={<BorrowHistory/>}/>

      
        <Route path="/admin" element={<AdminNavbar />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/admin/borrow-history" element={token && user?.role === "admin" ? <BorrowHistory /> : <Navigate to="/admin" />} />


      <Route path="/admin/manage-reviews" element={<ManageReviews/>}/>
      <Route path="/admin/profile" element={<Profile/>}/>
      
      <Route path="/admin/books" element={<ManageBooks />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin/home" element={<AdminHome />} />
      


      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
