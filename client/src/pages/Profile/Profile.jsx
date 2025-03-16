import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar/Sidebar.jsx";
import axios from "axios";
import useAuth from "../../hooks/useAuth.jsx";
import { useParams } from "react-router-dom";
import ProfileForm from "../../components/ProfilePageComponents/ProfileForm.jsx";
import ProfileEmail from "../../components/ProfilePageComponents/ProfileEmail";
import DeleteButton from "../../components/ProfilePageComponents/DeleteButton";

function Profile() {
  const { userInfo } = useAuth();
  const { id } = useParams();
  const userId = userInfo ? userInfo.userId : null;

  const [usuarioId, setUsuarioId] = useState(null);
  const [data, setData] = useState("");
  const [userData, setUserData] = useState({
    nome: "",
    sobrenome: "",
    telefone: "",
    cpf: "",
    genero: "",
    country: "",
    email: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    setData(today.toLocaleDateString("pt-BR", options));
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userIdToFetch = id || userId;
        if (!userIdToFetch) return;

        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/usuarios/perfil/usuarios/${userIdToFetch}`
        );
        const userData = response.data;

        setUsuarioId(userData._id);
        setUserData({
          nome: userData.nome,
          sobrenome: userData.sobrenome,
          telefone: userData.telefone,
          cpf: userData.cpf,
          genero: userData.genero,
          country: userData.country,
          email: userData.email,
        });
      } catch (error) {
        console.error("Error loading profile data", error);
        alert("Erro ao carregar dados. Tente novamente.");
      }
    };

    if (userId || id) fetchUserData();
  }, [id, userId]);

  const saveProfile = async () => {
    const updatedProfile = {
      nome: userData.nome,
      sobrenome: userData.sobrenome,
      telefone: userData.telefone,
      genero: userData.genero,
      country: userData.country,
      cpf: userData.cpf,
    };

    try {
      if (!usuarioId) {
        alert("ID do usuário não encontrado.");
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_LINK}/usuarios/perfil/${usuarioId}`,
        updatedProfile
      );
      if (response.status === 200) {
        alert("Perfil atualizado com sucesso!");
        setEditMode(false);
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil.", error);
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
            <h2 className="text-3xl font-semibold text-gray-700">
              Welcome, {userData.nome}!
            </h2>
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
                <h2 className="text-2xl font-bold">
                  {userData.nome} {userData.sobrenome}
                </h2>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>
            <button
              onClick={editMode ? saveProfile : () => setEditMode(!editMode)}
              className={`px-4 py-2 rounded transition ${
                editMode
                  ? "bg-green-500 font-bold hover:scale-105 duration-300 hover:bg-green-600 text-white"
                  : "bg-blue-500 font-bold hover:bg-blue-600 text-white hover:scale-105 duration-300"
              }`}
            >
              {editMode ? "Salvar" : "Editar"}
            </button>
          </div>

          <ProfileForm
            userData={userData}
            setUserData={setUserData}
            editMode={editMode}
          />

          <ProfileEmail
            email={userData.email}
            setEmail={(value) => setUserData({ ...userData, email: value })}
            editMode={editMode}
          />

          <div className="mt-6">
            <DeleteButton userIdToFetch={usuarioId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;