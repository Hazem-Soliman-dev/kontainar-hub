import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  align?: "left" | "center";
}

export function PageHeader({
  title,
  description,
  children,
  className,
  backgroundImage,
  align = "center",
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-200",
        className
      )}
    >
      {/* Background Pattern/Image */}
      <div className="absolute inset-0 z-0 opacity-40">
        {backgroundImage ? (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] text-neutral-900 dark:text-neutral-200" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-24 lg:py-32">
        <div className="absolute top-5 left-0">
            <Breadcrumb />
        </div>
        <div
          className={cn(
            "max-w-3xl space-y-6",
            align === "center" ? "mx-auto text-center" : "text-left"
          )}
        >
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-neutral-900 dark:text-neutral-200 md:text-xl leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
