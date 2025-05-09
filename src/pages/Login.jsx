import React from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <div className="h-[98vh] flex items-center justify-center ">
    <div className="p-4 w-2/6 flex flex-col rounded bg-gray-800">
      <div> Login</div>
      <input
          type="username"
          name="username"
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3"
          id="username"
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
            Login
        </button>
        <Link to="/signup" className="text-sm text-gray-400 hover:text-gray-700 hover:cursor-pointer"> Not having an account...? Signup here</Link>
        </div>
      </div>
      </div>
  )
}

export default Login