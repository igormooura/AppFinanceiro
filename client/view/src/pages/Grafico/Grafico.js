import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import Sidebar from "../../components/SideBar/Sidebar";
import Title from "../../components/Title/Title";
import PageName from "../../components/PageName/PageName";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Grafico = () => {

  useAuth();

  const { isAuthenticated, userInfo, token } = useAuth();  
  console.log(userInfo);
  console.log("estou aqui");
  const user = userInfo ? userInfo.userId : null;
  console.log(userInfo);
  const [graficos, setGraficos] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    moeda1: "",
    moeda2: "",
    value: "",
  });
  const [chartData, setChartData] = useState(null);
  const [perceCe, setPerceCe] = useState(null);
  const [daysData, setDaysData] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null); // Add state for usuarioId
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(""); 
  
  const userId = user;
  console.log("aqui __"+user);

  

  useEffect(() => {
    if (!userId) return; 
  
    fetch(`http://localhost:5000/grafico/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setGraficos(data.graficoList);  // Set grafico data
        setUsuarioId(data.user_id);}) 
      .catch(() => alert("Erro ao buscar gráficos."));
  }, [userId]);
    useEffect(() => {
    if (activeTab !== null && daysData !== null) {
      handleTabClick(activeTab);
    }
  }, [daysData]);
   
  const handleTabClick = async (tabId) => {
    setActiveTab(tabId);
    var numDay;
    numDay = daysData; 
    console.log(daysData);
    if(numDay == null){
      numDay = 30;
    }
    if (!graficos[tabId]) return;

    const moeda = graficos[tabId].moeda;
    const variavel = graficos[tabId].variavel;
    var condition = 0;
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${moeda}/market_chart`,
        {
          params: {
            vs_currency: variavel,
            days: numDay,
            interval: "daily",
          },
        }
      );
      console.log(response);
      const prices = response.data.prices.map(([timestamp, valor]) => {
        const date = new Date(timestamp);
        const formattedDate = numDay < 90 
          ? date.toLocaleDateString() 
          : date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit' });
      
        return { date: formattedDate, valor };
      });

      var min = prices[0].valor;
      var size = prices.length;
      var max = prices[size - 1].valor;

      let condition = 1;
      var p = (max * 100.0) / min - 100.0;
      if (p >= 0) {
        condition = 1;
      } else {
        condition = 0;
      }

      setPerceCe({
        perce: p,
        cond: condition,
      });

      setChartData({
        
        labels: prices.map((p) => {
          return p.date;
        }
        
      
      ),
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
    if (condition == 1) {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${variavel}/market_chart`,
        {
          params: {
            vs_currency: moeda,
            days: numDay,
            interval: "daily",
          },
        }
      );
      console.log(response);
      const prices = response.data.prices.map(([timestamp, valor]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        valor: 1 / valor,
      }));
      var min = prices[0].valor;
      var size = prices.length;
      var max = prices[size - 1].valor;
      let condition = 1;
      var p = (max * 100.0) / min - 100.0;
      if (p >= 0) {
        condition = 1;
      } else {
        condition = 0;
      }

      setPerceCe({
        perce: p,
        cond: condition,
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
    }
  };

  const handleDelete = async (tabId, graphId) => {
    try {
      await axios.delete(`http://localhost:5000/grafico/${graphId}/usuario/${userId}`);
      setGraficos((prev) => prev.filter((_, index) => index !== tabId));
    } catch (error) {
      alert("Erro ao deletar gráfico.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!userId) {
      alert("Usuário não autenticado.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/grafico/${userId}`,
        formData 
      );
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
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="h-screen w-full bg-gradient-to-b from-[#C0F0B1] to-white">
        <div className="flex mt-3  items-center">
          <Title />
          
          <div>
            <ProfileCard id = {usuarioId} />

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

        <div className="h-[510px]  w-[90%] flex space-x-3 items-center justify-center mx-auto mt-10">
          <div
            id="screen"
            className="w-2/3 h-full bg-green-950 rounded-lg border-[6px] border-gray-400/40  items-center justify-center"
          >
            {chartData ? (
              <div class = "flex w-[40%] ml-auto h-12 bg-transparent rounded-lg pt-2 pr-2">
              <button onClick={(e) => {
                    setDaysData(parseInt(e.target.value, 10));
                  }} value="1" class = "hover:bg-gray-400/40 hover:rounded-lg  w-1/5  h-[90%] my-auto font-montserrat-fino text-white bg-green-950">1D</button>
              <button onClick={(e) => {
                    setDaysData(parseInt(e.target.value, 10));
                  }}  value = '7' class = "hover:bg-gray-400/40 hover:rounded-lg w-1/5 border-x-2 border-x-gray-600/30 h-[90%] my-auto font-montserrat-fino text-white bg-green-950">7D</button>
              <button onClick={(e) => {
                    setDaysData(parseInt(e.target.value, 10));
                  }}  value = '30' class = "hover:bg-gray-400/40 hover:rounded-lg w-1/5 border-x-1 border-x-gray-600/30 h-[90%] my-auto font-montserrat-fino text-white bg-green-950">30D</button>
              <button onClick={(e) => {
                    setDaysData(parseInt(e.target.value, 10));
                  }}  value = '90' class = "hover:bg-gray-400/40 hover:rounded-lg w-1/5 border-x-2 border-x-gray-600/30 h-[90%] my-auto font-montserrat-fino text-white bg-green-950">90D</button>
              <button onClick={(e) => {
                    setDaysData(parseInt(e.target.value, 10));
                  }}  value = '365' class = "hover:bg-gray-400/40 hover:rounded-lg w-1/5  h-[90%] my-auto font-montserrat-fino text-white bg-green-950">1A</button>
            </div>

            ) : (
              <p></p>

            )}
            
            {chartData ? (
              <Line data={chartData} />
            ) : (
              <p className="text-white mx-auto flex my-auto justify-center items-center font-bold mt-[25%]">
                Selecione uma das tabelas ao lado ou crie um gráfico
              </p>
            )}
          </div>
          <div className="w-1/3 h-full space-y-5">
            {[1, 2, 3].map((tabId) => (
              <div key={tabId} className="h-[30%] flex space-x-1">
                <div
                  className={`h-full w-[100%]   duration-300 ${
                    graficos[tabId]
                      ? "bg-transparent"
                      : "rounded-lg shadow-inner hover:scale-105 shadow-zinc-500 bg-green-200"
                  }`}
                >
                  {graficos[tabId] ? (
                    <div className="w-full flex space-x-[1px] h-full ">
                      {/* Delete Button */}
                      <button
                        className="w-[15%] rounded-xl hover:scale-[1.02] duration-500 hover:bg-red-400 bg-gradient-to-b from-red-600/90 to-red-700/85"
                        onClick={() =>
                          handleDelete(tabId, graficos[tabId]?._id)
                        } // Delete logic
                      >
                        <hr class="w-[45%] h-1 rounded-sm bg-white mx-auto"></hr>
                      </button>

                      {/* Content Button */}

                      <button
                        onClick={() => handleTabClick(tabId)}
                        className="w-[85%] bg-zinc-800 shadow-inner space-y-5 shadow-black text-white"
                      >
                        <p class=" font-montserrat-negrito flex mr-auto ml-10">
                          {graficos[tabId].moeda.toUpperCase()}
                        </p>
                        {perceCe && tabId === activeTab ? (
                          <p
                            className={
                              perceCe.cond === 1
                                ? "text-green-500 flex mr-auto ml-14"
                                : "text-red-500 flex mr-auto ml-14"
                            }
                          >
                            {perceCe.perce.toFixed(3)}%
                          </p>
                        ) : (
                          <p className="text-white"></p>
                        )}
                        <p class="font-montserrat-negrito flex mr-auto ml-10">
                          {graficos[tabId].variavel.toUpperCase()}
                        </p>
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
                onChange={(e) =>
                  setFormData({ ...formData, moeda1: e.target.value })
                }
                required
              >
                <option value="" disabled>
                  Selecione a Moeda 1
                </option>
                <option value="usd">Dólar (USD)</option>
                <option value="eur">Euro (EUR)</option>
                <option value="brl">Real (BRL)</option>
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="bnb">Binance Coin (BNB)</option>
                <option value="solana">Solana (SOL)</option>
                <option value="ripple">XRP (XRP)</option>
                <option value="cardano">Cardano (ADA)</option>
                <option value="dogecoin">Dogecoin (DOGE)</option>
                <option value="polkadot">Polkadot (DOT)</option>
                <option value="matic-network">Polygon (MATIC)</option>
                <option value="tron">Tron (TRX)</option>
                <option value="litecoin">Litecoin (LTC)</option>
                <option value="avalanche-2">Avalanche (AVAX)</option>
              </select>

              {/* Dropdown for Moeda 2 */}
              <select
                className="border rounded p-2 w-full"
                value={formData.moeda2}
                onChange={(e) =>
                  setFormData({ ...formData, moeda2: e.target.value })
                }
                required
              >
                <option value="" disabled>
                  Selecione a Moeda 2
                </option>
                <option value="usd">Dólar (USD)</option>
                <option value="eur">Euro (EUR)</option>
                <option value="brl">Real (BRL)</option>
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="bnb">Binance Coin (BNB)</option>
                <option value="solana">Solana (SOL)</option>
                <option value="ripple">XRP (XRP)</option>
                <option value="cardano">Cardano (ADA)</option>
                <option value="dogecoin">Dogecoin (DOGE)</option>
                <option value="polkadot">Polkadot (DOT)</option>
                <option value="matic-network">Polygon (MATIC)</option>
                <option value="tron">Tron (TRX)</option>
                <option value="litecoin">Litecoin (LTC)</option>
                <option value="avalanche-2">Avalanche (AVAX)</option>
              </select>

              {/* Input for Value */}
              <input
                type="number"
                placeholder="Value"
                className="border rounded p-2 w-full"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
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