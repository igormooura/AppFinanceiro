import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen border-r-[4px] border-gray-500/60 w-[10%] bg-gradient-to-t from-green-600/90 to-green-200/40">
      <a className="flex justify-center mt-10">
        <button className="shadow-2xl">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8"
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
      <ul className="mt-20 w-full space-y-6">
        <li className="flex justify-center items-center">
          <Link to="/grafico">
            <div className="bg-gray-200 border-2 border-gray-400 shadow-inner rounded-full mx-auto w-20">
              <svg
                viewBox="0 0 24 24"
                className="w-10 mx-auto h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 19L12 11"
                  stroke="#000000"
                  strokeWidth="4"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M7 19L7 15"
                  stroke="#000000"
                  strokeWidth="4"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M17 19V6"
                  stroke="#000000"
                  strokeWidth="4"
                  strokeLinecap="round"
                ></path>
              </svg>
            </div>
            <p className="font-bold flex justify-center">Gráfico</p>
          </Link>
        </li>
        <li>
          <Link to="/noticias">
            <div className="rounded-full mx-auto w-20">
              <img src="static/group.png" className="w-10 h-10 mx-auto" alt="Grupo" />
            </div>
            <p className="font-bold flex justify-center">Notícias</p>
          </Link>
        </li>
        <li>
          <Link to="/sobrenos">
            <div className="rounded-full mx-auto w-20">
              <img src="static/news.png" className="w-10 h-10 mx-auto" alt="Notícias" />
            </div>
            <p className="font-bold flex justify-center">Sobre Nós</p>
          </Link>
        </li>
        <li>
          <Link to="/calculadora">
            <div className="rounded-full mx-auto w-20">
              <img src="static/calc.png" className="w-10 h-9 mx-auto" alt="Calculadora" />
            </div>
            <p className="font-bold flex justify-center">Calculadora</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
