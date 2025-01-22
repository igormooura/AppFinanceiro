import React, { useState } from "react";
import axios from "axios";
import PasswordField from "../../components/Inputs/PasswordInput/Password"; 
import EmailInput from "../../components/Inputs/EmailInput/EmailInput"; 

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [moedasNaCarteira, setMoedasNaCarteira] = useState("");
    const [showPassword, setShowPassword] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/usuarios/auth/cadastrar", {
                nome: name,
                email,
                senha: password,
                moedasNaCarteira,
            });
            setError("");
        } catch (err) {
            console.error(err);
            setError("Erro ao cadastrar. Verifique os dados informados.");
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-green-500 to-green-700/40">
            <div className="w-[90%] max-w-lg">
                <h1 className="text-4xl font-bold text-center text-white mb-10">
                    Crie sua Conta
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg font-medium text-white">Nome:</label>
                        <input
                            type="text"
                            value={name}
                            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white border-2 border-gray-300 shadow-2xl"
                            placeholder="Seu nome"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <EmailInput email={email} setEmail={setEmail} placeholder={"example@email.com"}/>

                    <PasswordField password={password} setPassword={setPassword} showPassword={showPassword} setShowPassword={setShowPassword} placeholder={"Senha"}/>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white text-2xl font-bold shadow-xl p-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Criar Conta
                    </button>
                    <p className="mt-4 text-center text-white text-base drop-shadow">
                        Já possui uma conta?{" "}
                        <a href="/" className="text-blue-500 hover:underline drop-shadow-lm">
                            Faça login
                        </a>
                    </p>
                    {error && <p className="mt-4 text-sm text-center text-red-500 drop-shadow">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
