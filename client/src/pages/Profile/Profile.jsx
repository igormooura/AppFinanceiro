import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar/Sidebar.jsx";
import axios from "axios";
import useAuth from "../../hooks/useAuth.jsx";
import { useParams } from "react-router-dom";
import ProfileForm from "../../components/ProfilePageComponents/ProfileForm.jsx";
import ProfileEmail from "../../components/ProfilePageComponents/ProfileEmail";
import DeleteButton from "../../components/ProfilePageComponents/DeleteButton";

function Profile() {
  useAuth();

  const { isAuthenticated, userInfo, token } = useAuth();
  const user = userInfo ? userInfo.userId : null;
  const { id } = useParams();

  const [usuarioId, setUsuarioId] = useState(null);
  const userId = user;

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
    if (userId) {
      const fetchUserData = async () => {
        try {
          const userIdToFetch = id || userId; 
          if (!userIdToFetch) return;

          const response = await axios.get(
            `${process.env.REACT_APP_API_LINK}/usuarios/perfil/usuarios/${userIdToFetch}`
          );
          const userData = response.data;

          setUsuarioId(userData._id); 
          setNome(userData.nome);
          setSobrenome(userData.sobrenome);
          setTelefone(userData.telefone);
          setCPF(userData.cpf);
          setGenero(userData.genero);
          setPais(userData.country);
          setEmail(userData.email);
        } catch (error) {
          console.error("Error loading profile data", error);
          alert("Erro ao carregar dados. Tente novamente.");
        }
      };
      fetchUserData();
    }
  }, [id, userId]);

// userId is provided by the useAuth hook for authentication purposes.
// usuarioId is provided by the response data of this hook.
// Both IDs refer to the same user but are used in different contexts.

  const handleGeneroChange = (event) => setGenero(event.target.value);

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
    const updatedProfile = { nome, sobrenome, telefone, genero, country, cpf };

    try {
      if (!usuarioId) {
        alert("ID do usuário não encontrado.");
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_LINK}/usuarios/perfil/${userId}`, 
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
            <h2 className="text-3xl font-semibold text-gray-700">Welcome, {nome}!</h2>
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

          <ProfileForm
            nome={nome}
            sobrenome={sobrenome}
            telefone={telefone}
            cpf={cpf}
            genero={genero}
            country={country}
            editMode={editMode}
            setNome={setNome}
            setSobrenome={setSobrenome}
            handleTelefoneChange={handleTelefoneChange}
            handleCPFChange={handleCPFChange}
            handleGeneroChange={handleGeneroChange}
            setPais={setPais}
          />

          <ProfileEmail email={email} editMode={editMode} setEmail={setEmail} />

          <div className="mt-6">
            <DeleteButton userIdToFetch={usuarioId} userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;