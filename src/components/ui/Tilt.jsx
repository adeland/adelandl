import React, { useEffect, useRef } from 'react';

/* Cursor-following 3D tilt. The outer div owns the hover bounds and
   perspective; the inner plane eases toward the cursor's angle each frame
   and settles back on leave. `fill` makes both layers cover an absolutely
   positioned parent (used inside cards whose art is absolute). */
const Tilt = ({ children, max = 10, fill = false, className = '' }) => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    let raf = 0;
    let rotX = 0;
    let rotY = 0;
    let targetX = 0;
    let targetY = 0;

    const loop = () => {
      rotX += (targetX - rotX) * 0.12;
      rotY += (targetY - rotY) * 0.12;
      inner.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
      if (Math.abs(targetX - rotX) > 0.04 || Math.abs(targetY - rotY) > 0.04) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const rect = outer.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetY = nx * max;
      targetX = -ny * max * 0.8;
      kick();
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };

    outer.addEventListener('mousemove', onMove);
    outer.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      outer.removeEventListener('mousemove', onMove);
      outer.removeEventListener('mouseleave', onLeave);
    };
  }, [max]);

  return (
    <div ref={outerRef} className={`tilt${fill ? ' tilt--fill' : ''} ${className}`.trim()}>
      <div ref={innerRef} className="tilt-inner">
        {children}
      </div>
    </div>
  );
};

export default Tilt;
