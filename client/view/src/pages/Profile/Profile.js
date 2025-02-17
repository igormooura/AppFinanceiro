import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import axios from "axios"; 
import useAuth from "../../hooks/useAuth.js";
import { useParams } from "react-router-dom";
import mongoose from "mongoose";

function Profile() {

  useAuth();

  const { isAuthenticated, userInfo, token } = useAuth();  
  const user = userInfo ? userInfo.userId : null;
  const [usuarioId, setUsuarioId] = useState(null);
  const [graficos, setGraficos] = useState([]);
  const userId = user;
  console.log("QA");
  console.log(userId);
  
  const { id } = useParams();
  
  

  const [data, setData] = useState("");
  const [genero, setGenero] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");
  const [country, setPais] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    setData(today.toLocaleDateString("pt-BR", options));
  }, []);

  useEffect(() => {
    console.log("userId:", userId); // Debugging: Check if userId is defined
    console.log("userInfo:", userInfo); // Debugging: Check if userInfo is defined
  
    if (userId) {
      console.log("aq"); // This should now print
      const fetchUserData = async () => {
        try {
          const userIdToFetch = id || userId;
          if (!userIdToFetch) return;
          setUsuarioId(userIdToFetch);
          const response = await axios.get(`http://localhost:5000/usuarios/perfil/usuarios/${userIdToFetch}`);
          const userData = response.data;
          console.log("RESPONSE AQUI PORRA ", response);
          setNome(userData.nome);
          setSobrenome(userData.sobrenome);
          setTelefone(userData.telefone);
          setCPF(userData.cpf);
          setGenero(userData.genero);
          setPais(userData.country);
          setEmail(userData.email);
        } catch (error) {
          console.error("Erro ao carregar dados do perfil", error);
          alert("Erro ao carregar perfil. Tente novamente.");
        }
      };
      fetchUserData();
    }
  }, [id, userId]);

  const handleGeneroChange = (event) => {
    setGenero(event.target.value);
  };

  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,4}).*/, "($1) $2");
    } else {
      value = value.replace(/^(\d*)/, "($1");
    }
    setTelefone(value);
  };

  const handleCPFChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, "$1.$2.$3-$4");
    setCPF(value);
  };

  const toggleEditMode = () => setEditMode((prevMode) => !prevMode);

const saveProfile = async () => {
  const updatedProfile = { nome, sobrenome, telefone, genero, country, cpf, telefone };

  try {
    console.log("usuarioId:", usuarioId); // Debugging: Check if usuarioId is defined
    if (!usuarioId) {
      alert("ID do usuário não encontrado.");
      return;
    }

    const response = await axios.put(
      `http://localhost:5000/usuarios/perfil/${usuarioId}`,
      updatedProfile
    );
    if (response.status === 200) {
      alert("Perfil atualizado com sucesso!");
      setEditMode(false);
    }
  } catch (error) {
    console.error("Erro ao atualizar perfil", error);
    alert(
      error.response?.data?.message ||
      error.message ||
      "Erro ao salvar perfil. Tente novamente."
    );
  }
};
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 bg-gradient-to-b from-[#C0F0B1] to-white p-5">
        <div className="ml-10 mt-5">
          <div className="text-left">
            <h2 className="text-3xl font-semibold text-gray-700">Bem-vindo, {nome}!</h2>
            <p className="text-gray-600">email: {email}</p>
            <p className="text-lg text-gray-500">{data}</p>
          </div>
        </div>
  
        <div className="h-[600px] w-[90%] bg-white rounded-lg shadow-md p-7 mx-auto mt-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full border-2 border-gray-300 overflow-hidden">
                <img
                  src="/static/usuario_sem_foto.jpg"
                  alt="Foto do usuário"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{nome} {sobrenome}</h2>
                <p className="text-gray-600">{email}</p>
              </div>
            </div>
            <button
              onClick={editMode ? saveProfile : toggleEditMode} 
              className={`px-4 py-2 rounded transition ${
                editMode
                  ? "bg-green-500 font-bold hover:scale-105 duration-300 hover:bg-green-600 text-white" 
                  : "bg-blue-500 font-bold hover:bg-blue-600 text-white hover:scale-105 duration-300"   
              }`}
            >
              {editMode ? "Salvar" : "Editar"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Primeiro Nome
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                id="nome"
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white border-2 border-gray-300 shadow-2xl"
                placeholder="Nome"
                disabled={!editMode}
              />
            </div>

            <div>
              <label htmlFor="sobrenome" className="block text-sm font-medium text-gray-700">
                Sobrenome
              </label>
              <input
                type="text"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                id="sobrenome"
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white border-2 border-gray-300 shadow-2xl"
                placeholder="Sobrenome"
                disabled={!editMode}
              />
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="text"
                value={telefone}
                onChange={handleTelefoneChange}
                id="telefone"
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white border-2 border-gray-300 shadow-2xl"
                placeholder="Ex (XX) XXXXX-XXXX"
                disabled={!editMode}
              />
            </div>

            <div>
              <label htmlFor="CPF" className="block text-sm font-medium text-gray-700">
                CPF
              </label>
              <input
                type="text"
                value={cpf}
                onChange={handleCPFChange}
                id="CPF"
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white border-2 border-gray-300 shadow-2xl"
                placeholder="Ex: 000.000.000-00"
                disabled={!editMode}
              />
            </div>

            <div>
              <label htmlFor="genero" className="block text-sm font-medium text-gray-700">
                Gênero
              </label>
              <select
                id="genero"
                value={genero}
                onChange={handleGeneroChange}
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white border-2 border-gray-300 shadow-2xl"
                disabled={!editMode}
              >
                <option value="">Selecione...</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label htmlFor="pais" className="block text-sm font-medium text-gray-700">
                País
              </label>
              <input
                type="text"
                id="pais"
                value={country}
                onChange={(e) => setPais(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white border-2 border-gray-300 shadow-2xl"
                placeholder="País"
                disabled={!editMode}
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Meu email</h3>
            <div>
             
              <div class = "flex"><div className="flex items-center gap-2nh text-gray-600 bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75M21.75 6.75L12 12.75M21.75 6.75L12 3m0 9.75l-9.75-6"
                />
              </svg>
            </div>
                <input
                type="text"
                id="pais"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[46%] px-4 py-3 rounded-lg   text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:text-blue-500 font-bold  "
                placeholder="País"
                disabled={!editMode}
              /></div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
