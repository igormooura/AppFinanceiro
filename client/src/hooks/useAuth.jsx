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
      alert("Please log in to access.");
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
          alert("Session expired. Please log in again.");
          return;
        } else if (!response.ok) {
          throw new Error("Error verifying authentication.");
        }
        return response.json();
      })
      .then((data) => {
        setIsAuthenticated(true);
        setUserInfo(data.user);
        setToken(token); 
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [navigate, token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsAuthenticated(false);
    setUserInfo(null);
    navigate("/");
  };

  return { isAuthenticated, userInfo, token, logout };  
}

export default useAuth;