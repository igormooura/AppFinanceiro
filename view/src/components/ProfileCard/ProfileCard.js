import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({ id }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const fetchUserData = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/usuarios/perfil/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      setError("Failed to fetch user data.");
      
    }
  };

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  return (
    <Link
      to={`/perfil`}
      className="hover:scale-105 duration-500 flex items-center ml-auto mr-10 rounded-2xl w-[280px] h-16 border-[1px] border-gray-400 shadow-xl"
    >
      <div className="h-10 w-10 bg-blue-400 rounded-full my-auto ml-3"></div>
      <div className="ml-3 -space-y-1">
        <p className="text-xl font-semibold text-black">
          {userData?.nome}
        </p>
        <p className="text-gray-400 px-2">
          {userData?.email || "example@email.com"}
        </p>
      </div>
    </Link>
  );
};

export default ProfileCard;
