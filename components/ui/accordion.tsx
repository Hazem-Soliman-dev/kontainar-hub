"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-4", className)} {...props} />
));
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 overflow-hidden transition-all hover:border-blue-500/30",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isOpen?: boolean }
>(({ className, children, isOpen, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex flex-1 items-center justify-between py-4 px-6 font-medium transition-all hover:text-blue-600 dark:hover:text-blue-400 [&[data-state=open]>svg]:rotate-180 w-full text-left",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-neutral-500" />
  </button>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { isOpen?: boolean }
>(({ className, children, isOpen, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0 px-6 text-neutral-600 dark:text-neutral-400 leading-relaxed">
      {children}
    </div>
  </div>
));
AccordionContent.displayName = "AccordionContent";

// Simple stateful wrapper for ease of use
interface SimpleAccordionProps {
  items: { title: string; content: string }[];
}

export function SimpleAccordion({ items }: SimpleAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <Accordion>
      {items.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionTrigger
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            data-state={openIndex === index ? "open" : "closed"}
          >
            {item.title}
          </AccordionTrigger>
          {openIndex === index && (
             <AccordionContent data-state="open">
                {item.content}
             </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
