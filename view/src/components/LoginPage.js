import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for Remember Me
  const navigate = useNavigate();

  const handleRememberMe = () => {
    setRememberMe((prev) => !prev); // Toggle the remember state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to login route
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      // If Remember Me is active, store the token
      if (rememberMe) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("rememberMe", true);

      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("rememberMe");
      }

      // Navigate to another page after login
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex">
      <div
        className="border-green-500 w-2/3 h-screen"
        style={{
          backgroundImage: "url('/static/bitcoin.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div></div>  
      <nav className="bg-gradient-to-b flex from-green-500 to-green-700/40 w-1/3 h-screen">
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded mx-auto my-auto w-[80%]"
        >
          <h2 className="text-2xl mb-8 text-start text-white font-bold">
            Seja bem vindo(a)!
          </h2>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <div className="mb-4">
            <label className="block text-sm text-white mb-1">Login</label>
            <input
              type="email"
              value={email}
              placeholder="Insira o Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-300 shadow-2xl rounded-lg p-4"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm mb-1">Senha</label>
            <input
              type="password"
              value={password}
              placeholder="Insira a senha"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-300 shadow-2xl rounded-lg p-4"
              required
            />
          </div>

          <div className="flex mb-7">
            {/* Remember Me Toggle */}
            <div className="flex mr-auto ml-2 items-center">
              <div
                className={`rounded-3xl w-[60px] flex items-center h-[30px] cursor-pointer ${
                    rememberMe ? "bg-green-400" : "bg-gray-200"
                } transition-colors duration-300`}
                onClick={handleRememberMe}
              >
                <div
                  className={`bg-white h-6 w-6 rounded-full shadow-md transform ${
                    rememberMe ? "translate-x-7 bg-green-900" : "translate-x-1"
                  } transition-transform duration-300`}
                ></div>
              </div>
              <p className="ml-4 text-white font-semibold">Lembrar</p>
            </div>

            <div className="ml-auto mr-2">
              <a href="#" className="text-blue-600 font-semibold">
                Esqueci minha senha
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white text-2xl font-bold shadow-xl p-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
            <hr class = "w-full h-[0.1px] bg-white mt-14"></hr>
            <p class = "text-white text-xl mx-auto items-center justify-center flex mt-10">Não possui uma conta?&nbsp; <a href = "#" class = "text-blue-500"> Cadastro</a></p>
        </form>
    
      </nav>
    </div>
  );
};

export default LoginPage;
