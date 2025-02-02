import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAuth() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/"); 
            alert("Logue para acessar."); 
        }
    }, [navigate]);
}

export default useAuth;