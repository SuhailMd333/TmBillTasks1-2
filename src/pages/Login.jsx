import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSpring, animated } from "@react-spring/web";
import {authActions} from '../reducer/auth'

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
     if(localStorage.getItem('id')) {
    navigate("/")
     }
    setMounted(true);
  }, [navigate]);

  const animation = useSpring({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    config: { tension: 220, friction: 20 },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!data.username || !data.password) {
        return toast.error("All fields are required");
      }

      const response = await axios.post("https://tmbill-backend.onrender.com/api/v1/login", data);
       dispatch(authActions.login());
      localStorage.setItem("token", response.data.authToken);
      localStorage.setItem("id", response.data.id);
      

      toast.success(response.data.message || "Login successful!");
      navigate("/");
    } catch (error) {
      const errorMsg =
        error.response?.data?.errors ||
        error.response?.data?.message ||
        "Login failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Toaster
        position="top-center"
        toastOptions={{
          className: "bg-gray-800 text-white border border-gray-700",
        }}
      />

      <animated.div
        style={animation}
        className="w-full max-w-md bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-sm text-gray-400">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["username", "password"].map((field) => (
            <div className="relative" key={field}>
              <input
                type={field === "password" && !showPassword ? "password" : "text"}
                name={field}
                id={field}
                value={data[field]}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full px-4 py-3 bg-gray-700 text-white placeholder-transparent rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-12"
                required
                autoComplete={field === "password" ? "current-password" : field}
              />
              <label
                htmlFor={field}
                className="absolute left-3 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-400"
              >
                {data[field].length ? null : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-500 text-white cursor-pointer font-semibold py-3 rounded-lg transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="text-center text-sm text-gray-300">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Sign up here
            </Link>
          </div>
        </form>
      </animated.div>
    </div>
  );
};

export default Login;
