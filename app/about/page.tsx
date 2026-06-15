"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Target,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Search,
  Layout,
  Terminal,
  TrendingUp,
  Rocket,
  BookOpen,
  MessageSquare,
} from "lucide-react";
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

  const displayValue = isStatic
    ? value
    : isDecimal
      ? count.toFixed(1)
      : Math.floor(count);

  return (
    <span ref={ref} className={className}>
      {isStatic
        ? value
        : `${displayValue}${hasPlus ? "+" : ""}${hasPercent ? "%" : ""}${suffix}`}
    </span>
  );
};

const stats = [
  { value: "25 ", label: "Years" },
  { value: "3000+", label: "Projects" },
  { value: "20", label: "Global Offices" },
];

const values = [
  {
    icon: Rocket,
    iconColor: "text-sky-500",
    bgClass: "bg-sky-50 group-hover:bg-sky-500",
    rotateClass: "group-hover:rotate-6",
    title: "Quality First",
    desc: "No compromises on code standards.",
  },
  {
    icon: BookOpen,
    iconColor: "text-emerald-500",
    bgClass: "bg-emerald-50 group-hover:bg-emerald-500",
    rotateClass: "group-hover:-rotate-6",
    title: "Always Learning",
    desc: "Staying at the edge of the tech curve.",
  },
  {
    icon: Target,
    iconColor: "text-rose-500",
    bgClass: "bg-rose-50 group-hover:bg-rose-500",
    rotateClass: "group-hover:rotate-6",
    title: "Extreme Ownership",
    desc: "We treat your product as our own.",
  },
  {
    icon: MessageSquare,
    iconColor: "text-violet-500",
    bgClass: "bg-violet-50 group-hover:bg-violet-500",
    rotateClass: "group-hover:-rotate-6",
    title: "Transparency",
    desc: "Honest communication at every stage.",
  },
];



const processSteps = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Discover",
    desc: "We align on business goals, users, and technical constraints before writing a single line of code.",
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Architect",
    desc: "We design scalable system architecture and a realistic roadmap with milestone-driven execution.",
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    title: "Build",
    desc: "Agile sprints, continuous QA, and transparent updates keep quality high and timelines predictable.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
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
              className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-6 text-center md:text-left"
            >
              Engineering Excellence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-slate-600 mb-4 text-center md:text-left text-sm sm:text-base"
            >
              Moonshot Minds Tech was founded on a simple premise: that software
              should be beautiful, scalable, and inherently useful.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-slate-500 text-xs sm:text-sm text-center md:text-left"
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
              className="flex flex-wrap gap-6 sm:gap-10 mt-8 justify-center md:justify-start"
            >
              {stats.map((s) => (
                <motion.div variants={fadeIn} key={s.label} className="text-center md:text-left min-w-[80px] sm:min-w-0">
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
            className="relative rounded-2xl h-64 sm:h-80 overflow-hidden group perspective-1000 shadow-2xl"
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
                scale: 1.02,
                rotateY: 3,
                rotateX: -3,
                transition: { duration: 0.4 },
              }}
              className="relative w-full h-full transform-style-3d"
            >
              <Image
                src="/moonshot_images/engineering-excellence.png"
                alt="Engineering Excellence"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                className="object-cover object-left transition-transform duration-500 group-hover:brightness-110"
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

      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="card card-hover group p-10 bg-white border-slate-100 shadow-sm"
          >
            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Our Mission
            </h3>
            <p className="text-slate-500 text-sm sm:text-lg leading-relaxed">
              To provide robust digital infrastructure and innovative software that support sustainable growth and solve complex challenges through engineering excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="card card-hover group p-10 bg-white border-slate-100 shadow-sm"
          >
            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 group-hover:-rotate-6">
              <Lightbulb className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Our Vision
            </h3>
            <p className="text-slate-500 text-sm sm:text-lg leading-relaxed">
              To be the world's most trusted digital transformation partner, recognized for quality, integrity, and future-ready innovation
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-slate-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label"
          >
            THE MOONSHOT WAY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-16"
          >
            Core Values That Drive Innovation
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((v, idx) => {
              const IconComponent = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="card bg-white p-6 sm:p-8 group hover:border-sky-200 transition-all shadow-sm hover:shadow-xl flex flex-col items-center text-center"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: idx * 0.5,
                    }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${v.bgClass} ${v.rotateClass} shadow-sm group-hover:text-white ${v.iconColor}`}
                  >
                    <IconComponent className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />
                  </motion.div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">
                    {v.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-100/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-sky-200/10 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sky-600 text-xs font-bold tracking-[0.3em] uppercase mb-4"
            >
              HOW WE DELIVER
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-slate-900"
            >
              Our Strategic Framework
            </motion.h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                variants={fadeIn}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative p-8 rounded-3xl bg-white border border-slate-100 shadow-sm group hover:shadow-xl hover:border-sky-200 transition-all duration-500"
              >
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-8 border border-sky-100 shadow-sm transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white group-hover:rotate-0"
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {/* Connecting arrow/line for desktop */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 translate-y-[-50%] text-slate-400 group-hover:text-sky-500 transition-colors z-20">
                    <ArrowRight size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-28 relative">
        {/* Decorative background drift */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-50/20 to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative rounded-3xl sm:rounded-[3rem] overflow-hidden bg-white border border-slate-100 p-6 sm:p-12 md:p-20 text-center shadow-[0_30px_60px_-15px_rgba(14,165,233,0.15)] hover:shadow-[0_40px_80px_-15px_rgba(14,165,233,0.2)] transition-all duration-700"
          >
            {/* Subtle animated shimmer bg */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-50/30 via-transparent to-sky-50/30 animate-shimmer opacity-20" />

            <div className="relative z-10">
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-20 h-20 sm:w-24 sm:h-24 bg-sky-50 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-8 sm:mb-10 shadow-sm border border-sky-100"
              >
                <RocketIcon className="w-10 h-10 sm:w-12 sm:h-12 text-sky-500" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight">
                Ready to engineer your <span className="text-sky-600">moonshot?</span>
              </h2>
              <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed font-medium">
                Whether you&apos;re a high-growth startup or an established
                enterprise, we provide the architectural Excellence and engineering
                talent to bring your vision to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl shadow-xl shadow-sky-500/25 transition-all text-base sm:text-lg"
                  >
                    Start Your Project <ArrowRight size={20} className="shrink-0" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/services"
                    className="w-full inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-white border-2 border-sky-500 text-sky-600 font-bold rounded-2xl transition-all text-base sm:text-lg hover:bg-sky-50"
                  >
                    View Our Solutions
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function RocketIcon({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.81.19-2.49A12.01 12.01 0 0 1 4.5 16.5z" />
      <path d="M7 15s-1 6-1 6" />
      <path d="M15 9s-6 1-6 1" />
      <path d="M9 15c.16-2.5 1-4.2 1.5-5 1-1.5 3-2.5 4.5-3 2.5-1 6-1 6-1s0 3.5-1 6c-.5 1.5-1.5 3.5-3 4.5-.8.5-2.5 1.34-5 1.5" />
      <path d="M15 9l5.5-5.5" />
      <path d="M9 15l-5.5 5.5" />
      <path d="M21 3s-3.5 0-6 1c-1.5.5-3.5 1.5-4.5 3-1.5 2-1.5 5.5-1.5 5.5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}
