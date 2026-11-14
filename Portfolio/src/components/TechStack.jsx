import { useEffect, useRef, useState } from "react";
import LogoLoop from "./LogoLoop";
import AnimatedList from "./AnimatedList";
import ProgressBar from "./Progress-bar";

import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiNetlify,
  SiVercel,
} from "react-icons/si";

/* ---------- Typing & Viewport helpers ---------- */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Re-triggerable observer: increments key/counter every time the element enters view
const useRepeatingInView = (threshold = 0.5) => {
  const ref = useRef(null);
  const [inViewKey, setInViewKey] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInViewKey((prev) => prev + 1);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inViewKey];
};

const useInView = (threshold = 0.5) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

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

const useTyping = (
  total,
  { speed = 40, delay = 0, triggerKey = 1 } = {}
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(total);
      return;
    }

    setCount(0); // Reset count on trigger change
    let interval;

    const start = setTimeout(() => {
      let current = 0;

      interval = setInterval(() => {
        current += 1;
        setCount(current);

        if (current >= total) {
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [triggerKey, total, speed, delay]);

  return count;
};

const HEADING = "Tech Skills";

/* ---------- 3D Heading Shadow ---------- */

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

/* ---------- Typing Cursor ---------- */

const Cursor = ({ className = "ml-2 h-[0.9em] w-[3px]" }) => (
  <span
    aria-hidden="true"
    className={`inline-block animate-pulse bg-[#d98cb3] align-middle motion-reduce:animate-none ${className}`}
  />
);

/* ---------- Technology logos ---------- */

const techLogos = [
  { node: <FaReact />, title: "React" },
  { node: <FaHtml5 />, title: "HTML" },
  { node: <FaCss3Alt />, title: "CSS" },
  { node: <FaJs />, title: "JavaScript" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <FaGitAlt />, title: "Git" },
  { node: <FaGithub />, title: "GitHub" },
  { node: <SiNetlify />, title: "Netlify" },
  { node: <SiVercel />, title: "Vercel" },
];

/* ---------- Skills ---------- */

const skills = [
  { name: "React", level: 80 },
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 75 },
  { name: "Tailwind CSS", level: 85 },
];

/* ---------- Tools ---------- */

const tools = [
  { name: "Git", desc: "Version control and branches" },
  { name: "GitHub", desc: "Hosting code and collaboration" },
  { name: "Netlify", desc: "Deploying static websites" },
  { name: "Vercel", desc: "Deploying and previewing projects" },
];

const toolItems = tools.map((tool) => ({
  title: tool.name,
  description: tool.desc,
}));

/* ---------- Additional strengths ---------- */

const extras = [
  "Responsive Design",
  "Mobile First",
  "Flexbox & Grid",
  "Clean Code",
  "Problem Solving",
  "Fast Learner",
];

export default function TechStack() {
  const [headRef, headInViewKey] = useRepeatingInView(0.5);
  const [skillsRef, skillsInView] = useInView(0.2);

  // Typing hook for the main heading that replays every time it comes into view
  const headCount = useTyping(HEADING.length, {
    speed: 90,
    triggerKey: headInViewKey,
  });

  const [activeSkill, setActiveSkill] = useState(-1);

  // Start the first bar when the Skills card becomes visible.
  useEffect(() => {
    if (skillsInView) {
      setActiveSkill((current) =>
        current === -1 ? 0 : current
      );
    }
  }, [skillsInView]);

  // Activate the next bar only after the current animation finishes.
  const handleSkillComplete = (index) => {
    setActiveSkill((current) => {
      if (current !== index) return current;

      if (index < skills.length - 1) {
        return index + 1;
      }

      return current;
    });
  };

  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="mx-auto -mt-3 max-w-full bg-gradient-to-r from-[#1e0e13] via-[#1c0c11] to-[#150c0f] px-6 py-16 text-[#f1e4ea]"
    >
      {/* 3D Animated Centered Heading (Replays typing on every scroll into view) */}
      <div
        ref={headRef}
        className="mb-12 flex items-center justify-center sm:mb-16"
      >
        <h2
          id="tech-stack-heading"
          aria-label={HEADING}
          className="inline-block min-h-[1.5em] select-none font-mono text-4xl font-black uppercase tracking-[0.15em] text-[#f2c4d8] sm:text-5xl lg:text-6xl"
          style={{
            textShadow: HEADING_SHADOW,
          }}
        >
          <span className="sr-only">{HEADING}</span>

          <span aria-hidden="true">
            {HEADING.slice(0, headCount)}
          </span>

          {headCount < HEADING.length && <Cursor />}
        </h2>
      </div>

      {/* Introduction */}
      <div className="mx-auto max-w-5xl text-center">
        <h3 className="mb-3 text-3xl md:text-4xl">
          Tools I build with{" "}
          <span className="text-[#a8416f]">every day</span>
        </h3>

        <p className="mb-10 text-[#a08a93]">
          Technologies I use to build responsive and modern websites.
        </p>
      </div>

      {/* Moving technology logos */}
      <div className="relative mx-auto max-w-5xl h-24 overflow-hidden text-[#d98cb3]">
        <LogoLoop
          logos={techLogos}
          speed={80}
          direction="left"
          logoHeight={48}
          gap={48}
          pauseOnHover
          scaleOnHover
          fadeOut={false}
        />
      </div>

      {/* Skills and tools */}
      <div className="mx-auto mt-14 max-w-5xl grid gap-10 md:grid-cols-2">
        {/* Sequential animated skills */}
        <div
          ref={skillsRef}
          className="rounded-2xl border border-[#8e2f5e]/25 bg-[#200e15]/40 p-5"
        >
          <h3
            className="mb-6 text-center font-mono text-2xl font-bold uppercase tracking-[0.12em] text-[#f2c4d8]"
            style={{ textShadow: "1px 1px 0 #91365f, 2px 2px 0 #5e1c38" }}
          >
            Skills
          </h3>

          <div className="space-y-7">
            {skills.map((skill, index) => (
              <ProgressBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                active={activeSkill === index}
                completed={index < activeSkill}
                onComplete={() => handleSkillComplete(index)}
              />
            ))}
          </div>
        </div>

        {/* Tools and deployment */}
        <div>
          <h3
            className="mb-6 text-center font-mono text-2xl font-bold uppercase tracking-[0.12em] text-[#f2c4d8]"
            style={{ textShadow: "1px 1px 0 #91365f, 2px 2px 0 #5e1c38" }}
          >
            Tools & Deployment
          </h3>

          <AnimatedList
            items={toolItems}
            animation="pop"
            width="100%"
            maxHeight={440}
            radius={14}
            gap={12}
            stagger={0.4}
            fadeSize={56}
            frame={false}
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

      {/* Additional strengths */}
      <div className="mx-auto mt-14 max-w-5xl text-center">
        <h3
          className="mb-6 text-center font-mono text-2xl font-bold uppercase tracking-[0.12em] text-[#f2c4d8]"
          style={{ textShadow: "1px 1px 0 #91365f, 2px 2px 0 #5e1c38" }}
        >
          Also Good At
        </h3>

        <div className="flex flex-wrap justify-center gap-3">
          {extras.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#8e2f5e] bg-[#8e2f5e]/20 px-4 py-2 font-mono text-sm text-[#d98cb3] transition-all duration-300 hover:-translate-y-1 hover:border-[#d98cb3] hover:bg-[#8e2f5e]/40 hover:text-[#f1e4ea]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}