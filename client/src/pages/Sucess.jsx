import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sucess() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/')
    };

    return (
        <div className="flex items-center justify-center min-h-screen  bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-6 text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto text-green-500 h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-700">
                    Submission Successful!
                </h2>
                <p className="text-gray-600">Your submission has been received. Thank you for sharing!</p>
                <button
                    onClick={handleGoBack}
                    className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                >
                    Go Back to Home
                </button>
            </div>
        </div>
    );
}

export default Sucess;
