import React from "react";
import Sidebar from "../../components/SideBar/Sidebar";

function SobreNos() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex-1 bg-gradient-to-b from-[#C0F0B1] to-white p-5">
        <div className="mt-[5%]">
          <div className="w-[300px] h-12 rounded-2xl bg-gray-800/80 ml-20 border-y-4 border-gray-200/40">
            <p className="text-white font-serif text-3xl flex justify-center items-center">
              Sobre Nós
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mx-auto ml-[125px]"
          style={{ width: "700px", height: "700px" }}
        >
          <div className="bg-transparent rounded-lg shadow-lg p-5 border border-gray-300 flex flex-col justify-center items-center">
            <p className="text-[#6A7D64] font-[Montserrat] text-[20px] mb-2">
              Erick Sousa Saraiva - Ericksousasaraiva@gmail.com
            </p>
            <p className="text-[#6A7D64] font-[Montserrat] text-[20px] mb-2">
              Igor Oliveira Moura - igor.oliveira.moura@gmail.com
            </p>
            <p className="text-[#6A7D64] font-[Montserrat] text-[20px] mb-5">
              Ciro Rocha Moraes - ciromoraes.r@gmail.com
            </p>
            <div className="flex justify-center">
              <img
                src="/static/ifb_simbol.png"
                alt="Instituto Federal"
                className="w-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SobreNos;
