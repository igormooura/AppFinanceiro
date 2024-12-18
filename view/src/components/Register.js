import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const[moedasNaCarteira, setMoedasnaCarteira] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:5000/usuarios/auth/cadastrar", {
                nome: name,
                email,
                senha: password,
                moedasNaCarteira,
            });
            setError(""); 
        }
        catch(err){
            console.error(err);
            setError("Invalid email");
        }
    };
    return(
        <div class = "border-8 rounded-2xl border-white flex bg-gradient-to-t from-green-500 to-green-400/70 w-full h-screen">
            <div class = "h-[85%] w-[30%]    mx-auto items-center my-auto   ">
                <p class = "text-white text-4xl font-bold mx-auto flex justify-center ">
                    Crie sua Conta
                </p>
                <form onSubmit={handleSubmit} class = "space-y-9 ">
                <div class ="mt-20 ">
                    <label class = "block text-white text-2xl ">Name:</label>
                    <input
                        type="text"
                        value={name}
                        placeholder="example@email.com"
                        className="w-full border-2 placeholder-gray-300 bg-transparent  border-gray-500/40 shadow-2xl rounded-lg p-4"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label class = "block text-white text-2xl">Email:</label>
                    <input
                        type="email"
                        value={email}
                        className="w-full border-2 placeholder-gray-300 bg-transparent  border-gray-500/40 shadow-2xl rounded-lg p-4"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label class = "block text-white text-2xl">Password:</label>
                    <input
                        type="password"
                        value={password}
                        className="w-full border-2 placeholder-gray-300 bg-transparent  border-gray-500/40 shadow-2xl rounded-lg p-4"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div class = "pb-52">
                    <label class = "block text-white text-2xl">Moedas na Carteira:</label>
                    <input
                        type="text"
                        value={moedasNaCarteira}
                        className="w-full border-2 placeholder-gray-300 bg-transparent  border-gray-500/40 shadow-2xl rounded-lg p-4"
                        onChange={(e) => setMoedasnaCarteira(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button type="submit" class = " bg-black rounded-xl text-white font-bold text-2xl py-3 px-40 mx-auto flex justify-center ">Criar Conta</button>
                <p class = "flex justify-center -mt-5 text-lg mx-auto text-white">Já possui uma conta?&nbsp;<a href = "/" class = "text-blue-700">Log in  </a></p>
            </form>
            </div>
        </div>



    );

}

export default Register