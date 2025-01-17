import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SobreNos from './components/SobreNos';
import LoginPage from './components/LoginPage'
import Register from './components/Register'
import Forgot from './components/Forgot'
import Grafico from './components/Grafico/Grafico.js'
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
            <Route path="/grafico" element = {<Grafico />} />
            <Route path="/sobrenos" element={<SobreNos />} />
          </Routes>
        </BrowserRouter>
      );
    }

export default App;
