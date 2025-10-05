import React from "react";
import UserNavbar from "../components/UserNavbar";

export default function Dashboard() {
  return (
    <div>
      <UserNavbar />
      <div className="p-5 relative top-30 left-95 w-140">
        <h1 className="text-5xl">Welcome to the Library</h1>
        <h2 className="text-xl pt-5 pl-30">Keep Calm and Read On</h2>
      </div>
    </div>
  );
}
