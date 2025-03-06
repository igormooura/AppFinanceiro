import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import PasswordField from "../../components/Inputs/PasswordInput/Password"; 
import EmailInput from "../../components/Inputs/EmailInput/EmailInput"; 

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); 
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [genero, setGenero] = useState("");
    const [country, setCountry] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const [isRedirecting, setIsRedirecting] = useState(false); 

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        setSuccess(""); 
        try {
            await axios.post(`${process.env.REACT_APP_API_LINK}/auth/cadastrar`, {
                nome: name,
                sobrenome: lastName,
                genero,
                country,
                email,
                senha: password,
            });
            setSuccess("Conta cadastrada com sucesso! 🎉");
            setError(""); 
            setIsRedirecting(true);
            setTimeout(() => {
                navigate("/"); 
            }, 4000);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error); 
            } else {
                setError("Erro ao cadastrar. Verifique os dados informados.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-b from-green-500 to-green-700/40 p-4">
            <div className="w-[90%] max-w-lg">
                <h1 className="text-4xl font-bold text-center text-white mb-10">
                    Create your account
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg font-medium text-white">Name:</label>
                        <input
                            type="text"
                            value={name}
                            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white border-2 border-gray-300 shadow-2xl"
                            placeholder="Ex: Paulo"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-white">Surname:</label>
                        <input
                            type="text"
                            value={lastName}
                            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white border-2 border-gray-300 shadow-2xl"
                            placeholder="Ex: Ribeiro"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <EmailInput email={email} setEmail={setEmail} placeholder={"Ex: example@email.com"} />

                    <PasswordField password={password} setPassword={setPassword} showPassword={showPassword} setShowPassword={setShowPassword} placeholder={"Password"} />

                    <div>
                        <label className="block text-lg font-medium text-white">Gender:</label>
                        <select
                            value={genero}
                            onChange={(e) => setGenero(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 border-2 border-gray-300 shadow-2xl"
                        >
                            <option value="">Selecione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-white">Country:</label>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 border-2 border-gray-300 shadow-2xl"
                            placeholder="Ex: Brasil"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white text-2xl font-bold shadow-xl p-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Register
                    </button>

                    <p className="mt-4 text-center text-white text-base drop-shadow">
                        Already have an account?{" "}
                        <a href="/" className="text-blue-500 hover:underline drop-shadow-lm">
                            Login here
                        </a>
                    </p>

                    <div className="min-h-[24px] flex items-center justify-center">
                        {success && <p className="text-sm text-center text-green-500 drop-shadow">{success}</p>}
                        {error && <p className="text-sm text-center text-red-500 drop-shadow">{error}</p>}
                        {isRedirecting && (
                            <div className="text-sm text-center text-yellow-500 drop-shadow">
                                Redirecionando para o login...
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
