import { useEffect } from "react";
import Lenis from "lenis";

let instance = null;

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) instance.scrollTo(el, { offset: 0, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    instance = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      instance = null;
    };
  }, []);
};
