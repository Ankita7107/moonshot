"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Globe,
  Settings,
  Cloud,
  ChevronRight,
  Code,
  Database,
  Smartphone,
  Zap,
  Sparkles,
  ShieldCheck,
  Rocket,
  BarChart,
  Activity,
  Cpu,
  Settings2,
  Users,
  MousePointer2,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: "3000+", label: "Successful Projects" },
  { value: "20+", label: "Global Offices" },
  { value: "200+", label: "Tech Experts" },
  { value: "4.3+", label: "Customer Rating" },
];

const services = [
  {
    icon: <Globe className="w-6 h-6 text-sky-500" />,
    title: "Custom Web Solutions",
    desc: "Scalable, high-performance web applications tailored to your business needs using cutting-edge frameworks.",
  },
  {
    icon: <Settings className="w-6 h-6 text-sky-500" />,
    title: "Enterprise Software",
    desc: "Robust ERP, CRM, and internal tools designed to streamline complex business processes for large-scale organizations.",
  },
  {
    icon: <Cloud className="w-6 h-6 text-sky-500" />,
    title: "Cloud & DevOps",
    desc: "Accelerate your deployment cycles with automated pipelines and scalable cloud infrastructure on AWS, Azure, or GCP.",
  },
];

const whyUs = [
  {
    icon: "🚀",
    title: "Proven Expertise",
    desc: "Over 25  years of experience delivering 3000+ successful projects globally.",
  },
  {
    icon: "📊",
    title: "Agile Methodology",
    desc: "Fast iterations, transparent communication, and continuous delivery cycles.",
  },
  {
    icon: "👥",
    title: "Customer Centric",
    desc: "We don't just build software; we build solutions that solve real-world problems.",
  },
  {
    icon: "🔒",
    title: "Security First",
    desc: "Every line of code is written with security best practices to protect your data.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Typewriter effect component
const TypewriterText = ({
  text,
  speed = 100,
}: {
  text: string;
  speed?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};

// Animated counter component
const AnimatedCounter = ({
  value,
  suffix = "",
}: {
  value: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const hasPlus = value.includes("+");
  const isDecimal = value.includes(".");

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

  // Format the number properly (handle decimals)
  const displayValue = isDecimal ? count.toFixed(1) : Math.floor(count);

  return (
    <p
      ref={ref}
      className="text-5xl font-extrabold text-sky-500 mb-2 group-hover:scale-110 transition-transform duration-300"
    >
      {displayValue}
      {hasPlus && !isDecimal ? "+" : ""}
      {suffix}
    </p>
  );
};

// Staggered text reveal component
const StaggeredText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const words = text.split(" ");

  return (
    <span>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.1,
            ease: "easeOut",
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <motion.section className="relative bg-gradient-to-br from-slate-50 via-white to-sky-50 py-32 text-center overflow-hidden">
        {/* Enhanced floating particles with tech icons */}
        <div className="absolute top-24 left-[12%] h-24 w-24 rounded-full bg-sky-300/20 blur-2xl animate-float-slow" />
        <div className="absolute bottom-24 right-[12%] h-28 w-28 rounded-full bg-sky-200/20 blur-2xl animate-float-delay" />

        {/* More floating elements with enhanced animations */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] hidden md:flex w-16 h-16 bg-white rounded-2xl shadow-xl items-center justify-center text-sky-500 z-10"
        >
          <Code size={32} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 right-[15%] hidden md:flex w-16 h-16 bg-white rounded-2xl shadow-xl items-center justify-center text-sky-400 z-10"
        >
          <Database size={32} />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-40 right-[10%] hidden lg:flex w-12 h-12 bg-white rounded-xl shadow-lg items-center justify-center text-sky-300 z-10"
        >
          <Smartphone size={24} />
        </motion.div>

        {/* New floating tech icons */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute bottom-32 left-[20%] hidden lg:flex w-14 h-14 bg-gradient-to-br from-sky-100 to-white rounded-2xl shadow-lg items-center justify-center text-sky-400 z-10"
        >
          <Zap size={28} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 left-[5%] hidden xl:flex w-8 h-8 bg-sky-200/50 rounded-full blur-sm"
        />
        <motion.div
          animate={{ y: [0, -25, 0], rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-[8%] hidden xl:flex w-6 h-6 bg-sky-300/40 rounded-full blur-sm"
        />

        {/* Additional floating tech elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/4 right-[25%] hidden lg:flex w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg items-center justify-center text-sky-500 z-10"
        >
          <ShieldCheck size={20} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-1/3 left-[15%] hidden lg:flex w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg items-center justify-center text-sky-400 z-10"
        >
          <BarChart size={24} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 360],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
          className="absolute top-3/4 right-[5%] hidden xl:flex w-6 h-6 bg-sky-400/60 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, 15, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-1/2 left-[25%] hidden xl:flex w-8 h-8 bg-sky-300/50 rounded-full blur-sm"
        />

        {/* Animated gradient orb with parallax */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ y: parallaxY1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-sky-200/30 to-sky-400/20 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-4xl mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-6 border border-sky-100"
          >
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span className="text-sm text-slate-600">
              Next-Gen Development Studio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6"
          >
            Innovation Through{" "}
            <motion.span
              className="text-sky-500 inline-block"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            >
              <TypewriterText text="Moonshot" speed={150} />
            </motion.span>{" "}
            Engineering
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10"
          >
            Transforming complex business challenges into sleek, scalable
            software solutions. We partner with visionaries to build the future
            of tech.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="btn-primary hover-shine flex items-center justify-center gap-2 text-lg px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-200"
              >
                Start Your Project{" "}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 2 }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/services"
                className="btn-outline flex items-center justify-center gap-2 text-lg bg-white/50 backdrop-blur-sm px-8 py-3 rounded-xl border border-slate-200 hover:border-sky-300"
              >
                View Solutions
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative background blur with parallax */}
        <motion.div
          style={{ y: parallaxY2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-300/20 rounded-full blur-3xl -z-10 pointer-events-none"
        />
      </motion.section>

      {/* Stats with animated counters */}
      <section className="py-20 border-y border-slate-100 bg-white relative wave-divider">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
        >
          {stats.map((s, idx) => (
            <motion.div
              variants={fadeIn}
              key={s.label}
              className="group cursor-pointer"
              whileHover={{ y: -10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                className="relative"
                whileHover={{ rotate: [0, -2, 2, 0] }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedCounter value={s.value} />
                <motion.div
                  className="absolute inset-0 bg-sky-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100"
                  animate={false}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.div
                className="w-8 h-1 bg-sky-100 mx-auto mb-3 rounded-full group-hover:w-12 group-hover:bg-sky-500 transition-all duration-500"
                whileHover={{ scaleX: 1.5 }}
              />
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest group-hover:text-sky-500 transition-colors duration-300">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Dashboard / Control Center Section (Zoho Inspired) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Dashboard Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="dashboard-panel p-6 md:p-8">
                <div className="grid-pattern absolute inset-0 opacity-20" />

                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="status-pulse" />
                    <span className="text-white font-semibold tracking-wide">
                      LIVE CONTROL CENTER
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                </div>

                {/* Dashboard Widgets Grid */}
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="dashboard-widget col-span-2"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/60 text-xs font-medium uppercase tracking-widest">
                        Global Traffic
                      </span>
                      <Activity className="text-sky-400 w-4 h-4" />
                    </div>
                    <div className="h-24 w-full flex items-end gap-1 px-1">
                      {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          className="flex-1 bg-gradient-to-t from-sky-500/20 to-sky-400 rounded-t-sm"
                        />
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="dashboard-widget"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Cpu className="text-emerald-400 w-4 h-4" />
                      <span className="text-white/60 text-[10px] font-bold">
                        CPU LOAD
                      </span>
                    </div>
                    <div className="text-2xl font-mono text-white">
                      12.4<span className="text-white/30">%</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="dashboard-widget"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Settings2 className="text-amber-400 w-4 h-4" />
                      <span className="text-white/60 text-[10px] font-bold">
                        OPTIMIZATION
                      </span>
                    </div>
                    <div className="text-2xl font-mono text-white">
                      99.9<span className="text-white/30">%</span>
                    </div>
                  </motion.div>
                </div>

                {/* Floating metrics */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-6 top-1/4 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl z-20"
                >
                  <div className="text-[10px] text-white/50 font-bold mb-1">
                    HEALTH SCORE
                  </div>
                  <div className="text-sky-400 font-mono text-xl">
                    A+ EXCELLENT
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="section-label inline-flex items-center gap-2">
                  <BarChart className="w-4 h-4" /> TOTAL VISIBILITY
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  One Unified Command Center for Your Product
                </h2>
                <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                  Inspired by the world's most powerful business operating
                  systems, our Control Center provides real-time visibility into
                  your software's performance, health, and scalability metrics.
                </p>

                <div className="space-y-4">
                  {[
                    "Real-time resource monitoring",
                    "Automated performance scaling",
                    "Integrated security event tracking",
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-sky-50 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      </div>
                      <span className="text-slate-700 font-medium">{text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions by Role Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Built for Every Stakeholder
            </h2>
            <p className="text-slate-500">
              Solutions tailored to solve your specific challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                role: "For Founders",
                desc: "Build your MVP faster with scalable architecture that grows with your vision.",
                icon: <Rocket className="w-6 h-6" />,
              },
              {
                role: "For CTOs",
                desc: "Enterprise-grade security, code quality audits, and automated DevOps pipelines.",
                icon: <Cpu className="w-6 h-6" />,
              },
              {
                role: "For Product Managers",
                desc: "Data-driven insights, rapid prototyping, and seamless integration cycles.",
                icon: <Users className="w-6 h-6" />,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-sky-200 transition-all shadow-sm hover:shadow-xl group"
              >
                <div className="w-14 h-14 bg-slate-50 group-hover:bg-sky-500 group-hover:text-white rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {item.role}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
                <Link
                  href="/contact"
                  className="text-sky-500 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Learn more <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services with enhanced hover effects */}
      <section className="py-24 bg-slate-50 relative overflow-hidden wave-divider">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100/40 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.p
              className="section-label glow-text inline-flex items-center gap-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Rocket className="w-4 h-4" /> OUR EXPERTISE
            </motion.p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Solutions for the Next Frontier
            </h2>
            <motion.div
              className="w-16 h-1.5 bg-sky-500 mx-auto mt-6 rounded-full glow-card"
              animate={{ width: ["4rem", "6rem", "4rem"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((s, idx) => (
              <motion.div
                variants={fadeIn}
                key={s.title}
                className="card card-hover bg-white/80 backdrop-blur-sm border border-white/50 relative overflow-hidden group"
                onHoverStart={() => setHoveredService(idx)}
                onHoverEnd={() => setHoveredService(null)}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                {/* Animated gradient background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  initial={false}
                />
                <motion.div
                  className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm relative z-10"
                  animate={
                    hoveredService === idx
                      ? { scale: 1.1, rotate: 5 }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {s.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 relative z-10">
                  {s.title}
                </h3>
                <p className="text-slate-500 text-base mb-6 leading-relaxed relative z-10">
                  <StaggeredText text={s.desc} delay={0.2} />
                </p>
                <Link
                  href="/services"
                  className="text-sky-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all w-fit group relative z-10"
                >
                  Learn more
                  <motion.span
                    animate={hoveredService === idx ? { x: 5 } : { x: 0 }}
                  >
                    <ChevronRight
                      size={16}
                      className="group-hover:text-sky-600"
                    />
                  </motion.span>
                </Link>

                {/* Decorative corner accent */}
                <motion.div
                  className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-sky-100/50 to-transparent rounded-tl-3xl"
                  initial={{ opacity: 0 }}
                  animate={
                    hoveredService === idx ? { opacity: 1 } : { opacity: 0 }
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Moonshot Minds */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeIn}
              className="section-label inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> WHY MOONSHOT MINDS
            </motion.p>
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight"
            >
              We build tech that scales with your ambition
            </motion.h2>
            <ul className="space-y-8">
              {whyUs.map((item, idx) => (
                <motion.li
                  variants={fadeIn}
                  key={item.title}
                  className="flex gap-5 group cursor-default"
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-sky-50 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-3xl h-[450px] overflow-hidden group shadow-2xl"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.4 },
              }}
              className="relative w-full h-full"
            >
              <Image
                src="/moonshot_images/whymoonshot.png"
                alt="Why Moonshot Minds"
                fill
                priority
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Animated Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating Badge on Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                    <Rocket className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold uppercase tracking-wider">
                      Innovation
                    </p>
                    <p className="text-sky-200 text-[10px]">
                      Pioneering the Future
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Glossy Reflection Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Client Success Marquee (Zoho Inspired) */}
      <section className="py-20 border-y border-slate-100 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">
            TRUSTED BY INDUSTRY DISRUPTORS
          </p>
        </div>
        <div className="flex relative group">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 items-center whitespace-nowrap"
          >
            {[
              { name: "FinFlow", metric: "+45% Efficiency" },
              { name: "HealthSync", metric: "2M+ Users" },
              { name: "CloudScale", metric: "99.9% Uptime" },
              { name: "EduGrow", metric: "3x Growth" },
              { name: "SecureNet", metric: "Zero Breaches" },
              { name: "LogiSmart", metric: "30% Cost Save" },
              // Duplicate for infinite scroll
              { name: "FinFlow", metric: "+45% Efficiency" },
              { name: "HealthSync", metric: "2M+ Users" },
              { name: "CloudScale", metric: "99.9% Uptime" },
              { name: "EduGrow", metric: "3x Growth" },
              { name: "SecureNet", metric: "Zero Breaches" },
              { name: "LogiSmart", metric: "30% Cost Save" },
            ].map((client, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="relative px-8 py-5 bg-white rounded-xl border border-slate-100 group/client cursor-default min-w-[220px] text-center transition-all duration-300 hover:shadow-md hover:border-sky-100"
              >
                <span className="text-xl font-bold text-slate-800 group-hover/client:text-sky-600 transition-colors uppercase tracking-wider">
                  {client.name}
                </span>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl pointer-events-none"
                >
                  {client.metric}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
          >
            {/* Animated background particles */}
            {[...Array(6)].map((_, i) => {
              const xOffsets = [-150, 100, -50, 180, -200, 50];
              const yOffsets = [-100, 50, -150, 120, -50, 100];
              const leftPositions = [25, 65, 35, 75, 45, 80];
              const topPositions = [30, 40, 70, 25, 60, 50];
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
                  initial={{ x: xOffsets[i], y: yOffsets[i] }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 0.5, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut",
                  }}
                  style={{
                    left: `${leftPositions[i]}%`,
                    top: `${topPositions[i]}%`,
                  }}
                />
              );
            })}

            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 relative z-10"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Ready to launch your next mission?
            </motion.h2>
            <p className="text-sky-100 mb-8 max-w-2xl mx-auto relative z-10">
              Join dozens of industry leaders who trust us with their critical
              infrastructure and software innovation.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 inline-block"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-sky-600 font-semibold px-7 py-3 rounded-xl hover:bg-sky-50 transition-colors shadow-lg"
              >
                Consult Our Tech Experts
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </Link>
            </motion.div>

            {/* Floating icon decorations */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-4 left-4 opacity-20"
            >
              <Rocket size={48} />
            </motion.div>
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-4 right-4 opacity-20"
            >
              <Zap size={48} />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
