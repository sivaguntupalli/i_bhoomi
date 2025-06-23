import React from 'react';

const Image = ({ src, alt, ...props }) => {
  const imagePath = src.startsWith('http') ? src : `/assets/images/${src}`;
  
  return (
    <picture>
      <source srcSet={`${imagePath}?webp`} type="image/webp" />
      <source srcSet={imagePath} type="image/jpeg" />
      <img 
        src={imagePath} 
        alt={alt}
        loading="lazy"
        {...props}
      />
    </picture>
  );
};

export default Image;