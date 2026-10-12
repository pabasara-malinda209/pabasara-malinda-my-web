import { ChevronLeft, ChevronRight } from "lucide-react";

const Pad = ({ k, onInput, className, children, testId }) => {
  const set = (v) => (e) => {
    e.preventDefault();
    onInput(k, v);
  };
  return (
    <button
      onPointerDown={set(true)}
      onPointerUp={set(false)}
      onPointerLeave={set(false)}
      onPointerCancel={set(false)}
      onContextMenu={(e) => e.preventDefault()}
      data-testid={testId}
      className={`pointer-events-auto grid select-none place-items-center rounded-2xl border border-white/20 bg-black/50 font-mono text-xs font-bold tracking-[0.2em] text-white backdrop-blur-md active:scale-95 active:bg-white/20 ${className}`}
      style={{ touchAction: "none" }}
    >
      {children}
    </button>
  );
};

export const TouchControls = ({ onInput }) => (
  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-3 sm:p-5 lg:hidden" data-testid="touch-controls">
    <div className="flex gap-2">
      <Pad k="left" onInput={onInput} className="h-16 w-16" testId="touch-left"><ChevronLeft size={28} /></Pad>
      <Pad k="right" onInput={onInput} className="h-16 w-16" testId="touch-right"><ChevronRight size={28} /></Pad>
    </div>
    <div className="flex gap-2">
      <Pad k="brake" onInput={onInput} className="h-16 w-20" testId="touch-brake">BRAKE</Pad>
      <Pad k="gas" onInput={onInput} className="h-16 w-20 border-[var(--cyan)]/60 text-[var(--cyan)]" testId="touch-gas">GAS</Pad>
    </div>
  </div>
);
