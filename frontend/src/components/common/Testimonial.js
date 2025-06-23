/**
 * Testimonial Component
 * Purpose: Display customer feedback with avatar and rating
 * Props:
 * - quote: Testimonial text
 * - author: Customer name
 * - role: Customer profession/relation
 * - rating: Number (1-5)
 * - avatar: Image path
 */

import React from 'react';
import { FaStar } from 'react-icons/fa';

const Testimonial = ({ quote, author, role, rating = 5, avatar }) => {
  return (
    <div className="testimonial-card">
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < rating ? 'filled' : ''} />
        ))}
      </div>
      <p className="quote">"{quote}"</p>
      <div className="author">
        {avatar && <img src={avatar} alt={author} />}
        <div>
          <strong>{author}</strong>
          <span>{role}</span>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
