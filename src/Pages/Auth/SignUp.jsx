import React, { useState } from "react";
import NavWrapper from "../../Components/NavWrapper";
import { Link } from "react-router";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <NavWrapper>
      <div className="flex items-center justify-center px-4 py-24 md:py-36 min-h-screen">
        <div className="shadow-xl shadow-gray-500 p-4 md:p-8 text-slate-800 w-full max-w-[500px] text-center flex flex-col gap-6 md:gap-8 rounded-xl animate-slideIn">
          <h1 className="font-bold text-3xl md:text-5xl">Sign Up</h1>

          <form action="" className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col text-base md:text-lg font-semibold text-start">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="text"
                id="text"
                placeholder="Enter Your Full Name"
                className="border px-3 md:px-4 py-2 rounded-lg w-full font-medium text-sm md:text-base focus:ring-customGreen focus:ring-2 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col text-base md:text-lg font-semibold text-start">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                className="border px-3 md:px-4 py-2 rounded-lg w-full font-medium focus:ring-customGreen focus:ring-2 focus:outline-none text-sm md:text-base"
                required
              />
            </div>
            <div className="flex flex-col text-base md:text-lg font-semibold text-start">
              <label htmlFor="Password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Create Your Password"
                className="border px-3 md:px-4 py-2 rounded-lg focus:ring-customGreen focus:ring-2 focus:outline-none w-full text-sm md:text-base font-medium"
                required
              />
            </div>
            <div className="flex flex-col text-base md:text-lg font-semibold text-start">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Your Password"
                className="border px-3 md:px-4 py-2 rounded-lg w-full focus:ring-customGreen focus:ring-2 focus:outline-none text-sm md:text-base font-medium"
                required
              />
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={toggleShowPassword}
                className="cursor-pointer"
              />
              <label htmlFor="showPassword" className="cursor-pointer">
                Show Password
              </label>
            </div>
          </form>

          <button className="bg-customGreen w-full py-2.5 md:py-3 font-semibold text-lg md:text-xl rounded-lg text-white">
            Sign Up
          </button>

          <p className="font-semibold text-base md:text-lg">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-customGreen ">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </NavWrapper>
  );
}
