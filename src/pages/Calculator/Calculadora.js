import PageName from "../../components/PageName/PageName";
import Sidebar from "../../components/SideBar/Sidebar";
import Title from "../../components/Title/Title";

function Calculadora(){
    return(

    <div className="flex h-screen w-full">
      <Sidebar/>

      <div className="flex-1 bg-gradient-to-b from-[#C0F0B1] to-white p-5 relative">

        <Title/>

        <PageName name="Calculadora"/>

        
      </div>
    </div>
)}

export default Calculadora;