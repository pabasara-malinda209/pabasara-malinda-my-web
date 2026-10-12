import { useCallback, useMemo, useState } from "react";
import { X } from "lucide-react";
import { VEHICLES } from "@/game/vehicles";
import { saveBest } from "@/game/bestTimes";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { VehicleSelect } from "./VehicleSelect";
import { GameStage } from "./GameStage";
import { ResultPanel } from "./ResultPanel";

export const GameSection = () => {
  const [phase, setPhase] = useState("select");
  const [vehicleId, setVehicleId] = useState(VEHICLES[0].id);
  const [runKey, setRunKey] = useState(0);
  const [result, setResult] = useState(null);
  const vehicle = useMemo(() => VEHICLES.find((v) => v.id === vehicleId), [vehicleId]);

  const start = () => {
    setResult(null);
    setRunKey((k) => k + 1);
    setPhase("race");
  };
  const handleFinish = useCallback(
    (r) => {
      const isBest = r.finished && saveBest(vehicleId, r.time);
      setResult({ ...r, isBest });
    },
    [vehicleId]
  );

  return (
    <section id="play" className="px-5 py-28 sm:px-10 lg:px-16 lg:py-40" data-testid="game-section">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="03" label="Interactive 3D" title={<>Take the wheel.<br /><span className="text-outline">Chase the rings.</span></>}>
          Pick a ride, then thread it through ten neon rings before the clock runs out. Every ring adds four seconds; every cone costs you speed.
        </SectionHeading>
        <Reveal>
          {phase === "select" ? (
            <VehicleSelect selectedId={vehicleId} onSelect={setVehicleId} onStart={start} />
          ) : (
            <div className="relative h-[72svh] min-h-[460px] max-h-[720px] overflow-hidden rounded-3xl border border-white/10 bg-black" data-testid="game-stage">
              <GameStage vehicle={vehicle} runKey={runKey} onFinish={handleFinish} />
              <button
                onClick={() => setPhase("select")}
                className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md transition-colors hover:bg-white/15 sm:right-5 sm:top-5"
                data-testid="game-exit-btn"
                aria-label="Exit race"
              >
                <X size={18} />
              </button>
              {result && <ResultPanel result={result} isBest={result.isBest} onRetry={start} onChange={() => setPhase("select")} />}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
};
