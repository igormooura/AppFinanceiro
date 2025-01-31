    import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/SideBar/Sidebar";
import Title from "../../components/Title/Title";
import PageName from "../../components/PageName/PageName";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);



const Grafico = () => {
  const [graficos, setGraficos] = useState([]);
  const [activeTab, setActiveTab] = useState(null); 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ moeda1: "", moeda2: "", value: "" });
  const [chartData, setChartData] = useState(null);
  const [perceCe, setPerceCe] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/grafico")
      .then((res) => res.json())
      .then((data) => setGraficos(data))
      .catch(() => alert("Erro ao buscar gráficos."));
  }, []);

  const handleTabClick = async (tabId) => {
  setActiveTab(tabId); // Set the activeTab state even if the tab doesn't have content

  if (!graficos[tabId]) return;

  const moeda = graficos[tabId].moeda;
  const variavel = graficos[tabId].variavel;
  const quantia = graficos[tabId].valor
  console.log(moeda + " " + quantia)
  var condition = 0;
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${moeda}/market_chart`,
      {
        params: {
          vs_currency: variavel,
          days: 14, 
          interval: "daily",
        },
      }
    );
    console.log(response);
    const prices = response.data.prices.map(([timestamp, valor]) => ({
      date: new Date(timestamp).toLocaleDateString(),
      valor,
    }));

    var min = prices[0].valor;
    var size = prices.length;
    var max = prices[size - 1].valor;
    
    var conv = quantia * max;
    var p = 100.0 - (max*100.0)/min;
    
    setPerceCe({
      perce: p,
      conv: conv,



    });
    
    
    

    setChartData({
      labels: prices.map((p) => p.date),
      datasets: [
        {
          label: `${moeda} to ${variavel}`,
          data: prices.map((p) => p.valor),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    });
  } catch (error) {
      console.error("Error fetching data:", error);
      condition = 1;
      
    }
  if(condition == 1) {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${variavel}/market_chart`,
        {
          params: {
            vs_currency: moeda,
            days: 14, 
            interval: "daily",
          },
        }
      );
      console.log(response);
      const prices = response.data.prices.map(([timestamp, valor]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        valor: 1/valor,
      }));
     

      setChartData({
        labels: prices.map((p) => p.date),
        datasets: [
          {
            label: `${moeda} to ${variavel}`,
            data: prices.map((p) => p.valor),
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      });
    }
  };
  
  
  const handleDelete = async (tabId, graphId) => {
    try {
      await axios.delete(`http://localhost:5000/grafico/${graphId}`);
      setGraficos((prev) => {
        const updatedGraficos = [...prev];
        updatedGraficos[tabId] = null; // Remove the graph from state
        return updatedGraficos;
      });
    } catch (error) {
      console.log(error);
      alert("Erro ao deletar gráfico.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post("http://localhost:5000/grafico/", formData);
      const newGraph = response.data;

      setGraficos((prev) => {
        const updatedGraficos = [...prev];
        updatedGraficos[activeTab] = newGraph;
        return updatedGraficos;
      });
      setFormData({ moeda1: "", moeda2: "", value: "" });
      setIsFormOpen(false); 
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
        <div id="screen" className="w-2/3 h-full bg-green-950 rounded-lg border-[6px] border-gray-400/40 flex items-center justify-center">
          {chartData ? <Line data={chartData} /> : <p className="text-white">Selecione uma moeda para visualizar o gráfico</p>}
        </div>
        <div className="w-1/3 h-full space-y-5">
          {[1, 2, 3].map((tabId) => (
            <div key={tabId} className="h-[30%] flex space-x-1">
              <div
                className={`h-full w-[100%]   duration-300 ${
                  graficos[tabId] ? "bg-transparent" : "rounded-lg shadow-inner hover:scale-105 shadow-zinc-500 bg-green-200"
                }`}
                
              >
                {graficos[tabId] ? (
                  <div className="w-full flex space-x-[1px] h-full ">
                    {/* Delete Button */}
                    <button
                      className="w-[15%] rounded-xl hover:scale-[1.02] duration-500 hover:bg-red-400 bg-gradient-to-b from-red-600/90 to-red-700/85"
                      onClick={() => handleDelete(tabId, graficos[tabId]?._id)} // Delete logic
                    >
                      <hr class = "w-[45%] h-1 rounded-sm bg-white mx-auto"></hr>
                    </button>

                    {/* Content Button */}
                  
                    
                    <button onClick={() => handleTabClick(tabId)} className="w-[85%] bg-zinc-800 shadow-inner space-y-5 shadow-black text-white">
                      <p class = " font-montserrat-negrito flex mr-auto ml-10">{graficos[tabId].moeda.toUpperCase()}</p>
                      {perceCe ?  <p>{perceCe.perce} {perceCe.conv}</p>  : <p className="text-white"></p>}
                       <p class = "font-montserrat-negrito flex mr-auto ml-10">{graficos[tabId].variavel.toUpperCase()}</p> 
                    </button>
                  </div>
                ) : (
                  
                  <button
                  className="relative my-10 h-16 w-16 flex items-center justify-center mx-auto  group"
                  onClick={() => {
                    setActiveTab(tabId);
                    setIsFormOpen(true);
                  }}
                >
                  {/* Add graph Button */}
                  <hr
                    id="plus1"
                    className="group-hover:bg-green-700 h-2 w-10 absolute rounded-xl mx-auto my-auto shadow-2xl shadow-black bg-green-600"
                  ></hr>
                  <hr
                    id="plus"
                    className="group-hover:bg-green-700 h-10 w-2 absolute rounded-xl mx-auto my-auto shadow-2xl bg-green-600"
                  ></hr>
                </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>



        {/* Form for adding data */}
        {isFormOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <form
              className="bg-white p-6 rounded-lg shadow-lg space-y-4"
              onSubmit={handleFormSubmit}
            >
              <h3 className="text-xl font-bold">Adicionar</h3>
              
              {/* Dropdown for Moeda 1 */}
              <select
                className="border rounded p-2 w-full"
                value={formData.moeda1}
                onChange={(e) => setFormData({ ...formData, moeda1: e.target.value })}
                required
              >
                <option value="" disabled>
                  Selecione a Moeda 1
                </option>
                <option value="usd">Dólar(USD)</option>
                <option value="brl">Real(BRL)</option>
                <option value="bitcoin">Bitcoin(BTC)</option>
              </select>
              
              {/* Dropdown for Moeda 2 */}
              <select
                className="border rounded p-2 w-full"
                value={formData.moeda2}
                onChange={(e) => setFormData({ ...formData, moeda2: e.target.value })}
                required
              >
                <option value="" disabled>
                  Selecione a Moeda 2
                </option>
                <option value="usd">Dólar(USD)</option>
                <option value="brl">Real(BRL)</option>
                <option value="bitcoin">Bitcoin(BTC)</option>
              </select>
              
              {/* Input for Value */}
              <input
                type="number"
                placeholder="Value"
                className="border rounded p-2 w-full"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                required
              />
              
              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setIsFormOpen(false)}
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
