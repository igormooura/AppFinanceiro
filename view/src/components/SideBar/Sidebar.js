import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

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
      className={`h-screen flex flex-col border-r-[4px] border-gray-500/60 bg-gradient-to-t from-green-600/90 to-green-200/40 transition-all duration-300 ${
        isOpen ? "w-[10%]" : "w-0 overflow-hidden"
      }`}
    >
      {!isOpen && (
        <button
          className="absolute top-6 left-2 z-50"
          onClick={() => setIsOpen(true)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 "
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 6h18M3 12h18m-18 6h18" stroke="#000" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
      {isOpen && (
        <button className="mt-6 self-center" onClick={() => setIsOpen(false)}>
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 18L18 6M6 6l12 12" stroke="#000" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
      {isOpen && (
        <ul className="mt-16 w-full space-y-6">
          <li>
            <Link to="/grafico">
              <div className={`rounded-full mx-auto w-20 ${selected === "grafico" ? "bg-gray-200 border-2 border-gray-400 shadow-inner" : ""}`}>
                <svg viewBox="0 0 24 24" className="w-10 h-10 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19V11M7 19v-4m10 4V6" stroke="#000" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-bold flex justify-center">Gráfico</p>
            </Link>
          </li>
          <li>
            <Link to="/noticias">
              <div className={`rounded-full mx-auto w-20 ${selected === "noticias" ? "bg-gray-200 border-2 border-gray-400 shadow-inner" : ""}`}>
                <img src="static/news.png" className="w-10 h-10 mx-auto" alt="Grupo" />
              </div>
              <p className="font-bold flex justify-center">Notícias</p>
            </Link>
          </li>
          <li>
            <Link to="/sobrenos">
              <div className={`rounded-full mx-auto w-20 ${selected === "sobrenos" ? "bg-gray-200 border-2 border-gray-400 shadow-inner" : ""}`}>
                <img  src="static/group.png" className="w-10 h-10 mx-auto" alt="Notícias" />
              </div>
              <p className="font-bold flex justify-center">Sobre Nós</p>
            </Link>
          </li>
          <li>
            <Link to="/calculadora">
              <div className={`rounded-full mx-auto w-20 ${selected === "calculadora" ? "bg-gray-200 border-2 border-gray-400 shadow-inner" : ""}`}>
                <img src="static/calc.png" className="w-10 h-10 mx-auto" alt="Calculadora" />
              </div>
              <p className="font-bold flex justify-center">Calculadora</p>
            </Link>
          </li>
        </ul>
      )}
        <div className="mt-auto mb-6">
          <ul><li class = "">
            <Link to="/">
              <img src="static/sair.png" className="w-10 h-10 mx-auto" alt="Sair" />
              {isOpen && <p className="font-bold flex justify-center"> Sair </p>}
            </Link>
          </li></ul>
          
        </div>
    </div>
  );
};

export default Sidebar;
