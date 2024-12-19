import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [moedasNaCarteira, setMoedasNaCarteira] = useState("");

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
        <div className="flex items-center justify-center w-full h-screen bg-gradient-to-t from-green-500 to-green-400/70">
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
                            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Seu nome"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-white">Email:</label>
                        <input
                            type="email"
                            value={email}
                            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white p-4"
                            placeholder="example@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-white">Senha:</label>
                        <input
                            type="password"
                            value={password}
                            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Sua senha"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-white drop-shadow-lg">
                            Moedas na Carteira:
                        </label>
                        <input
                            type="text"
                            value={moedasNaCarteira}
                            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Quantidade de moedas"
                            onChange={(e) => setMoedasNaCarteira(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-bold text-green-700 bg-white rounded-lg hover:bg-white/90 focus:outline-none"
                    >
                        Criar Conta
                    </button>
                    <p className="mt-4 text-center text-white text-base  drop-shadow">
                        Já possui uma conta?{" "}
                        <a href="/" className="text-blue-500 hover:underline  drop-shadow-lm">
                            Faça login
                        </a>
                    </p>
                    {error && <p className="mt-4 text-sm text-center text-red-500  drop-shadow">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
