import { useCallback, useEffect, useRef } from 'react';

/**
 * Critically-damped spring that eases a value toward a target, calling
 * `onFrame(value)` every animation frame (and once on settle).
 *
 * Returns a `retarget(value)` function. Retargeting mid-flight preserves
 * velocity, so rapid target changes (e.g. cursor tracking) stay continuous
 * instead of restarting — motion flows rather than jumps. Never snaps.
 */
export const useSpring = (initial, onFrame, { stiffness = 70 } = {}) => {
  const spring = useRef(null);
  if (spring.current === null) {
    spring.current = { value: initial, velocity: 0, target: initial, raf: 0, last: 0 };
  }

  // Track the latest callback/config without re-creating retarget.
  const frameRef = useRef(onFrame);
  frameRef.current = onFrame;
  const stiffnessRef = useRef(stiffness);
  stiffnessRef.current = stiffness;

  const retarget = useCallback((target) => {
    const s = spring.current;
    s.target = target;

    if (s.raf) return; // loop already running — it reads s.target each frame

    const tick = (now) => {
      const k = stiffnessRef.current;
      const damping = 2 * Math.sqrt(k); // critical damping: no bounce
      const dt = Math.min((now - s.last) / 1000, 1 / 30);
      s.last = now;
      const accel = -k * (s.value - s.target) - damping * s.velocity;
      s.velocity += accel * dt;
      s.value += s.velocity * dt;

      const settled =
        Math.abs(s.value - s.target) < 0.05 && Math.abs(s.velocity) < 0.05;
      if (settled) {
        s.value = s.target;
        s.velocity = 0;
        s.raf = 0;
      }
      frameRef.current(s.value);
      if (!settled) s.raf = requestAnimationFrame(tick);
    };

    s.last = performance.now();
    s.raf = requestAnimationFrame(tick);
  }, []);

  // Paint the initial value once, then clean up the loop on unmount.
  useEffect(() => {
    frameRef.current(spring.current.value);
    const s = spring.current;
    return () => cancelAnimationFrame(s.raf);
  }, []);

  return retarget;
};
