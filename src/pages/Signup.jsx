import React from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="h-[98vh] flex items-center justify-center ">
      <div className="p-4 w-2/6 flex flex-col rounded bg-gray-800">
        <div>SignUp</div>
        <input
          type="username"
          name="username"
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3"
          id="username"
          required
        />
         <input
          type="email"
          name="xyz@example.com"
          placeholder="email"
          className="bg-gray-700 px-3 py-2 my-3"
          id="email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="bg-gray-700 px-3 py-2 my-3"
          id="password"
          required
        />

<div className="w-full flex items-center justify-between">
        <button className=" bg-blue-400 text-xl font-semibold text-black px-3 py-2  my-3 rounded">
            Signup
        </button>
        <Link to="/login" className="text-sm text-gray-400 hover:text-gray-700 hover:cursor-pointer"> Already have an account...? Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
