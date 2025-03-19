import React from "react";


const ProfileForm = ({
  nome,
  sobrenome,
  telefone,
  cpf,
  genero,
  country,
  editMode,
  setNome,
  setSobrenome,
  handleTelefoneChange,
  handleCPFChange,
  handleGeneroChange,
  setPais,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          First Name
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
          Surname
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
          Cellphone
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
          CPF (Optional)
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
          Gender
        </label>
        <select
          id="genero"
          value={genero}
          onChange={handleGeneroChange}
          className="mt-1 block w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white border-2 border-gray-300 shadow-2xl"
          disabled={!editMode}
        >
          <option value="">Select...</option>
          <option value="Male">Male</option>
          <option value="female">Female</option>
          <option value="outro">Others</option>
        </select>
      </div>

      <div>
        <label htmlFor="pais" className="block text-sm font-medium text-gray-700">
          Country
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
  );
};

export default ProfileForm;