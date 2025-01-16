import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        
        localStorage.removeItem("token"); 
  
        navigate("/admin-login");
    };

    return (
        <button
            onClick={handleLogout}
            className=" bg-zinc-950 text-white px-4 py-2 rounded-lg hover:bg-zinc-500 transition"
        >
            Logout
        </button>
    );
};

export default Logout;
