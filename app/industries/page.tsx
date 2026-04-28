"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const industries = [
  {
    title: "FinTech",
    desc: "Secure, compliant, and high-frequency trading platforms and digital banking solutions.",
    bg: "from-slate-900 to-blue-900",
    emoji: "💹",
    label: "FINTECH",
  },
  {
    title: "Healthcare",
    desc: "HIPAA-compliant patient portals, telemedicine apps, and electronic health records.",
    bg: "from-blue-800 to-cyan-700",
    emoji: "🏥",
    label: "HEALTHCARE",
  },
  {
    title: "E-Commerce",
    desc: "Omnichannel retail platforms with advanced inventory management and AI recommendations.",
    bg: "from-slate-900 to-indigo-900",
    emoji: "🛒",
    label: "E-COMMERCE",
  },
  {
    title: "Logistics",
    desc: "Real-time tracking, warehouse automation, and route optimization systems.",
    bg: "from-sky-700 to-slate-800",
    emoji: "🚢",
    label: "LOGISTICS",
  },
  {
    title: "Real Estate",
    desc: "End-to-end property management platforms, listing portals, and smart building automation solutions.",
    bg: "from-amber-800 to-orange-700",
    emoji: "🏢",
    label: "REAL ESTATE",
  },
  {
    title: "Education",
    desc: "Interactive LMS platforms, virtual classrooms, and AI-powered personalized learning experiences.",
    bg: "from-emerald-800 to-teal-700",
    emoji: "🎓",
    label: "EDTECH",
  },
  {
    title: "Manufacturing",
    desc: "IoT-enabled factory automation, predictive maintenance, and supply chain visibility systems.",
    bg: "from-zinc-800 to-slate-700",
    emoji: "🏭",
    label: "MANUFACTURING",
  },
  {
    title: "Travel & Hospitality",
    desc: "Booking engines, dynamic pricing tools, and guest experience platforms for hotels and airlines.",
    bg: "from-sky-800 to-cyan-900",
    emoji: "✈️",
    label: "TRAVEL",
  },

  // 🆕 NEW INDUSTRIES ADDED

  {
    title: "Banking & Insurance",
    desc: "Core banking systems, insurance automation, fraud detection, and financial risk platforms.",
    bg: "from-indigo-900 to-slate-900",
    emoji: "🏦",
    label: "BFSI",
  },
  {
    title: "Cybersecurity",
    desc: "Threat detection systems, identity management, SOC dashboards, and data protection solutions.",
    bg: "from-red-900 to-slate-900",
    emoji: "🛡️",
    label: "SECURITY",
  },
  {
    title: "Telecom",
    desc: "Network management, 5G systems, billing platforms, and customer support automation.",
    bg: "from-purple-800 to-slate-900",
    emoji: "📡",
    label: "TELECOM",
  },
  {
    title: "Automotive",
    desc: "EV systems, connected car platforms, fleet management, and smart mobility solutions.",
    bg: "from-gray-800 to-slate-900",
    emoji: "🚗",
    label: "AUTOMOTIVE",
  },
  {
    title: "Media & Entertainment",
    desc: "OTT platforms, streaming systems, content delivery networks, and recommendation engines.",
    bg: "from-pink-800 to-slate-900",
    emoji: "🎬",
    label: "MEDIA",
  },
  {
    title: "Food & Restaurant Tech",
    desc: "Food delivery apps, POS systems, restaurant management, and inventory tracking solutions.",
    bg: "from-orange-800 to-slate-900",
    emoji: "🍔",
    label: "FOOD TECH",
  },
  {
    title: "Government & Public Sector",
    desc: "e-Governance systems, digital identity platforms, tax portals, and citizen services.",
    bg: "from-green-900 to-slate-900",
    emoji: "🏛️",
    label: "GOVERNMENT",
  },
];

const tags = [
  "Digital Transformation",
  "Regulatory Compliance",
  "Process Automation",
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

export default function IndustriesPage() {
  const [showAll, setShowAll] = useState(false);
  const displayedIndustries = showAll ? industries : industries.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto px-4"
        >
          <p className="section-label">GLOBAL REACH</p>
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4">
            Industries We Serve
          </h1>
          <p className="text-slate-500">
            Deep domain expertise across various verticals, delivering
            mission-critical solutions that drive growth.
          </p>
        </motion.div>
      </section>

      {/* Industry Cards Grid */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          {displayedIndustries.map((ind, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
              key={ind.title}
              className="card p-0 overflow-hidden card-hover group"
            >
              {/* Image / Banner */}
              <div
                className={`bg-gradient-to-br ${ind.bg} h-52 flex flex-col items-center justify-center relative overflow-hidden`}
              >
                <motion.div className="text-5xl mb-2 transition-transform duration-500 group-hover:scale-125">
                  {ind.emoji}
                </motion.div>
                <p className="text-white/80 text-xs font-bold tracking-widest relative z-10">
                  {ind.label}
                </p>
              </div>
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {ind.title}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{ind.desc}</p>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                  {tags.map((tag) => (
                    <span key={tag} className="badge text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {industries.length > 6 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 flex justify-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full border-2 border-sky-500 text-sky-600 font-bold hover:bg-sky-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {showAll ? "Show Less" : "View All Industries"}
            </button>
          </motion.div>
        )}
      </section>

      {/* CTA */}
      <section className="py-20 bg-sky-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Looking for a tailored industry solution?
          </h2>
          <p className="text-slate-500 mb-8">
            Even if your industry isn&apos;t listed here, our versatile
            engineering team can adapt our methodologies to suit your unique
            challenges.
          </p>
          <Link href="/contact" className="btn-primary">
            Request Industry Case Study
          </Link>
        </div>
      </section>
    </>
  );
}
