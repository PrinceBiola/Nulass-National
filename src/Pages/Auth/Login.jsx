import React, { useState } from "react";
import NavWrapper from "../../Components/NavWrapper";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <NavWrapper>
      <div className="flex items-center justify-center px-4 pt-24 md:pt-36 min-h-screen">
        <div className="shadow-xl shadow-gray-500 p-4 md:p-8 text-slate-800 w-full max-w-[500px] text-center flex flex-col gap-6 md:gap-8 rounded-xl animate-slideIn">
          <h1 className="font-extrabold text-3xl md:text-4xl">Login</h1>

          <form action="" className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col text-base md:text-lg font-semibold text-start">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                className="border px-3 md:px-4 py-2 rounded-lg w-full font-medium text-sm md:text-base focus:ring-customGreen focus:ring-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col text-base md:text-lg font-semibold text-start">
              <label htmlFor="Password">Password</label>
              <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Your Password"
                className="border px-3 md:px-4 py-2 rounded-lg w-full text-sm md:text-base font-medium focus:ring-customGreen focus:ring-2 focus:outline-none"
              />
              <FaEye className="absolute top-3 right-2 cursor-pointer" id="showPassword" checked={showPassword}
                onClick={toggleShowPassword} />
              </div>
            </div>
          </form>

          <button className="bg-customGreen w-full py-2.5 md:py-3 font-semibold text-lg md:text-xl rounded-lg text-white">
            Sign In
          </button>

          <p className="font-semibold text-base md:text-lg">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="text-customGreen">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </NavWrapper>
  );
}
