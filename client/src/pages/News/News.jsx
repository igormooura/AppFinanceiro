import PageName from "../../components/PageName/PageName";
import Sidebar from "../../components/SideBar/Sidebar";
import Title from "../../components/Title/Title";
import useAuth from "../../hooks/useAuth";
import newsData from "./news.json";
import React, { useEffect, useState } from "react";
import axios from "axios";

function News() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tag, setTag] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  useAuth();

  useEffect(() => {
    setNews(newsData);
    setTotalPages(Math.ceil(newsData.length / 4));
  }, []);

  const filteredNews = news
    .filter(
      (item) =>
        (!tag || item.tag === tag) &&
        (!appliedSearch || item.titulo.toLowerCase().includes(appliedSearch.toLowerCase()))
    )
    .slice((currentPage - 1) * 4, currentPage * 4);

  const handleSearch = () => {
    setAppliedSearch(searchInput);
    setCurrentPage(1);
  };

  const handleTagChange = (selectedTag) => {
    setTag(tag === selectedTag ? "" : selectedTag);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const tags = [
    { value: "", label: "All" },
    { value: "pol", label: "Politics" },
    { value: "mund", label: "World" },
    { value: "econ", label: "Economy" },
  ];

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#C0F0B1] to-white p-5 relative">
        <Title />
        <div className="flex items-center">
          <PageName name="News" />
          <div className="bg-gray-50/20 h-14 items-center flex shadow-lg shadow-zinc-500 w-[650px] ml-auto mr-10 mt-[70px]">
            <input
              type="text"
              className="h-full p-2 w-[75%] focus:border-white active:border-white"
              placeholder="Search for an article"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className="w-[25%] bg-red-900/80 h-full text-white font-montserrat-fino text-2xl"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="bg-black w-[500px] flex h-14 mb-4">
            {tags.map((t) => (
              <button
                key={t.value}
                className={`px-4 py-2 border-x-[1px] border-x-gray-200 font-montserrat-fino text-xl w-1/3 ${
                  tag === t.value ? "bg-green-500 text-white" : "bg-black text-white"
                }`}
                onClick={() => handleTagChange(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="space-y-2">
          {filteredNews.length ? (
            filteredNews.map((item) => (
              <li key={item._id} className="bg-gray-50 border-[1px] flex p-2 border-gray-200 h-40">
                <div className="w-1/3">
                  <div className="h-[90%] bg-yellow-500 w-[90%]"></div>
                </div>
                <div className="w-2/3">
                  <h2 className="text-2xl font-serif font-bold">{item.titulo}</h2>
                  <p className="text-xl font-serif text-cyan-800">{item.descr}</p>
                </div>
                <p className="font-montserrat-fino justify-end items-end bottom-0 w-[25%] text-sm mr-4 flex">
                  {item.data}
                </p>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No news found.</p>
          )}
        </ul>

        <div className="flex mt-10 space-x-2 justify-center items-center">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <div className="w-10 h-10 rounded-2xl bg-green-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 12H18M6 12L11 7M6 12L11 17" />
              </svg>
            </div>
          </button>
          <span className="font-bold font-montserrat-fino">
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <div className="w-10 h-10 rounded-2xl bg-green-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 12H18M6 12L11 7M6 12L11 17" transform="rotate(180,12,12)" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default News;
