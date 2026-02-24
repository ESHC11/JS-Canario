// src/pages/ProductDetail.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = ({ products, updateProducts }) => {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  const product = products[productIndex];

  // Estados para el formulario del nuevo comentario
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");

  if (!product) return <h2 style={{textAlign: 'center'}}>Producto no encontrado</h2>;

  // Función para guardar el comentario (CREATE)
  const handleAddComment = (e) => {
    e.preventDefault();
    if(!newName.trim() || !newComment.trim()) return;

    const review = {
      name: newName,
      rating: 5, // Por defecto le ponemos 5 estrellas
      comment: newComment,
      date: new Date().toISOString().split('T')[0] // Fecha de hoy
    };

    // Clonamos el arreglo de productos para actualizarlo
    const updatedProducts = [...products];
    updatedProducts[productIndex].reviews.push(review);

    // Actualizamos el estado global
    updateProducts(updatedProducts);
    
    // Limpiamos el formulario
    setNewName("");
    setNewComment("");
  };

  return (
    <div className="detail-container">
      <Link to="/" className="back-btn">← Volver al Catálogo</Link>
      
      <div className="detail-layout">
        {/* Lado Izquierdo: Imagen */}
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Lado Derecho: Info y Comentarios */}
        <div className="detail-content">
          <h2>{product.name}</h2>
          <p className="price-large">${product.price} MXN</p>
          <p className="description">{product.description}</p>

          <div className="features-box">
            <p><strong>Tallas:</strong> {product.features.size.join(', ')}</p>
            <p><strong>Color:</strong> {product.features.color.join(', ')}</p>
            <p><strong>Material:</strong> {product.features.material}</p>
          </div>

          <hr className="divider" />

          {/* SECCIÓN DE COMENTARIOS (READ) */}
          <h3>Comentarios ({product.reviews.length})</h3>
          <div className="reviews-list">
            {product.reviews.map((rev, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <strong>{rev.name}</strong> 
                  <span>{rev.date}</span>
                </div>
                <p>{"⭐".repeat(rev.rating)}</p>
                <p>{rev.comment}</p>
              </div>
            ))}
          </div>

          {/* FORMULARIO PARA AGREGAR COMENTARIO (CREATE) */}
          <form className="comment-form" onSubmit={handleAddComment}>
            <h4>Deja tu opinión</h4>
            <input 
              type="text" 
              placeholder="Tu Nombre" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <textarea 
              placeholder="¿Qué te pareció esta prenda?" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
            <button type="submit">Publicar Comentario</button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;