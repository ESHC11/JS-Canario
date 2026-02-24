import React, { useState } from 'react';
import Rating from '@mui/material/Rating';

interface ReviewFormProps {
  onAddReview: (review: { name: string; rating: number; comment: string; date: string }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onAddReview }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && rating !== null && comment) {
      onAddReview({ name, rating, comment, date: new Date().toLocaleDateString() });
      setName('');
      setRating(null);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <input type="text" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} required />
      <Rating value={rating} onChange={(_, value) => setRating(value)} />
      <textarea placeholder="Tu comentario" value={comment} onChange={(e) => setComment(e.target.value)} required />
      <button type="submit">Enviar Reseña</button>
    </form>
  );
};

export default ReviewForm;