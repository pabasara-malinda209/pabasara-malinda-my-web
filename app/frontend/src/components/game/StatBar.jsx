import { motion } from "framer-motion";

export const StatBar = ({ label, value, color }) => (
  <div>
    <div className="mb-2 flex justify-between font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
      <span>{label}</span>
      <span className="text-zinc-200">{value}</span>
    </div>
    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={false}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  </div>
);
