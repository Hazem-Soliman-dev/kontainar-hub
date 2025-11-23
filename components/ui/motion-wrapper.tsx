"use client";

import { motion, useInView, UseInViewOptions } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-in" | "scale-up" | "slide-right" | "slide-left";
  delay?: number;
  duration?: number;
  viewport?: UseInViewOptions;
  once?: boolean;
  enableOnMobile?: boolean;
}

export function MotionWrapper({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 0.5,
  viewport = { once: true, margin: "-50px" },
  enableOnMobile = false,
}: MotionWrapperProps) {
  const ref = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Check if we are on the client and if the screen is large enough
    const checkScreenSize = () => {
      if (enableOnMobile) {
        setShouldAnimate(true);
      } else {
        setShouldAnimate(window.innerWidth >= 1024); // lg breakpoint
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [enableOnMobile]);

  const variants = {
    "fade-up": {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    "fade-in": {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    "scale-up": {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-left": {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 },
    },
  };

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants[variant]}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
