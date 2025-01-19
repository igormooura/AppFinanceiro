import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar/Sidebar";

const Grafico = () => {
  const [graficos, setGraficos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/grafico")
      .then((res) => res.json())
      .then((data) => setGraficos(data))
      .catch(() => alert("Erro ao buscar gráficos."));
  }, []);

  return (
    <div class="flex h-screen w-full">
      <Sidebar />

      <div class="h-screen w-[90%] bg-gradient-to-b from-[#C0F0B1] to-white h-screen">
        <div class="flex mt-8 items-center">
          <p class="mr-auto ml-10 text-gray-50 font-bold text-3xl font-semibold drop-shadow-lm  ">
            Acompanhador de moedas
          </p>
          <div>
            <a
              href="#"
              class="hover:scale-105 duration-500 flex items-center ml-auto mr-10 rounded-2xl w-60 h-16 border-[1px] border-gray-400 shadow-xl"
            >
              <div class="h-10 w-10 bg-blue-400 rounded-full my-auto ml-3"></div>
              <div class="ml-3 -space-y-1">
                <p class="text-xl font-semibold text-black">Nome Completo</p>
                <p class="text-gray-400">example@email.com</p>
              </div>
            </a>
            <form>
              <div class="w-[350px] mt-2 mr-10 rounded-full bg-green-100 h-9 flex  shadow-lg shadow-gray-500 items-center">
                <a class="flex justify-center ml-3 " href="#">
                  <button class="shadow-2xl">
                    <svg
                      viewBox="0 0 24 24"
                      class="h-6 w-6 text-gray-600"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M2 5.5C2 4.94772 2.44772 4.5 3 4.5H21C21.5523 4.5 22 4.94772 22 5.5V6.5C22 7.05228 21.5523 7.5 21 7.5H3C2.44772 7.5 2 7.05228 2 6.5V5.5Z"
                          fill="#000000"
                        ></path>{" "}
                        <path
                          d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5H21C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z"
                          fill="#000000"
                        ></path>{" "}
                        <path
                          d="M3 16.5C2.44772 16.5 2 16.9477 2 17.5V18.5C2 19.0523 2.44772 19.5 3 19.5H21C21.5523 19.5 22 19.0523 22 18.5V17.5C22 16.9477 21.5523 16.5 21 16.5H3Z"
                          fill="#000000"
                        ></path>{" "}
                      </g>
                    </svg>
                  </button>
                </a>
                <input
                  placeholder="Procurar Moeda"
                  class="mx-auto w-[75%] flex bg-transparent h-full focus:outline-none focus:border-white justify-center"
                ></input>
                <img src="static/lupa.png" class="w-6 h-6 mr-3"></img>
              </div>
            </form>
          </div>
        </div>
        <div class="mt-[5%]">
          <div class="w-[300px] h-12 rounded-2xl bg-gray-800/80 ml-20  border-y-4 border-gray-200/40">
            <p class="text-white font-serif text-3xl flex justify-center items-center">
              Moedas Expostas
            </p>
          </div>
        </div>

        <div class="h-[500px] w-[90%]  flex space-x-3 items-center  justify-center mx-auto mt-10 ">
          <div class="w-2/3 h-full bg-green-950 rounded-lg border-[6px] border-gray-400/40"></div>
          <div class="w-1/3 h-full space-y-5 ">
            <div class="h-[30%] flex  space-x-1">
              <button class="h-full w-[15%] rounded-lg hover:scale-[1.03] duration-300 bg-red-500">
                {" "}
                <p class="text-white text-3xl font-bold w-[80%] flex justify-center items-center mx-auto">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4 12L20 12"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </p>
              </button>
              <div class="h-full  w-[85%] bg-gray-950/90 hover:scale-[1.02] duration-500"></div>
            </div>
            <div class="h-[30%] flex  space-x-1">
              <button class="h-full w-[15%] rounded-lg hover:scale-[1.03] duration-300 bg-red-500">
                {" "}
                <p class="text-white text-3xl font-bold w-[80%] flex justify-center items-center mx-auto">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4 12L20 12"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </p>
              </button>
              <div class="h-full  w-[85%] bg-gray-950/90 hover:scale-[1.02] duration-500"></div>
            </div>
            <div class="h-[30%] flex  space-x-1">
              <button class="h-full w-[15%] rounded-lg hover:scale-[1.03] duration-300 bg-red-500">
                {" "}
                <p class="text-white text-3xl font-bold w-[80%] flex justify-center items-center mx-auto">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4 12L20 12"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </p>
              </button>
              <div class="h-full  w-[85%] bg-gray-950/90 hover:scale-[1.02] duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grafico;
