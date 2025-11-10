'use client';

import { useEffect, useMemo, useState } from 'react';

interface TrialBannerProps {
  planName: string;
  trialEndsAt: string;
  initialSecondsRemaining?: number;
  onExpired?: () => void;
}

export function TrialBanner({
  planName,
  trialEndsAt,
  initialSecondsRemaining,
  onExpired,
}: TrialBannerProps) {
  const targetTime = useMemo(() => new Date(trialEndsAt).getTime(), [trialEndsAt]);
  const [secondsRemaining, setSecondsRemaining] = useState(() => {
    if (typeof initialSecondsRemaining === 'number') {
      return initialSecondsRemaining;
    }
    return Math.max(Math.floor((targetTime - Date.now()) / 1000), 0);
  });

  useEffect(() => {
    if (secondsRemaining <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setSecondsRemaining((current) => {
        const next = Math.max(current - 1, 0);
        if (next === 0) {
          window.clearInterval(interval);
          onExpired?.();
        }
        return next;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [secondsRemaining, onExpired]);

  const countdown = formatCountdown(secondsRemaining);

  return (
    <aside className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-500">
            Trial in progress
          </span>
          <span className="text-sm font-semibold text-blue-900">
            {planName} • Ends {new Date(trialEndsAt).toLocaleString()}
          </span>
        </div>
        <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 shadow sm:mt-0">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" aria-hidden />
          {countdown}
        </span>
      </div>
      <p className="mt-2 text-xs text-blue-700">
        Activate your plan to prevent access interruptions once the trial ends.
      </p>
    </aside>
  );
}

function formatCountdown(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}


