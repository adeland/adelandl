import React from 'react';

const Tag = ({ 
  children, 
  variant = 'default',
  className = '',
  color,
  ...props 
}) => {
  const baseClasses = 'tag';
  const variantClasses = {
    default: 'tag',
    skill: 'skill-tag',
    tech: 'tech-tag',
    rating: 'problem-rating',
    verdict: 'verdict'
  };

  const tagClass = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className}`.trim();

  const style = color ? { color, borderColor: color } : {};

  return (
    <span className={tagClass} style={style} {...props}>
      {children}
    </span>
  );
};

export default Tag;
