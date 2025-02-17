import React from "react";

const EmailInput = ({ email, setEmail, placeholder }) => {
    return (
        <div>
            <label className="block text-lg font-montserrat-negrito text-white">Email:</label>
            <input
                type="email"
                value={email}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white border-2 border-gray-300 shadow-2xl"
                placeholder={placeholder}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
    );
};

export default EmailInput;
