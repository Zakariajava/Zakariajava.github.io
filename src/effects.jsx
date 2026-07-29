// ─── Interaction & motion library ─────────────────────────────────────────
// Shared hooks/components for the whole site. Loaded after icons.jsx and
// before mockups/sections/app. No modules: everything hangs off window.FX.
//
// Rules honored here (tokens live in index.html):
//  · compositor-only per-frame writes (transform / opacity / custom props)
//  · no per-frame setState — DOM writes via refs, React only owns structure
//  · every effect gates on prefers-reduced-motion and (hover + fine) pointer
//  · every listener / observer / rAF is cleaned up (lang + theme toggles
//    re-render the whole tree, so leaks would multiply on each switch)

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => matchMedia("(hover: hover) and (pointer: fine)").matches;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// ═══════════════════════════════════════════════════════════════════════
// Motion bus — ONE scroll loop + ONE pointer loop for the entire page.
// Publishes to subscribers and writes two global CSS vars:
//   --svel  scroll velocity, -1..1, decaying   (drives the row skew)
//   --ptr-x / --ptr-y  pointer position, -0.5..0.5 (drives parallax)
// ═══════════════════════════════════════════════════════════════════════
const bus = {
  scrollSubs: new Set(),
  pointerSubs: new Set(),
  y: 0, vel: 0, px: 0, py: 0,
  scrollRaf: 0, decayRaf: 0, pointerRaf: 0, started: false,
};

const startBus = () => {
  if (bus.started) return;
  bus.started = true;
  const root = document.documentElement;
  bus.y = window.scrollY;

  const emitScroll = () => {
    bus.scrollRaf = 0;
    const y = window.scrollY;
    const dy = y - bus.y;
    bus.y = y;
    // Instant velocity, normalized against a comfortable 60px/frame ceiling.
    bus.vel = clamp(dy / 60, -1, 1);
    root.style.setProperty("--svel", bus.vel.toFixed(3));
    bus.scrollSubs.forEach(fn => fn(y));
    decay();
  };
  const decay = () => {
    if (bus.decayRaf) return;
    bus.decayRaf = requestAnimationFrame(function step() {
      bus.decayRaf = 0;
      bus.vel *= 0.86;
      if (Math.abs(bus.vel) < 0.002) { bus.vel = 0; root.style.setProperty("--svel", "0"); return; }
      root.style.setProperty("--svel", bus.vel.toFixed(3));
      bus.decayRaf = requestAnimationFrame(step);
    });
  };
  const onScroll = () => { if (!bus.scrollRaf) bus.scrollRaf = requestAnimationFrame(emitScroll); };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  if (finePointer() && !reducedMotion()) {
    let cx = 0, cy = 0;
    const emitPointer = () => {
      bus.pointerRaf = 0;
      bus.px = cx / innerWidth - 0.5;
      bus.py = cy / innerHeight - 0.5;
      root.style.setProperty("--ptr-x", bus.px.toFixed(4));
      root.style.setProperty("--ptr-y", bus.py.toFixed(4));
      bus.pointerSubs.forEach(fn => fn(bus.px, bus.py));
    };
    window.addEventListener("pointermove", (e) => {
      cx = e.clientX; cy = e.clientY;
      if (!bus.pointerRaf) bus.pointerRaf = requestAnimationFrame(emitPointer);
    }, { passive: true });
  }
  // Prime the vars so first paint is never unstyled.
  root.style.setProperty("--svel", "0");
  root.style.setProperty("--ptr-x", "0");
  root.style.setProperty("--ptr-y", "0");
};

const useScrollSub = (fn, deps = []) => {
  React.useEffect(() => {
    startBus();
    bus.scrollSubs.add(fn);
    fn(window.scrollY);
    return () => bus.scrollSubs.delete(fn);
  }, deps);
};

// ── Shared "enter view once" observer ────────────────────────────────────
let _inViewIO = null;
const getInViewIO = () => {
  if (!_inViewIO) {
    _inViewIO = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add(en.target.dataset.inviewClass || "is-in");
          const cb = en.target._onInView;
          if (cb) { cb(); en.target._onInView = null; }
          _inViewIO.unobserve(en.target);
        }
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  }
  return _inViewIO;
};

// ── Scroll reveal ────────────────────────────────────────────────────────
const Reveal = ({ as = "div", delay = 0, variant = "", className = "", style, children, ...rest }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion() || !("IntersectionObserver" in window)) { el.classList.add("is-in"); return; }
    const io = getInViewIO();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  const El = as;
  return (
    <El ref={ref} className={`reveal ${variant} ${className}`}
        style={{ ...style, transitionDelay: delay ? delay + "ms" : undefined }} {...rest}>
      {children}
    </El>
  );
};

// ── Parallax: element drifts against the scroll, IO-gated ────────────────
const useParallax = (speed = 0.12, axis = "y") => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    startBus();
    let active = false, raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const centerOffset = (r.top + r.height / 2) - innerHeight / 2;
      const d = -centerOffset * speed;
      el.style.transform = axis === "y"
        ? `translate3d(0, ${d.toFixed(2)}px, 0)`
        : `translate3d(${d.toFixed(2)}px, 0, 0)`;
    };
    const onScroll = () => { if (active && !raf) raf = requestAnimationFrame(update); };
    const io = new IntersectionObserver(([en]) => {
      active = en.isIntersecting;
      if (active) onScroll();
    }, { rootMargin: "30% 0px" });
    io.observe(el);
    bus.scrollSubs.add(onScroll);
    update();
    return () => {
      io.disconnect();
      bus.scrollSubs.delete(onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed, axis]);
  return ref;
};

// ── Magnetic elements (pull toward cursor, spring back) ──────────────────
// Writes ONLY --mag-x / --mag-y and a .tracking class. The transform itself
// lives in CSS so :active and :hover keep working (an inline transform would
// outrank the stylesheet forever after the first hover).
const useMagnetic = (strength = 0.32, max = 13) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reducedMotion()) return;
    startBus();
    let raf = 0, rect = null;
    const measure = () => { if (rect) rect = el.getBoundingClientRect(); };
    const enter = () => { rect = el.getBoundingClientRect(); el.classList.add("tracking"); };
    const move = (e) => {
      if (!rect) return;
      const cx = e.clientX, cy = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        if (!rect) return;
        const x = clamp((cx - (rect.left + rect.width / 2)) * strength, -max, max);
        const y = clamp((cy - (rect.top + rect.height / 2)) * strength, -max, max);
        el.style.setProperty("--mag-x", x.toFixed(2) + "px");
        el.style.setProperty("--mag-y", y.toFixed(2) + "px");
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf); raf = 0; rect = null;
      el.classList.remove("tracking");
      el.style.setProperty("--mag-x", "0px");
      el.style.setProperty("--mag-y", "0px");
    };
    el.addEventListener("pointerenter", enter, { passive: true });
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave, { passive: true });
    // The cached rect would go stale if the page scrolls under a held pointer.
    bus.scrollSubs.add(measure);
    addEventListener("resize", measure, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      bus.scrollSubs.delete(measure);
      removeEventListener("resize", measure);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return ref;
};

const Magnetic = ({ as = "a", className = "", children, ...props }) => {
  const ref = useMagnetic();
  const El = as;
  return <El ref={ref} className={`magnetic ${className}`} {...props}>{children}</El>;
};

// ── 3D tilt with pointer-following glare (--gx/--gy feed .glare) ─────────
const useTilt = (maxDeg = 5) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reducedMotion()) return;
    startBus();
    let raf = 0, rect = null;
    const measure = () => { if (rect) rect = el.getBoundingClientRect(); };
    const enter = () => {
      rect = el.getBoundingClientRect();
      el.style.willChange = "transform";
      el.classList.add("tracking");
    };
    const move = (e) => {
      if (!rect) return;
      const cx = e.clientX, cy = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        if (!rect) return;
        const px = (cx - rect.left) / rect.width;
        const py = (cy - rect.top) / rect.height;
        el.style.setProperty("--tilt-x", ((0.5 - py) * maxDeg * 2).toFixed(2) + "deg");
        el.style.setProperty("--tilt-y", ((px - 0.5) * maxDeg * 2).toFixed(2) + "deg");
        el.style.setProperty("--gx", (px * 100).toFixed(1) + "%");
        el.style.setProperty("--gy", (py * 100).toFixed(1) + "%");
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf); raf = 0; rect = null;
      el.classList.remove("tracking");
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
      el.style.willChange = "auto";
    };
    el.addEventListener("pointerenter", enter, { passive: true });
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave, { passive: true });
    bus.scrollSubs.add(measure);
    addEventListener("resize", measure, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      bus.scrollSubs.delete(measure);
      removeEventListener("resize", measure);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return ref;
};

// ── Spotlight grid: one listener positions --mx/--my on every .spot ──────
const SpotlightGrid = ({ className = "", style, children }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const grid = ref.current;
    if (!grid || !finePointer()) return;
    let raf = 0, cx = 0, cy = 0;
    const move = (e) => {
      cx = e.clientX; cy = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        for (const card of grid.querySelectorAll(".spot")) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", (cx - r.left) + "px");
          card.style.setProperty("--my", (cy - r.top) + "px");
        }
      });
    };
    grid.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(raf); grid.removeEventListener("pointermove", move); };
  }, []);
  return <div ref={ref} className={className} style={style}>{children}</div>;
};

// ── Scroll progress bar ──────────────────────────────────────────────────
const ScrollProgress = () => {
  const ref = React.useRef(null);
  useScrollSub(() => {
    const bar = ref.current;
    if (!bar) return;
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
  });
  return (
    <div ref={ref} aria-hidden="true" style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 300,
      transform: "scaleX(0)", transformOrigin: "0 50%",
      background: "var(--accent)", pointerEvents: "none",
    }}/>
  );
};

// ── Masked word reveal (i18n-safe, a11y-safe) ────────────────────────────
// The word separator lives OUTSIDE the sleeve: a trailing space at the end
// of an inline-block is trimmed by white-space processing, which would run
// every word together.
// `labelled={false}` when an ancestor with a real role (a heading) already
// carries the accessible name — aria-label on a bare span is not exposed.
const SplitWords = ({ text, as = "span", step = 1, from = 0, className = "", labelled = true }) => {
  const El = as;
  const words = String(text).split(" ");
  return (
    <El aria-label={labelled ? text : undefined} className={className}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span aria-hidden="true" className="mask-sleeve">
            <span style={{ "--i": from + i * step }}>{w}</span>
          </span>
          {i < words.length - 1 ? <span aria-hidden="true"> </span> : null}
        </React.Fragment>
      ))}
    </El>
  );
};

// ── Per-letter spans: the hover wave on the hero name and footer ─────────
const SplitLetters = ({ text, className = "", letterClass = "ltr" }) => (
  <React.Fragment>
    {String(text).split("").map((ch, i) => (
      <span key={i} aria-hidden="true" className={`${letterClass} ${className}`} style={{ "--li": i }}>
        {ch === " " ? " " : ch}
      </span>
    ))}
  </React.Fragment>
);

// ── Decoding text: mono labels resolve from noise when they enter view ───
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}#*+=$";

const Scramble = ({ text, className = "", style, speed = 34 }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const final = String(text);
    if (reducedMotion() || !("IntersectionObserver" in window)) { el.textContent = final; return; }
    el.textContent = final;
    let raf = 0, t0 = 0;
    const run = () => {
      t0 = performance.now();
      const dur = final.length * speed + 220;
      const tick = (now) => {
        const p = clamp((now - t0) / dur, 0, 1);
        // Characters lock in left-to-right; the tail keeps churning.
        const locked = Math.floor(p * final.length * 1.18);
        let out = "";
        for (let i = 0; i < final.length; i++) {
          const ch = final[i];
          if (i < locked || ch === " " || ch === "·") out += ch;
          else out += GLYPHS[(Math.floor(now / 42) + i * 7) % GLYPHS.length];
        }
        el.textContent = out;
        if (p < 1) raf = requestAnimationFrame(tick);
        else el.textContent = final;
      };
      raf = requestAnimationFrame(tick);
    };
    el._onInView = run;
    const io = getInViewIO();
    el.dataset.inviewClass = "scrambled";
    io.observe(el);
    return () => { io.unobserve(el); cancelAnimationFrame(raf); el._onInView = null; };
  }, [text, speed]);
  return <span ref={ref} className={className} style={style}>{text}</span>;
};

// ── Animated counter (IO-armed, rAF, easeOutExpo, textContent writes) ────
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

const Counter = ({ to, duration = 1500, suffix = "", className = "" }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (v) => Math.round(v) + suffix;
    if (reducedMotion() || !("IntersectionObserver" in window)) { el.textContent = fmt(to); return; }
    let raf = 0;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / duration);
        el.textContent = fmt(to * easeOutExpo(p));
        if (p < 1) raf = requestAnimationFrame(tick);
        else el.textContent = fmt(to);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration, suffix]);
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      0{suffix}
    </span>
  );
};

// ── Infinite marquee (content duplicated exactly twice) ──────────────────
const Marquee = ({ children, seconds = 42, gap = 44, reverse = false }) => (
  <div className="marquee">
    <div className={`marquee-track ${reverse ? "rev" : ""}`}
         style={{ "--marquee-s": seconds + "s", "--marquee-gap": gap + "px" }}>
      <div className="marquee-group">{children}</div>
      <div className="marquee-group" aria-hidden="true">{children}</div>
    </div>
  </div>
);

// ── Custom cursor: dot + lerped ring that grows and can carry a label ────
const Cursor = () => {
  const dotRef = React.useRef(null), ringRef = React.useRef(null), labelRef = React.useRef(null);
  React.useEffect(() => {
    if (!finePointer() || reducedMotion()) return;
    const dot = dotRef.current, ring = ringRef.current, label = labelRef.current;
    if (!dot || !ring) return;
    const html = document.documentElement;
    let x = -100, y = -100, rx = -100, ry = -100;
    let scale = 1, cur = 1, raf = 0, labelled = "", armed = false;
    const loop = () => {
      raf = 0;
      rx += (x - rx) * 0.17; ry += (y - ry) * 0.17;
      cur += (scale - cur) * 0.18;
      ring.style.transform =
        `translate3d(${rx.toFixed(1)}px,${ry.toFixed(1)}px,0) translate(-50%,-50%) scale(${cur.toFixed(3)})`;
      if (Math.abs(x - rx) > 0.15 || Math.abs(y - ry) > 0.15 || Math.abs(scale - cur) > 0.005) wake();
    };
    const wake = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      // Hide the system pointer only once ours is on screen, so a visitor who
      // only scrolls (wheel or keyboard) is never left with no cursor at all.
      if (!armed) { armed = true; html.classList.add("has-cursor"); }
      dot.style.opacity = "1"; ring.style.opacity = "1";
      dot.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      wake();
    };
    const over = (e) => {
      const withLabel = e.target.closest("[data-cursor-label]");
      const hit = withLabel || e.target.closest("a, button, [role='button'], [data-cursor]");
      const text = withLabel ? withLabel.dataset.cursorLabel : "";
      if (text !== labelled) {
        labelled = text;
        if (label) label.textContent = text;
        ring.classList.toggle("labelled", !!text);
      }
      scale = text ? 2.55 : (hit ? 1.85 : 1);
      wake();
    };
    const down = () => { scale *= 0.82; wake(); };
    const up = (e) => over(e);
    const out = (e) => {
      if (!e.relatedTarget) {
        dot.style.opacity = ring.style.opacity = "0";
        armed = false; html.classList.remove("has-cursor");
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerdown", down, { passive: true });
    document.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("mouseout", out, { passive: true });
    return () => {
      html.classList.remove("has-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("mouseout", out);
    };
  }, []);
  return (
    <React.Fragment>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" style={{ opacity: 0 }}/>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" style={{ opacity: 0 }}>
        <span ref={labelRef} className="cursor-label"/>
      </div>
    </React.Fragment>
  );
};

// ── Timeline: self-drawing line + igniting dots ──────────────────────────
const TimelineProgress = ({ children, style }) => {
  const wrapRef = React.useRef(null), lineRef = React.useRef(null);
  React.useEffect(() => {
    const wrap = wrapRef.current, line = lineRef.current;
    if (!wrap || !line) return;
    if (reducedMotion()) { line.style.transform = "scaleY(1)"; return; }
    startBus();
    let active = false, raf = 0;
    const update = () => {
      raf = 0;
      const r = wrap.getBoundingClientRect();
      const focal = innerHeight * 0.42;
      const p = clamp((focal - r.top) / r.height, 0, 1);
      line.style.transform = `scaleY(${p.toFixed(4)})`;
    };
    const onScroll = () => { if (active && !raf) raf = requestAnimationFrame(update); };
    const io = new IntersectionObserver(([en]) => {
      active = en.isIntersecting;
      if (active) onScroll();
    }, { rootMargin: "20% 0px" });
    io.observe(wrap);
    bus.scrollSubs.add(onScroll);
    update();
    return () => {
      io.disconnect();
      bus.scrollSubs.delete(onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={wrapRef} className="tl-wrap" style={{ position: "relative", paddingLeft: 36, ...style }}>
      <div aria-hidden="true" className="tl-track"/>
      <div ref={lineRef} aria-hidden="true" className="tl-line"/>
      {children}
    </div>
  );
};

const TimelineDot = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion() || !("IntersectionObserver" in window)) { el.classList.add("lit"); return; }
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { el.classList.add("lit"); io.disconnect(); }
    }, { rootMargin: "-30% 0px -50% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <span ref={ref} className="tl-dot" aria-hidden="true"/>;
};

// ── Art that comes alive when it scrolls into view ───────────────────────
const useArtLive = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([en]) => {
      el.classList.toggle("art-live", en.isIntersecting);
    }, { rootMargin: "10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
};

// ── View transitions (theme ripple + language crossfade) ─────────────────
const withViewTransition = (mutate) => {
  if (!document.startViewTransition || reducedMotion()) { mutate(); return; }
  document.startViewTransition(() => { ReactDOM.flushSync(mutate); });
};

const themeRipple = (e, mutate) => {
  if (!document.startViewTransition || reducedMotion()) { mutate(); return; }
  const x = e && e.clientX ? e.clientX : innerWidth - 40;
  const y = e && e.clientY ? e.clientY : 30;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  document.documentElement.classList.add("vt-ripple");
  const vt = document.startViewTransition(() => { ReactDOM.flushSync(mutate); });
  // Both promises reject if the transition is skipped (e.g. a second toggle
  // lands mid-animation); swallow it so it never surfaces as an unhandled one.
  vt.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 560, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
    );
  }).catch(() => {});
  vt.finished.catch(() => {}).finally(() => document.documentElement.classList.remove("vt-ripple"));
};

// ── Live local time (Europe/Madrid) ──────────────────────────────────────
const LocalTime = ({ className = "", style }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = new Intl.DateTimeFormat("es-ES", {
      timeZone: "Europe/Madrid", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    });
    const tick = () => { el.textContent = fmt.format(new Date()); };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}/>;
};

window.FX = {
  reducedMotion, finePointer, clamp, startBus, useScrollSub,
  useMagnetic, Magnetic, useTilt, useParallax, SpotlightGrid, useArtLive,
  Reveal, ScrollProgress, SplitWords, SplitLetters, Scramble, Counter, Marquee,
  Cursor, TimelineProgress, TimelineDot,
  withViewTransition, themeRipple, LocalTime,
};
