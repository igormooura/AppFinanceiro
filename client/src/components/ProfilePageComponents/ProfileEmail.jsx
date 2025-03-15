import React from "react";

const ProfileEmail = ({ email, editMode, setEmail }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-2">My email</h3>
      <div>
        <div className="flex">
          <div className="flex items-center gap-2 text-gray-600 bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75M21.75 6.75L12 12.75M21.75 6.75L12 3m0 9.75l-9.75-6"
              />
            </svg>
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[46%] px-4 py-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:text-blue-500 font-bold"
            placeholder="Email"
            disabled={!editMode}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileEmail;