
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

/* ---------- Typing helpers ---------- */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

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
  { speed = 40, delay = 0, active = true } = {}
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (prefersReducedMotion()) {
      setCount(total);
      return;
    }

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
  }, [active, total, speed, delay]);

  return count;
};

const HEADING = "Tech Skills";

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
  const [headRef, headInView] = useInView(0.5);
  const [skillsRef, skillsInView] = useInView(0.2);

  const headCount = useTyping(HEADING.length, {
    speed: 90,
    active: headInView,
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
      className="mx-auto -mt-3 max-w-full bg-gradient-to-r from-[#1e0e13] via-[#1c0c11] to-[#150c0f] px-6 py-16 text-[#f1e4ea]"
    >
      {/* Animated heading */}
      <div ref={headRef} className="mb-6 flex items-center gap-5">
        <span className="h-1 w-16 bg-[#8e2f5e]" />

        <h2
          aria-label={HEADING}
          className="min-h-[1.5em] font-mono text-2xl font-bold uppercase tracking-[0.25em] text-[#d98cb3] md:text-3xl"
          style={{
            textShadow: "0 8px 6px rgba(168, 65, 111, 0.35)",
          }}
        >
          <span aria-hidden="true">
            {HEADING.slice(0, headCount)}
          </span>

          {headCount < HEADING.length && (
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[0.9em] w-[3px] animate-pulse bg-[#d98cb3] align-middle"
            />
          )}
        </h2>
      </div>

      {/* Introduction */}
      <h3 className="mb-3 text-3xl md:text-4xl">
        Tools I build with{" "}
        <span className="text-[#a8416f]">every day</span>
      </h3>

      <p className="mb-10 text-[#a08a93]">
        Technologies I use to build responsive and modern websites.
      </p>

      {/* Moving technology logos */}
      <div className="relative h-24 overflow-hidden text-[#d98cb3]">
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
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {/* Sequential animated skills */}
        <div
          ref={skillsRef}
          className="rounded-2xl border border-[#8e2f5e]/25 bg-[#200e15]/40 p-5"
        >
          <h4 className="mb-5 text-xl font-semibold text-[#f1e4ea]">
            Skills
          </h4>

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
          <h4 className="mb-5 text-xl font-semibold text-[#f1e4ea]">
            Tools &amp; Deployment
          </h4>

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
      <div className="mt-14">
        <h4 className="mb-5 text-xl font-semibold text-[#f1e4ea]">
          Also Good At
        </h4>

        <div className="flex flex-wrap gap-3">
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
