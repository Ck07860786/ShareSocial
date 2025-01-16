import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../helper/Port";
import toast from "react-hot-toast";

function Login() {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");  
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    
    const handleUsernameChange = (e) => setUsername(e.target.value);
    
    
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        
        if (!username || !password) {
            setError("Please fill in both fields");
            return;
        }

        try {
            
            const response = await axios.post(`${BASE_URL}/api/admin-login`, {
                username,   
                password,
            });
            
            const { token} = response.data;

            
            localStorage.setItem("token", token);
           

            
            navigate("/admin-dashboard");
            toast.success('Login Sucessfull')
        } catch (err) {
            setError("Invalid credentials. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                    
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/admin-signup" className="text-blue-600 hover:underline">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
