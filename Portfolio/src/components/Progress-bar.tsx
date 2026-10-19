
import { motion } from "motion/react";

export default function ProgressBar({
  name,
  level = 0,
  active = false,
  completed = false,
  onComplete,
}) {
  return (
    <div className="group mb-5 transition-transform duration-300 hover:translate-x-1">
      <div className="mb-2 flex justify-between font-mono text-sm">
        <span className="text-[#d98cb3] transition-colors duration-300 group-hover:text-[#f1e4ea]">
          {name}
        </span>

        <span className="text-[#a08a93]">{level}%</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-[#d98cb3]/15">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#8e2f5e] to-[#d98cb3] transition-[filter] duration-300 group-hover:brightness-125"
          initial={{ width: "0%" }}
          animate={{
            width: active || completed ? `${level}%` : "0%",
          }}
          transition={{
            duration: active ? 1.2 : 0,
            ease: "easeOut",
          }}
          onAnimationComplete={() => {
            if (active) {
              onComplete?.();
            }
          }}
        />
      </div>
    </div>
  );
}
