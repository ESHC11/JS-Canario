import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price} MXN</p>
        <p className="desc">{product.description}</p>
        
        <div className="features">
          <span><strong>Tallas:</strong> {product.features.size.join(', ')}</span>
          <span><strong>Colores:</strong> {product.features.color.join(', ')}</span>
        </div>
        
        <button>Ver Detalles y Reseñas</button>
      </div>
    </div>
  );
};

export default ProductCard;