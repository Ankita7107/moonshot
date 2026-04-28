"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Globe, Settings, Cloud, ChevronRight, Code, Database, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { value: "300+", label: "Successful Projects" },
  { value: "20+", label: "Global Offices" },
  { value: "200+", label: "Tech Experts" },
  { value: "4.9/5", label: "Customer Rating" },
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

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-sky-50 py-32 text-center overflow-hidden animated-grid-bg">
        <div className="absolute top-24 left-[12%] h-24 w-24 rounded-full bg-sky-300/20 blur-2xl animate-float-slow" />
        <div className="absolute bottom-24 right-[12%] h-28 w-28 rounded-full bg-sky-200/20 blur-2xl animate-float-delay" />
        {/* Floating Background Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] hidden md:flex w-16 h-16 bg-white rounded-2xl shadow-xl items-center justify-center text-sky-500"
        >
          <Code size={32} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 25, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-[15%] hidden md:flex w-16 h-16 bg-white rounded-2xl shadow-xl items-center justify-center text-sky-400"
        >
          <Database size={32} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -15, 0] }} 
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-40 right-[10%] hidden lg:flex w-12 h-12 bg-white rounded-xl shadow-lg items-center justify-center text-sky-300"
        >
          <Smartphone size={24} />
        </motion.div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6"
          >
            Innovation Through{" "}
            <span className="text-sky-500">Moonshot</span> Engineering
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
            <Link href="/contact" className="btn-primary hover-shine flex items-center justify-center gap-2 text-lg">
              Start Your Project <ArrowRight size={18} />
            </Link>
            <Link href="/services" className="btn-outline flex items-center justify-center gap-2 text-lg bg-white/50 backdrop-blur-sm">
              View Solutions
            </Link>
          </motion.div>
        </div>
        
        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-300/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-slate-100 bg-white relative">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
        >
          {stats.map((s) => (
            <motion.div variants={fadeIn} key={s.label} className="group cursor-default">
              <p className="text-5xl font-extrabold text-sky-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                {s.value}
              </p>
              <div className="w-8 h-1 bg-sky-100 mx-auto mb-3 rounded-full group-hover:w-12 group-hover:bg-sky-500 transition-all duration-300" />
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Services */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100/40 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label glow-text">OUR EXPERTISE</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Solutions for the Next Frontier</h2>
            <div className="w-16 h-1.5 bg-sky-500 mx-auto mt-6 rounded-full glow-card" />
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((s) => (
              <motion.div variants={fadeIn} key={s.title} className="card card-hover bg-white/80 backdrop-blur-sm border border-white/50">
                <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{s.title}</h3>
                <p className="text-slate-500 text-base mb-6 leading-relaxed">{s.desc}</p>
                <Link href="/services" className="text-sky-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all w-fit group">
                  Learn more <ChevronRight size={16} className="group-hover:text-sky-600" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Moonshot Minds */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
          >
            <motion.p variants={fadeIn} className="section-label">WHY MOONSHOT MINDS</motion.p>
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              We build tech that scales with your ambition
            </motion.h2>
            <ul className="space-y-8">
              {whyUs.map((item) => (
                <motion.li variants={fadeIn} key={item.title} className="flex gap-5 group cursor-default">
                  <div className="w-12 h-12 bg-sky-50 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm">
                    {item.icon}
                  </div>
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
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950 h-96 flex items-center justify-center relative shadow-2xl"
          >
            {/* Animated background lines for security card */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-center text-white/90 p-8 relative z-10"
            >
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
                <span className="text-5xl">🔐</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Enterprise Security</h3>
              <p className="text-slate-400">Military-grade protection for your data.</p>
            </motion.div>
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
            className="bg-sky-500 rounded-3xl p-12 text-center text-white relative overflow-hidden"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Ready to launch your next mission?</h2>
            <p className="text-sky-100 mb-8 max-w-2xl mx-auto relative z-10">
              Join dozens of industry leaders who trust us with their critical infrastructure and software innovation.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10 inline-block">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-sky-600 font-semibold px-7 py-3 rounded-xl hover:bg-sky-50 transition-colors">
                Consult Our Tech Experts <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}