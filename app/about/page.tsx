"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

// Animated counter component
const AnimatedCounter = ({
  value,
  suffix = "",
  className = "",
}: {
  value: string;
  suffix?: string;
  className?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const hasPlus = value.includes("+");
  const hasPercent = value.includes("%");
  const isDecimal = value.includes(".");
  const isStatic = value.includes("/");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = numericValue / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= numericValue) {
              setCount(numericValue);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericValue]);

  const displayValue = isStatic ? value : (isDecimal ? count.toFixed(1) : Math.floor(count));

  return (
    <span ref={ref} className={className}>
      {isStatic ? value : `${displayValue}${hasPlus ? "+" : ""}${hasPercent ? "%" : ""}${suffix}`}
    </span>
  );
};

const stats = [
  { value: "10+", label: "Years" },
  { value: "3000+", label: "Projects" },
  { value: "20", label: "Global Offices" },
];

const values = [
  {
    icon: "🚀",
    title: "Quality First",
    desc: "No compromises on code standards.",
  },
  {
    icon: "📚",
    title: "Always Learning",
    desc: "Staying at the edge of the tech curve.",
  },
  {
    icon: "🎯",
    title: "Extreme Ownership",
    desc: "We treat your product as our own.",
  },
  {
    icon: "💬",
    title: "Radical Candor",
    desc: "Honest communication at every stage.",
  },
];

const trustMetrics = [
  { value: "95%", label: "Client Retention" },
  { value: "40%", label: "Faster Delivery Cycles" },
  { value: "99.9%", label: "Uptime Architectures" },
  { value: "24/7", label: "Support Availability" },
];

const processSteps = [
  {
    num: "01",
    title: "Discover",
    desc: "We align on business goals, users, and technical constraints before writing a single line of code.",
  },
  {
    num: "02",
    title: "Architect",
    desc: "We design scalable system architecture and a realistic roadmap with milestone-driven execution.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Agile sprints, continuous QA, and transparent updates keep quality high and timelines predictable.",
  },
  {
    num: "04",
    title: "Scale",
    desc: "After launch, we optimize performance, strengthen reliability, and support long-term growth.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-sky-50 to-white py-20 overflow-hidden animated-grid-bg">
        <div className="absolute top-10 left-[10%] h-24 w-24 rounded-full bg-sky-300/20 blur-2xl animate-float-slow" />
        <div className="absolute bottom-10 right-[10%] h-24 w-24 rounded-full bg-sky-200/20 blur-2xl animate-float-delay" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl font-extrabold text-slate-900 leading-tight mb-6"
            >
              Engineering Excellence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-slate-600 mb-4"
            >
              Moonshot Minds Tech was founded on a simple premise: that software
              should be beautiful, scalable, and inherently useful.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-slate-500 text-sm"
            >
              Founded in 2002 and headquartered in Craigieburn, Victoria, we
              specialize in architecting sophisticated software solutions that
              drive innovation, enhance efficiency, and create sustainable
              competitive advantages for enterprises across diverse industries.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-10 mt-8"
            >
              {stats.map((s) => (
                <motion.div variants={fadeIn} key={s.label}>
                  <p className="text-3xl font-extrabold text-sky-500 mb-1">
                    <AnimatedCounter value={s.value} />
                  </p>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image with enhanced dynamic animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative rounded-2xl h-80 overflow-hidden group perspective-1000 shadow-2xl"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateZ: [0, 2, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.1,
                rotateY: 5,
                rotateX: -5,
                transition: { duration: 0.4 },
              }}
              className="relative w-full h-full transform-style-3d"
            >
              <Image
                src="/moonshot_images/engineering-excellence.png"
                alt="Engineering Excellence"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:brightness-110"
              />

              {/* Dynamic Light Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />

              {/* Floating Tech Orbs */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/4 right-10 w-12 h-12 bg-sky-500/10 backdrop-blur-xl rounded-full border border-white/20 hidden lg:block"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="card card-hover">
            <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-sky-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Our Mission
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              To empower organizations with robust digital infrastructure and
              innovative software that fosters sustainable growth and solves
              complex global challenges.
            </p>
          </div>
          <div className="card card-hover">
            <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-sky-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Our Vision
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              To be the world&apos;s most trusted partner for engineering
              digital transformations, recognized for our commitment to quality,
              integrity, and future-proof innovation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="section-label">THE MOONSHOT WAY</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
            What Drives Us
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((v) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="card card-hover p-4 md:p-5"
              >
                <div className="text-4xl mb-3">{v.icon}</div>
                <h4 className="font-semibold text-slate-800 mb-1">{v.title}</h4>
                <p className="text-slate-500 text-xs">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="section-label">TRUST IN NUMBERS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Measured Impact, Not Just Promises
            </h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {trustMetrics.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeIn}
                className="card card-hover text-center"
              >
                <p className="text-3xl md:text-4xl font-extrabold text-sky-500 mb-2">
                  <AnimatedCounter value={item.value} />
                </p>
                <p className="text-sm text-slate-500">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label">HOW WE WORK</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Our Delivery Framework
            </h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {processSteps.map((step) => (
              <motion.div
                key={step.num}
                variants={fadeIn}
                className="card card-hover"
              >
                <p className="text-4xl font-extrabold text-sky-200 mb-3">
                  {step.num}
                </p>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 p-8 md:p-12"
          >
            <p className="section-label">CASE STUDY SNAPSHOT</p>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              FinTech Platform Modernization
            </h3>
            <div className="grid md:grid-cols-3 gap-5">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="card bg-white/80 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-xs tracking-widest uppercase text-slate-400 mb-2">
                  Problem
                </p>
                <p className="text-sm text-slate-600">
                  Legacy monolith slowed releases and caused frequent downtime
                  during peak transactions.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="card bg-white/80 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-xs tracking-widest uppercase text-slate-400 mb-2">
                  Solution
                </p>
                <p className="text-sm text-slate-600">
                  Re-architected into scalable services, implemented CI/CD, and
                  added automated test coverage.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="card bg-white/80 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-xs tracking-widest uppercase text-slate-400 mb-2">
                  Result
                </p>
                <p className="text-sm text-slate-600">
                  Release velocity increased by 40% and platform reliability
                  improved to 99.9% uptime.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-sky-500 rounded-3xl p-10 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Let&apos;s Build Your Next Growth Engine
            </h2>
            <p className="text-sky-100 max-w-2xl mx-auto mb-8">
              Talk to our team about your roadmap, architecture, and execution
              goals. We&apos;ll help shape the right strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-sky-600 font-semibold hover:bg-sky-50 transition-colors"
              >
                Book a Free Strategy Call
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/70 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
