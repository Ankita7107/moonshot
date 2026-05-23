"use client";
import React from "react";
import { motion } from "framer-motion";

interface DoodleProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

// 1. Organic Hand-Drawn Underline Doodle
export function DoodleUnderline({ children, className = "", color = "#eab308" }: DoodleProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        className="absolute left-0 top-[90%] w-full h-[15px] pointer-events-none overflow-visible"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 2,6 C 30,2 70,2 98,7 C 60,9 30,9 3,8"
          fill="transparent"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>
    </span>
  );
}

// 2. Organic Hand-Drawn Circular Doodle
export function DoodleCircle({ children, className = "", color = "#38bdf8" }: DoodleProps) {
  return (
    <span className={`relative inline-block px-2 py-0.5 ${className}`}>
      {children}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 10,50 C 8,20 40,8 85,12 C 105,15 95,85 50,92 C 12,94 5,75 11,48"
          fill="transparent"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
        />
      </svg>
    </span>
  );
}

// 3. Hand-Drawn Dynamic Arrow Doodle
export function DoodleArrow({ className = "", color = "#f43f5e", rotate = 0 }: { className?: string; color?: string; rotate?: number }) {
  return (
    <div className={`pointer-events-none ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 80 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Curving tail */}
        <motion.path
          d="M 5,42 Q 25,10 55,20 T 70,30"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        {/* Left head stroke */}
        <motion.path
          d="M 60,20 L 70,30 L 58,35"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.7, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
