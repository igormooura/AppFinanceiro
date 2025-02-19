import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const getSelected = () => {
    switch (location.pathname) {
      case "/grafico":
        return "grafico";
      case "/noticias":
        return "noticias";
      case "/sobrenos":
        return "sobrenos";
      case "/calculadora":
        return "calculadora";
      default:
        return "";
    }
  };

  const selected = getSelected();

  return (
    <div
      className={`fixed top-0 left-0 h-screen lg:flex-col border-r-[4px] border-gray-500/60 bg-gradient-to-t from-green-600/90 to-green-200/40 transition-all duration-300 z-50 ${
        isOpen ? "lg:w-[10%] w-[30%]" : "lg:w-0 w-0"
      }`}
    >

      {!isOpen && (
        <button
          className="absolute top-6 left-2 z-50 lg:left-4"
          onClick={() => setIsOpen(true)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 6h18M3 12h18m-18 6h18" stroke="#000" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="flex flex-col h-full justify-between">
      
          <button 
            className="self-end mt-6 mr-4 lg:mr-6"
            onClick={() => setIsOpen(false)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 18L18 6M6 6l12 12" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>


          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            <ul className="w-full space-y-6">
              <li>
                <Link to="/grafico" className="flex flex-col items-center">
                  <div className={`rounded-full w-20 h-20 flex items-center justify-center ${
                    selected === "grafico" ? "bg-gray-200 border-2 border-gray-400 shadow-inner" : ""
                  }`}>
                    <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 19V11M7 19v-4m10 4V6" stroke="#000" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="font-bold mt-2 text-center">Gráfico</p>
                </Link>
              </li>

              <li>
                <Link to="/noticias" className="flex flex-col items-center">
                  <div className={`rounded-full w-20 h-20 flex items-center justify-center ${
                    selected === "noticias" ? "bg-gray-200 border-2 border-gray-400 shadow-inner" : ""
                  }`}>
                    <img src="static/news.png" className="w-10 h-10" alt="Notícias" />
                  </div>
                  <p className="font-bold mt-2 text-center">Notícias</p>
                </Link>
              </li>

              <li>
                <Link to="/sobrenos" className="flex flex-col items-center">
                  <div className={`rounded-full w-20 h-20 flex items-center justify-center ${
                    selected === "sobrenos" ? "bg-gray-200 border-2 border-gray-400 shadow-inner" : ""
                  }`}>
                    <img src="static/group.png" className="w-10 h-10" alt="Sobre Nós" />
                  </div>
                  <p className="font-bold mt-2 text-center">Sobre Nós</p>
                </Link>
              </li>

              <li>
                <Link to="/calculadora" className="flex flex-col items-center">
                  <div className={`rounded-full w-20 h-20 flex items-center justify-center ${
                    selected === "calculadora" ? "bg-gray-200 border-2 border-gray-400 shadow-inner" : ""
                  }`}>
                    <img src="static/calc.png" className="w-10 h-10" alt="Calculadora" />
                  </div>
                  <p className="font-bold mt-2 text-center">Calculadora</p>
                </Link>
              </li>
            </ul>
          </div>

          <div className="pb-8 flex justify-center">
            <Link to="/" className="flex flex-col items-center">
              <img src="static/sair.png" className="w-10 h-10" alt="Sair" />
              <p className="font-bold mt-2 text-center">Sair</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;