const Cell = ({ label, value, testId, accent }) => (
  <div className="rounded-2xl border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-md sm:px-4">
    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 sm:text-xs">{label}</p>
    <p className="font-display text-lg font-bold tabular-nums sm:text-2xl" style={accent ? { color: accent } : undefined} data-testid={testId}>
      {value}
    </p>
  </div>
);

export const GameHUD = ({ hud, vehicle }) => (
  <div className="pointer-events-none absolute inset-0 z-10 p-3 sm:p-5" data-testid="game-hud">
    <div className="flex flex-wrap gap-2">
      <Cell label="Speed" value={`${hud.speed} km/h`} testId="hud-speed" accent={vehicle.color} />
      <Cell label="Time" value={`${hud.timeLeft.toFixed(1)}s`} testId="hud-time" accent={hud.timeLeft < 10 ? "#FF3366" : undefined} />
      <Cell label="Rings" value={`${hud.hits}/${hud.total}`} testId="hud-checkpoints" />
    </div>
    <div className="absolute inset-x-3 top-[5.5rem] h-1 overflow-hidden rounded-full bg-white/10 sm:inset-x-5 sm:top-24">
      <div className="h-full rounded-full transition-[width] duration-100" style={{ width: `${hud.progress * 100}%`, background: vehicle.color }} />
    </div>
    {hud.countdown > 0 && (
      <div className="absolute inset-0 grid place-items-center">
        <span key={hud.countdown} className="font-display text-[9rem] font-extrabold leading-none text-white drop-shadow-[0_0_40px_rgba(0,240,255,0.6)] animate-in zoom-in-50 fade-in duration-300" data-testid="hud-countdown">
          {hud.countdown}
        </span>
      </div>
    )}
  </div>
);
