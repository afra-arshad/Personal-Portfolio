"use client";

import * as React from "react";
import type { IconType } from "react-icons";
import { FaCode, FaReact, FaJs, FaHtml5, FaCss3Alt } from "react-icons/fa6";
import { SiTailwindcss } from "react-icons/si";

/* ------------------------------------------------------------------
   Orbiting skills animation: tech icons circling a glowing core.
   React + Tailwind + react-icons only. No other setup needed.

   To change the icons, edit the two lists below. `angle` is where each
   icon sits on its ring, in degrees (0 = right, 90 = bottom).
------------------------------------------------------------------- */
type OrbitItem = { Icon: IconType; label: string; angle: number };

const INNER_ICONS: OrbitItem[] = [
  { Icon: FaReact, label: "React", angle: 0 },
  { Icon: FaJs, label: "JavaScript", angle: 180 },
];

const OUTER_ICONS: OrbitItem[] = [
  { Icon: SiTailwindcss, label: "Tailwind CSS", angle: 90 },
  { Icon: FaHtml5, label: "HTML", angle: 210 },
  { Icon: FaCss3Alt, label: "CSS", angle: 330 },
];

const CSS = `
@keyframes orb-spin { to { transform: rotate(360deg); } }
@keyframes orb-spin-reverse { to { transform: rotate(-360deg); } }
@keyframes orb-glow {
  0%, 100% { box-shadow: 0 0 30px 4px rgba(165, 45, 99, 0.45); }
  50%      { box-shadow: 0 0 60px 12px rgba(212, 122, 156, 0.55); }
}
@media (prefers-reduced-motion: reduce) {
  .orb-anim { animation: none !important; }
}
`;

type OrbitRingProps = {
  size: string;
  seconds: number;
  reverse?: boolean;
  items: OrbitItem[];
};

/* One ring that spins. Its icons spin the other way, so they stay upright. */
const OrbitRing = ({ size, seconds, reverse = false, items }: OrbitRingProps) => {
  const ringSpin = reverse ? "orb-spin-reverse" : "orb-spin";
  const iconSpin = reverse ? "orb-spin" : "orb-spin-reverse";

  return (
    <div
      className="orb-anim absolute inset-0 m-auto aspect-square rounded-full border border-dashed border-[#bc7899]/30"
      style={{ width: size, animation: `${ringSpin} ${seconds}s linear infinite` }}
    >
      {items.map(({ Icon, label, angle }) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <div
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${50 + 50 * Math.cos(rad)}%`,
              top: `${50 + 50 * Math.sin(rad)}%`,
            }}
          >
            <div
              className="orb-anim flex h-12 w-12 items-center justify-center rounded-xl border border-[#a52d63]/40 bg-[#1e0a12] text-xl text-[#d47a9c] shadow-lg shadow-black/50"
              style={{ animation: `${iconSpin} ${seconds}s linear infinite` }}
              title={label}
            >
              <Icon />
            </div>
          </div>
        );
      })}
    </div>
  );
};

type KeycapOrbProps = { className?: string };

export default function KeycapOrb({ className = "" }: KeycapOrbProps) {
  return (
    <div
      role="img"
      aria-label="Icons for React, JavaScript, Tailwind CSS, HTML and CSS orbiting a code symbol"
      className={`relative mx-auto aspect-square w-full max-w-[420px] ${className}`}
    >
      <style>{CSS}</style>

      {/* soft glow behind everything */}
      <div className="absolute inset-0 rounded-full bg-[#a52d63]/15 blur-3xl" />

      <OrbitRing size="88%" seconds={40} reverse items={OUTER_ICONS} />
      <OrbitRing size="56%" seconds={28} items={INNER_ICONS} />

      {/* glowing core */}
      <div
        className="orb-anim absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#a52d63] to-[#591535] text-3xl text-white"
        style={{ animation: "orb-glow 4s ease-in-out infinite" }}
      >
        <FaCode />
      </div>
    </div>
  );
}