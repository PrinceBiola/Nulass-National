import React, { useState } from "react";
import NavWrapper from "../../Components/NavWrapper";
import { sendOtp } from '../../api/auth';
import { Link, useNavigate } from "react-router-dom";


export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await sendOtp(email);
            setSuccess('OTP sent to your email! Please check your inbox.');
            // Optionally navigate to reset password page
            // navigate('/reset-password');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP');
        }
    };

    return (
        <NavWrapper>
            <div className="flex items-center justify-center px-4 py-24 md:py-36 min-h-screen">
                <div className="shadow-xl shadow-gray-500 p-4 md:p-8 text-slate-800 w-full max-w-[500px] text-center flex flex-col gap-6 md:gap-8 rounded-xl animate-slideIn">
                    <h1 className="font-bold text-3xl md:text-5xl">Forgot Password</h1>

                    <form onSubmit={handleSendOtp} className="flex flex-col gap-4 md:gap-6">
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
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
                        <button type="submit" className="bg-customGreen w-full py-2.5 md:py-3 font-semibold text-lg md:text-xl rounded-lg text-white">
                            Send OTP
                        </button>
                    </form>

                    <p className="font-semibold text-base md:text-lg">
                        Remembered your password?{" "}
                        <Link to="/login">
                            <span className="text-customGreen ">Login</span>
                        </Link>
                    </p>
                </div>
            </div>
        </NavWrapper>
    );
} 