import React, { useState, useEffect, useRef } from "react";
import { IoMdDownload } from "react-icons/io";
import LightRays from "./LightRays";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Tech Stack", href: "#tech-stack" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const cvButton =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#8b325c] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(139,50,92,0.35)] transition-all duration-300 hover:bg-[#a23b6b] hover:shadow-[0_6px_22px_rgba(159,57,105,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative z-40 bg-[#100609] pt-4 text-white sm:pt-5">
      {/* ================= BACKGROUND GLOW ================= */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-200px] h-[400px] w-[700px] max-w-full -translate-x-1/2 rounded-full bg-[#7f2435]/20 blur-[130px]" />
        <div className="absolute left-[-200px] top-[300px] h-[450px] w-[450px] rounded-full bg-[#8f2638]/10 blur-[120px]" />
        <div className="absolute right-[-200px] top-[250px] h-[450px] w-[450px] rounded-full bg-[#8f2638]/10 blur-[120px]" />
      </div>

      {/* ================= LIGHT RAYS (with bottom fade mask) ================= */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[100svh] overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
        <LightRays />
      </div>

      {/* ================= NAVBAR + DROPDOWN ================= */}
      <div ref={wrapRef} className="relative z-50 mx-auto w-[92%] max-w-6xl">
        <nav className="flex min-h-[60px] items-center justify-between gap-3 rounded-full border border-[#8f4655]/50 bg-[#1b0c11]/80 px-3 shadow-[0_0_25px_rgba(170,55,75,0.18)] backdrop-blur-xl sm:min-h-[70px] sm:px-5 md:px-7">
          {/* ===== LOGO + NAME ===== */}
          <a
            href="#home"
            className="flex shrink-0 items-center gap-3 sm:gap-4"
            aria-label="Go to home"
          >
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full sm:h-11 sm:w-11 lg:h-12 lg:w-12">
              <img
                src="/logop.png"
                alt="Afra Arshad Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="hidden whitespace-nowrap text-xs font-medium tracking-[0.15em] text-gray-200 sm:block md:text-sm lg:hidden xl:block">
              AFRA ARSHAD
            </span>
          </a>

          {/* ===== DESKTOP LINKS ===== */}
          <div className="hidden items-center gap-1 lg:flex xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm text-gray-300 transition-colors duration-300 hover:bg-[#924d6e] hover:text-white xl:px-4 xl:py-2.5"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* ===== DESKTOP CV BUTTON ===== */}
          <div className="hidden lg:block">
            <a href="#contact" className={cvButton}>
              Download CV
              <IoMdDownload className="h-4 w-4" />
            </a>
          </div>

          {/* ===== MENU TOGGLE ===== */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#8f4655]/50 bg-[#8b325c]/30 text-white transition-colors duration-300 hover:bg-[#8b325c]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:h-11 sm:w-11"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 h-0.5 w-full rounded-full bg-white transition-all duration-300 ${
                    isOpen ? "top-[7px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-0.5 w-full rounded-full bg-white transition-all duration-300 ${
                    isOpen ? "scale-x-0 opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-full rounded-full bg-white transition-all duration-300 ${
                    isOpen ? "top-[7px] -rotate-45" : "top-[14px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* ================= DROPDOWN MENU ================= */}
        <div
          id="mobile-menu"
          className={`absolute left-0 right-0 top-full z-40 mt-3 max-h-[calc(100svh-110px)] origin-top overflow-y-auto rounded-3xl border border-[#8f4655]/50 bg-[#1b0c11]/95 shadow-2xl shadow-black/80 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
            isOpen
              ? "visible scale-100 opacity-100"
              : "invisible scale-95 opacity-0"
          }`}
        >
          <ul className="divide-y divide-white/5 px-2 py-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-4 py-3.5 text-base font-medium text-gray-200 transition-colors duration-300 hover:bg-[#924d6e]/30 hover:text-white"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="border-t border-white/10 p-4">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className={`${cvButton} w-full py-3`}
            >
              Download CV
              <IoMdDownload className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;