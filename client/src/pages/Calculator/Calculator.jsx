import React, { useState, useEffect } from "react";
import PageName from "../../components/PageName/PageName";
import Sidebar from "../../components/SideBar/Sidebar";
import TitleComponent from "../../components/Title/Title";
import useAuth from "../../hooks/useAuth";

function Calculadora() {
  const { userInfo } = useAuth();
  const user = userInfo ? userInfo.userId : null;

  const [valor, setValor] = useState(1000);
  const [moedaOrigem, setMoedaOrigem] = useState("USD");
  const [moedaDestino, setMoedaDestino] = useState("BRL");
  const [cotacao, setCotacao] = useState(5.15);
  const [convertido, setConvertido] = useState(valor * cotacao);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    async function carregarHistorico() {
      if (!user) return;

      try {
        const response = await fetch(`${process.env.REACT_APP_API_LINK}/calculadora/historico/${user}`);
        const data = await response.json();

        if (response.ok) {
          const historicoFormatado = data
            .sort((a, b) => new Date(b.data) - new Date(a.data)) 
            .slice(0, 5) 
            .map(item => ({
              data: new Date(item.data).toLocaleString(),
              valor: item.valor || "N/A",
              moedaOrigem: item.moedaOrigem || "N/A",
              moedaDestino: item.moedaDestino || "N/A",
              cotacao: item.resultado ? (item.resultado / item.valor).toFixed(4) : "N/A", 
              convertido: item.resultado !== undefined ? item.resultado.toFixed(2) : "N/A"
            }));

          setHistorico(historicoFormatado);
        } else {
          console.error("Error loading history:", data.error);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    }

    carregarHistorico();
  }, [user]);

  useEffect(() => {
    async function buscarCotacao() {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${moedaOrigem}`
        );
        const data = await response.json();
        if (data.rates[moedaDestino]) {
          setCotacao(data.rates[moedaDestino]);
        }
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    }
    buscarCotacao();
  }, [moedaOrigem, moedaDestino]);

  useEffect(() => {
    setConvertido(valor * cotacao);
  }, [valor, cotacao]);

  const handleChangeValor = (e) => {
    const novoValor = e.target.value.replace(/[^0-9.]/g, "");
    setValor(novoValor ? parseFloat(novoValor) : "");
  };

  const handleChangeMoedaOrigem = (e) => {
    setMoedaOrigem(e.target.value);
  };

  const handleChangeMoedaDestino = (e) => {
    setMoedaDestino(e.target.value);
  };

  const adicionarHistorico = async () => {
    try {
      const dataAtual = new Date();
      const novoItem = {
        data: dataAtual.toLocaleString(),
        valor: valor,
        moedaOrigem: moedaOrigem,
        moedaDestino: moedaDestino,
        cotacao: cotacao.toFixed(4), 
        convertido: convertido.toFixed(2),
      };
  
      setHistorico(prevHistorico => {
        const novoHistorico = [novoItem, ...prevHistorico];
        return novoHistorico.slice(0, 5); // 5 mais recentes
      });
  
      const response = await fetch(`${process.env.REACT_APP_API_LINK}/calculadora/historico/${user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          valor,
          moedaOrigem,
          moedaDestino,
          userId: user,
          cotacao,
          convertido,
        }),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Error saving conversion");
      }
  
      const historicoResponse = await fetch(`${process.env.REACT_APP_API_LINK}/calculadora/historico/${user}`);
      const historicoData = await historicoResponse.json();
      
      if (historicoResponse.ok) {
        const historicoFormatado = historicoData
          .sort((a, b) => new Date(b.data) - new Date(a.data))
          .slice(0, 5)
          .map(item => ({
            data: new Date(item.data).toLocaleString(),
            valor: item.valor || "N/A",
            moedaOrigem: item.moedaOrigem || "N/A",
            moedaDestino: item.moedaDestino || "N/A",
            cotacao: item.resultado ? (item.resultado / item.valor).toFixed(4) : "N/A", 
            convertido: item.resultado?.toFixed(2) || "N/A"
          }));
        
        setHistorico(historicoFormatado);
      }
    } catch (error) {
      console.error("Error saving conversion:", error);
    }
  };

  return (
    <div className="lg:flex h-screen w-full">
      <Sidebar />

      <div className="flex-1 bg-gradient-to-b from-[#C0F0B1] to-white p-5 relative flex flex-col">
        <TitleComponent />
        <PageName name="Calculator" />

        <div className="flex flex-col items-center mt-[100px] space-y-12">
          <div className="flex flex-col md:flex-row items-center gap-[50px]">
            <div className="flex items-center border-2 border-purple-500 rounded-lg px-6 py-3 bg-white shadow-lg w-full md:w-auto">
              <select
                value={moedaOrigem}
                onChange={handleChangeMoedaOrigem}
                className="mr-2 border-none outline-none text-gray-700"
              >
                <option value="USD">USD</option>
                <option value="BRL">BRL</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="AUD">AUD</option>
                <option value="CAD">CAD</option>
                <option value="CHF">CHF</option>
              </select>
              <input
                type="text"
                value={valor}
                onChange={handleChangeValor}
                className="w-full md:w-100 px-2 text-right font-bold text-purple-900 border-none outline-none text-lg"
                placeholder="0"
              />
            </div>

            <div className="text-3xl text-gray-400">→</div>

            <div className="flex items-center border-2 border-gray-300 rounded-lg px-6 py-3 bg-white shadow-lg w-full md:w-auto">
              <select
                value={moedaDestino}
                onChange={handleChangeMoedaDestino}
                className="mr-2 border-none outline-none text-gray-700"
              >
                <option value="USD">USD</option>
                <option value="BRL">BRL</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="AUD">AUD</option>
                <option value="CAD">CAD</option>
                <option value="CHF">CHF</option>
              </select>
              <input
                type="text"
                value={convertido.toFixed(2)}
                className="w-full md:w-100 px-2 text-right font-bold text-purple-900 border-none outline-none text-lg"
                readOnly
              />
            </div>
          </div>

          <button
            onClick={adicionarHistorico}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Save the conversion
          </button>

          <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-4xl mt-6 overflow-x-auto">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Conversions saved
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2">Date</th>
                  <th className="border-b p-2">Original Value</th>
                  <th className="border-b p-2">Source Currency</th>
                  <th className="border-b p-2">Target Currency</th>
                  <th className="border-b p-2">Exchange Rate</th>
                  <th className="border-b p-2">Converted Value</th>
                </tr>
              </thead>
              <tbody>
                {historico.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b p-2">{item.data}</td>
                    <td className="border-b p-2">{item.valor}</td>
                    <td className="border-b p-2">{item.moedaOrigem}</td>
                    <td className="border-b p-2">{item.moedaDestino}</td>
                    <td className="border-b p-2">{item.cotacao}</td>
                    <td className="border-b p-2">{item.convertido}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculadora;