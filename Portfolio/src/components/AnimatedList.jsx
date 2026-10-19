import React, { useEffect, useRef, useState, useCallback } from "react";

const PALETTE = {
  frameBg: "#160a10",
  card: "#201018",
  border: "rgba(139,50,92,0.30)",
  borderSelected: "rgba(139,50,92,0.85)",
  accent: "#8B325C",
  accentSoft: "#d998b6",
  title: "#eadde4",
  muted: "#a89aa2",
  glow: "rgba(139,50,92,0.55)",
};

const AnimatedList = ({
  items = [],
  onItemSelect,
  animation = "pop", // "pop" | "slide" | "fade"
  width = "100%",
  maxHeight = 440,
  radius = 14,
  gap = 8,
  stagger = 0.4, // seconds between each row appearing
  fadeSize = 56,
  frame = true,
  showGradients = true,
  displayScrollbar = true,
  selectOnHover = true,
  enableArrowNavigation = true,
  loop = false,
  animateOnce = false,
  initialSelectedIndex = -1,
  float: floatOn = true, // continuous up/down motion
  floatDistance = 4, // px
  floatDuration = 3.4, // seconds per cycle
}) => {
  const wrapRef = useRef(null);
  const scrollRef = useRef(null);
  const itemRefs = useRef([]);
  const playedRef = useRef(false);
  const [selected, setSelected] = useState(initialSelectedIndex);
  const [inView, setInView] = useState(false);
  const [count, setCount] = useState(0); // how many rows are revealed so far
  const [edges, setEdges] = useState({ top: false, bottom: false });

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1) Know when the list is really on screen (scroll + resize + observer)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visible = r.top < vh * 0.85 && r.bottom > vh * 0.1;
      if (visible) {
        setInView(true);
      } else if (!animateOnce || !playedRef.current) {
        if (!animateOnce) setInView(false);
      }
    };

    check();
    const raf = requestAnimationFrame(check);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(check, { threshold: [0, 0.15, 0.5] });
      io.observe(el);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      io && io.disconnect();
    };
  }, [animateOnce]);

  // 2) Reveal rows one by one once the list is in view
  useEffect(() => {
    if (reduceMotion) {
      setCount(items.length);
      return;
    }
    if (!inView) {
      if (!animateOnce) setCount(0);
      return;
    }
    playedRef.current = true;
    const timers = items.map((_, i) =>
      setTimeout(() => setCount((c) => Math.max(c, i + 1)), i * stagger * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, items.length, stagger, animateOnce, reduceMotion]);

  const updateEdges = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setEdges({
      top: el.scrollTop > 16,
      bottom: el.scrollTop + el.clientHeight < el.scrollHeight - 16,
    });
  }, []);

  useEffect(() => {
    updateEdges();
  }, [items.length, maxHeight, updateEdges]);

  const select = (i, { scroll = false } = {}) => {
    setSelected(i);
    onItemSelect && onItemSelect(items[i], i);
    if (scroll) itemRefs.current[i]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  const onKeyDown = (e) => {
    if (!enableArrowNavigation || !items.length) return;
    const last = items.length - 1;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const dir = e.key === "ArrowDown" ? 1 : -1;
      let next = selected + dir;
      if (selected < 0) next = dir === 1 ? 0 : last;
      if (next > last) next = loop ? 0 : last;
      if (next < 0) next = loop ? last : 0;
      select(next, { scroll: true });
    }
  };

  const inset = frame ? 10 : 0;
  const floating = floatOn && !reduceMotion;
  const entrance = animation === "slide" ? "alInSlide" : animation === "fade" ? "alInFade" : "alInPop";

  return (
    <div
      ref={wrapRef}
      style={{
        width,
        maxWidth: "100%",
        position: "relative",
        borderRadius: radius + 6,
        padding: frame ? 10 : 0,
        background: frame ? PALETTE.frameBg : "transparent",
        border: frame ? `1px solid ${PALETTE.border}` : "none",
        boxShadow: frame ? "0 20px 50px -20px rgba(139,50,92,0.6)" : "none",
      }}
    >
      <style>{`
        @keyframes alFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-${floatDistance}px); }
        }
        @keyframes alInPop {
          from { opacity: 0; transform: scale(0.85) translateY(-14px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes alInSlide {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes alInFade {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>

      <div
        ref={scrollRef}
        role="listbox"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onScroll={updateEdges}
        style={{
          maxHeight,
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          gap,
          outline: "none",
          scrollbarWidth: displayScrollbar ? "thin" : "none",
          scrollbarColor: `${PALETTE.accent} transparent`,
          padding: `${floatDistance + 6}px 8px ${floatDistance + 6}px 2px`,
        }}
      >
        {items.map((item, i) => {
          const isSel = selected === i;
          const shown = i < count; // this row's turn has come
          return (
            // OUTER: one-by-one entrance + hover shift
            <div
              key={i}
              ref={(el) => (itemRefs.current[i] = el)}
              data-index={i}
              role="option"
              aria-selected={isSel}
              onMouseEnter={() => selectOnHover && select(i)}
              onClick={() => select(i)}
              style={{
                cursor: "pointer",
                opacity: shown ? 1 : 0,
                pointerEvents: shown ? "auto" : "none",
                transform: isSel ? "translateX(4px)" : "none",
                transition: reduceMotion ? "none" : "transform .35s cubic-bezier(.34,1.56,.64,1)",
                animation:
                  shown && !reduceMotion
                    ? `${entrance} .6s cubic-bezier(.34,1.56,.64,1)`
                    : "none",
              }}
            >
              {/* INNER: the card + continuous floating */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "14px 16px",
                  borderRadius: radius,
                  border: `1px solid ${isSel ? PALETTE.borderSelected : PALETTE.border}`,
                  background: isSel
                    ? `radial-gradient(ellipse at left, #391828 0%, ${PALETTE.card} 70%)`
                    : PALETTE.card,
                  boxShadow: isSel ? `0 0 22px -6px ${PALETTE.glow}` : "none",
                  transition: "border-color .25s, background .25s, box-shadow .25s",
                  animation: floating
                    ? `alFloat ${floatDuration}s ease-in-out ${i * 0.3}s infinite`
                    : "none",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      color: isSel ? PALETTE.accentSoft : PALETTE.accent,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {item.title}
                  </div>
                  {item.description && (
                    <div style={{ color: PALETTE.title, fontSize: 14, fontWeight: 500, marginTop: 4 }}>
                      {item.description}
                    </div>
                  )}
                </div>
                {item.meta && (
                  <span style={{ color: PALETTE.muted, fontSize: 12, flexShrink: 0 }}>{item.meta}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showGradients && (edges.top || edges.bottom) && (
        <>
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: inset,
              right: inset,
              top: inset,
              height: fadeSize,
              pointerEvents: "none",
              background: `linear-gradient(to bottom, ${PALETTE.frameBg}, transparent)`,
              opacity: edges.top ? 1 : 0,
              transition: "opacity .25s",
              borderTopLeftRadius: radius,
              borderTopRightRadius: radius,
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: inset,
              right: inset,
              bottom: inset,
              height: fadeSize,
              pointerEvents: "none",
              background: `linear-gradient(to top, ${PALETTE.frameBg}, transparent)`,
              opacity: edges.bottom ? 1 : 0,
              transition: "opacity .25s",
              borderBottomLeftRadius: radius,
              borderBottomRightRadius: radius,
            }}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedList;