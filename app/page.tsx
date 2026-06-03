"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Settings,
  Cloud,
  ChevronLeft,
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
  ExternalLink,
  Search,
  Layout,
  Code2,
  CheckCircle2,
  ArrowUp,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const stats = [
  { value: "3000+", label: "Successful Projects" },
  { value: "20+", label: "Global Offices" },
  { value: "200+", label: "Tech Experts" },
  { value: "4.3+", label: "Customer Rating" },
];

const services = [
  {
    icon: <Globe className="w-6 h-6 text-sky-500" />,
    title: "WebCore",
    desc: "Scalable, high-performance web applications tailored to your business needs using cutting-edge frameworks.",
  },
  {
    icon: <Settings className="w-6 h-6 text-sky-500" />,
    title: "Enterprise ERP",
    desc: "Robust ERP, CRM, and internal tools designed to streamline complex business processes for large-scale organizations.",
  },
  {
    icon: <Cloud className="w-6 h-6 text-sky-500" />,
    title: "CloudPulse",
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

const caseStudies = [
  {
    title: "Infinity Arthvishva",
    category: "Financial Services",
    result: "100% Digital",
    desc: "A comprehensive financial advisory platform offering seamless solutions across loans, insurance, and wealth management.",
    color: "from-blue-500 to-indigo-600",
    image: "/infinityfront.png",
  },
  {
    title: "Infinity HRMS",
    category: "Enterprise Software",
    result: "Automated Workflows",
    desc: "A powerful HR Management System designed to streamline HR operations, payroll, and employee lifecycle management.",
    color: "from-emerald-400 to-teal-600",
    image: "/moonshot_images/infinityhrms.png",
  },
  {
    title: "Raja-ji",
    category: "E-commerce & Retail",
    result: "Premium Shopping",
    desc: "An elegant e-commerce destination for exclusive wedding apparel, featuring premium sarees, traditional kurtas, and stylish blazers.",
    color: "from-rose-400 to-orange-500",
    image: "/rajaji.jpeg",
  },
  {
    title: "Quest Tours",
    category: "Travel & Tourism",
    result: "Discover Adventure",
    desc: "A premium travel and tourism platform designed to help travelers discover destinations, book packages, and plan voyages with ease.",
    color: "from-sky-400 to-blue-600",
    image: "/quest.jpeg",
  },
  {
    title: "Talent Connect India",
    category: "HR & Recruitment Tech",
    result: "AI Hiring Solutions",
    desc: "A powerful recruitment portal featuring AI-based calling workflows, verified candidate profiles, and seamless talent match capabilities.",
    color: "from-indigo-600 to-blue-700",
    image: "/talentconnectindia.PNG",
  },
];

const workProcess = [
  {
    step: "01",
    title: "Discovery & Strategy",
    desc: "We dive deep into your business goals, target audience, and technical requirements to build a solid roadmap.",
    icon: <Search className="w-6 h-6" />,
    color: "bg-blue-500",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    desc: "Our designers craft intuitive user experiences and interactive prototypes to visualize the end product.",
    icon: <Layout className="w-6 h-6" />,
    color: "bg-indigo-500",
  },
  {
    step: "03",
    title: "Agile Development",
    desc: "Our engineers build your solution using modern tech stacks with transparent, iterative delivery cycles.",
    icon: <Code2 className="w-6 h-6" />,
    color: "bg-sky-500",
  },
  {
    step: "04",
    title: "Quality Assurance",
    desc: "Rigorous testing across all devices and scenarios ensures your software is bug-free and high-performing.",
    icon: <CheckCircle2 className="w-6 h-6" />,
    color: "bg-emerald-500",
  },
  {
    step: "05",
    title: "Launch & Support",
    desc: "We ensure a smooth deployment and provide ongoing support to scale and evolve your product.",
    icon: <Rocket className="w-6 h-6" />,
    color: "bg-violet-500",
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
  const [currentCaseStudy, setCurrentCaseStudy] = useState(0);

  const caseStudiesRef = useRef<HTMLDivElement>(null);

  const scrollCaseStudies = (direction: "left" | "right") => {
    if (caseStudiesRef.current) {
      const { scrollLeft, clientWidth } = caseStudiesRef.current;
      const scrollAmount = clientWidth * 0.75;
      caseStudiesRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const nextCaseStudy = () => {
    setCurrentCaseStudy((prev) => (prev + 1) % caseStudies.length);
  };

  const prevCaseStudy = () => {
    setCurrentCaseStudy((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

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

      {/* Native AI Across All Your Business Section (Odoo Inspired) */}
      <section className="py-24 bg-gradient-to-b from-white via-sky-50/20 to-white relative overflow-hidden">
        {/* Playful background doodles & grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 mb-4"
            >
              <Sparkles className="w-4 h-4 text-sky-500 animate-pulse" />
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Unified Intelligence</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
            >
              Native AI across all your business.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 mt-6 leading-relaxed"
            >
              No clunky APIs or disconnected silos. Moonshot embeds deep cognitive agents directly into the code of your daily operations—helping every team make decisions at the speed of thought.
            </motion.p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {/* Card 1: E-Commerce */}
            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-sky-100 transition-all shadow-sm hover:shadow-xl group flex flex-col justify-between min-h-[440px] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500" />
                <div>
                  <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm shadow-sky-100">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Smart E-Commerce</h3>
                  <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full inline-block mb-4">
                    Autopilot Recommendations
                  </span>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    Hyper-personalized purchase triggers, autonomous SEO content generation, and live inventory demand predictions.
                  </p>
                </div>

                {/* Interactive Preview Widget */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mt-auto group-hover:bg-sky-50/50 group-hover:border-sky-100/50 transition-colors duration-300">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400 font-medium">Recommendation score</span>
                    <span className="text-sky-500 font-bold">99.4% Match</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-[10px] font-bold text-sky-600">
                      UI
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-slate-200 rounded-full w-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "94%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-sky-500"
                        />
                      </div>
                      <div className="h-1.5 bg-slate-200 rounded-full w-2/3 mt-2 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "70%" }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                          className="h-full bg-sky-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 2: ERP */}
            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-emerald-100 transition-all shadow-sm hover:shadow-xl group flex flex-col justify-between min-h-[440px] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500" />
                <div>
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm shadow-emerald-100">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Cognitive ERP</h3>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full inline-block mb-4">
                    Neural Supply Chain
                  </span>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    Intelligent resource allocation, self-healing logistic lines, and predictive equipment maintenance.
                  </p>
                </div>

                {/* Interactive Preview Widget */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mt-auto group-hover:bg-emerald-50/50 group-hover:border-emerald-100/50 transition-colors duration-300">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400 font-medium">Auto-scaling efficiency</span>
                    <span className="text-emerald-500 font-bold">+42.8%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">All Operations Optimal</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 3: HRMS */}
            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -8 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-purple-100 transition-all shadow-sm hover:shadow-xl group flex flex-col justify-between min-h-[440px] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500" />
                <div>
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 shadow-sm shadow-purple-100">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Intelligent HRMS</h3>
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full inline-block mb-4">
                    Predictive Talent Search
                  </span>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    Automated resume matching, predictive attrition models, and custom-generated candidate assessment journeys.
                  </p>
                </div>

                {/* Interactive Preview Widget */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mt-auto group-hover:bg-purple-50/50 group-hover:border-purple-100/50 transition-colors duration-300">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400 font-medium">Candidate Match Index</span>
                    <span className="text-purple-500 font-bold">98% Fit</span>
                  </div>
                  <div className="flex -space-x-2 overflow-hidden">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="h-6 w-6 rounded-full ring-2 ring-white bg-purple-200 flex items-center justify-center text-[8px] font-bold text-purple-700">
                        U{n}
                      </div>
                    ))}
                    <div className=" h-6 w-6 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">
                      +12
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 4: Finance */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-rose-100 transition-all shadow-sm hover:shadow-xl group flex flex-col justify-between min-h-[440px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500" />
              <div>
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 shadow-sm shadow-rose-100">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Automated Finance</h3>
                <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full inline-block mb-4">
                  Zero-Click Invoicing
                </span>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Continuous cash flow forecasting, AI instant invoice extraction, and automated ledger reconciliation.
                </p>
              </div>

              {/* Interactive Preview Widget */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mt-auto group-hover:bg-rose-50/50 group-hover:border-rose-100/50 transition-colors duration-300">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400 font-medium">Reconciliation Anomaly</span>
                  <span className="text-rose-500 font-bold">0 Detected</span>
                </div>
                <div className="w-full h-8 flex items-center">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20">
                    <motion.path 
                      d="M0,15 L20,12 L40,14 L60,8 L80,10 L100,2"
                      fill="transparent"
                      stroke="#f43f5e"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
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

      {/* Featured Case Studies Section */}
   
{/* Featured Case Studies Section - Sleek Horizontal Scroll Version */}
{/* Featured Case Studies Section - Sleek Horizontal Scroll Version */}
<section className="py-24 bg-white relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
      <div className="max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label inline-flex items-center gap-2"
        >
          <BarChart className="w-4 h-4" /> SUCCESS STORIES
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mt-2"
        >
          Engineering Excellence
        </motion.h2>
      </div>
      <div className="flex items-center gap-4 justify-between md:justify-end w-full md:w-auto">
     
      </div>
    </div>

    {/* Scroll Container with overlay arrows */}
    <div className="relative">
      {/* Left Arrow - overlaid on scroll container */}
      <button
        onClick={() => scrollCaseStudies("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full border border-slate-200 hover:border-sky-300 hover:text-sky-500 bg-white flex items-center justify-center shadow-md hover:shadow-xl transition-all active:scale-95 group"
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Right Arrow - overlaid on scroll container */}
      <button
        onClick={() => scrollCaseStudies("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-12 h-12 rounded-full border border-slate-200 hover:border-sky-300 hover:text-sky-500 bg-white flex items-center justify-center shadow-md hover:shadow-xl transition-all active:scale-95 group"
        aria-label="Scroll right"
      >
        <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      <div
        ref={caseStudiesRef}
        className="flex gap-8 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory scroll-smooth px-1"
      >
        {caseStudies.map((study, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
            className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col w-full md:w-[calc(50%-16px)] lg:w-[calc((100%-64px)/3)] flex-shrink-0 snap-start"
          >
            {/* Image Section */}
            <div className="relative h-64 w-full overflow-hidden">
              {study.image ? (
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-90`} />
              )}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-sky-600 text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {study.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">
                  {study.result}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">
                {study.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                {study.desc}
              </p>
              <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-slate-900 font-bold text-sm group/btn"
                >
                  View Case Study
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-sky-500 group-hover/btn:text-white transition-all">
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Our Process Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label inline-flex items-center gap-2"
            >
              <Activity className="w-4 h-4" /> OUR METHODOLOGY
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mt-4"
            >
              How We Turn Ideas Into Reality
            </motion.h2>
          </div>

          <div className="relative">
            {/* Desktop Timeline Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 hidden lg:block" />

            <div className="grid lg:grid-cols-5 gap-8 relative z-20">
              {workProcess.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Step Card */}
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col">
                    <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-sky-200/20 group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>

                    <span className="text-4xl font-black text-slate-100 group-hover:text-sky-50 transition-colors absolute top-6 right-8 pointer-events-none">
                      {item.step}
                    </span>

                    <h3 className="text-xl font-bold text-slate-800 mb-3 relative z-10">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 relative z-10">
                      {item.desc}
                    </p>
                  </div>

                  {/* Mobile Connector */}
                  {idx < workProcess.length - 1 && (
                    <div className="h-12 w-0.5 bg-slate-200 mx-auto my-4 lg:hidden" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
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
        <div className="flex relative group hover-pause-group">
          <div className="flex gap-12 items-center whitespace-nowrap animate-marquee hover-pause">
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
          </div>
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
