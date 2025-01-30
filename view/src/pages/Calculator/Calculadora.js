import React, { useState } from "react";
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
  const [convertido, setConvertido] = useState(5148.2);

  const dadosGrafico = {
    labels: ["1D", "5D", "1M", "1A", "5A", "Máx"],
    datasets: [
      {
        label: "Cotação (BRL)",
        data: [5.1, 5.2, 5.16, 5.3, 5.25, 5.18],
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
        position: 'top',
      }
    },
    scales: {
      y: {
        grid: {
          color: '#e5e7eb'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex-1 bg-gradient-to-b from-[#C0F0B1] to-white p-5 relative">
        <TitleComponent />
        <PageName name="Calculadora" />

        <div className="flex items-center gap-4 justify-center mt-6">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={`$ ${valor}`}
              className="w-32 px-4 py-2 border-2 border-gray-200 rounded-lg text-right font-bold text-purple-900"
              readOnly
            />
            <span className="font-semibold text-gray-700">USD</span>
          </div>

          <div className="text-3xl text-gray-500">↔</div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={`R$ ${convertido.toFixed(2)}`}
              className="w-40 px-4 py-2 border-2 border-gray-200 rounded-lg text-right font-bold text-purple-900"
              readOnly
            />
            <span className="font-semibold text-gray-700">BRL</span>
          </div>
        </div>

        <div className="mt-40 bg-white p-4 rounded-xl shadow-lg h-90 mx-8">
          <Line data={dadosGrafico} options={opcoesGrafico} />
        </div>
      </div>
    </div>
  );
}

export default Calculadora;