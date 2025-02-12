import React, { useState, useContext, useEffect } from "react";
import NavWrapper from "../../Components/NavWrapper";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { useAuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
// import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  let { user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { handleChange } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      setSuccess("Login successful!");
      handleChange(response.data, response.data.token);
      navigate("/dashboard");
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log("response", response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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

  // } catch (err) {
  //   setError(err.response?.data?.message || 'Login failed');
  // }
  // };

  return (
    <NavWrapper>
      <motion.div
        className="flex items-center justify-center px-4 py-24 md:py-36 min-h-screen"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="shadow-xl shadow-gray-500 p-4 md:p-8 text-slate-800 w-full max-w-[500px] text-center flex flex-col gap-6 md:gap-8 rounded-xl animate-slideIn">
          <h1 className="font-bold text-3xl md:text-5xl">Login</h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:gap-6"
          >
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
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
                placeholder="Enter Your Password"
                className="border px-3 md:px-4 py-2 rounded-lg w-full font-medium focus:ring-customGreen focus:ring-2 focus:outline-none text-sm md:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  <span>Logging in...</span>
                </div>
              ) : (
                <p className="text-white">Login</p>
              )}
            </button>
          </form>

          <p className="font-semibold text-base md:text-lg">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="text-customGreen ">Sign Up</span>
            </Link>
          </p>
          <p className="font-semibold text-base md:text-lg">
            <Link to="/forgot-password">
              <span className="text-customGreen ">Forgot Password?</span>
            </Link>
          </p>
        </div>
      </motion.div>
    </NavWrapper>
  );
}
