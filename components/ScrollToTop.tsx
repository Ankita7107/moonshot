"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    const handleChatToggle = (e: Event) => {
      setIsChatOpen((e as CustomEvent).detail);
    };
    window.addEventListener("chatbot-toggle", handleChatToggle);
    return () => window.removeEventListener("chatbot-toggle", handleChatToggle);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && !isChatOpen && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-[9999] w-12 h-12 bg-sky-500/90 backdrop-blur-md text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-sky-600 transition-all active:scale-90 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          <div className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-20 group-hover:opacity-40 pointer-events-none" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
