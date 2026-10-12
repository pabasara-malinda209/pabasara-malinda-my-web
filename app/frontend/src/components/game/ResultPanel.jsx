import { motion } from "framer-motion";
import { RotateCcw, Repeat } from "lucide-react";

export const ResultPanel = ({ result, isBest, onRetry, onChange }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="absolute inset-0 z-30 grid place-items-center bg-[#07090e]/75 p-4 backdrop-blur-md"
    data-testid="game-result"
  >
    <motion.div
      initial={{ y: 30, scale: 0.96 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md rounded-3xl border border-white/10 bg-[var(--bg2)] p-7 text-center sm:p-9"
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--cyan)]">{result.finished ? "Finish line" : "Time over"}</p>
      <h3 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl" data-testid="result-title">
        {result.finished ? "You made it!" : "So close."}
      </h3>
      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 p-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Rings</p>
          <p className="font-display text-3xl font-bold" data-testid="result-rings">{result.hits}/{result.total}</p>
        </div>
        <div className="rounded-2xl border border-white/10 p-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Time</p>
          <p className="font-display text-3xl font-bold" data-testid="result-time">{result.time.toFixed(2)}s</p>
        </div>
      </div>
      {isBest && <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--amber)]" data-testid="result-new-best">New personal best</p>}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button onClick={onRetry} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--cyan)] px-6 py-3.5 font-semibold text-black transition-transform hover:scale-[1.03]" data-testid="result-retry-btn">
          <RotateCcw size={16} /> Race again
        </button>
        <button onClick={onChange} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold transition-colors hover:bg-white/10" data-testid="result-change-vehicle-btn">
          <Repeat size={16} /> Change vehicle
        </button>
      </div>
    </motion.div>
  </motion.div>
);
