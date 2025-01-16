import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../helper/Port";

function Signup() {
    const [username,setUserName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post(`${BASE_URL}/api/admin-signup`, {username, email, password });
            setLoading(false);

            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/admin-login");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            toast.error("Signup failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <form
                onSubmit={handleSignup}
                className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-6"
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    Admin Signup
                </h2>

                <div className="space-y-1">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-600"
                    >
                        username
                    </label>
                    <input
                        type="username"
                        id="username"
                        placeholder="Enter your email"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    } transition duration-300`}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>

                <p className="text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/admin-login")}
                        className="text-blue-500 cursor-pointer hover:underline"
                    >
                        Log In
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Signup;
