import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../helper/Port";
import Logout from "../components/Logout";

function AdminDashboard() {
    const [submissions, setSubmissions] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/api/submissions`);
                setSubmissions(data);
            } catch (error) {
                console.error("Error fetching submissions:", error);
            }
        };

        fetchSubmissions();

       
        const interval = setInterval(fetchSubmissions, 10000);

        return () => clearInterval(interval);
    }, []);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
                
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-semibold text-gray-800">
                        Admin Dashboard
                    </h1>
                    <div className="flex-shrink-0">
                        <Logout />
                    </div>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {submissions.map((submission) => (
                        <div
                            key={submission._id}
                            className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
                        >
                            <h2 className="text-2xl font-bold text-gray-800">{submission.name}</h2>
                            <p className="text-gray-600 mt-2">{submission.socialMediaHandle}</p>

                            <div className="mt-4 flex flex-wrap">
                                {submission.images && submission.images.length > 0 ? (
                                    submission.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image.url}
                                            alt={`user-image-${index}`}
                                            className="w-24 h-24 object-cover rounded-lg m-2 shadow-md cursor-pointer"
                                            onClick={() => handleImageClick(image.url)}
                                        />
                                    ))
                                ) : (
                                    <p className="text-gray-500">No images available</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={closeModal}
                >
                    <div className="bg-white p-4 rounded-lg">
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="max-w-full max-h-[80vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
