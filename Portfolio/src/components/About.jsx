import React, { useEffect, useRef, useState } from "react";
import AnimatedList from "./AnimatedList";

/* ---------- typing helpers ---------- */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// true once the element has entered the viewport
const useInView = (threshold = 0.3) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
};

// returns how many characters are typed so far (looping continuously)
const useTyping = (total, { speed = 40, delay = 0, active = true } = {}) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setCount(total);
      return;
    }
    let interval;
    let n = 0;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        n += 1;
        if (n > total + 15) {
          // Pause slightly at the end before restarting the loop
          n = 0;
        }
        setCount(Math.min(n, total));
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [active, total, speed, delay]);
  return count;
};

/* ---------- code editor content (text + colour per piece) ---------- */
const STR = "text-[#e8b4a0]";
const KEY = "text-[#d998b6] font-bold";
const codeLines = [
  [
    { t: "const", c: KEY },
    { t: " " },
    { t: "afra", c: "text-[#f0b6d1]" },
    { t: " = {" },
  ],
  [{ t: "  role: " }, { t: '"Front-End Dev"', c: STR }, { t: "," }],
  [
    { t: "  stack: [" },
    { t: '"React"', c: STR },
    { t: ", " },
    { t: '"JS"', c: STR },
    { t: ", " },
    { t: '"Tailwind CSS"', c: STR },
    { t: "]," },
  ],
  [{ t: "  passion: " }, { t: '"clean UI"', c: STR }, { t: "," }],
  [{ t: "  openToWork: " }, { t: "true", c: "text-[#d998b6]" }],
  [{ t: "};" }],
];
const totalCodeChars = codeLines.reduce(
  (sum, segs) => sum + segs.reduce((a, s) => a + s.t.length, 0),
  0
);

const HEADING = "ABOUT ME";

// One numbered line of the code editor
const Line = ({ n, children }) => (
  <div className="flex">
    <span className="w-10 shrink-0 pr-4 text-right text-[#5c4452] select-none">{n}</span>
    <span className="whitespace-pre-wrap">{children}</span>
  </div>
);

const Cursor = () => (
  <span className="inline-block w-1.5 h-4 bg-[#d998b6] ml-1 align-middle motion-safe:animate-pulse"></span>
);

// Renders the code lines, typed up to `count` characters
const TypedCode = ({ count }) => {
  let remaining = count;
  let cursorPlaced = false;

  return codeLines.map((segs, li) => {
    const lineLen = segs.reduce((a, s) => a + s.t.length, 0);
    const isLast = li === codeLines.length - 1;
    const showCursor = !cursorPlaced && (remaining <= lineLen || isLast);
    if (showCursor) cursorPlaced = true;

    let left = Math.min(remaining, lineLen);
    remaining = Math.max(0, remaining - lineLen);

    return (
      <Line key={li} n={li + 1}>
        {segs.map((s, si) => {
          const part = s.t.slice(0, left);
          left -= part.length;
          if (!part) return null;
          return (
            <span key={si} className={s.c}>
              {part}
            </span>
          );
        })}
        {showCursor && <Cursor />}
      </Line>
    );
  });
};

// Items for the animated list
const details = [
  { title: "ROLE", description: "Front-end Developer", meta: "now" },
  { title: "WHAT I BUILD", description: "Responsive websites and interactive interfaces" },
  { title: "HOW I WORK", description: "Clean code, mobile-first layouts, purposeful animation" },
  { title: "LOOKING FOR", description: "A paid, remote front-end internship" },
  { title: "OPEN TO", description: "Teams in Pakistan or anywhere in the world" },
];

const statCard =
  "bg-[#201018] border border-[#8B325C]/30 rounded-xl p-5 flex flex-col justify-between h-full transition-all duration-300 hover:border-[#8B325C]/70 hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-[#321625] hover:to-[#201018] hover:-translate-y-1 active:border-[#8B325C]/70 active:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] active:from-[#321625] active:to-[#201018] active:-translate-y-1 shadow-md";

const About = () => {
  // Heading typing (loops continuously)
  const [headRef, headInView] = useInView(0.5);
  const headCount = useTyping(HEADING.length, { speed: 90, active: headInView });

  // Code editor typing - slowed down from 25 to 70
  const [codeRef, codeInView] = useInView(0.3);
  const codeCount = useTyping(totalCodeChars, { speed: 70, delay: 900, active: codeInView });

  return (
    <div id="about" className="w-full min-h-screen bg-gradient-to-b from-[#1e0c12] via-[#1c0f17] to-[#32141d] border-y border-[#8B325C]/30 py-24 px-6 sm:px-8 lg:px-18 flex items-center justify-start font-sans -mt-4 relative  text-left border rounded-xl overflow-hidden ">

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8B325C]/12 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="w-full max-w-5xl text-white space-y-10 relative z-10 text-left">

        {/* ================= HEADER SECTION ================= */}
        <div className="pb-6">
          <div ref={headRef} className="flex items-center gap-4 mb-4 justify-start">
            <span className="w-10 h-[4px] bg-[#8B325C]"></span>
            <span
              aria-label={HEADING}
              className="text-3xl sm:text-4xl lg:text-3xl font-mono tracking-[0.15em] text-[#d998b6] font-black uppercase drop-shadow-[0_6px_0px_#421229] select-none min-h-[1.5em]"
            >
              <span aria-hidden="true">{HEADING.slice(0, headCount)}</span>
              {headCount < HEADING.length && (
                <span
                  aria-hidden="true"
                  className="inline-block w-[3px] h-[0.9em] bg-[#d998b6] ml-1 align-middle motion-safe:animate-pulse"
                ></span>
              )}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-xl text-[#eadde4] mb-3 tracking-wide leading-snug">
            Crafting interfaces with <span className="text-[#8B325C] font-semibold">obsessive detail</span>
          </h2>

          <p className="text-sm sm:text-base text-[#a89aa2] font-normal max-w-2xl leading-relaxed">
            Front-end developer building responsive, modern and interactive web experiences.
          </p>
        </div>

        {/* ================= INTRO SECTION ================= */}
        <div className="pb-8">
          <h3 className="text-lg sm:text-xl font-bold text-[#eadde4] mb-9 tracking-wide">Intro</h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Code Editor Window */}
            <div
              ref={codeRef}
              className="col-span-1 lg:col-span-6 rounded-xl overflow-hidden border border-[#8B325C]/40 bg-[#160a10] font-mono text-xs sm:text-sm text-[#cbbcc4] shadow-[0_20px_50px_-20px_rgba(139,50,92,0.6)]"
            >
              <div className="flex items-center gap-4 bg-[#2a1220] border-b border-[#8B325C]/30 px-4 pt-2.5">
                <div className="flex gap-1.5 pb-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#28c840]"></span>
                </div>
                <div className="px-4 py-2 bg-[#160a10] text-[#eadde4] text-xs rounded-t-md border-t-2 border-[#8B325C]">
                  afra.js
                </div>
              </div>

              <div className="py-5 pr-5 leading-7">
                <TypedCode count={codeCount} />
              </div>

              <div className="flex items-center justify-between bg-[#8B325C] text-[#f5e9ef] text-[11px] px-4 py-1.5">
                <span>main</span>
                <span>JavaScript</span>
              </div>
            </div>

            {/* Intro Text */}
            <div className="col-span-1 lg:col-span-6 space-y-4 text-base sm:text-lg text-[#eadde4] leading-relaxed font-normal">
              <p>
                I'm <strong className="text-[#8B325C] font-semibold">Afra Arshad</strong>, a front-end developer who turns creative ideas into clean, engaging interfaces.
              </p>
              <p className="text-sm sm:text-base text-[#a89aa2]">
                I work with <strong className="text-[#8B325C] font-semibold">React</strong>, JavaScript and Tailwind CSS, and care about the small details that make a site feel polished.
              </p>
            </div>
          </div>
        </div>

        {/* ================= JOURNEY & STATS ================= */}
        <div className="pb-8">
          <h3 className="text-lg sm:text-xl font-bold text-[#eadde4] mb-9 tracking-wide">Journey</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
            <div className={statCard}>
              <div className="flex-1 flex items-center justify-start min-h-[48px]">
                <strong className="text-2xl sm:text-3xl font-bold text-[#eadde4]">5+</strong>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#a89aa2] mt-2 block">Projects Built</span>
            </div>

            <div className={statCard}>
              <div className="flex-1 flex items-center justify-start min-h-[48px]">
                <strong className="text-2xl sm:text-3xl font-bold text-[#eadde4]">6 months</strong>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#a89aa2] mt-2 block">Experience</span>
            </div>

            <div className={statCard}>
              <div className="flex-1 flex items-center justify-start min-h-[48px]">
                <strong className="text-xs sm:text-sm font-bold text-[#eadde4] leading-snug">
                  Open to Jobs / Internship / Freelance
                </strong>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#a89aa2] mt-2 block">Status</span>
            </div>
          </div>
        </div>

        {/* ================= DETAILS (animated list) ================= */}
        <div className="pt-1">
          <AnimatedList
            items={details}
            onItemSelect={(item, index) => console.log(item, index)}
            animation="pop"
            width="100%"
            maxHeight={440}
            radius={14}
            gap={8}
            stagger={0.05}
            fadeSize={56}
            frame
            showGradients
            displayScrollbar
            selectOnHover
            enableArrowNavigation
            loop={false}
            animateOnce={false}
            initialSelectedIndex={-1}
          />
        </div>

      </div>
    </div>
  );
};

export default About;