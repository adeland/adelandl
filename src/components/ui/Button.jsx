import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    submit: 'submit-btn'
  };
  
  const sizeClasses = {
    small: 'btn-sm',
    medium: '',
    large: 'btn-lg'
  };

  const buttonClass = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
