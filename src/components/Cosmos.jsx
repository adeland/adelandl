import React, { useEffect, useRef } from 'react';

/* Deterministic PRNG — the sky is dealt the same way every visit. */
const mulberry32 = (seed) => {
  let s = seed;
  return () => {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/* n points around a circle, in percent coordinates of the parent box. */
const ringPts = (n, r, cx = 50, cy = 50, phase = -Math.PI / 2) =>
  Array.from({ length: n }, (_, i) => {
    const a = phase + (i / n) * Math.PI * 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });

/* n points along a circular arc (degrees), percent coordinates. */
const arcPts = (n, r, cx, cy, fromDeg, toDeg) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((fromDeg + ((toDeg - fromDeg) * i) / (n - 1)) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });

/* Points along a rounded-card perimeter, percent coordinates. */
const cardPerimeter = () => {
  const pts = [];
  for (let i = 0; i < 5; i++) pts.push([14 + i * 18, 4.5]);
  for (let i = 0; i < 7; i++) pts.push([94, 10 + i * 13.4]);
  for (let i = 0; i < 5; i++) pts.push([86 - i * 18, 95.5]);
  for (let i = 0; i < 7; i++) pts.push([6, 90 - i * 13.4]);
  return pts;
};

/* Per-particle drift plan. Each mote rests out in the field (random
   direction, long radius) and wanders there perpetually — negative delay so
   it is already mid-drift at page load. Summoning is a weather system, not
   a mechanism:
   — flight follows a bowed quadratic arc (--flight), never a straight line;
   — travel time grows with distance (--pd, ~3–5.5s) so the cloud drifts in
     at wind speed instead of snapping;
   — departure delay grows with distance (--pdel) so the body condenses from
     its core outward, the far halo folding in last;
   — dissolution retraces the same arc, quicker but still unhurried.
   --sx/--sy back the straight-line fallback where offset-path is missing. */
const driftVars = (rand, reach = 1) => {
  const angle = rand() * Math.PI * 2;
  const radius = (160 + rand() * 260) * reach;
  const far = (radius / reach - 160) / 260; /* 0 = inner field, 1 = outer */
  const sx = Math.cos(angle) * radius;
  const sy = Math.sin(angle) * radius;
  /* Control point: the chord's midpoint pushed perpendicular, a different
     bow for every mote, so the swarm sweeps home along interleaved arcs. */
  const bow = radius * (0.2 + rand() * 0.35) * (rand() < 0.5 ? -1 : 1);
  const qx = sx / 2 - (sy / radius) * bow;
  const qy = sy / 2 + (sx / radius) * bow;
  return {
    '--sx': `${Math.round(sx)}px`,
    '--sy': `${Math.round(sy)}px`,
    '--flight': `path('M ${Math.round(sx)} ${Math.round(sy)} Q ${Math.round(qx)} ${Math.round(qy)} 0 0')`,
    '--pd': `${(3 + far * 1.6 + rand() * 0.7).toFixed(2)}s`,
    '--pdel': `${(rand() * 0.35 + far * 1.15).toFixed(2)}s`,
    '--pout': `${(rand() * 0.55).toFixed(2)}s`,
    '--fx': `${((5 + rand() * 11) * (rand() < 0.5 ? -1 : 1)).toFixed(1)}px`,
    '--fy': `${((5 + rand() * 11) * (rand() < 0.5 ? -1 : 1)).toFixed(1)}px`,
    '--fd': `${(14 + rand() * 16).toFixed(1)}s`,
    '--fdel': `-${(rand() * 30).toFixed(1)}s`,
  };
};

/* One particle. Idles as faint stardust at its drift position; condenses
   into place when the feature gains .is-formed — all transition, no
   per-frame JS. */
const Dot = ({ x, y, s, i, rand, o = 0.5 }) => (
  <span
    className="pdot"
    style={{
      left: `${x.toFixed(2)}%`,
      top: `${y.toFixed(2)}%`,
      width: s,
      height: s,
      '--o': o,
      ...driftVars(rand),
    }}
  />
);

const Glyph = ({ children, className = '', i, rand, style }) => (
  <span
    className={`pdot pdot-glyph ${className}`.trim()}
    style={{
      /* Glyphs arrive last — the seal pressed once the body has gathered. */
      ...driftVars(rand, 1.2),
      '--pdel': `${(2.6 + rand() * 0.6).toFixed(2)}s`,
      ...style,
    }}
  >
    {children}
  </span>
);

const makeStars = (seed, count, spanVh, sizeMin, sizeMax) => {
  const rnd = mulberry32(seed);
  return Array.from({ length: count }, (_, id) => {
    const roll = rnd();
    return {
      id,
      top: +(rnd() * spanVh).toFixed(2),
      left: +(rnd() * 100).toFixed(2),
      size: +(sizeMin + rnd() * (sizeMax - sizeMin)).toFixed(2),
      color:
        roll < 0.2
          ? 'var(--gold)'
          : roll < 0.28
            ? 'var(--accent-color)'
            : 'var(--text-muted)',
      delay: +(rnd() * 8).toFixed(2),
      dur: +(7 + rnd() * 8).toFixed(2),
      sparkle: roll > 0.86,
      sx: Math.round((rnd() * 2 - 1) * 90),
      sy: Math.round((rnd() * 2 - 1) * 90),
    };
  });
};

const FAR_STARS = makeStars(11, 26, 150, 1, 1.7);
const MID_STARS = makeStars(23, 16, 190, 1.6, 2.5);
const NEAR_STARS = makeStars(47, 9, 250, 2.4, 3.4);

/* Art-deco four-point star — concave diamond. */
const SPARKLE_PATH =
  'M0 -12 C 1.6 -3.2, 3.2 -1.6, 12 0 C 3.2 1.6, 1.6 3.2, 0 12 C -1.6 3.2, -3.2 1.6, -12 0 C -3.2 -1.6, -1.6 -3.2, 0 -12 Z';

const Star = ({ star }) => {
  const common = {
    top: `${star.top}vh`,
    left: `${star.left}%`,
    color: star.color,
    animationDelay: `${star.delay}s`,
    '--tw': `${star.dur}s`,
    '--sx': `${star.sx}px`,
    '--sy': `${star.sy}px`,
  };
  return star.sparkle && star.size > 2 ? (
    <svg
      className="bg-star-sparkle"
      viewBox="-12 -12 24 24"
      data-top={star.top}
      style={{ ...common, width: `${star.size * 4.5}px` }}
    >
      <path d={SPARKLE_PATH} />
    </svg>
  ) : (
    <span
      className="bg-star"
      data-top={star.top}
      style={{ ...common, width: star.size, height: star.size }}
    />
  );
};

/* Crescent — dots tracing the silhouette's two arcs. */
const Crescent = ({ topVh, side, width, bob, flip = false, seed }) => {
  const rand = mulberry32(seed);
  const outer = arcPts(16, 44, 48.33, 50, 114.6, 245.4);
  const inner = arcPts(11, 64, 79.96, 50, 141.3, 218.7);
  return (
    <div
      className={`bg-feature bg-crescent bg-float${flip ? ' flip' : ''}`}
      data-top={topVh}
      style={{ top: `${topVh}vh`, ...side, width, height: width, '--bob': bob }}
    >
      <div className="crescent-rot">
        {outer.map(([x, y], i) => (
          <Dot key={`o${i}`} x={x} y={y} s={2.8} i={i} rand={rand} o={0.5} />
        ))}
        {inner.map(([x, y], i) => (
          <Dot key={`n${i}`} x={x} y={y} s={2.2} i={16 + i} rand={rand} o={0.38} />
        ))}
      </div>
    </div>
  );
};

/* One dotted chip face: outer rim, eight edge spots, inner ring, pip. */
const ChipFace = ({ pip, seed, pipPx }) => {
  const rand = mulberry32(seed);
  return (
    <>
      {ringPts(24, 46).map(([x, y], i) => (
        <Dot key={`o${i}`} x={x} y={y} s={2.2} i={i} rand={rand} o={0.55} />
      ))}
      {ringPts(8, 42, 50, 50, -Math.PI / 8).map(([x, y], i) => (
        <Dot key={`s${i}`} x={x} y={y} s={5.5} i={24 + i} rand={rand} o={0.35} />
      ))}
      {ringPts(12, 29).map(([x, y], i) => (
        <Dot key={`n${i}`} x={x} y={y} s={1.7} i={32 + i} rand={rand} o={0.6} />
      ))}
      <Glyph className="chip-pip3" i={45} rand={rand} style={{ fontSize: pipPx }}>
        {pip}
      </Glyph>
    </>
  );
};

/* A true 3D poker chip built from particles: dotted faces, slab rim.
   It tumbles while its dots converge into place or dissolve away. */
const Chip = ({ variant, pip, spin, topVh, side, width, bob, seed }) => (
  <div
    className={`bg-feature bg-chip3d ${variant} bg-float`}
    data-top={topVh}
    style={{ top: `${topVh}vh`, ...side, width, '--bob': bob }}
  >
    <div className="chip3d" style={{ '--spin': spin }}>
      {Array.from({ length: 7 }, (_, i) => (
        <div
          key={i}
          className="chip3d-slab"
          style={{
            transform: `translateZ(${((i - 3) * 1.3).toFixed(1)}px)`,
            '--i': 20 + i * 3,
          }}
        />
      ))}
      <div className="chip3d-face front">
        <ChipFace pip={pip} seed={seed} pipPx={Math.round(width * 0.18)} />
      </div>
      <div className="chip3d-face back">
        <ChipFace pip={pip} seed={seed + 7} pipPx={Math.round(width * 0.18)} />
      </div>
    </div>
  </div>
);

/* A dealt card turning in space — pip face, dotted pomegranate back. */
const Card3D = ({ topVh, side, width, bob, seed }) => {
  const randA = mulberry32(seed);
  const randB = mulberry32(seed + 13);
  const rim = cardPerimeter();
  return (
    <div
      className="bg-feature bg-card3d bg-float"
      data-top={topVh}
      style={{ top: `${topVh}vh`, ...side, width, '--bob': bob }}
    >
      <div className="card3d" style={{ '--spin': '40s' }}>
        <div className="card3d-face front">
          {rim.map(([x, y], i) => (
            <Dot key={i} x={x} y={y} s={2} i={i} rand={randA} o={0.45} />
          ))}
          <Glyph className="card-pip3" i={26} rand={randA}>
            ♦
          </Glyph>
        </div>
        <div className="card3d-face back">
          {rim.map(([x, y], i) => (
            <Dot key={i} x={x} y={y} s={2} i={i} rand={randB} o={0.45} />
          ))}
          {ringPts(8, 9, 50, 55).map(([x, y], i) => (
            <span
              key={`f${i}`}
              className="pdot fruit"
              style={{
                left: `${x.toFixed(1)}%`,
                top: `${y.toFixed(1)}%`,
                width: 2.4,
                height: 2.4,
                '--o': 0.55,
                ...driftVars(randB, 0.45),
              }}
            />
          ))}
          {[
            [46, 40],
            [50, 36.5],
            [54, 40],
          ].map(([x, y], i) => (
            <Dot key={`c${i}`} x={x} y={y} s={2} i={34 + i} rand={randB} o={0.6} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* Armillary sphere — three orthogonal dotted rings turning as one. */
const Armillary = ({ topVh, side, width, bob, seed }) => {
  const rand = mulberry32(seed);
  const planes = ['a', 'b', 'c'];
  return (
    <div
      className="bg-feature bg-armillary bg-float"
      data-top={topVh}
      style={{ top: `${topVh}vh`, ...side, width, '--bob': bob }}
    >
      <div className="armillary" style={{ '--spin': '52s' }}>
        {planes.map((plane, p) => (
          <span key={plane} className={`arm-ring ${plane}`}>
            {ringPts(14, 48).map(([x, y], i) => (
              <Dot
                key={i}
                x={x}
                y={y}
                s={2}
                i={p * 5 + i}
                rand={rand}
                o={0.5 - p * 0.1}
              />
            ))}
          </span>
        ))}
        <span className="arm-core" />
      </div>
    </div>
  );
};

/* Three layers of sky on underdamped springs. The same loop watches every
   body's screen position: entering the frame converges its particles,
   scrolling past dissolves them. */
const Cosmos = () => {
  const rootRef = useRef(null);
  const layerRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    /* Low stiffness + near-critical damping: the sky is heavy. It trails a
       scroll by a beat, glides for a couple of seconds, settles without
       fuss — celestial mass, not UI snap. */
    const K = 9;
    const DAMP = 2 * Math.sqrt(K) * 0.86;
    const layers = [
      { el: layerRefs[0], f: 0.06, mouse: 0, y: -window.scrollY * 0.06, v: 0 },
      { el: layerRefs[1], f: 0.12, mouse: 0.4, y: -window.scrollY * 0.12, v: 0 },
      { el: layerRefs[2], f: 0.22, mouse: 1, y: -window.scrollY * 0.22, v: 0 },
    ];

    /* Everything with a data-top participates in converge/dissolve. */
    const items = [...rootRef.current.querySelectorAll('[data-top]')].map((el) => ({
      el,
      topVh: parseFloat(el.dataset.top),
      half: el.offsetHeight / 2,
      layer: +el.closest('.bg-layer').dataset.layer,
      formed: false,
      off: false,
    }));

    let raf = 0;
    let running = true;
    let last = performance.now();
    let idleFrames = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const tick = (now) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      mouseX += (targetMouseX - mouseX) * 0.028;
      mouseY += (targetMouseY - mouseY) * 0.028;

      let busy =
        Math.abs(targetMouseX - mouseX) > 0.05 ||
        Math.abs(targetMouseY - mouseY) > 0.05;

      for (const layer of layers) {
        const target = -window.scrollY * layer.f;
        if (Math.abs(layer.v) > 0.02 || Math.abs(layer.y - target) > 0.05) {
          busy = true;
        }
        const accel = -K * (layer.y - target) - DAMP * layer.v;
        layer.v += accel * dt;
        layer.y += layer.v * dt;
        const tip = Math.max(-2.4, Math.min(2.4, layer.v * 0.02));
        if (layer.el.current) {
          layer.el.current.style.transform = `translate3d(${(mouseX * layer.mouse).toFixed(2)}px, ${(layer.y + mouseY * layer.mouse).toFixed(2)}px, 0) rotateX(${tip.toFixed(3)}deg)`;
        }
      }

      /* Formation pass. A body is formed only while its center is near the
         middle of the stage; the band width scales with the layer's
         parallax factor so every depth stays "alive" for a similar scroll
         distance (~two sections) before dissolving. The band is generous —
         condensation takes ~5 unhurried seconds, so it must begin while the
         body is still approaching. Hysteresis pads the release so edges
         don't flicker.

         The same pass puts far-offstage bodies to sleep (.is-off): their
         wander/tumble/twinkle animations and compositor layers cost real
         frame time, and there can be hundreds of motes below the fold. */
      const vh = window.innerHeight;
      for (const item of items) {
        const center = (item.topVh * vh) / 100 + item.half + layers[item.layer].y;
        const spread = (0.26 + layers[item.layer].f * 0.6) * vh;
        const pad = item.formed ? 0.08 * vh : 0;
        const formed =
          center > 0.5 * vh - spread - pad && center < 0.5 * vh + spread + pad;
        if (formed !== item.formed) {
          item.formed = formed;
          item.el.classList.toggle('is-formed', formed);
        }
        /* Honest sleep distance: half a viewport puts the body's anchor at
           the screen edge, and its dust wanders up to ~440px beyond that.
           Past anchor + dust reach + margin, nothing of it can be seen. */
        const sleepAt = 0.5 * vh + (item.off ? 540 : 640);
        const off = Math.abs(center - 0.5 * vh) > sleepAt;
        if (off !== item.off) {
          item.off = off;
          item.el.classList.toggle('is-off', off);
        }
      }

      /* The sky sleeps when nothing moves — no scroll momentum, no mouse
         drift — and wakes on the next scroll or pointer event. */
      idleFrames = busy ? 0 : idleFrames + 1;
      if (idleFrames > 40) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (running && !raf) {
        last = performance.now();
        idleFrames = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 26;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 18;
      wake();
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', wake);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', wake);
      window.removeEventListener('resize', wake);
    };
  }, []);

  return (
    <div ref={rootRef} className="bg-cosmos" aria-hidden="true">
      <div ref={layerRefs[0]} className="bg-layer" data-layer="0">
        {FAR_STARS.map((star) => (
          <Star key={star.id} star={star} />
        ))}
        <Crescent topVh={31} side={{ right: '7%' }} width={190} bob="46s" seed={3} />
        <Chip
          variant="ink"
          pip="♣"
          spin="48s"
          topVh={62}
          side={{ left: '8%' }}
          width={58}
          bob="44s"
          seed={5}
        />
      </div>
      <div ref={layerRefs[1]} className="bg-layer" data-layer="1">
        {MID_STARS.map((star) => (
          <Star key={star.id} star={star} />
        ))}
        <Chip
          variant="garnet"
          pip="♥"
          spin="34s"
          topVh={116}
          side={{ right: '8%' }}
          width={88}
          bob="38s"
          seed={9}
        />
        <Armillary topVh={128} side={{ left: '6%' }} width={110} bob="40s" seed={17} />
        <Crescent
          flip
          topVh={140}
          side={{ right: '6%' }}
          width={84}
          bob="36s"
          seed={21}
        />
      </div>
      <div ref={layerRefs[2]} className="bg-layer" data-layer="2">
        {NEAR_STARS.map((star) => (
          <Star key={star.id} star={star} />
        ))}
        <Chip
          variant="gold"
          pip="♠"
          spin="26s"
          topVh={96}
          side={{ right: '11%' }}
          width={104}
          bob="34s"
          seed={27}
        />
        <Card3D topVh={148} side={{ right: '5%' }} width={58} bob="30s" seed={33} />
        <span
          className="bg-feature bg-eq bg-float"
          data-top={58}
          style={{ top: '58vh', left: '3%', '--bob': '30s' }}
        >
          EV = Σ pᵢ·xᵢ
        </span>
        <span
          className="bg-feature bg-eq bg-float"
          data-top={205}
          style={{ top: '205vh', right: '4%', '--bob': '26s' }}
        >
          H = −Σ p·ln p
        </span>
      </div>
    </div>
  );
};

export default Cosmos;
