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
    <aside className="rounded-2xl border border-blue-700 dark:border-blue-700 bg-neutral-100 dark:bg-neutral-500 px-4 py-3 text-sm text-blue-400 dark:text-blue-400 shadow-sm mb-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
            {planName} • Ends {new Date(trialEndsAt).toLocaleString()}
          </span>
        </div>
        <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-950 dark:bg-blue-950 px-3 py-1 text-xs font-semibold text-blue-400 sm:mt-0">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-blue-400 dark:bg-blue-400" aria-hidden />
          {countdown}
        </span>
      </div>
      <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-700">
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


