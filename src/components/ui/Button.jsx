import React from 'react';

const VARIANT_CLASSES = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
};

const Button = ({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  onClick,
  as,
  href,
  type = 'button',
  ...props
}) => {
  const buttonClass = `btn ${VARIANT_CLASSES[variant] || ''} ${className}`
    .replace(/\s+/g, ' ')
    .trim();

  // Render as an anchor when `as="a"` or an href is supplied (e.g. mailto links),
  // otherwise a native button. Keeps one styled primitive for both use cases.
  const Element = as || (href ? 'a' : 'button');

  if (Element === 'a') {
    return (
      <a className={buttonClass} href={href} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

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
