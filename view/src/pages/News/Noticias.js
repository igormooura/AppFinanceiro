import PageName from "../../components/PageName/PageName";
import Sidebar from "../../components/SideBar/Sidebar";
import Title from "../../components/Title/Title";
import useAuth from "../../hooks/useAuth";
import newsData from "../../pages/News/news.json";
import React, { useEffect, useState } from "react";
import axios from "axios";
function Noticias(){
    
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [tag, setTag] = useState('');
    const [search, setSearch] = useState('');
    const [temp, setTemp] = useState('');
    const [searchInput, setSearchInput] = useState(''); // State for the input field
    const [appliedSearch, setAppliedSearch] = useState(''); 
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
        console.log(tag);
        try {
          const response = await axios.get(`http://localhost:5000/noticias`, {
            params: {
              page: currentPage,
              limit: 4,
              tag: tag,
              search: appliedSearch,
            },
          });
          setNews(response.data.noticias);
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.error("Erro ao buscar notícias:", error);
        }
      };
  
      fetchNoticias();
    }, [currentPage, tag, appliedSearch]);
  
    const handleSearch = () => {
      setAppliedSearch(searchInput); 
      setCurrentPage(1); 
    };
  
    const handleTagChange = (selectedTag) => {
      setTag((prevTag) => (prevTag === selectedTag ? '' : selectedTag)); 
      setCurrentPage(1);
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const tags = [
      { value: '', label: 'Todas' }, // Default option
      { value: 'pol', label: 'Política' },
      { value: 'mund', label: 'Mundo' },
      { value: 'econ', label: 'Economia' },
    ];
  
    return (
      <div className="flex h-screen w-full">
        <Sidebar />
  
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#C0F0B1] to-white p-5 relative">
          <Title />
          <div className="flex items-center">
            <PageName name="Notícias" />
            <div className="bg-gray-50/20 h-14 items-center flex shadow-lg shadow-zinc-500 w-[650px] ml-auto mr-10 mt-[70px]">
              <input
                type="text"
                className="h-full p-2 w-[75%] focus:border-white active:border-white"
                placeholder="Buscar por notícia"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                required
              />
              <button
                className="w-[25%] bg-red-900/80 h-full text-white font-montserrat-fino text-2xl"
                onClick={handleSearch}
              >
                Procurar
              </button>
            </div>
          </div>
  
          <div>
            <div className="mt-10 flex justify-center">
              <div className="bg-black w-[500px] flex h-14 mb-4">
                {tags.map((t) => (
                  <button
                    key={t.value}
                    className={`px-4 py-2 border-x-[1px] border-x-gray-200 font-montserrat-fino text-xl w-1/3 ${
                      tag === t.value ? 'bg-green-500 text-white' : 'bg-black text-white'
                    }`}
                    onClick={() => handleTagChange(t.value)}
                  >
                    {t.label}
                  </button>
                ))}
            </div>
          </div>
      <ul class = "space-y-2 ">
        {news.map((item) => (
          <li key={item._id} class = "bg-gray-50 border-[1px] flex p-2 border-gray-200 h-40">
            <div class = "w-1/3">
              <div class = "h-[90%] bg-yellow-500 w-[90%]"></div>            
            </div>
            <div class = "w-2/3">
              <h2 class = "text-2xl font-serif font-bold">{item.titulo}</h2>
              <p class = "text-xl font-serif text-cyan-800">{item.descr}</p>
              </div>
              <p class = "font-montserrat-fino justify-end items-end bottom-0 w-[25%] text-sm mr-4  flex">{item.data}</p>
          </li>
        ))}
      </ul>
      <div><div class = "flex mt-10 space-x-2 justify-center items-center"><button onClick={handlePrevPage} disabled={currentPage === 1}>
          <div class = "w-10 h-10 rounded-2xl bg-green-500"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>
        </button>
        <span class = "font-bold font-montserrat-fino"> Página {currentPage} de {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        <div class = "w-10 h-10 rounded-2xl bg-green-500"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>
        </button></div>
        
      </div>
    </div>
        
      </div>
    </div>
)}

export default Noticias;