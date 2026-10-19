import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

import KeycapOrb from "./keycap-orb";
import Shuffle from "./Shuffle";
import TextType from "./TextType";
import LightRays from "./LightRays";

/* ------------------------------------------------------------------
   Heading sizes: fixed steps (NOT fluid), so Shuffle measures correctly
------------------------------------------------------------------- */
const headingCss = `
  .hero-title {
    font-size: 2.5rem !important;
    line-height: 1.1 !important;
    letter-spacing: 0 !important;
  }
  @media (min-width: 400px)  { .hero-title { font-size: 3rem !important; } }
  @media (min-width: 640px)  { .hero-title { font-size: 4rem !important; } }
  @media (min-width: 768px)  { .hero-title { font-size: 4.5rem !important; } }
  @media (min-width: 1024px) { .hero-title { font-size: 4rem !important; } }
  @media (min-width: 1280px) { .hero-title { font-size: 5rem !important; } }
  @media (min-width: 1536px) { .hero-title { font-size: 6rem !important; } }
`;

/* ------------------------------------------------------------------
   Returns a key that changes when the heading size changes or the
   fonts finish loading. Used to restart Shuffle so it re-measures.
------------------------------------------------------------------- */
const useShuffleKey = () => {
  const getStep = () => {
    const w = window.innerWidth;
    if (w >= 1536) return "2xl";
    if (w >= 1280) return "xl";
    if (w >= 1024) return "lg";
    if (w >= 768) return "md";
    if (w >= 640) return "sm";
    if (w >= 400) return "xs";
    return "base";
  };

  const [step, setStep] = useState(getStep);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let timer;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setStep(getStep()), 150);
    };
    window.addEventListener("resize", onResize);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => setFontsReady(true));
    } else {
      setFontsReady(true);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return `${step}-${fontsReady}`;
};

/* ------------------------------------------------------------------
   Luxury ambient spotlight & glow effects
------------------------------------------------------------------- */
const BackgroundGlows = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[350px] w-full max-w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(215,145,175,0.15),transparent_70%)] blur-3xl sm:h-[500px] lg:h-[600px]" />
      <div className="absolute -left-20 top-32 h-64 w-64 rounded-full bg-[#8c2a55]/10 blur-[120px] sm:-left-32 sm:h-96 sm:w-96" />
      <div className="absolute -right-10 top-1/3 h-72 w-72 rounded-full bg-[#591535]/15 blur-[120px] sm:right-0 sm:h-[450px] sm:w-[450px]" />
    </div>
  );
};

/* ------------------------------------------------------------------
   Button styles
------------------------------------------------------------------- */
const btnBase =
  "group relative inline-flex items-center gap-2 sm:gap-2.5 overflow-hidden rounded-full px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f08ac0]";

const primaryBtn = `${btnBase} bg-gradient-to-r from-[#a52d63] to-[#7a1f4a] text-white shadow-lg shadow-[#a52d63]/30 hover:from-[#bd3674] hover:to-[#a52d63] hover:shadow-xl hover:shadow-[#a52d63]/50 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full`;

const secondaryBtn = `${btnBase} border border-[#d47a9c]/40 bg-white/[0.03] text-rose-100 backdrop-blur-md hover:border-[#d47a9c] hover:bg-[#d47a9c]/10 hover:text-white hover:shadow-lg hover:shadow-[#a52d63]/20`;

const arrowStyle =
  "text-xs opacity-70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100";

const Home = () => {
  const shuffleKey = useShuffleKey();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100vh-80px)] w-full flex-col justify-center overflow-hidden bg-[#100609] px-4 py-8 text-white sm:px-8 sm:py-14 lg:px-16 lg:py-20"
    >
      <style>{headingCss}</style>

      {/* Light rays seamlessly blending into the background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <LightRays />
      </div>

      <BackgroundGlows />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-12 lg:gap-8">
        {/* ================= LEFT COLUMN: Introduction & Socials ================= */}
        <div className="relative z-10 w-full min-w-0 max-w-full lg:col-span-7">
          {/* Intro label */}
          <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
            <span className="h-[2px] w-6 shrink-0 rounded-full bg-[#8B325C] sm:w-10" />
            <TextType
              text={["Hello, welcome to my portfolio", "I build modern website!"]}
              typingSpeed={60}
              deletingSpeed={40}
              pauseDuration={2000}
              loop={true}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="text-[#bc7899]"
              className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8B325C] min-[400px]:text-[11px] sm:text-xs sm:tracking-[0.25em]"
            />
          </div>

          {/* ================= HEADINGS ================= */}
          <div className="flex w-full flex-col space-y-1">
            <Shuffle
              key={`front-${shuffleKey}`}
              text="Front-End"
              tag="h1"
              textAlign="left"
              duration={0.4}
              loop={true}
              loopDelay={1.5}
              className="hero-title w-full font-black text-white"
            />

            <div className="w-full cursor-pointer">
              <Shuffle
                key={`dev-${shuffleKey}`}
                text="Developer"
                tag="h1"
                textAlign="left"
                duration={0.4}
                loop={true}
                loopDelay={1.5}
                colorFrom="#ffaec0"
                colorTo="#8B325C"
                className="hero-title w-full font-black"
              />
            </div>
          </div>

          {/* Name */}
          <div className="mt-3 text-lg font-bold tracking-tight text-rose-100/90 min-[400px]:text-xl sm:mt-4 sm:text-2xl md:text-3xl">
            <TextType
              text={["I'm Afra Arshad."]}
              typingSpeed={70}
              deletingSpeed={30}
              pauseDuration={3000}
              loop={true}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="text-[#d47a9c]"
            />
          </div>

          {/* Bio */}
          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:mt-5 sm:text-base sm:leading-8">
            I build responsive, modern, and interactive web experiences using
            React, JavaScript, and Tailwind CSS. I transform creative ideas
            into clean, engaging interfaces with obsessive attention to detail.
          </p>

          {/* Social Links & Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-4">
            <a
              href="https://github.com/afra-arshad"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className={primaryBtn}
            >
              <span className="relative flex items-center gap-2 sm:gap-2.5">
                <FaGithub className="text-base sm:text-lg" />
                GitHub
                <FaArrowUpRightFromSquare className={arrowStyle} />
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/afra-arshad"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className={secondaryBtn}
            >
              <FaLinkedin className="text-base text-[#d47a9c] transition-colors duration-300 group-hover:text-white sm:text-lg" />
              LinkedIn
              <FaArrowUpRightFromSquare className={arrowStyle} />
            </a>
          </div>

          {/* Email Contact */}
          <a
            href="mailto:afraarshaddev@gmail.com"
            className="group mt-4 inline-flex max-w-full items-center gap-2 rounded-full text-xs text-gray-400 transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f08ac0] sm:mt-6 sm:gap-3 sm:text-base"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d47a9c]/40 bg-white/[0.03] text-[#d47a9c] transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:border-[#d47a9c] group-hover:bg-[#a52d63] group-hover:text-white motion-reduce:transition-none sm:h-10 sm:w-10">
              <FaEnvelope className="text-sm sm:text-base" />
            </span>
            <span className="min-w-0 break-all font-medium underline decoration-transparent decoration-1 underline-offset-4 transition-all duration-300 group-hover:decoration-[#d47a9c]">
              afraarshaddev@gmail.com
            </span>
          </a>
        </div>

        {/* ================= RIGHT COLUMN: Orbit & Badge ================= */}
        <div className="relative mx-auto mt-6 w-full max-w-[240px] min-[400px]:max-w-[280px] sm:max-w-[360px] lg:col-span-5 lg:mt-0 lg:max-w-[440px] lg:justify-self-end">
          <KeycapOrb />

          {/* Badge */}
          <div className="absolute -bottom-2 left-1/2 z-20 max-w-[95vw] -translate-x-1/2 whitespace-nowrap rounded-xl border border-white/10 bg-[#1e0a12]/90 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-rose-100 shadow-xl shadow-black/60 backdrop-blur-md sm:-bottom-3 sm:px-4 sm:py-2.5 sm:text-xs">
            <span className="mr-1.5 text-[#d47a9c] sm:mr-2">✦</span>
            Creative code. Thoughtful design.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;