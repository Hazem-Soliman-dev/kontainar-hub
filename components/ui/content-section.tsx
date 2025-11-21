import { cn } from "@/lib/utils";

interface ContentSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  width?: "default" | "narrow" | "full";
}

export function ContentSection({
  children,
  className,
  containerClassName,
  width = "default",
  ...props
}: ContentSectionProps) {
  return (
    <section
      className={cn("w-full py-12 md:py-16 lg:py-24", className)}
      {...props}
    >
      <div
        className={cn(
          "mx-auto px-6",
          width === "default" && "max-w-7xl",
          width === "narrow" && "max-w-4xl",
          width === "full" && "max-w-full",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
