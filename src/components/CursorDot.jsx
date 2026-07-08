import React, { useEffect, useRef } from 'react';

/* A small gold dot trailing the cursor on a soft spring, growing over
   interactive elements. Fine-pointer devices only; the native cursor stays. */
const CursorDot = () => {
  const dotRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    const dot = dotRef.current;
    let raf = 0;
    let x = -40;
    let y = -40;
    let targetX = -40;
    let targetY = -40;
    let scale = 1;
    let targetScale = 1;
    let seen = false;

    const loop = () => {
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      scale += (targetScale - scale) * 0.14;
      dot.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      const interactive = e.target.closest?.(
        'a, button, [role="button"], input, .exp-dial'
      );
      targetScale = interactive ? 2.4 : 1;
      if (!seen) {
        seen = true;
        x = targetX;
        y = targetY;
        dot.style.opacity = '';
        raf = requestAnimationFrame(loop);
      }
    };

    dot.style.opacity = '0';
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
};

export default CursorDot;
