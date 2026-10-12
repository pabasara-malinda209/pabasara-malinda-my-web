import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { scrollToId } from "@/hooks/useLenis";
import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="relative overflow-hidden border-t border-white/10 px-5 pb-8 pt-20 sm:px-10 lg:px-16" data-testid="footer">
    <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
      <div className="flex items-center gap-3">
        <Logo className="h-10 w-10" />
        <p className="max-w-xs text-sm text-zinc-400">{PROFILE.role} · {PROFILE.tagline}. Built with React, Three.js and a lot of motion.</p>
      </div>
      <div className="flex flex-wrap gap-6">
        {PROFILE.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm text-zinc-300 transition-colors hover:text-[var(--cyan)]" data-testid={`footer-social-${s.label.split(" ")[0].toLowerCase()}`}>
            {s.label}
          </a>
        ))}
        <button onClick={() => scrollToId("top")} className="flex items-center gap-1.5 text-sm text-zinc-300 hover:text-white" data-testid="footer-back-to-top">
          Top <ArrowUp size={14} />
        </button>
      </div>
    </div>
    <motion.p
      initial={{ y: "30%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="font-display mt-14 select-none whitespace-nowrap text-center text-[17vw] font-extrabold uppercase leading-[0.8] tracking-[-0.05em] text-outline"
      aria-hidden
    >
      {PROFILE.firstName} {PROFILE.lastName}
    </motion.p>
    <div className="mx-auto mt-8 flex max-w-7xl justify-between font-mono text-xs text-zinc-400">
      <span>© {new Date().getFullYear()} {PROFILE.firstName} {PROFILE.lastName}</span>
      <span>Made to move</span>
    </div>
  </footer>
);
