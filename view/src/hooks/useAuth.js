import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function useAuth() {
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log(token)
    if (!token) {
      console.log(token)
      navigate("/"); 
      alert("Logue para acessar."); 
    } else {
      fetch("http://localhost:5000/auth/verify-auth", { 
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/"); 
          alert("Sessão expirada. Logue novamente.");
        } else if (!response.ok) {
          throw new Error("Erro ao verificar autenticação.");
        }
        return response.json();
      })
      .then(data => {
        console.log("Autenticação válida:", data);
      })
      .catch(error => {
        console.error("Erro:", error);
      });
    }
  }, [navigate, location]);

}

export default useAuth;
