import { useEffect, useRef } from "react";
import { createHeroScene } from "@/three/heroScene";

export const HeroScene = () => {
  const ref = useRef(null);
  useEffect(() => {
    const scene = createHeroScene(ref.current);
    return () => {
      scene.dispose();
    };
  }, []);
  return <div ref={ref} className="absolute inset-0" data-testid="hero-3d-canvas" aria-hidden />;
};
