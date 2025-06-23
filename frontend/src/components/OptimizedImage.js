import React from 'react';
import { Img } from 'react-optimized-image';

const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  priority = false, 
  fill = false,
  ...props 
}) => {
  return (
    <Img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      style={fill ? { position: 'absolute', inset: 0 } : {}}
      {...props}
    />
  );
};

export default OptimizedImage;