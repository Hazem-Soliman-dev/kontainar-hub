"use client";

export function TrendingProductsSkeleton() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <div className="h-6 w-48 animate-pulse rounded bg-slate-200/80" />
        <div className="h-4 w-72 animate-pulse rounded bg-slate-200/60" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="space-y-3 rounded-xl border border-slate-200 bg-white/70 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-2">
                <div className="h-4 w-40 animate-pulse rounded bg-slate-200/70" />
                <div className="h-3 w-24 animate-pulse rounded bg-slate-200/60" />
              </div>
              <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200/80" />
            </div>
            <div className="h-12 w-full animate-pulse rounded bg-slate-200/60" />
            <div className="flex gap-3">
              <div className="h-3 w-28 animate-pulse rounded bg-slate-200/50" />
              <div className="h-3 w-24 animate-pulse rounded bg-slate-200/50" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

