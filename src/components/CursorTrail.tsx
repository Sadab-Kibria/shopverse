"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export default function AdaptiveCursor() {
  const [isMoving, setIsMoving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false); // Device check
  
  const mousePos = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // 1. Check if the device has a precise pointer (mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsDesktop(mediaQuery.matches);
    setMounted(true);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isMoving) setIsMoving(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isMoving, cursorX, cursorY]);

  // Don't render anything on mobile, tablet, or during SSR
  if (!mounted || !isDesktop) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {isMoving && <CursorTrail mouseX={cursorX} mouseY={cursorY} />}
      </AnimatePresence>

      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isMoving ? 8 : 60,
          height: isMoving ? 8 : 60,
          backgroundColor: isMoving ? "rgb(37, 99, 235)" : "rgba(37, 99, 235, 0)",
          borderWidth: isMoving ? 0 : 1,
          borderColor: "rgb(37, 99, 235)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        className="fixed rounded-full border-solid shadow-[0_0_15px_rgba(37, 99, 235, 0.2)]"
      />
    </div>
  );
}

function CursorTrail({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const points = 6;
  return (
    <>
      {Array.from({ length: points }).map((_, i) => (
        <TrailNode key={i} index={i} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </>
  );
}

function TrailNode({ index, mouseX, mouseY }: { index: number; mouseX: any; mouseY: any }) {
  const x = useSpring(mouseX, { damping: 20 + index * 4, stiffness: 200 });
  const y = useSpring(mouseY, { damping: 20 + index * 4, stiffness: 200 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1 - index * 0.15, scale: 1 - index * 0.1 }}
      exit={{ opacity: 0, scale: 0 }}
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: 8 - index,
        height: 8 - index,
      }}
      className="fixed bg-blue-600/40 rounded-full"
    />
  );
}