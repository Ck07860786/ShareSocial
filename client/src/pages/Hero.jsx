import React from "react";
import { useNavigate } from "react-router-dom";

function HeroSection({ role = "user" }) {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="relative bg-gray-50 min-h-screen flex items-center justify-center px-6 py-12">
            <div className="absolute inset-0">
                <svg
                    className="absolute top-0 left-0 w-full h-full opacity-20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    fill="#f0f4f8"
                >
                    <path
                        d="M0,128L60,160C120,192,240,256,360,245.3C480,235,600,149,720,101.3C840,53,960,43,1080,58.7C1200,75,1320,117,1380,138.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    ></path>
                </svg>
            </div>
            <div className="relative z-10 text-center max-w-4xl">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
                    {role === "admin" ? "Admin Management Made Simple" : "Simplify Your Journey ! Manage, Submit, and Track with Ease"}
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-8">
                    {role === "admin"
                        ? "Effortlessly manage user submissions and oversee operations with our intuitive admin tools."
                        : "Submit your details, track progress, and explore opportunities effortlessly."}
                </p>
                <div className="flex flex-wrap justify-center space-x-4">
                    {role === "admin" ? (
                        <button
                            onClick={() => handleNavigate("/admin-dashboard")}
                            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-300"
                        >
                            Admin Dashboard
                        </button>
                    ) : (
                        <button
                            onClick={() => handleNavigate("/user")}
                            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-300"
                        >
                            User Dashboard
                        </button>
                    )}

                   

                    <button
                        onClick={() => handleNavigate("/admin-login")}
                        className="px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 transition duration-300"
                    >
                        Admin Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
