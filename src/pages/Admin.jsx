import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Admin = ({ products, updateProducts }) => {
  // Estados para cada campo del formulario
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('/img/'); // Valor por defecto
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [material, setMaterial] = useState('');

  // Función para guardar el nuevo producto (CREATE)
  const handleAddProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(), // Generamos un ID único con la fecha actual
      name,
      price: parseFloat(price),
      description,
      image,
      features: {
        size: sizes.split(',').map(s => s.trim()), // Convierte "S, M, L" en arreglo
        color: colors.split(',').map(c => c.trim()),
        material
      },
      reviews: [] // Inicia sin comentarios
    };

    // Agregamos el nuevo producto al inicio de la lista
    const updatedProducts = [newProduct, ...products];
    updateProducts(updatedProducts);

    // Limpiamos el formulario
    setName(''); setPrice(''); setDescription(''); setImage('/img/');
    setSizes(''); setColors(''); setMaterial('');
    
    alert('🔥 ¡Prenda agregada exitosamente al catálogo!');
  };

  // Función para borrar un producto (DELETE)
  const handleDelete = (id) => {
    if(window.confirm('¿Seguro que quieres eliminar esta prenda?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      updateProducts(updatedProducts);
    }
  };

  return (
    <div className="admin-container">
      <Link to="/" className="back-btn">← Volver al Catálogo</Link>
      <h2 className="section-title">Panel de Administración</h2>

      <div className="admin-layout">
        {/* LADO IZQUIERDO: Formulario para agregar */}
        <div className="admin-form-box">
          <h3 style={{ color: '#ff3b3b', marginBottom: '20px' }}>Agregar Nueva Prenda</h3>
          <form onSubmit={handleAddProduct} className="comment-form">
            <input type="text" placeholder="Nombre de la prenda" value={name} onChange={e => setName(e.target.value)} required />
            <input type="number" placeholder="Precio ($)" value={price} onChange={e => setPrice(e.target.value)} required />
            <textarea placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
            
            <p style={{ marginTop: '15px', color: '#888', fontSize: '0.85rem' }}>
              *Para la imagen, pega una URL de internet o escribe la ruta de tu compu (ej. /img/nueva.jpg)
            </p>
            <input type="text" placeholder="Ruta de la imagen (/img/...)" value={image} onChange={e => setImage(e.target.value)} required />
            
            <input type="text" placeholder="Tallas separadas por coma (ej. S, M, L)" value={sizes} onChange={e => setSizes(e.target.value)} required />
            <input type="text" placeholder="Colores separados por coma (ej. Negro, Rojo)" value={colors} onChange={e => setColors(e.target.value)} required />
            <input type="text" placeholder="Material (ej. 100% Algodón)" value={material} onChange={e => setMaterial(e.target.value)} required />
            
            <button type="submit">Publicar en la Tienda</button>
          </form>
        </div>

        {/* LADO DERECHO: Lista de productos existentes */}
        <div className="admin-list-box">
          <h3 style={{ marginBottom: '20px' }}>Inventario ({products.length})</h3>
          <div className="reviews-list"> {/* Reutilizamos la clase del scroll */}
            {products.map(product => (
              <div key={product.id} className="review-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#fff' }}>{product.name}</strong>
                  <p style={{ color: '#ff3b3b', margin: '5px 0' }}>${product.price}</p>
                </div>
                <button 
                  onClick={() => handleDelete(product.id)}
                  style={{ width: 'auto', backgroundColor: 'transparent', border: '1px solid #ff3b3b', color: '#ff3b3b', padding: '5px 10px' }}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;