import React, { useEffect, useRef, useState } from "react";

/* =========================================================
   CONTENT
   Update your personal information here.
========================================================= */

const PROFILE = {
  name: "Afra Arshad",
  role: "Front-End Developer",
  stack: ["React", "JavaScript", "Tailwind CSS"],
  passion: "clean UI",
};

const HEADING = "About me";

const STATS = [
  { value: "5+", label: "Projects built" },
  { value: "6 months", label: "Experience" },
  {
    value: "Open to opportunities",
    label: "Current status",
    small: true,
  },
];

const DETAILS = [
  {
    label: "Role",
    text: "Front-end developer",
  },
  {
    label: "What I build",
    text: "Responsive websites and interactive interfaces",
  },
  {
    label: "How I work",
    text: "Clean code, mobile-first layouts and purposeful animations",
  },
  {
    label: "Looking for",
    text: "A paid, remote front-end internship",
  },
  {
    label: "Open to",
    text: "Teams in Pakistan or anywhere in the world",
  },
];

/* =========================================================
   CODE EDITOR CONTENT
========================================================= */

const STR = "text-[#e8b4a0]";
const KEY = "font-bold text-[#d998b6]";

const CODE_LINES = [
  [
    { t: "const", c: KEY },
    { t: " " },
    { t: "afra", c: "font-semibold text-[#f0b6d1]" },
    { t: " = {" },
  ],
  [
    { t: "  name: " },
    { t: `"${PROFILE.name}"`, c: STR },
    { t: "," },
  ],
  [
    { t: "  role: " },
    { t: `"${PROFILE.role}"`, c: STR },
    { t: "," },
  ],
  [
    { t: "  stack: [" },
    ...PROFILE.stack.flatMap((item, index) => [
      ...(index > 0 ? [{ t: ", " }] : []),
      { t: `"${item}"`, c: STR },
    ]),
    { t: "]," },
  ],
  [
    { t: "  passion: " },
    { t: `"${PROFILE.passion}"`, c: STR },
    { t: "," },
  ],
  [
    { t: "  openToWork: " },
    { t: "true", c: "font-semibold text-[#d998b6]" },
  ],
  [{ t: "};" }],
  [{ t: "" }],
  [
    { t: "export", c: KEY },
    { t: " default afra;" },
  ],
];

const getLineLength = (segments) =>
  segments.reduce((total, segment) => total + segment.t.length, 0);

const LINE_ENDS = CODE_LINES.reduce((ends, segments) => {
  const previous = ends.length ? ends[ends.length - 1] : 0;
  return [...ends, previous + getLineLength(segments)];
}, []);

const TOTAL_CODE_CHARS = LINE_ENDS[LINE_ENDS.length - 1];

const CODE_PLAIN_TEXT = CODE_LINES.map((segments) =>
  segments.map((segment) => segment.t).join("")
).join("\n");

/* =========================================================
   ANIMATION HOOKS
========================================================= */

// Detect the user's reduced-motion preference.
const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updatePreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener?.("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener?.("change", updatePreference);
    };
  }, []);

  return reducedMotion;
};

// Standard view-once observer for code block.
const useInView = (threshold = 0.3) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
};

// Repeating observer: updates triggerKey every time the element enters the viewport.
const useRepeatingInView = (threshold = 0.5) => {
  const ref = useRef(null);
  const [triggerKey, setTriggerKey] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setTriggerKey(1);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggerKey((prev) => prev + 1);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, triggerKey];
};

// Type characters one by one (replays when triggerKey changes).
const useRepeatingTyping = (
  total,
  {
    speed = 40,
    delay = 0,
    triggerKey = 0,
    reducedMotion = false,
  } = {}
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (triggerKey === 0) return;

    if (reducedMotion) {
      setCount(total);
      return;
    }

    setCount(0); // Reset typing on re-entry
    let current = 0;
    let interval;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        current += 1;
        setCount(current);

        if (current >= total) {
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [triggerKey, total, speed, delay, reducedMotion]);

  return count;
};

// Standard typing for code block.
const useTyping = (
  total,
  {
    speed = 40,
    delay = 0,
    active = true,
    reducedMotion = false,
  } = {}
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (reducedMotion) {
      setCount(total);
      return;
    }

    let current = 0;
    let interval;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        current += 1;
        setCount(current);

        if (current >= total) {
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [active, total, speed, delay, reducedMotion]);

  return count;
};

/* =========================================================
   SHARED STYLES
========================================================= */

const CARD_CLASSES = [
  "rounded-xl",
  "border border-[#8B325C]/30",
  "bg-[#201018]",
  "p-5",
  "transition-all duration-300",
  "motion-reduce:transition-none",
  "hover:-translate-y-1",
  "hover:border-[#d998b6]/70",
  "hover:bg-[#321625]",
  "hover:shadow-[0_12px_30px_rgba(139,50,92,0.16)]",
  "motion-reduce:hover:translate-y-0",
].join(" ");

const HEADING_SHADOW = [
  "1px 1px 0 #b65b82",
  "2px 2px 0 #a44870",
  "3px 3px 0 #91365f",
  "4px 4px 0 #762747",
  "5px 5px 0 #5e1c38",
  "6px 6px 0 #421329",
  "8px 10px 15px rgba(0,0,0,0.6)",
  "0 0 20px rgba(217,152,182,0.35)",
].join(", ");

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

// Section headings with decorative gradient lines.
const SubHeading = ({ id, children }) => (
  <div className="mb-10 flex items-center gap-4 sm:mb-14 sm:gap-6">
    <span
      aria-hidden="true"
      className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-[#8B325C]"
    />

    <h3
      id={id}
      className="text-center font-mono text-xl font-black uppercase tracking-[0.12em] text-[#f2c4d8] sm:text-3xl"
      style={{
        textShadow:
          "1px 1px 0 #91365f, 2px 2px 0 #5e1c38, 0 0 22px rgba(217,152,182,0.4)",
      }}
    >
      {children}
    </h3>

    <span
      aria-hidden="true"
      className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-[#8B325C]"
    />
  </div>
);

// Typing cursor.
const Cursor = ({ className = "ml-1 h-4 w-1.5" }) => (
  <span
    aria-hidden="true"
    className={`inline-block animate-pulse bg-[#d998b6] align-middle motion-reduce:animate-none ${className}`}
  />
);

// Individual code line.
const CodeLine = ({
  number,
  children,
  highlight = false,
}) => (
  <div
    className={`
      flex min-h-[1.75rem] rounded-md
      transition-all duration-500
      motion-reduce:transition-none
      ${
        highlight
          ? "animate-pulse bg-[#8B325C]/15 shadow-[0_0_15px_rgba(217,152,182,0.12)] motion-reduce:animate-none"
          : ""
      }
    `}
  >
    <span
      aria-hidden="true"
      className="w-10 shrink-0 select-none pr-4 text-right text-[#7a6270]"
    >
      {number}
    </span>

    <span className="whitespace-pre-wrap break-words">
      {children}
    </span>
  </div>
);

// Character-by-character code renderer.
const TypedCode = ({ count }) => {
  const done = count >= TOTAL_CODE_CHARS;

  const cursorLine = LINE_ENDS.findIndex(
    (end) => count <= end
  );

  return CODE_LINES.map((segments, lineIndex) => {
    const lineStart =
      lineIndex === 0 ? 0 : LINE_ENDS[lineIndex - 1];

    let remaining = Math.max(0, count - lineStart);

    // Highlight only while the first line is being typed.
    const firstLineLength = LINE_ENDS[0];

    const highlightFirstLine =
      lineIndex === 0 &&
      count > 0 &&
      count < firstLineLength;

    return (
      <CodeLine
        key={lineIndex}
        number={lineIndex + 1}
        highlight={highlightFirstLine}
      >
        {segments.map((segment, segmentIndex) => {
          const visible = segment.t.slice(0, remaining);
          remaining -= visible.length;

          if (!visible) return null;

          return (
            <span
              key={segmentIndex}
              className={segment.c}
            >
              {visible}
            </span>
          );
        })}

        {!done && lineIndex === cursorLine && <Cursor />}
      </CodeLine>
    );
  });
};

// Complete code editor window.
const CodeEditor = ({ innerRef, count }) => (
  <div
    ref={innerRef}
    role="region"
    aria-label="Animated JavaScript code example"
    className="
      col-span-1 overflow-hidden rounded-xl
      border border-[#8B325C]/40
      bg-[#160a10]
      font-mono text-xs text-[#cbbcc4]
      shadow-[0_20px_50px_-20px_rgba(139,50,92,0.6)]
      transition-shadow duration-500
      hover:shadow-[0_20px_60px_-15px_rgba(139,50,92,0.75)]
      motion-reduce:transition-none
      sm:text-sm lg:col-span-6
    "
  >
    {/* Editor title bar */}
    <div
      aria-hidden="true"
      className="flex items-center gap-4 border-b border-[#8B325C]/30 bg-[#2a1220] px-4 pt-2.5"
    >
      <div className="flex gap-1.5 pb-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>

      <div className="rounded-t-md border-t-2 border-[#8B325C] bg-[#160a10] px-4 py-2 text-xs text-[#eadde4]">
        afra.js
      </div>
    </div>

    {/* Full code for screen readers */}
    <pre className="sr-only">{CODE_PLAIN_TEXT}</pre>

    {/* Animated code */}
    <div
      aria-hidden="true"
      className="overflow-x-auto py-5 pr-3 leading-7 sm:pr-5"
    >
      <div className="min-w-[310px]">
        <TypedCode count={count} />
      </div>
    </div>

    {/* Editor status bar */}
    <div
      aria-hidden="true"
      className="flex items-center justify-between bg-[#8B325C] px-4 py-1.5 text-[11px] text-[#f5e9ef]"
    >
      <span>main</span>
      <span>JavaScript</span>
    </div>
  </div>
);

/* =========================================================
   ABOUT SECTION
========================================================= */

const About = () => {
  const reducedMotion = useReducedMotion();

  // Main heading repeating animation on every scroll view.
  const [headingRef, headingTriggerKey] = useRepeatingInView(0.5);

  const headingCount = useRepeatingTyping(HEADING.length, {
    speed: 90,
    triggerKey: headingTriggerKey,
    reducedMotion,
  });

  // Code editor animation (runs once when in view).
  const [codeRef, codeInView] = useInView(0.3);

  const codeCount = useTyping(TOTAL_CODE_CHARS, {
    speed: 70,
    delay: 900,
    active: codeInView,
    reducedMotion,
  });

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="
        relative min-h-screen w-full overflow-hidden
        bg-gradient-to-b
        from-[#1e0c12] via-[#1c0f17] to-[#32141d]
        px-4 py-16 font-sans
        sm:px-8 sm:py-20
        lg:px-12
      "
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/4 top-1/2
          h-[600px] w-[600px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full bg-[#8B325C]/[0.12]
          blur-[140px]
        "
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl text-white">

        {/* Main heading (Replays typing every time it scrolls into view) */}
        <div
          ref={headingRef}
          className="mb-8 flex items-center justify-center sm:mb-10"
        >
          <h2
            id="about-heading"
            className="
              inline-block min-h-[1.5em]
              select-none font-mono
              text-4xl font-black uppercase
              tracking-[0.15em]
              text-[#f2c4d8]
              sm:text-5xl lg:text-6xl
            "
            style={{ textShadow: HEADING_SHADOW }}
          >
            <span className="sr-only">{HEADING}</span>

            <span aria-hidden="true">
              {HEADING.slice(0, headingCount)}
            </span>

            {headingCount < HEADING.length && (
              <Cursor className="ml-2 h-[0.9em] w-[3px]" />
            )}
          </h2>
        </div>

        <div className="space-y-16 sm:space-y-20">

          {/* INTRODUCTION */}
          <div role="group" aria-labelledby="intro-heading">
            <SubHeading id="intro-heading">
              Introduction
            </SubHeading>

            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">

              <CodeEditor
                innerRef={codeRef}
                count={codeCount}
              />

              {/* Introduction text */}
              <div
                className="
                  col-span-1 space-y-4
                  text-base leading-relaxed
                  text-[#eadde4]
                  sm:text-lg lg:col-span-6
                "
              >
                <p>
                  I'm{" "}
                  <strong className="font-semibold text-[#d998b6]">
                    {PROFILE.name}
                  </strong>
                  , a front-end developer who turns creative ideas
                  into clean, engaging interfaces.
                </p>

                <p className="text-sm text-[#b3a5ad] sm:text-base">
                  I work with{" "}
                  <strong className="font-semibold text-[#d998b6]">
                    React
                  </strong>
                  , JavaScript and Tailwind CSS, and care about
                  the small details that make a website feel polished.
                </p>
              </div>
            </div>
          </div>

          {/* JOURNEY */}
          <div role="group" aria-labelledby="journey-heading">
            <SubHeading id="journey-heading">
              Journey
            </SubHeading>

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {STATS.map(({ value, label, small }) => (
                <div
                  key={label}
                  className={`
                    ${CARD_CLASSES}
                    flex min-h-[125px]
                    flex-col-reverse justify-between
                    shadow-md
                  `}
                >
                  <dt className="mt-2 text-xs font-semibold text-[#b3a5ad] sm:text-sm">
                    {label}
                  </dt>

                  <dd
                    className={`
                      font-bold text-[#eadde4]
                      ${
                        small
                          ? "text-base sm:text-lg"
                          : "text-2xl sm:text-3xl"
                      }
                    `}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* BEYOND THE CODE */}
          <div role="group" aria-labelledby="beyond-heading">
            <SubHeading id="beyond-heading">
              Beyond the code
            </SubHeading>

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DETAILS.map(({ label, text }) => (
                <div
                  key={label}
                  className={`${CARD_CLASSES} min-h-[130px]`}
                >
                  <dt className="mb-3 text-sm font-semibold tracking-wide text-[#d998b6]">
                    {label}
                  </dt>

                  <dd className="text-sm leading-relaxed text-[#eadde4] sm:text-base">
                    {text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;