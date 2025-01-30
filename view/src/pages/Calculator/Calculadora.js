import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PageName from "../../components/PageName/PageName";
import Sidebar from "../../components/SideBar/Sidebar";
import TitleComponent from "../../components/Title/Title";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Calculadora() {
  const [valor, setValor] = useState(1000);
  const [cotacao, setCotacao] = useState(5.15);
  const [convertido, setConvertido] = useState(valor * cotacao);

  useEffect(() => {
    setConvertido(valor * cotacao);
  }, [valor, cotacao]);

  const handleChangeValor = (e) => {
    const novoValor = e.target.value.replace(/[^0-9.]/g, "");
    setValor(novoValor ? parseFloat(novoValor) : "");
  };

  const handleChangeCotacao = (e) => {
    const novaCotacao = e.target.value.replace(/[^0-9.]/g, "");
    setCotacao(novaCotacao ? parseFloat(novaCotacao) : "");
  };

  const dadosGrafico = {
    labels: [],
    datasets: [
      {
        label: "Cotação (BRL)",
        data: [],
        borderColor: "#7C3AED",
        backgroundColor: "rgba(124, 58, 237, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const opcoesGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        grid: {
          color: "#e5e7eb",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

 

  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex-1 bg-gradient-to-b from-[#C0F0B1] to-white p-5 relative flex flex-col">
        <TitleComponent />
        <PageName name="Calculadora" />

        <div className="flex flex-col items-center mt-[100px] space-y-12">
          <div className="flex items-center gap-[200px]">
            <div className="flex items-center border-2 border-purple-500 rounded-lg px-6 py-3 bg-white shadow-lg">
              <span className="text-gray-700 mr-2">$</span>
              <input
                type="text"
                value={valor}
                onChange={handleChangeValor}
                className="w-100 px-2 text-right font-bold text-purple-900 border-none outline-none text-lg"
                placeholder="0"
              />
              <span className="ml-2 text-gray-600">USD</span>
            </div>

            <div className="text-3xl text-gray-400">→</div>

            <div className="flex items-center border-2 border-gray-300 rounded-lg px-6 py-3 bg-white shadow-lg">
              <span className="text-gray-700 mr-2">R$</span>
              <input
                type="text"
                value={convertido.toFixed(2)}
                className="w-100 px-2 text-right font-bold text-purple-900 border-none outline-none text-lg"
                readOnly
              />
              <span className="ml-2 text-gray-600">BRL</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-4xl h-96">
            <Line data={dadosGrafico} options={opcoesGrafico} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculadora;
