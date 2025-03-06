import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({ id }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const fetchUserData = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_LINK}/usuarios/perfil/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
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
      className="hover:scale-105 duration-500 mt-2 mb-5 lg:mb-0 flex items-center justify-center mx-auto  lg:ml-auto lg:mr-10 rounded-2xl lg:w-[300px] w-[200px] h-16 lg:h-[70px] border-[1px] border-gray-400 shadow-xl"
    >
      <div className="lg:h-10 h-8 w-8 lg:w-10 bg-blue-400 rounded-full my-auto lg:-ml-12 ml-2"></div>
      <div className="ml-2 -space-y-1">
        <p className="text-md ml-2 lg:text-xl font-semibold text-black">
          {userData?.nome|| "carregando..."}
        </p>
        <p className="text-gray-400 text-sm lg:text-md px-2">
          {userData?.email || "carregando..."}
        </p>
      </div>
    </Link>
  );
};

export default ProfileCard;
