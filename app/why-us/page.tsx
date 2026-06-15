"use client";
import { CheckCircle, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
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
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-6 text-center md:text-left">
              Why Partners Choose Us
            </h1>
            <p className="text-slate-600 text-sm sm:text-lg text-center md:text-left">
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
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Decorative background element */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-sky-200/30 rounded-3xl blur-xl" />
          </div>
        </div>
      </section>

      {/* Feature Cards with Glow Effect */}
      <section className="py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {features.map((f) => (
            <motion.div
              variants={fadeIn}
              key={f.title}
              whileHover={{ y: -10 }}
              className="card text-center transition-all duration-300 bg-white/80 backdrop-blur-sm border-slate-100"
            >
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl shadow-sm group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-2 text-lg">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Security & Reliability with Floating Image */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight text-center md:text-left">
                Security & Reliability
              </h2>
              <p className="text-slate-500 text-sm sm:text-lg mb-8 leading-relaxed text-center md:text-left">
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
              className="space-y-4"
            >
              {securityPoints.map((p, i) => (
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  key={p}
                  className="flex items-center gap-4 text-slate-700 bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-default"
                >
                  <div className="w-8 h-8 bg-sky-50 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle size={18} className="text-sky-500" />
                  </div>
                  <span className="font-medium">{p}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative perspective-1000"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, -1, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.05, rotateY: -5 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-white transform-style-3d"
            >
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                alt="Security Interface"
                className="w-full h-64 sm:h-[450px] object-cover transition-all duration-500 hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </motion.div>

            {/* Background Accent */}
            <div className="absolute -inset-6 bg-sky-100/50 rounded-3xl -rotate-2 -z-10 blur-xl" />
          </motion.div>
        </div>
      </section>

      {/* Transparent Partnership with Drift Image */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 md:order-1"
          >
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-white"
              animate={{
                y: [0, 15, 0],
                rotate: [0, 1, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 5
              }}
            >
              <motion.div
                whileHover={{
                  x: [0, -15, 15, 0],
                  transition: { duration: 12, repeat: Infinity, ease: "linear" }
                }}
                className="w-full h-full"
              >
                <img
                  src="/moonshot_images/whypartners.png"
                  alt="Team Collaboration"
                  className="w-full h-64 sm:h-[450px] object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-transparent to-white/10" />
            </motion.div>

            {/* Glossy reflection */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
            />
          </motion.div>

          <div className="order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight text-center md:text-left">
                Transparent Partnership
              </h2>
              <p className="text-slate-500 text-sm sm:text-lg mb-8 leading-relaxed text-center md:text-left">
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
              className="space-y-4"
            >
              {partnerPoints.map((p, i) => (
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  key={p}
                  className="flex items-center gap-4 text-slate-700 bg-sky-50/50 p-4 rounded-xl border border-sky-100 hover:bg-sky-50 transition-colors cursor-default"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Clock size={18} className="text-sky-500" />
                  </div>
                  <span className="font-medium">{p}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>
    </>
  );
}
