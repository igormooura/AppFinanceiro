import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Grafico = () => {
    const [graficos, setGraficos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/grafico")
        .then((res) => res.json())
        .then((data) => setGraficos(data))
        .catch(() => alert("Erro ao buscar gráficos."));
    }, []);

    return  (
        <div class = "flex h-screen w-full">
            <div class = "h-screen border-r-8 border-gray-500/10 w-[10%] bg-gradient-to-t from-green-400/60 to-green-200/40">
                <a></a>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            
            </div>
            <div class = "h-screen w-[90%] bg-gradient-to-b from-green-400/50 to-green-200">

            </div>

        </div>

    );


};

export default Grafico;