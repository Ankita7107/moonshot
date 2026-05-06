"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Settings, Cloud, ChevronRight, Code, Database, Smartphone, Zap, Sparkles, ShieldCheck, Rocket } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: "300+", label: "Successful Projects" },
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
  { icon: "🚀", title: "Proven Expertise", desc: "Over 10+ years of experience delivering 200+ successful projects globally." },
  { icon: "📊", title: "Agile Methodology", desc: "Fast iterations, transparent communication, and continuous delivery cycles." },
  { icon: "👥", title: "Customer Centric", desc: "We don't just build software; we build solutions that solve real-world problems." },
  { icon: "🔒", title: "Security First", desc: "Every line of code is written with security best practices to protect your data." },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// Animated counter component
  const AnimatedCounter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
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
        { threshold: 0.5 }
      );
      
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [numericValue]);
    
    // Format the number properly (handle decimals)
    const displayValue = isDecimal ? count.toFixed(1) : Math.floor(count);
    
    return (
      <p ref={ref} className="text-5xl font-extrabold text-sky-500 mb-2 group-hover:scale-110 transition-transform duration-300">
        {displayValue}{hasPlus && !isDecimal ? "+" : ""}{suffix}
      </p>
    );
  };

// Floating particle component
const FloatingParticle = ({ delay, duration, x, y, size }: { delay: number; duration: number; x: string; y: string; size: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0], y: [0, -100, -200], x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeOut" }}
    className={`absolute ${x} ${y} w-${size} h-${size} bg-sky-400/30 rounded-full blur-sm pointer-events-none`}
  />
);

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <motion.section 
        className="relative bg-gradient-to-br from-slate-50 via-white to-sky-50 py-32 text-center overflow-hidden"
      >
        {/* Enhanced floating particles */}
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
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-[15%] hidden md:flex w-16 h-16 bg-white rounded-2xl shadow-xl items-center justify-center text-sky-400 z-10"
        >
          <Database size={32} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-40 right-[10%] hidden lg:flex w-12 h-12 bg-white rounded-xl shadow-lg items-center justify-center text-sky-300 z-10"
        >
          <Smartphone size={24} />
        </motion.div>
        
        {/* New floating elements */}
        <motion.div 
          animate={{ y: [0, -30, 0], x: [0, 10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
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

        {/* Animated gradient orb */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
            <span className="text-sm text-slate-600">Next-Gen Development Studio</span>
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
              Moonshot
            </motion.span>{" "}
            Engineering
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10"
          >
            Transforming complex business challenges into sleek, scalable software solutions. We partner with visionaries to build the future of tech.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className="btn-primary hover-shine flex items-center justify-center gap-2 text-lg px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-200">
                Start Your Project <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 2 }}><ArrowRight size={18} /></motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/services" className="btn-outline flex items-center justify-center gap-2 text-lg bg-white/50 backdrop-blur-sm px-8 py-3 rounded-xl border border-slate-200 hover:border-sky-300">
                View Solutions
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-300/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      </motion.section>

      {/* Stats with animated counters */}
      <section className="py-20 border-y border-slate-100 bg-white relative">
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
              className="group cursor-default"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <AnimatedCounter value={s.value} />
              <div className="w-8 h-1 bg-sky-100 mx-auto mb-3 rounded-full group-hover:w-12 group-hover:bg-sky-500 transition-all duration-300" />
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Services with enhanced hover effects */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Solutions for the Next Frontier</h2>
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
                  className="absolute inset-0 bg-gradient-to-r from-sky-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  initial={false}
                />
                <motion.div 
                  className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm relative z-10"
                  animate={hoveredService === idx ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {s.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 relative z-10">{s.title}</h3>
                <p className="text-slate-500 text-base mb-6 leading-relaxed relative z-10">{s.desc}</p>
                <Link href="/services" className="text-sky-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all w-fit group relative z-10">
                  Learn more 
                  <motion.span animate={hoveredService === idx ? { x: 5 } : { x: 0 }}>
                    <ChevronRight size={16} className="group-hover:text-sky-600" />
                  </motion.span>
                </Link>
                
                {/* Decorative corner accent */}
                <motion.div 
                  className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-sky-100/50 to-transparent rounded-tl-3xl"
                  initial={{ opacity: 0 }}
                  animate={hoveredService === idx ? { opacity: 1 } : { opacity: 0 }}
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
            <motion.p variants={fadeIn} className="section-label inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> WHY MOONSHOT MINDS
            </motion.p>
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
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
                    <h4 className="text-lg font-bold text-slate-800 mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="rounded-3xl overflow-hidden bg-slate-900 h-96 flex items-center justify-center relative shadow-2xl"
          >
            <img
              src="/moonshot_images/whymoonshot.png"
              alt="Why Moonshot Minds"
              className="w-full h-full object-cover"
            />
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
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                initial={{ x: Math.random() * 400 - 200, y: Math.random() * 300 - 150 }}
                animate={{ 
                  y: [0, -100, 0],
                  opacity: [0, 0.5, 0],
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2, 
                  repeat: Infinity, 
                  delay: i * 0.5,
                  ease: "easeOut"
                }}
                style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` }}
              />
            ))}
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 relative z-10"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Ready to launch your next mission?
            </motion.h2>
            <p className="text-sky-100 mb-8 max-w-2xl mx-auto relative z-10">
              Join dozens of industry leaders who trust us with their critical infrastructure and software innovation.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="relative z-10 inline-block"
            >
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-sky-600 font-semibold px-7 py-3 rounded-xl hover:bg-sky-50 transition-colors shadow-lg">
                Consult Our Tech Experts 
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
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
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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