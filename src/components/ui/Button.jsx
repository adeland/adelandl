
const VARIANT_CLASSES = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
};

/* Magnetic lean — the button tilts a few px toward the cursor and springs
   back on leave. Fine pointers only; the CSS transition supplies the ease. */
const finePointer =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(pointer: fine)').matches;

const magnetProps = finePointer
  ? {
      onMouseMove: (e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty(
          '--mx',
          `${(((e.clientX - r.x) / r.width - 0.5) * 6).toFixed(1)}px`
        );
        el.style.setProperty(
          '--my',
          `${(((e.clientY - r.y) / r.height - 0.5) * 6).toFixed(1)}px`
        );
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.setProperty('--mx', '0px');
        e.currentTarget.style.setProperty('--my', '0px');
      },
    }
  : {};

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
      <a className={buttonClass} href={href} onClick={onClick} {...magnetProps} {...props}>
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
      {...magnetProps}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
