import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Noticias from './pages/News/Noticias.js';
import SobreNos from './pages/AboutUs/SobreNos.js';
import LoginPage from './pages/LoginPage/LoginPage.js'
import Register from './pages/RegisterPage/Register.js'
import Forgot from './pages/Forgot/Forgot.js'
import Grafico from './pages/Grafico/Grafico.js'
import Profile from './pages/Profile/Profile.js'
import Calculadora from './pages/Calculator/Calculadora.js';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Using Axios
        axios.get('http://localhost:5000/')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // Alternatively, use Fetch API
        // fetch('http://localhost:5000/api/data')
        //     .then(response => response.json())
        //     .then(data => setData(data))
        //     .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<LoginPage
             
            />}/>
            <Route path="/register" element={<Register />} />
            <Route path="/esquecer" element={<Forgot />} />
            <Route path="/grafico" element={<Grafico />} />
            <Route path="/sobrenos" element={<SobreNos />} />
            <Route path="/noticias" element={<Noticias/>}/>
            <Route path="/perfil" element={<Profile/>} />
            <Route path="/calculadora" element={<Calculadora/>}/>
          </Routes>
        </BrowserRouter>
      );
    }

export default App;
