import Image from "next/image";
import { Star } from "lucide-react";
import type { FeaturedStore } from "../../lib/mock/public";

interface StoreHeroProps {
  store: FeaturedStore;
}

export function StoreHero({ store }: StoreHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60">
      <div className="relative h-64 w-full md:h-80">
        <Image
          src={store.imageUrl}
          alt={store.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-50/90 dark:from-neutral-50/90 via-neutral-50/50 dark:via-neutral-50/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-900 sm:text-4xl">
                {store.name}
              </h1>
              <div className="mt-2 flex items-center gap-2 text-amber-300">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5"
                    strokeWidth={index < Math.round(store.rating) ? 0 : 1.5}
                    fill={
                      index < Math.round(store.rating) ? "currentColor" : "none"
                    }
                  />
                ))}
                <span className="ml-2 text-lg text-neutral-700 dark:text-neutral-700">
                  ({store.rating.toFixed(1)})
                </span>
              </div>
              <p className="mt-2 text-sm uppercase tracking-wide text-neutral-700 dark:text-neutral-700">
                {store.domain}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

