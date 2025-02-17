import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const PasswordField = ({ password, setPassword, showPassword, setShowPassword, placeholder }) => {
    return (
        <div>
            <label className="block text-lg font-montserrat-negrito text-white">Senha:</label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white border-2 border-gray-300 shadow-2xl"
                    placeholder={placeholder}
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />} 
                </button>
            </div>
        </div>
    );
};

export default PasswordField;
