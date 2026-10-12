import { useCallback, useEffect, useRef, useState } from "react";
import { createGame } from "@/game/engine";
import { GameHUD } from "./GameHUD";
import { TouchControls } from "./TouchControls";

const INITIAL_HUD = { speed: 0, timeLeft: 45, hits: 0, passed: 0, total: 10, progress: 0, countdown: 3 };

export const GameStage = ({ vehicle, runKey, onFinish }) => {
  const mountRef = useRef(null);
  const gameRef = useRef(null);
  const finishRef = useRef(onFinish);
  const [hud, setHud] = useState(INITIAL_HUD);

  useEffect(() => {
    finishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    setHud(INITIAL_HUD);
    const game = createGame(mountRef.current, vehicle, {
      onHud: setHud,
      onFinish: (r) => finishRef.current(r),
    });
    gameRef.current = game;
    return () => {
      game.dispose();
      gameRef.current = null;
    };
  }, [vehicle, runKey]);

  const setInput = useCallback((k, v) => {
    gameRef.current?.setInput(k, v);
  }, []);

  return (
    <>
      <div ref={mountRef} className="absolute inset-0" data-testid="game-canvas" />
      <GameHUD hud={hud} vehicle={vehicle} />
      <TouchControls onInput={setInput} />
    </>
  );
};
