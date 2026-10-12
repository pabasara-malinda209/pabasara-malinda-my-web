import { Flag, Trophy } from "lucide-react";
import { VEHICLES } from "@/game/vehicles";
import { getBest } from "@/game/bestTimes";
import { VehicleIcon } from "./VehicleIcon";
import { StatBar } from "./StatBar";
import { ControlsGuide } from "./ControlsGuide";

export const VehicleSelect = ({ selectedId, onSelect, onStart }) => {
  const v = VEHICLES.find((x) => x.id === selectedId) ?? VEHICLES[0];
  const best = getBest(v.id);
  return (
    <div className="grid gap-5 lg:grid-cols-12" data-testid="vehicle-select">
      <div className="grid grid-cols-2 gap-3 lg:col-span-5">
        {VEHICLES.map((x) => {
          const active = x.id === v.id;
          return (
            <button
              key={x.id}
              onClick={() => onSelect(x.id)}
              data-testid={`vehicle-option-${x.id}`}
              className={`group flex flex-col justify-between gap-8 rounded-3xl border p-5 text-left transition-all duration-300 ${
                active ? "border-white/30 bg-white/[0.06]" : "border-white/10 bg-[var(--bg2)] hover:border-white/20"
              }`}
              style={active ? { boxShadow: `inset 0 0 0 1px ${x.color}55, 0 0 40px ${x.color}22` } : undefined}
            >
              <span style={{ color: x.color }} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                <VehicleIcon id={x.id} size={34} />
              </span>
              <span>
                <span className="block font-display text-lg font-bold leading-tight sm:text-xl">{x.name}</span>
                <span className="mt-1 block font-mono text-xs text-zinc-400">SPD {x.speed} · HDL {x.handling}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-col justify-between gap-8 rounded-3xl border border-white/10 bg-[var(--bg2)] p-6 sm:p-8 lg:col-span-7">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: v.color }}>Selected</p>
          <h3 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl" data-testid="selected-vehicle-name">{v.name}</h3>
          <p className="mt-3 text-zinc-400">{v.blurb}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <StatBar label="Speed" value={v.speed} color={v.color} />
            <StatBar label="Handling" value={v.handling} color={v.color} />
            <StatBar label="Braking" value={v.braking} color={v.color} />
          </div>
        </div>
        <ControlsGuide />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-2 font-mono text-xs text-zinc-400" data-testid="best-time">
            <Trophy size={14} className="text-[var(--amber)]" />
            Best: {best !== null ? `${best.toFixed(2)}s` : "no run yet"}
          </p>
          <button
            onClick={onStart}
            data-testid="start-race-btn"
            className="group inline-flex items-center gap-3 rounded-full px-8 py-4 font-semibold text-black transition-transform duration-300 hover:scale-[1.04]"
            style={{ background: v.color }}
          >
            <Flag size={18} className="transition-transform duration-300 group-hover:-rotate-12" />
            Start race
          </button>
        </div>
      </div>
    </div>
  );
};
