// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import ProductDetail from './pages/ProductDetail';
import { initialProducts } from './data/productos';
import './index.css';
import logoSvg from "./assets/logo.svg";
import Admin from './pages/Admin';

function App() {
  // Inicializamos el estado leyendo el LocalStorage o usando los datos por defecto
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('jsCanarioProducts');
    if (saved) {
      return JSON.parse(saved);
    }
    return initialProducts;
  });

  // Cada vez que 'products' cambie (alguien comente), lo guardamos en el navegador
  useEffect(() => {
    localStorage.setItem('jsCanarioProducts', JSON.stringify(products));
  }, [products]);

  return (
    <Router>
      <div className="container">
        
        {/* HEADER CON TU LOGO */}
        <header className="main-header">
          <Link to="/">
            <img src={logoSvg} alt="Logo" className="logo" />
          </Link>
          <p className="subtitle">Premium Streetwear</p>

          {/* Boton para el admin */}
          <Link to="/admin"style={{ color: '#333', textDecoration: 'none', fontSize: '0.8rem', marginTop: '10px', display: 'block' }}>
            [ Panel Admin ]
          </Link>
        </header>

        {/* RUTAS DE LAS PÁGINAS */}
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/product/:id" element={<ProductDetail products={products} updateProducts={setProducts} />} />
          
          {/* NUEVA RUTA DEL ADMIN */}
          <Route path="/admin" element={<Admin products={products} updateProducts={setProducts} />} />

          <Route 
            path="/admin" 
          />
        </Routes>

      </div>
    </Router>
  );
}

export default App;