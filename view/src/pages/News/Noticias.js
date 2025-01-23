import Sidebar from "../../components/SideBar/Sidebar";
import Title from "../../components/Title/Title";

function Noticias(){
    return(

    <div className="flex h-screen w-full">
      <Sidebar/>

      <div className="flex-1 bg-gradient-to-b from-[#C0F0B1] to-white p-5 relative">

        <Title/>

        <div className="mt-[5%]">
          <div className="w-[300px] h-12 rounded-2xl bg-gray-800/80 ml-20 border-y-4 border-gray-200/40">
            <p className="text-white font-serif text-3xl flex justify-center items-center">
              Notícias
            </p>
          </div>
        </div>

        
      </div>
    </div>
)}

export default Noticias;