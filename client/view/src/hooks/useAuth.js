import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  console.log("aquiiiiiiiii: " + token);

  useEffect(() => {
    if (!token) {
      navigate("/");
      alert("Logue para acessar.");
      return;
    }

    fetch("http://localhost:5000/auth/verify-auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem("token");
          setToken("");  // Clear the token
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
        setToken(token);  // Store the token
        console.log("Autenticação válida:", data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }, [navigate, token]);

  return { isAuthenticated, userInfo, token };  // Return both isAuthenticated and token
}

export default useAuth;
