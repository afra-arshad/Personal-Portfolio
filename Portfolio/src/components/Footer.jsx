import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Skills", link: "#tech-stack" },
    { name: "Contact", link: "#contact" },
  ];

  const skills = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "Tailwind CSS",
    "Git",
    "GitHub",
    "Vercel",
    "Netlify",
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/afra-arshad",
      icon: <FaGithub />,
      external: true,
    },
    {
      name: "LinkedIn",
      href: "#contact",
      icon: <FaLinkedinIn />,
      external: false,
    },
    {
      name: "Instagram",
      href: "#contact",
      icon: <FaInstagram />,
      external: false,
    },
    {
      name: "Email",
      href: "#contact",
      icon: <FaEnvelope />,
      external: false,
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#070305] text-[#f1e4ea] pt-16 pb-8">
      {/* Top Curved Architectural Wave / Arch Separator */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#150a0f] to-transparent opacity-90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#d98cb3]/50 to-transparent"
      />

      {/* Soft Velvet Corner Gradient Accents (Dark Rose & Deep Plum) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#6d1f44]/20 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-[#3b122b]/30 blur-[120px]"
      />

      {/* Subtle Fine Cross-Grid Texture */}
      <div
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(217, 140, 179, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(217, 140, 179, 0.03) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        className="pointer-events-none absolute inset-0"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Elevated Frosted Obsidian Frame */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="rounded-3xl border border-[#8e2f5e]/25 bg-gradient-to-b from-[#13080d]/85 via-[#0d0509]/90 to-[#080305]/95 p-8 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.75)] backdrop-blur-md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Column 1: Logo & Introduction */}
            <div>
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 rounded-full bg-[#d98cb3]/20 blur-md" />
                  <img
                    src="logop.png"
                    alt="Afra Arshad AA Logo"
                    className="relative w-[74px] h-[74px] md:w-[82px] md:h-[82px] object-cover object-center rounded-full border border-[#d98cb3]/35 bg-[#12070c]"
                  />
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-wide text-white">
                    Afra <span className="text-[#d98cb3]">Arshad</span>
                  </h2>
                  <div className="w-10 h-[2px] bg-gradient-to-r from-[#d98cb3] to-transparent rounded-full mt-1.5" />
                  <p className="text-[#a08a93] text-xs mt-2 leading-5">
                    Front-End Developer
                    <br />
                    Modern Web Experiences
                  </p>
                </div>
              </div>

              <p className="text-[#a08a93] text-sm leading-7 mt-5">
                Crafting clean, responsive, and user-focused interfaces with
                attention to detail and smooth interaction.
              </p>

              {/* Social Icons */}
              <div className="flex gap-2.5 mt-6">
                {socialLinks.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    aria-label={item.name}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-9 h-9 rounded-full border border-[#8e2f5e]/40 bg-[#160a10] flex items-center justify-center text-sm text-[#d98cb3] transition-colors duration-300 hover:border-[#d98cb3] hover:bg-[#8e2f5e]/35 hover:text-white"
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:pl-6">
              <h3 className="text-sm font-mono font-semibold uppercase tracking-[0.16em] text-[#f2c4d8] pb-2.5 border-b border-[#8e2f5e]/30 w-fit">
                Navigation
              </h3>

              <ul className="space-y-3 mt-5">
                {quickLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.link}
                      className="group text-[#a08a93] text-sm hover:text-[#f2c4d8] transition-colors duration-200 inline-flex items-center"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8e2f5e] group-hover:bg-[#d98cb3] mr-2.5 transition-colors" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Core Stack */}
            <div>
              <h3 className="text-sm font-mono font-semibold uppercase tracking-[0.16em] text-[#f2c4d8] pb-2.5 border-b border-[#8e2f5e]/30 w-fit">
                Core Stack
              </h3>

              <div className="flex flex-wrap gap-2 mt-5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-mono rounded-md border border-[#8e2f5e]/30 bg-[#14080e]/90 text-[#cbb7c0] hover:border-[#d98cb3]/60 hover:bg-[#220e18] hover:text-white transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 4: Direct CTA */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#8e2f5e]/25 bg-[#12070c]/80 p-5">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono text-[#d98cb3] mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Projects
                </div>

                <h3 className="text-base font-semibold text-[#f2c4d8]">
                  Let's Work Together
                </h3>

                <p className="text-[#a08a93] text-xs leading-6 mt-2">
                  Looking for a front-end developer or have an idea to bring
                  online? Drop a message anytime.
                </p>
              </div>

              <a
                href="#contact"
                className="mt-5 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-[#d98cb3]/45 bg-gradient-to-r from-[#78244b] to-[#a8416f] text-white text-xs font-mono font-semibold uppercase tracking-wider hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Start a Conversation</span>
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Bottom Copyright Bar inside the Frame */}
          <div className="mt-10 pt-6 border-t border-[#8e2f5e]/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[#8c7680]">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="text-[#d98cb3] font-semibold">Afra Arshad</span>.
              All rights reserved.
            </p>

            <p>
              Built with <span className="text-[#d85b91]">♥</span> in React
              & Tailwind
            </p>

            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              title="Back to top"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#8e2f5e]/45 bg-[#15090f] text-[#d98cb3] hover:border-[#d98cb3] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <span>Top</span>
              <FaArrowUp className="text-[10px]" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;