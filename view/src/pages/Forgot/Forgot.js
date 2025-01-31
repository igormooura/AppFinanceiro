import React, { useState } from "react";
import axios from "axios";
import EmailInput from "../../components/Inputs/EmailInput/EmailInput";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/usuarios/auth/esquecersenha",
        {
          email,
        }
      );
      setNovaSenha(response.data.novaSenha);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Invalid email");
    }
  };

  return (
    <div class="flex bg-gradient-to-t from-green-500 to-green-400/70 w-full  h-screen">
      <div class="h-[85%] w-[30%] mx-auto items-center my-auto   ">
        <p class="text-white text-4xl font-montserrat-negrito mx-auto flex justify-center ">
          Redefinir senha
        </p>
        <form onSubmit={handleSubmit} class="space-y-9 ">
          <div class="mt-20 pb-60">
            

            <div className="mb-4">
              <EmailInput
                email={email}
                setEmail={setEmail}
                placeholder={"Insira seu email"}
              />
            </div>
            
          </div>

          {error && (
            <p className="text-red-500 text-md text-2xl mx-auto flex justify-center  mb-2">
              ERRO: {error}
            </p>
          )}
        
          {novaSenha && (
            <div className="success">
              <p class="text-white font-montserrat-negrito text-xl">
                Sua nova senha é:&nbsp; &nbsp;
                <strong class="text-2xl">{novaSenha}</strong>
              </p>
            </div>
          )}
          <button
            type="submit"
            class=" bg-black rounded-xl text-white font-montserrat-negrito text-2xl py-3 px-40 mx-auto flex justify-center "
          >
            Pedir Senha Nova
          </button>
        </form>
      </div>
    </div>
  );
};
export default Forgot;
