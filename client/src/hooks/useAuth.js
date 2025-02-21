import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (!token) {
      navigate("/");
      alert("Logue para acessar.");
      return;
    }

    fetch(`${process.env.REACT_APP_API_LINK}/auth/verify-auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem("token");
          setToken("");  
          navigate("/");
          alert("Sessão expirada. Logue novamente.");
          return;
        } else if (!response.ok) {
          throw new Error("Erro ao verificar autenticação.");
        }
        return response.json();
      })
      .then((data) => {
        setIsAuthenticated(true);
        setUserInfo(data.user);
        setToken(token); 
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }, [navigate, token]);

  return { isAuthenticated, userInfo, token };  
}

export default useAuth;
