import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import News from './pages/News/News.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import Login from './pages/LoginPage/Login.jsx'
import Register from './pages/RegisterPage/Register.jsx'
import Forgot from './pages/Forgot/Forgot.jsx'
import Graph from './pages/Graph/Graph.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Calculator from './pages/Calculator/Calculator.jsx';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/esquecer" element={<Forgot />} />
            <Route path="/grafico" element={<Graph />} />
            <Route path="/sobrenos" element={<AboutUs />} />
            <Route path="/noticias" element={<News/>}/>
            <Route path="/perfil" element={<Profile/>} />
            <Route path="/calculadora" element={<Calculator/>}/>
          </Routes>
        </BrowserRouter>
      );
    }

export default App;
