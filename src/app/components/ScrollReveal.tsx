"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ✅ Chỉ import scrollreveal khi có window (client)
    if (typeof window === "undefined") return;
    import("scrollreveal").then((ScrollRevealLib) => {
      if (!ref.current) return;
      ScrollRevealLib.default().reveal(ref.current, {
        origin: "bottom",
        distance: "20px",
        duration: 600,
        delay: delay * 1000,
        easing: "ease-out",
        reset: false,
        opacity: 0,
        interval: 100,
        cleanup: true, // tránh giữ style cũ
      });
    });
  }, [delay]);

  return (
    <div ref={ref} className={`opacity-100 ${className}`}>
      {children}
    </div>
  );
}
