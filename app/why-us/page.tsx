"use client";
import { CheckCircle, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    icon: "🚀",
    title: "Proven Expertise",
    desc: "Over 10+ years of experience delivering 200+ successful projects globally.",
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

const securityPoints = [
  "ISO 27001 compliant processes",
  "Regular penetration testing",
  "High-availability architectures",
  "Encrypted data storage",
];

const partnerPoints = [
  "Daily standups & progress tracking",
  "Real-time access to code repositories",
  "Collaborative design thinking sessions",
  "Flexible engagement models",
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function WhyUsPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-sky-50 to-white py-20 overflow-hidden animated-grid-bg">
        <div className="absolute top-10 left-[10%] h-24 w-24 rounded-full bg-sky-300/20 blur-2xl animate-float-slow" />
        <div className="absolute bottom-10 right-[12%] h-24 w-24 rounded-full bg-sky-200/20 blur-2xl animate-float-delay" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Why Partners Choose Us
            </h1>
            <p className="text-slate-600 text-lg">
              We go beyond coding. We become your strategic technology partner,
              ensuring every decision supports your long-term business goals.
            </p>
          </motion.div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 aspect-video"
            >
              <Image
                src="/moonshot_images/transperentpartnership.png"
                alt="Why Partners Choose Us"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Decorative background element */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-sky-200/30 rounded-3xl blur-xl" />
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-6"
        >
          {features.map((f) => (
            <motion.div
              variants={fadeIn}
              key={f.title}
              className="card card-hover text-center hover-shine"
            >
              <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
                {f.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Security & Reliability */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Security & Reliability
              </h2>
              <p className="text-slate-500 mb-8">
                In the digital age, trust is the primary currency. We implement
                rigorous security protocols from day one, ensuring your
                intellectual property and user data are always protected.
              </p>
            </motion.div>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {securityPoints.map((p) => (
                <motion.li
                  variants={fadeIn}
                  key={p}
                  className="flex items-center gap-3 text-slate-600"
                >
                  <CheckCircle size={18} className="text-sky-500 shrink-0" />{" "}
                  {p}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative background element */}
            <div className="absolute -inset-4 bg-sky-100/50 rounded-3xl -rotate-2" />

            {/* Main Image */}
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
              alt="Security Interface"
              className="relative rounded-2xl shadow-2xl border border-slate-200 object-cover w-full h-[400px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Transparent Partnership */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative Gradient Background */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-sky-100 to-slate-200 rounded-3xl rotate-1 opacity-70" />

            {/* Main Image: Collaborative Team */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white">
              <img
                src="/moonshot_images/whypartners.png"
                alt="Team Collaboration"
                className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
              />
              {/* Overlay Gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
          </motion.div>

          {/* TEXT SIDE */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Transparent Partnership
              </h2>
              <p className="text-slate-500 mb-8">
                No black boxes. You get full visibility into our development
                process via shared Jira boards, Slack channels, and weekly
                sprint reviews.
              </p>
            </motion.div>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {partnerPoints.map((p) => (
                <motion.li
                  variants={fadeIn}
                  key={p}
                  className="flex items-center gap-3 text-slate-600"
                >
                  <Clock size={18} className="text-sky-500 shrink-0" /> {p}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>
    </>
  );
}
