"use client";
import Link from "next/link";
import { Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
const stats = [
  { value: "10+", label: "Years" },
  { value: "300+", label: "Projects" },
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

const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  // Keep easing strictly typed for framer-motion variants
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-sky-50 to-white py-20 overflow-hidden animated-grid-bg">
        <div className="absolute top-10 left-[10%] h-24 w-24 rounded-full bg-sky-300/20 blur-2xl animate-float-slow" />
        <div className="absolute bottom-10 right-[10%] h-24 w-24 rounded-full bg-sky-200/20 blur-2xl animate-float-delay" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeIn} className="text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Engineering Excellence
            </motion.h1>
            <motion.p variants={fadeIn} className="text-slate-600 mb-4">
              Moonshot Minds Tech was founded on a simple premise: that software
              should be beautiful, scalable, and inherently useful.
            </motion.p>
            <motion.p variants={fadeIn} className="text-slate-500 text-sm">
              Founded in 2024 and headquartered in Craigieburn, Victoria, we
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
                  <motion.p whileHover={{ scale: 1.07 }} className="text-3xl font-extrabold text-sky-500 mb-1">
                    {s.value}
                  </motion.p>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -1 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ y: -6, scale: 1.01 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl bg-gradient-to-br from-slate-800 to-sky-900 h-72 flex items-center justify-center hover-shine"
          >
            <div className="text-center text-white/70">
              <div className="text-7xl mb-3">🥽</div>
              <p className="text-sm font-medium">Future-Forward Tech</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="card card-hover"
          >
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
          </motion.div>
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="card card-hover"
          >
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
          </motion.div>
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
                  {item.value}
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
              <div className="card bg-white/80">
                <p className="text-xs tracking-widest uppercase text-slate-400 mb-2">
                  Problem
                </p>
                <p className="text-sm text-slate-600">
                  Legacy monolith slowed releases and caused frequent downtime
                  during peak transactions.
                </p>
              </div>
              <div className="card bg-white/80">
                <p className="text-xs tracking-widest uppercase text-slate-400 mb-2">
                  Solution
                </p>
                <p className="text-sm text-slate-600">
                  Re-architected into scalable services, implemented CI/CD, and
                  added automated test coverage.
                </p>
              </div>
              <div className="card bg-white/80">
                <p className="text-xs tracking-widest uppercase text-slate-400 mb-2">
                  Result
                </p>
                <p className="text-sm text-slate-600">
                  Release velocity increased by 40% and platform reliability
                  improved to 99.9% uptime.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-sky-500 rounded-3xl p-10 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Let&apos;s Build Your Next Growth Engine
            </h2>
            <p className="text-sky-100 max-w-2xl mx-auto mb-8">
              Talk to our team about your roadmap, architecture, and execution
              goals. We&apos;ll help shape the right strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-sky-600 font-semibold hover:bg-sky-50 transition-colors"
              >
                Book a Free Strategy Call
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/70 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Explore Services
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
