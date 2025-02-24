import React, { useState, useContext, useEffect } from "react";
import NavWrapper from "../../Components/NavWrapper";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";

export default function SignUp() {
  // const {user} = useContext(useAuthContext);
  const [user, setUser] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await registerUser({ surname, name, email, password });
      setUser(response.data.user);
      setSuccess("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <NavWrapper>
      <motion.div
        className="flex items-center justify-center px-4 py-24 md:py-36 min-h-screen"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="shadow-xl shadow-gray-500 p-4 md:p-8 text-slate-800 w-full max-w-[500px] text-center flex flex-col gap-6 md:gap-8 rounded-xl animate-slideIn">
          <h1 className="font-bold text-3xl md:text-5xl">Sign Up</h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:gap-6"
          >
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <div className="flex flex-col text-base md:text-lg font-semibold text-start">
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                name="surname"
                id="surname"
                placeholder="Enter Your Surname"
                className="border px-3 md:px-4 py-2 rounded-lg w-full font-medium text-sm md:text-base focus:ring-customGreen focus:ring-2 focus:outline-none"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col text-base md:text-lg font-semibold text-start">
              <label htmlFor="name">Other Names</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Other Names"
                className="border px-3 md:px-4 py-2 rounded-lg w-full font-medium text-sm md:text-base focus:ring-customGreen focus:ring-2 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col text-base md:text-lg font-semibold text-start">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                className="border px-3 md:px-4 py-2 rounded-lg w-full font-medium focus:ring-customGreen focus:ring-2 focus:outline-none text-sm md:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col text-base md:text-lg font-semibold text-start">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Create Your Password"
                className="border px-3 md:px-4 py-2 rounded-lg focus:ring-customGreen focus:ring-2 focus:outline-none w-full text-sm md:text-base font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <button
              type="submit"
              className={`bg-customGreen w-full py-2.5 md:py-3 font-semibold text-lg md:text-xl rounded-lg text-white${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-customGreen hover:bg-green-600"
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center space-x-2 text-white">
                  <Loader2 className="animate-spin" />
                  <span>Signing up...</span>
                </div>
              ) : (
                <p className="text-white">Sign Up</p>
              )}
            </button>
          </form>

          <p className="font-semibold text-base md:text-lg">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-customGreen ">Login</span>
            </Link>
          </p>
        </div>
      </motion.div>
    </NavWrapper>
  );
}
