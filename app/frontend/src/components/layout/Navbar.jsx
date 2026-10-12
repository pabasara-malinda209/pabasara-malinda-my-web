import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS, PROFILE } from "@/data/profile";
import { scrollToId } from "@/hooks/useLenis";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8"
      data-testid="navbar"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#07090e]/70 px-4 py-2.5 backdrop-blur-xl sm:px-6">
        <button onClick={() => go("top")} className="flex items-center gap-2.5" data-testid="nav-logo">
          <Logo className="h-7 w-7" />
          <span className="font-display text-base font-bold tracking-tight">
            {PROFILE.firstName}
            <span className="text-[var(--cyan)]">.</span>
          </span>
        </button>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l, i) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                data-testid={`nav-link-${l.id}`}
                className="group flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-zinc-300 transition-colors hover:text-white"
              >
                <span className="font-mono text-[11px] text-[var(--cyan)] opacity-70">0{i + 1}</span>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            onClick={() => go("contact")}
            data-testid="nav-hire-btn"
            className="hidden rounded-full bg-[var(--text)] px-5 py-2 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.04] sm:block"
          >
            Hire me
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-full border border-white/15 p-2 md:hidden"
            data-testid="nav-mobile-toggle"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-7xl rounded-3xl border border-white/10 bg-[#07090e]/90 p-3 backdrop-blur-xl md:hidden"
            data-testid="nav-mobile-menu"
          >
            {NAV_LINKS.map((l, i) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  data-testid={`nav-mobile-link-${l.id}`}
                  className="flex w-full items-baseline gap-3 rounded-2xl px-4 py-3 text-left font-display text-2xl font-bold"
                >
                  <span className="font-mono text-xs text-[var(--cyan)]">0{i + 1}</span>
                  {l.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
