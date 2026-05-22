"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Globe2, Layers, Sparkles, Zap } from "lucide-react";

const industries = [
  {
    title: "FinTech",
    desc: "Secure, compliant, and high-frequency trading platforms and digital banking solutions.",
    bg: "from-slate-900 to-blue-900",
    image: "/moonshot_images/Fintech.jpg",
    tags: ["Blockchain", "Digital Payments", "Trading Systems"],
  },
  {
    title: "Healthcare",
    desc: "HIPAA-compliant patient portals, telemedicine apps, and electronic health records.",
    bg: "from-blue-800 to-cyan-700",
    image: "/moonshot_images/healthcare.webp",
    tags: ["HIPAA", "Telemedicine", "EHR Systems"],
  },
  {
    title: "E-Commerce",
    desc: "Omnichannel retail platforms with advanced inventory management and AI recommendations.",
    bg: "from-slate-900 to-indigo-900",
    image: "/moonshot_images/E-commerce.jpeg",
    tags: ["Omnichannel", "AI Personalization", "Inventory"],
  },
  {
    title: "Logistics",
    desc: "Real-time tracking, warehouse automation, and route optimization systems.",
    bg: "from-sky-700 to-slate-800",
    image: "/moonshot_images/logistics.jpg",
    tags: ["Supply Chain", "Fleet MGMT", "Warehouse AI"],
  },
  {
    title: "Real Estate",
    desc: "End-to-end property management platforms, listing portals, and smart building automation solutions.",
    bg: "from-amber-800 to-orange-700",
    image: "/moonshot_images/real-estate.png",
    tags: ["PropTech", "Smart Buildings", "CRM"],
  },
  {
    title: "Education",
    desc: "Interactive LMS platforms, virtual classrooms, and AI-powered personalized learning experiences.",
    bg: "from-emerald-800 to-teal-700",
    image: "/moonshot_images/education.jpeg",
    tags: ["LMS", "Virtual Classroom", "EdTech"],
  },
  {
    title: "Manufacturing",
    desc: "IoT-enabled factory automation, predictive maintenance, and supply chain visibility systems.",
    bg: "from-zinc-800 to-slate-700",
    image: "/moonshot_images/manufacturing.webp",
    tags: ["Industry 4.0", "IoT", "Automation"],
  },
  {
    title: "Travel & Hospitality",
    desc: "Booking engines, dynamic pricing tools, and guest experience platforms for hotels and airlines.",
    bg: "from-sky-800 to-cyan-900",
    image: "/moonshot_images/Travel & Hospitality.png",
    tags: ["Booking Engines", "SaaS", "Hospitality AI"],
  },
  {
    title: "Banking & Insurance",
    desc: "Core banking systems, insurance automation, fraud detection, and financial risk platforms.",
    bg: "from-indigo-900 to-slate-900",
    image: "/moonshot_images/banking.jpeg",
    tags: ["InsurTech", "Risk Analysis", "Banking"],
  },
  {
    title: "Cybersecurity",
    desc: "Threat detection systems, identity management, SOC dashboards, and data protection solutions.",
    bg: "from-red-900 to-slate-900",
    image: "/moonshot_images/Cybersecurity.webp",
    tags: ["SOC", "Identity MGMT", "Threat Detection"],
  },
  {
    title: "Telecom",
    desc: "Network management, 5G systems, billing platforms, and customer support automation.",
    bg: "from-purple-800 to-slate-900",
    image: "/moonshot_images/telecom.jpg",
    tags: ["5G", "Network Infra", "Automation"],
  },
  {
    title: "Automotive",
    desc: "EV systems, connected car platforms, fleet management, and smart mobility solutions.",
    bg: "from-gray-800 to-slate-900",
    image: "/moonshot_images/Automotive.jpg",
    tags: ["EV Systems", "Connected Cars", "Mobility"],
  },
  {
    title: "Media & Entertainment",
    desc: "OTT platforms, streaming systems, content delivery networks, and recommendation engines.",
    bg: "from-pink-800 to-slate-900",
    image: "/moonshot_images/Media & Entertainment.webp",
    tags: ["OTT", "Streaming", "Content AI"],
  },
  {
    title: "Food & Restaurant Tech",
    desc: "Food delivery apps, POS systems, restaurant management, and inventory tracking solutions.",
    bg: "from-orange-800 to-slate-900",
    image: "/moonshot_images/Food & Restaurant Tech.jpg",
    tags: ["Food Delivery", "POS", "Inventory"],
  },
  {
    title: "Government & Public Sector",
    desc: "e-Governance systems, digital identity platforms, tax portals, and citizen services.",
    bg: "from-green-900 to-slate-900",
    image: "/moonshot_images/Government & Public Sector.jpg",
    tags: ["e-Governance", "Digital ID", "Public Services"],
  },
];

const tags = ["Digital Transformation", "Regulatory Compliance", "Process Automation"];

export default function IndustriesPage() {
  const [showAll, setShowAll] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const index = industries.findIndex(ind => ind.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === hash);
        if (index >= 6) {
          setShowAll(true);
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const displayedIndustries = showAll ? industries : industries.slice(0, 6);

  return (
    <div className="bg-white overflow-hidden">
      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-sky-50 py-32 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(14,165,233,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(14,165,233,0.05) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-slate-100 mb-8"
          >
            <Globe2 className="w-4 h-4 text-sky-500" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Impact & Reach</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tighter"
          >
            Industries We <span className="text-sky-500">Empower</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Deep domain expertise across various verticals, delivering
            mission-critical solutions that drive growth and innovation.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════ GRID ══════════════════ */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedIndustries.map((ind, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              key={ind.title}
              id={ind.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              className="group relative bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 hover:border-sky-200 transition-all shadow-sm hover:shadow-2xl scroll-mt-24 flex flex-col h-full"
            >
              <div className="aspect-[4/3] relative overflow-hidden shrink-0">
                <Image
                  src={ind.image}
                  alt={ind.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  unoptimized
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity`} />
                
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-8 h-px bg-sky-400 group-hover:w-12 transition-all" />
                     <span className="text-sky-400 text-xs font-bold uppercase tracking-widest">Industry Solution</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{ind.title}</h3>
                </div>
              </div>

              <div className="p-8 bg-white flex flex-col flex-1 min-h-[250px]">
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  {ind.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-8 mt-auto pt-4 border-t border-slate-50">
                  {ind.tags.map((tag) => (
                    <span key={tag} className="badge text-[10px] uppercase tracking-wider font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/industries/${ind.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="inline-flex items-center justify-between w-full text-slate-900 font-bold group/btn pt-2"
                >
                  <span className="group-hover/btn:text-sky-600 transition-colors">Explore Sector</span>
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover/btn:bg-sky-500 group-hover/btn:text-white transition-all">
                    <ArrowRight size={18} />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {industries.length > 6 && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-10 py-4 rounded-full bg-sky-500 text-white font-bold hover:bg-sky-600 transition-all shadow-xl active:scale-95 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />
              {showAll ? "Show Less" : "Discover All Sectors"}
            </button>
          </div>
        )}
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section className="py-20 bg-sky-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Looking for a tailored industry solution?</h2>
          <p className="text-slate-500 mb-8">
            Even if your industry isn&apos;t listed here, our versatile engineering team can adapt our methodologies to suit your unique challenges.
          </p>
          <Link href="/contact" className="btn-primary inline-block">Request Industry Case Study</Link>
        </div>
      </section>
    </div>
  );
}
