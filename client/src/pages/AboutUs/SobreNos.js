import React from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import Title from "../../components/Title/Title";
import PageName from "../../components/PageName/PageName";
import useAuth from "../../hooks/useAuth";

function SobreNos() {
  useAuth();


  return (
    <div className="lg:flex h-screen w-full">
      <Sidebar />

      <div className="flex-1 bg-gradient-to-b from-[#C0F0B1] h-full to-white p-5 relative">

        <Title/>

        <PageName name="Sobre Nós"/>

        <div
          className="absolute left-1/2 transform -translate-x-1/2 lg:w-[600px] w-[90%]"
          style={{
            top: "40%",
            
          }}
        >
          <div className="bg-transparent rounded-lg shadow-lg p-5 border-2 border-gray-300 flex flex-col justify-center items-center">
            <p className="text-[#6A7D64] font-montserrat-negrito text-[20px] mb-2">
              <strong>Erick Sousa Saraiva</strong> - Ericksousasaraiva@gmail.com
            </p>
            <p className="text-[#6A7D64] font-montserrat-negrito text-[20px] mb-2">
              <strong>Igor Oliveira Moura</strong> - igor.oliveira.moura@gmail.com
            </p>
            <p className="text-[#6A7D64] font-montserrat-negrito text-[20px] mb-5">
              <strong>Ciro Rocha Moraes</strong> - ciromoraes.r@gmail.com
            </p>

      
            <div className="flex justify-center">
              <img
                src="/static/ifb_simbol.png"
                alt="Instituto Federal"
                className="w-[150px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SobreNos;
