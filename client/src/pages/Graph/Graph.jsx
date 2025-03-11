import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
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

  const {userInfo} = useAuth();  
  const user = userInfo ? userInfo.userId : null;
  const [graficos, setGraficos] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    moeda1: "",
    moeda2: "",
    value: "10",
  });
  const [chartData, setChartData] = useState(null);
  const [perceCe, setPerceCe] = useState(null);
  const [daysData, setDaysData] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
  
  const userId = user;

  

  useEffect(() => {
    if (!userId) return; 
  
    fetch(`${process.env.REACT_APP_API_LINK}/grafico/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setGraficos(data.graficoList);  
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
      await axios.delete(`${process.env.REACT_APP_API_LINK}/grafico/${graphId}/usuario/${userId}`);
      setGraficos((prev) => prev.filter((_, index) => index !== tabId));
    } catch (error) {
      alert("Erro ao deletar gráfico.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Usuário não autenticado.");
      return;
    }
  
    console.log("Form Data:", formData); // Log form data
    console.log("User ID:", userId); // Log user ID
  
    const payload = {
      ...formData,
      value: Number(formData.value), // Convert value to a number
    };
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_LINK}/grafico/${userId}`,
        payload
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
      console.error("Error submitting form:", error.response?.data); // Log server response
      alert("Erro ao adicionar gráfico.");
    }
  };

  return (
    <div className="lg:flex lg:flex-1 h-[800px] w-full">
    <Sidebar />

    <div className="h-full w-full bg-gradient-to-b from-[#C0F0B1] to-white">
      <div className="lg:flex mt-1 lg:ml-6 lg:items-center">
        <Title />

        <div class = "">
          
          <ProfileCard id={usuarioId} />
        </div>
      </div>

      <PageName name="Exposed Currencies" />

      <div className="h-[510px] w-[95%] lg:w-[90%] lg:flex space-x-3 items-center justify-center mx-auto mt-16">
        <div className="flex lg:hidden py-4 lg:py-0 space-x-2 mx-auto justify-center lg:h-full lg:space-y-5">
          {[1, 2, 3].map((tabId) => (
            <div key={tabId} className="h-33 w-1/3 flex space-x-1">
              <div
                className={`h-full w-[100%] duration-300 ${
                  graficos[tabId]
                    ? "bg-transparent"
                    : "rounded-lg shadow-inner hover:scale-105 shadow-zinc-500 bg-green-200"
                }`}
              >
                {graficos[tabId] ? (
                  <div className="w-full flex h-full space-x-[1px]">
                    <button
                      className="w-[25%] rounded-lg hover:scale-[1.02] duration-500 hover:bg-red-400 bg-gradient-to-b from-red-600/90 to-red-700/85"
                      onClick={() => handleDelete(tabId, graficos[tabId]?._id)}
                    >
                      <hr className="w-[40%] h-1 rounded-sm bg-white mx-auto"></hr>
                    </button>

                    <button
                      onClick={() => handleTabClick(tabId)}
                      className="w-[75%] bg-zinc-800 shadow-inner space-y-5 shadow-black text-white"
                    >
                      <p className="font-montserrat-negrito flex ml-3">
                        {graficos[tabId].moeda.toUpperCase()}
                      </p>
                      {perceCe && tabId === activeTab ? (
                        <p
                          className={
                            perceCe.cond === 1
                              ? "text-green-500 flex ml-3"
                              : "text-red-500 flex ml-3"
                          }
                        >
                          {perceCe.perce.toFixed(3)}%
                        </p>
                      ) : (
                        <p className="text-white"></p>
                      )}
                      <p className="font-montserrat-negrito flex ml-3">
                        {graficos[tabId].variavel.toUpperCase()}
                      </p>
                    </button>
                  </div>
                ) : (
                  <button
                    className="relative my-10 h-16 w-16 flex items-center justify-center mx-auto group"
                    onClick={() => {
                      setActiveTab(tabId);
                      setIsFormOpen(true);
                    }}
                  >
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
        <div
          id="screen"
          className="lg:w-2/3 lg:h-full h-[90%] bg-green-950 rounded-lg border-[6px] border-gray-400/40 items-center justify-center"
        >
          {chartData ? (
            <div className="flex w-[90%] lg:w-[40%] mx-auto lg:ml-auto h-12 bg-transparent rounded-lg pt-2 lg:pr-2">
              <button
                onClick={(e) => setDaysData(parseInt(e.target.value, 10))}
                value="1"
                className="hover:bg-gray-400/40 hover:rounded-lg w-1/5 h-[90%] my-auto font-montserrat-fino text-white bg-green-950"
              >
                1D
              </button>
              <button
                onClick={(e) => setDaysData(parseInt(e.target.value, 10))}
                value="7"
                className="hover:bg-gray-400/40 hover:rounded-lg w-1/5 border-x-2 border-x-gray-600/30 h-[90%] my-auto font-montserrat-fino text-white bg-green-950"
              >
                7D
              </button>
              <button
                onClick={(e) => setDaysData(parseInt(e.target.value, 10))}
                value="30"
                className="hover:bg-gray-400/40 hover:rounded-lg w-1/5 border-x-1 border-x-gray-600/30 h-[90%] my-auto font-montserrat-fino text-white bg-green-950"
              >
                30D
              </button>
              <button
                onClick={(e) => setDaysData(parseInt(e.target.value, 10))}
                value="90"
                className="hover:bg-gray-400/40 hover:rounded-lg w-1/5 border-x-2 border-x-gray-600/30 h-[90%] my-auto font-montserrat-fino text-white bg-green-950"
              >
                90D
              </button>
              <button
                onClick={(e) => setDaysData(parseInt(e.target.value, 10))}
                value="365"
                className="hover:bg-gray-400/40 hover:rounded-lg w-1/5 h-[90%] my-auto font-montserrat-fino text-white bg-green-950"
              >
                1Y
              </button>
            </div>
          ) : (
            <p></p>
          )}

          {chartData ? (
            <div className="flex-1 w-full h-[90%] flex items-center justify-center">
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
                className="w-full h-[95%]"
              />
            </div>
          ) : (
            <div>
              <p className="text-white mx-auto hidden lg:flex my-auto justify-center items-center font-bold mt-[25%]">
                Click the buttons on the side, select two currencies to create a chart
              </p>
              <p className="text-white mx-auto lg:hidden flex my-auto justify-center items-center text-center font-bold mt-[25%]">
                Click the buttons above, select two currencies to create a chart
              </p>
            </div>
          )}
        </div>
        <div className="w-1/3 hidden lg:block h-full space-y-5">
          {[1, 2, 3].map((tabId) => (
            <div key={tabId} className="h-[30%] flex space-x-1">
              <div
                className={`h-full w-[100%] duration-300 ${
                  graficos[tabId]
                    ? "bg-transparent"
                    : "rounded-lg shadow-inner hover:scale-105 shadow-zinc-500 bg-green-200"
                }`}
              >
                {graficos[tabId] ? (
                  <div className="w-full flex space-x-[1px] h-full">
                    <button
                      className="w-[15%] rounded-xl hover:scale-[1.02] duration-500 hover:bg-red-400 bg-gradient-to-b from-red-600/90 to-red-700/85"
                      onClick={() => handleDelete(tabId, graficos[tabId]?._id)}
                    >
                      <hr className="w-[45%] h-1 rounded-sm bg-white mx-auto"></hr>
                    </button>

                    <button
                      onClick={() => handleTabClick(tabId)}
                      className="w-[85%] bg-zinc-800 shadow-inner space-y-5 shadow-black text-white"
                    >
                      <p className="font-montserrat-negrito flex mr-auto ml-10">
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
                      <p className="font-montserrat-negrito flex mr-auto ml-10">
                        {graficos[tabId].variavel.toUpperCase()}
                      </p>
                    </button>
                  </div>
                ) : (
                  <button
                    className="relative my-10 h-16 w-16 flex items-center justify-center mx-auto group"
                    onClick={() => {
                      setActiveTab(tabId);
                      setIsFormOpen(true);
                    }}
                  >
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
        <div className="bg-transparent h-10 w-full lg:hidden"></div>
      </div>

      {isFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <form
            className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-[500px]"
            onSubmit={handleFormSubmit}
          >
            <h3 className="text-xl font-bold">Add</h3>

            <select
              className="border rounded p-2 w-full"
              value={formData.moeda1}
              onChange={(e) =>
                setFormData({ ...formData, moeda1: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Select Currency 1
              </option>
              <option value="usd">Dollar (USD)</option>
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

            <p className="text-center">→</p>

            <select
              className="border rounded p-2 w-full"
              value={formData.moeda2}
              onChange={(e) =>
                setFormData({ ...formData, moeda2: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Select Currency 2
              </option>
              <option value="usd">Dollar (USD)</option>
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