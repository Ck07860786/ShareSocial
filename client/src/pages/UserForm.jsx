import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../helper/Port";
import { useNavigate } from "react-router-dom";

function UserForm() {
    const [name, setName] = useState("");
    const [socialMediaHandle, setHandle] = useState("");
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("socialMediaHandle", socialMediaHandle);

        
        for (let file of images) {
            formData.append("images", file);
        }

        try {
            setIsSubmitting(true);
            const response = await axios.post(`${BASE_URL}/api/submit-detail`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/success");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-6"
            >
                <h2 className="text-2xl font-semibold text-gray-700 text-center">
                    Submit Your Details
                </h2>

                {/* Name Field */}
                <div className="space-y-1">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                
                <div className="space-y-1">
                    <label
                        htmlFor="socialMediaHandle"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Social Media Handle
                    </label>
                    <input
                        type="text"
                        id="socialMediaHandle"
                        placeholder="@yourhandle"
                        value={socialMediaHandle}
                        onChange={(e) => setHandle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                
                <div className="space-y-1">
                    <label
                        htmlFor="images"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Upload Images
                    </label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        onChange={(e) => setImages([...e.target.files])}
                        className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-100 hover:file:bg-gray-200"
                        required
                    />
                </div>

                
                <button
                    type="submit"
                    className={`w-full py-2 px-4 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg transition duration-300`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default UserForm;
