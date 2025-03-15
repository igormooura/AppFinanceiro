import React from "react";
import axios from "axios";

const DeleteButton = ({ userIdToFetch }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_LINK}/usuarios/perfil/${userIdToFetch}`
        );

        if (response.status === 200) {
          alert("Account deleted successfully!");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Erro ao deletar conta:", error);
        alert(error.response?.data?.message || error.message || "Erro ao deletar conta. Tente novamente.");
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
    >
      Delete Account
    </button>
  );
};

export default DeleteButton;
