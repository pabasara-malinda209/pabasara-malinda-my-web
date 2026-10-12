import { motion } from "framer-motion";
import { EASE } from "@/components/common/Reveal";

export const MaskedTitle = ({ lines }) => (
  <h1 className="font-display font-extrabold uppercase leading-[0.84] tracking-[-0.045em] text-[clamp(5rem,25vw,15.5rem)] sm:text-[clamp(4.2rem,17vw,15.5rem)]" data-testid="hero-title">
    {lines.map((line, i) => (
      <span key={line.text} className={`block overflow-hidden pb-[0.04em] ${line.indent ? "pl-[9vw]" : ""}`}>
        <motion.span
          className={`block ${line.className ?? ""}`}
          initial={{ y: "108%", rotate: 4 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ delay: 0.25 + i * 0.14, duration: 1.15, ease: EASE }}
        >
          {line.text}
        </motion.span>
      </span>
    ))}
  </h1>
);
