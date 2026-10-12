const DESKTOP = [
  ["← → / A D", "Steer"],
  ["↑ / W", "Accelerate"],
  ["↓ / S / Space", "Brake"],
];
const MOBILE = [
  ["◀ ▶", "Steer"],
  ["GAS", "Accelerate"],
  ["BRAKE", "Slow down"],
];

const List = ({ title, rows }) => (
  <div>
    <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--cyan)]">{title}</p>
    <ul className="space-y-2">
      {rows.map(([k, v]) => (
        <li key={k} className="flex justify-between gap-4 text-sm">
          <kbd className="rounded-md border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-xs text-zinc-200">{k}</kbd>
          <span className="text-zinc-400">{v}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const ControlsGuide = () => (
  <div className="grid gap-6 sm:grid-cols-2" data-testid="game-controls-guide">
    <List title="Desktop" rows={DESKTOP} />
    <List title="Mobile" rows={MOBILE} />
  </div>
);
