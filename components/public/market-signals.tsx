interface MarketSignalsProps {
  signals: string[];
  momentum?: "surging" | "steady" | "emerging";
}

const momentumStyles: Record<"surging" | "steady" | "emerging", string> = {
  surging: "bg-emerald-500/10 text-emerald-900 dark:text-emerald-900 border-emerald-500/40",
  steady: "bg-blue-500/10 text-blue-900 dark:text-blue-900 border-blue-500/40",
  emerging: "bg-amber-500/10 text-amber-900 dark:text-amber-900 border-amber-500/40",
};

const momentumLabels: Record<"surging" | "steady" | "emerging", string> = {
  surging: "Surging momentum",
  steady: "Steady demand",
  emerging: "Emerging trend",
};

export function MarketSignals({ signals, momentum }: MarketSignalsProps) {
  return (
    <div className="space-y-4">
      {momentum && (
        <div>
          <span
            className={`inline-flex items-center gap-2 rounded-full border p-3 text-xs font-semibold uppercase tracking-wide ${momentumStyles[momentum]}`}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-current" />
            {momentumLabels[momentum]}
          </span>
        </div>
      )}

      <div>
        <h2 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-neutral-200">
          Market Signals
        </h2>
        <ul className="space-y-2">
          {signals.map((signal, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-neutral-900 dark:text-neutral-200"
            >
              <span className="mt-1.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-blue-500 dark:bg-blue-500" />
              <span>{signal}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
