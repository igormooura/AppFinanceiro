import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/SideBar/Sidebar";
import Title from "../../components/Title/Title";
import PageName from "../../components/PageName/PageName";

const Grafico = () => {
  const [graficos, setGraficos] = useState([]);
  const [activeTab, setActiveTab] = useState(null); 
  const [formData, setFormData] = useState({ moeda1: "", moeda2: "", value: "" });

  useEffect(() => {
    
    fetch("http://localhost:5000/grafico")
      .then((res) => res.json())
      .then((data) => setGraficos(data))
      .catch(() => alert("Erro ao buscar gráficos."));
  }, []);

  const handleTabClick = (tabId) => {
    
    if (!graficos[tabId]) {
      setActiveTab(tabId);
    }
  };
  const handleDelete = async (tabId) => {
    try {
      await axios.delete(`http://localhost:5000/grafico/${tabId}`);
      setGraficos((prev) => {
        const updatedGraficos = [...prev];
        updatedGraficos[tabId] = null; // Remove the graph from state
        return updatedGraficos;
      });
    } catch (error) {
      alert("Erro ao deletar gráfico.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post("http://localhost:5000/grafico/", formData);
      const newGraph = response.data;

      
      setGraficos((prev) => ({ ...prev, [activeTab]: newGraph }));
      setFormData({ moeda1: "", moeda2: "", value: "" });
      setActiveTab(null); 
    } catch (error) {
      alert("Erro ao adicionar gráfico.");
    }
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="h-screen w-[90%] bg-gradient-to-b from-[#C0F0B1] to-white">
        <div className="flex mt-2 items-center">
          <Title />
          <div>
            <a
              href="#"
              className="hover:scale-105 duration-500 flex items-center ml-auto mr-10 rounded-2xl w-60 h-16 border-[1px] border-gray-400 shadow-xl"
            >
              <div className="h-10 w-10 bg-blue-400 rounded-full my-auto ml-3"></div>
              <Link to="/perfil">
                <div className="ml-3 -space-y-1">
                  <p className="text-xl font-semibold text-black">Nome Completo</p>
                  <p className="text-gray-400">example@email.com</p>
                </div>
              </Link>
            </a>
            <form>
              <div className="w-[350px] mt-2 mr-10 rounded-full bg-green-100 h-9 flex shadow-lg shadow-gray-500 items-center">
                <a className="flex justify-center ml-3 " href="#">
                  <button className="shadow-2xl">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 5.5C2 4.94772 2.44772 4.5 3 4.5H21C21.5523 4.5 22 4.94772 22 5.5V6.5C22 7.05228 21.5523 7.5 21 7.5H3C2.44772 7.5 2 7.05228 2 6.5V5.5Z"
                        fill="#000000"
                      ></path>
                      <path
                        d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5H21C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z"
                        fill="#000000"
                      ></path>
                      <path
                        d="M3 16.5C2.44772 16.5 2 16.9477 2 17.5V18.5C2 19.0523 2.44772 19.5 3 19.5H21C21.5523 19.5 22 19.0523 22 18.5V17.5C22 16.9477 21.5523 16.5 21 16.5H3Z"
                        fill="#000000"
                      ></path>
                    </svg>
                  </button>
                </a>
                <input
                  placeholder="Procurar Moeda"
                  className="mx-auto w-[75%] flex bg-transparent h-full focus:outline-none focus:border-white justify-center"
                ></input>
                <img src="static/lupa.png" className="w-6 h-6 mr-3"></img>
              </div>
            </form>
          </div>
        </div>

        <PageName name="Moedas Expostas" />

        <div className="h-[500px] w-[90%] flex space-x-3 items-center justify-center mx-auto mt-10">
  <div id="screen" className="w-2/3 h-full bg-green-950 rounded-lg border-[6px] border-gray-400/40"></div>
  <div className="w-1/3 h-full space-y-5">
    {[1, 2, 3].map((tabId) => (
      <div key={tabId} className="h-[30%] flex space-x-1">
        <button
          className={`h-full w-[100%]   duration-300 ${
            graficos[tabId] ? "bg-transparent" : "rounded-lg shadow-inner hover:scale-105 shadow-zinc-500 bg-green-200"
          }`}
          onClick={() => handleTabClick(tabId)}
        >
          {graficos[tabId] ? (
            <div className="w-full flex space-x-[1px] h-full">
              {/* Delete Button */}
              <button
                className="w-[15%] rounded-xl shadow-inner shadow-zinc-800 hover:scale-[1.02] duration-500 hover:bg-red-400 bg-red-500"
                // onClick={() => handleDelete(tabId)} // Delete logic
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>

              {/* Content Button */}
              <div className="w-[85%] bg-zinc-900 shadow-inner shadow-black text-white">
                {graficos[tabId].moeda} vs {graficos[tabId].variavel}s
              </div>
            </div>
          ) : (
            <div className="relative h-16 w-16 flex items-center justify-center mx-auto my-auto group">
              <hr
                id="plus1"
                className="group-hover:bg-green-700 h-2 w-10 absolute rounded-xl mx-auto my-auto shadow-2xl shadow-black bg-green-600"
              ></hr>
              <hr
                id="plus"
                className="group-hover:bg-green-700 h-10 w-2 absolute rounded-xl mx-auto my-auto shadow-2xl bg-green-600"
              ></hr>
            </div>
          )}
        </button>
      </div>
    ))}
  </div>
</div>



        {/* Form for adding data */}
        {activeTab && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <form
              className="bg-white p-6 rounded-lg shadow-lg space-y-4"
              onSubmit={handleFormSubmit}
            >
              <h3 className="text-xl font-bold">Adicionar ao {activeTab}</h3>
              <input
                type="text"
                placeholder="Moeda 1"
                className="border rounded p-2 w-full"
                value={formData.moeda1}
                onChange={(e) => setFormData({ ...formData, moeda1: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Moeda 2"
                className="border rounded p-2 w-full"
                value={formData.moeda2}
                onChange={(e) => setFormData({ ...formData, moeda2: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Value"
                className="border rounded p-2 w-full"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                required
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setActiveTab(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grafico;
