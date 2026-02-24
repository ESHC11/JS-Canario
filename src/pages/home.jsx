// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ products }) => {
  return (
    <main>
      <h2 className="section-title">Catálogo Exclusivo</h2>
      
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">${product.price} MXN</p>
              
              <Link to={`/product/${product.id}`}>
                <button>Ver Detalles y Comentarios</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;