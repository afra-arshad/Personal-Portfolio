import { useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

/* ---------- Helpers (same as TechStack) ---------- */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const useRepeatingInView = (threshold = 0.5) => {
  const ref = useRef(null);
  const [inViewKey, setInViewKey] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInViewKey((prev) => prev + 1);
      },
      { threshold }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inViewKey];
};

const useTyping = (total, { speed = 40, delay = 0, triggerKey = 1 } = {}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(total);
      return;
    }
    setCount(0);
    let interval;
    const start = setTimeout(() => {
      let current = 0;
      interval = setInterval(() => {
        current += 1;
        setCount(current);
        if (current >= total) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [triggerKey, total, speed, delay]);

  return count;
};

const HEADING = "Projects";

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

const Cursor = ({ className = "ml-2 h-[0.9em] w-[3px]" }) => (
  <span
    aria-hidden="true"
    className={`inline-block animate-pulse bg-[#d98cb3] align-middle motion-reduce:animate-none ${className}`}
  />
);

/* ---------- Projects data ----------
   Put your screenshots in:  public/projects/
   nexora.png, codersgym.png, realestate.png                          */

const projects = [
  {
    title: "Nexora Online Store",
    desc: "An online shopping website where visitors can browse products, view details and add items to their cart.",
    image: "/projects/nexora.png",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    link: "https://nexoraonlinestoree.netlify.app/",
  },
  {
    title: "Coders Gym",
    desc: "A gym website showing programs, trainers and membership plans with a bold, energetic layout.",
    image: "/projects/codersgym.png",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://codersgymproject.netlify.app/",
  },
  {
    title: "Real Estate",
    desc: "A property listing website where users can explore homes, compare details and contact agents.",
    image: "/projects/realestate.png",
    tags: ["React", "Tailwind CSS", "Responsive"],
    link: "https://realstateeproject.netlify.app/",
  },
];

/* ---------- One carousel card ---------- */

function CoverCard({ project, offset, onSelect }) {
  const [imgFailed, setImgFailed] = useState(false);
  const isActive = offset === 0;

  const style = {
    transform: `translateX(${-50 + offset * 62}%) translateZ(${
      -Math.abs(offset) * 220
    }px) rotateY(${-offset * 42}deg)`,
    zIndex: 10 - Math.abs(offset),
    opacity: isActive ? 1 : 0.55,
    filter: isActive ? "none" : "brightness(0.65)",
  };

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isActive ? `Open ${project.title}` : `Show ${project.title}`}
      tabIndex={isActive ? 0 : -1}
      onClick={(e) => {
        if (!isActive) {
          e.preventDefault();
          onSelect();
        }
      }}
      style={style}
      className="absolute left-1/2 top-0 block w-[78%] overflow-hidden rounded-2xl border border-[#d98cb3]/25 bg-[#2a0f18] shadow-[0_30px_70px_rgba(0,0,0,0.55)] transition-all duration-700 ease-out sm:w-[560px] motion-reduce:transition-none"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/25 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#a8416f]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d98cb3]/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f2c4d8]/30" />
        <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-0.5 font-mono text-xs text-[#a08a93]">
          {project.link.replace("https://", "")}
        </span>
      </div>

      <div className="aspect-[16/10] bg-gradient-to-br from-[#38151f] to-[#220c14]">
        {!imgFailed ? (
          <img
            src={project.image}
            alt={`${project.title} website preview`}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center font-mono text-2xl font-bold text-[#f2c4d8]/70">
            {project.title}
          </div>
        )}
      </div>
    </a>
  );
}

/* ---------- Section ---------- */

export default function Projects() {
  const [headRef, headInViewKey] = useRepeatingInView(0.5);
  const headCount = useTyping(HEADING.length, {
    speed: 90,
    triggerKey: headInViewKey,
  });

  const [active, setActive] = useState(0);
  const total = projects.length;

  const go = (dir) => setActive((i) => (i + dir + total) % total);

  // Shortest circular distance from the active card
  const getOffset = (i) => {
    let o = i - active;
    if (o > total / 2) o -= total;
    if (o < -total / 2) o += total;
    return o;
  };

  const current = projects[active];

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="max-w-full overflow-hidden bg-gradient-to-br from-[#2a0f18] via-[#2f111c] to-[#38151f] px-6 py-20 text-[#f1e4ea]"
    >
      <style>{`
        @keyframes projFade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .proj-fade { animation: projFade .6s ease-out both; }
        @media (prefers-reduced-motion: reduce) { .proj-fade { animation: none; } }
      `}</style>

      {/* 3D typing heading (same as Tech Skills) */}
      <div ref={headRef} className="mb-6 flex items-center justify-center">
        <h2
          id="projects-heading"
          aria-label={HEADING}
          className="inline-block min-h-[1.5em] select-none font-mono text-4xl font-black uppercase tracking-[0.15em] text-[#f2c4d8] sm:text-5xl lg:text-6xl"
          style={{ textShadow: HEADING_SHADOW }}
        >
          <span className="sr-only">{HEADING}</span>
          <span aria-hidden="true">{HEADING.slice(0, headCount)}</span>
          {headCount < HEADING.length && <Cursor />}
        </h2>
      </div>

      <p className="mx-auto mb-14 max-w-xl text-center text-[#b7a0aa]">
        Pick a project to see it up close, then open the live site.
      </p>

      {/* 3D coverflow */}
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(-1);
          if (e.key === "ArrowRight") go(1);
        }}
        className="relative mx-auto max-w-5xl outline-none focus-visible:ring-2 focus-visible:ring-[#d98cb3]/50"
      >
        <div
          className="relative mx-auto h-[250px] sm:h-[380px]"
          style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
        >
          {projects.map((project, i) => (
            <CoverCard
              key={project.title}
              project={project}
              offset={getOffset(i)}
              onSelect={() => setActive(i)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous project"
          className="absolute left-0 top-1/3 z-20 grid h-11 w-11 place-items-center rounded-full border border-[#d98cb3]/40 bg-[#2a0f18]/80 text-[#f2c4d8] transition-colors hover:bg-[#a8416f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d98cb3]"
        >
          <FaChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next project"
          className="absolute right-0 top-1/3 z-20 grid h-11 w-11 place-items-center rounded-full border border-[#d98cb3]/40 bg-[#2a0f18]/80 text-[#f2c4d8] transition-colors hover:bg-[#a8416f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d98cb3]"
        >
          <FaChevronRight aria-hidden="true" />
        </button>
      </div>

      {/* Details of the active project */}
      <div
        key={current.title}
        aria-live="polite"
        className="proj-fade mx-auto mt-10 max-w-2xl text-center"
      >
        <h3
          className="mb-3 font-mono text-2xl font-bold tracking-wide text-[#f2c4d8] sm:text-3xl"
          style={{ textShadow: "1px 1px 0 #91365f, 2px 2px 0 #5e1c38" }}
        >
          {current.title}
        </h3>

        <p className="mb-5 leading-relaxed text-[#b7a0aa]">{current.desc}</p>

        <div className="mb-7 flex flex-wrap justify-center gap-2">
          {current.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#8e2f5e] bg-[#8e2f5e]/20 px-3 py-1 font-mono text-xs text-[#d98cb3]"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={current.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#a8416f] px-6 py-3 font-mono text-sm text-[#f1e4ea] transition-colors duration-300 hover:bg-[#c04f85] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d98cb3]"
        >
          Live Demo <FaExternalLinkAlt aria-hidden="true" className="text-xs" />
        </a>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-3">
          {projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${p.title}`}
              aria-current={i === active}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-[#d98cb3]" : "w-2.5 bg-[#d98cb3]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}