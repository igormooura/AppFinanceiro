import PageName from "../../components/PageName/PageName";
import Sidebar from "../../components/SideBar/Sidebar";
import Title from "../../components/Title/Title";
import useAuth from "../../hooks/useAuth";
import newsData from "../../pages/News/news.json";
import React, { useEffect, useState } from "react";
import axios from "axios";
function Noticias(){
    
    const [news, setNews] = useState([]);
    useAuth();

    useEffect(() =>{
      console.log(newsData);
      const sendNews = async() => {
        try {
        
          const response  = await axios.post(`http://localhost:5000/noticias/`,  newsData );
          console.log("Noticias Enviadas");
        }
        catch(error){
          console.error("ERRO", error);
        }
      };
      sendNews();

    }, []);
    useEffect(() => {
      const fetchNoticias = async () => {
        try {
          const response = await axios.get("http://localhost:5000/noticias"); 
          setNews(response.data); 
        } catch (error) {
          console.error("Erro ao buscar notícias:", error);
        }
      };
  
      fetchNoticias();
    }, []);

    return(

    <div className="flex h-screen w-full">
      <Sidebar/>

      <div className="flex-1 bg-gradient-to-b from-[#C0F0B1] to-white p-5 relative">

        <Title/>

        <PageName name="Notícias"/>
        <ul>
          {news.map((noticia, index) => (
            <li key={index} className="bg-white shadow-md p-4 mb-4 rounded-md">
              <h2 className="text-xl font-bold">{noticia.titulo}</h2>
              <p>{noticia.descr}</p>
              <span className="text-sm text-gray-500">{noticia.data}</span>
            </li>
          ))}
        </ul>
        
      </div>
    </div>
)}

export default Noticias;