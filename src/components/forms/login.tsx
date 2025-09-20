import React, { useState } from "react";

// --- SVG ICONS ---
import { supabase } from "../../supabase/supabaseClient";

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// --- LOGIN FORM COMPONENT ---

const LoginForm = ({ setView }) => {
  const [role, setRole] = useState("citizen"); // 'citizen' or 'admin'

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      alert("Login successful!");

      // Redirect based on role
      if (role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/client";
      }
    } catch (err: any) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    // This wrapper div centers the form and sets the background
    <div className="flex justify-center items-center min-h-screen bg-black font-sans">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-950/50 border border-gray-800 rounded-2xl shadow-2xl shadow-sky-500/10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-400">Log in to continue reporting.</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-gray-900 p-1">
          <button
            onClick={() => setRole("citizen")}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
              role === "citizen"
                ? "bg-sky-500 text-white"
                : "text-gray-400 hover:bg-gray-800"
            }`}
          >
            Citizen
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
              role === "admin"
                ? "bg-sky-500 text-white"
                : "text-gray-400 hover:bg-gray-800"
            }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MailIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="block w-full rounded-md border-0 bg-gray-900 py-3 pl-10 pr-3 text-gray-50 ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm transition-all"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="block w-full rounded-md border-0 bg-gray-900 py-3 pl-10 pr-3 text-gray-50 ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm transition-all"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={() => (window.location.href = "/Signup")}
            className="font-semibold text-sky-400 hover:text-sky-300 cursor-pointer"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
