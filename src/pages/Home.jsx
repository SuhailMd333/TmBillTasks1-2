import React from "react";
import { Sidebar } from "../components";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen gap-4 bg-gray-900 text-white p-4">
      {/* Sidebar container */}
      <div className="w-full md:w-1/4 bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-lg">
        <Sidebar />
      </div>

      {/* Content area */}
      <div className="w-full md:w-3/4 bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-lg overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
