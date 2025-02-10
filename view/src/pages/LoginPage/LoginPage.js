import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmailInput from "../../components/Inputs/EmailInput/EmailInput";
import PasswordField from "../../components/Inputs/PasswordInput/Password";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRememberMe = () => {
    setRememberMe((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email: email,
        senha: password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log(response.data.usuario.id);
        if (rememberMe) {
          localStorage.setItem("rememberMe", true);
        } else {
          localStorage.removeItem("rememberMe");
        }
        navigate(`/grafico`);
        
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
    } catch (err) {
      console.error(err);
      setError("E-mail ou senha inválidos.");
    } finally {
      setIsLoading(false);
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
            <EmailInput email={email} setEmail={setEmail} placeholder={"Insira seu email"} />
          </div>

          <div className="mb-4">
            <PasswordField
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              placeholder={"Insira sua senha"}
            />
          </div>

          <div className="flex mb-7">
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
              <a href="/esquecer" className="text-blue-600 font-semibold">
                Esqueci minha senha
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white text-2xl font-bold shadow-xl p-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              "Login"
            )}
          </button>
          <hr className="w-full h-[0.1px] bg-white mt-14"></hr>
          <p className="text-white text-xl mx-auto items-center justify-center flex mt-10">
            Não possui uma conta?&nbsp;
            <a href="/register" className="text-blue-500"> Cadastro</a>
          </p>
        </form>
      </nav>
    </div>
  );
};

export default LoginPage;