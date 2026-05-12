"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const industries = [
  {
    title: "FinTech",
    desc: "Secure, compliant, and high-frequency trading platforms and digital banking solutions.",
    bg: "from-slate-900 to-blue-900",
    image: "/moonshot_images/Fintech.jpg",
  },
  {
    title: "Healthcare",
    desc: "HIPAA-compliant patient portals, telemedicine apps, and electronic health records.",
    bg: "from-blue-800 to-cyan-700",
    image: "/moonshot_images/healthcare.webp",
  },
  {
    title: "E-Commerce",
    desc: "Omnichannel retail platforms with advanced inventory management and AI recommendations.",
    bg: "from-slate-900 to-indigo-900",
    image: "/moonshot_images/E-commerce.jpeg",
  },
  {
    title: "Logistics",
    desc: "Real-time tracking, warehouse automation, and route optimization systems.",
    bg: "from-sky-700 to-slate-800",
    image: "/moonshot_images/logistics.jpg",
  },
  {
    title: "Real Estate",
    desc: "End-to-end property management platforms, listing portals, and smart building automation solutions.",
    bg: "from-amber-800 to-orange-700",
    image: "/moonshot_images/real-estate.png",
  },
  {
    title: "Education",
    desc: "Interactive LMS platforms, virtual classrooms, and AI-powered personalized learning experiences.",
    bg: "from-emerald-800 to-teal-700",
    image: "/moonshot_images/education.jpeg",
  },
  {
    title: "Manufacturing",
    desc: "IoT-enabled factory automation, predictive maintenance, and supply chain visibility systems.",
    bg: "from-zinc-800 to-slate-700",
    image: "/moonshot_images/manufacturing.webp",
  },
  {
    title: "Travel & Hospitality",
    desc: "Booking engines, dynamic pricing tools, and guest experience platforms for hotels and airlines.",
    bg: "from-sky-800 to-cyan-900",
    image: "/moonshot_images/Travel & Hospitality.png",
  },
  {
    title: "Banking & Insurance",
    desc: "Core banking systems, insurance automation, fraud detection, and financial risk platforms.",
    bg: "from-indigo-900 to-slate-900",
    image: "/moonshot_images/banking.jpeg",
  },
  {
    title: "Cybersecurity",
    desc: "Threat detection systems, identity management, SOC dashboards, and data protection solutions.",
    bg: "from-red-900 to-slate-900",
    image: "/moonshot_images/Cybersecurity.webp",
  },
  {
    title: "Telecom",
    desc: "Network management, 5G systems, billing platforms, and customer support automation.",
    bg: "from-purple-800 to-slate-900",
    image: "/moonshot_images/telecom.jpg",
  },
  {
    title: "Automotive",
    desc: "EV systems, connected car platforms, fleet management, and smart mobility solutions.",
    bg: "from-gray-800 to-slate-900",
    image: "/moonshot_images/Automotive.jpg",
  },
  {
    title: "Media & Entertainment",
    desc: "OTT platforms, streaming systems, content delivery networks, and recommendation engines.",
    bg: "from-pink-800 to-slate-900",
    image: "/moonshot_images/Media & Entertainment.webp",
  },
  {
    title: "Food & Restaurant Tech",
    desc: "Food delivery apps, POS systems, restaurant management, and inventory tracking solutions.",
    bg: "from-orange-800 to-slate-900",
    image: "/moonshot_images/Food & Restaurant Tech.jpg",
  },
  {
    title: "Government & Public Sector",
    desc: "e-Governance systems, digital identity platforms, tax portals, and citizen services.",
    bg: "from-green-900 to-slate-900",
    image: "/moonshot_images/Government & Public Sector.jpg",
  },
];

const tags = [
  "Digital Transformation",
  "Regulatory Compliance",
  "Process Automation",
];

export default function IndustriesPage() {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const index = industries.findIndex(ind => ind.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === hash);
        if (index >= 6) {
          setShowAll(true);
          // Wait for the DOM to update before scrolling
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
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
    <>
      {/* HEADER */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white py-20 text-center overflow-hidden animated-grid-bg">
        <div className="absolute top-8 left-[14%] h-24 w-24 rounded-full bg-slate-200/20 blur-2xl animate-float-slow" />
        <div className="absolute bottom-8 right-[14%] h-24 w-24 rounded-full bg-slate-100/20 blur-2xl animate-float-delay" />
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
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: (index % 6) * 0.1,
                ease: [0.21, 0.45, 0.32, 0.9]
              }}
              key={ind.title}
              id={ind.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              className="card p-0 overflow-hidden card-hover group border-slate-100 hover:border-sky-200 scroll-mt-24"
            >
              <div className="h-56 relative overflow-hidden">
                {/* Background Image with dynamic drift animation */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  whileHover={{
                    scale: 1.15,
                    x: [0, -10, 10, 0],
                    transition: {
                      scale: { duration: 0.6 },
                      x: { duration: 10, repeat: Infinity, ease: "linear" }
                    }
                  }}
                >
                  <Image
                    src={ind.image}
                    alt={ind.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${ind.bg} opacity-60 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-40`}
                />

                {/* Visual Content Overlay (Optional: can add floating elements here) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.2, scale: 1 }}
                    className="w-24 h-24 rounded-full border-2 border-white/30 flex items-center justify-center"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-7 relative bg-white">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="text-sky-500 w-5 h-5" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">
                  {ind.title}
                </h3>
                <p className="text-slate-500 text-sm mb-5 line-clamp-2 leading-relaxed">
                  {ind.desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
                  {tags.map((tag) => (
                    <span key={tag} className="badge bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider font-semibold group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
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
              className="px-8 py-3 rounded-full border-2 border-sky-500 text-sky-600 font-bold hover:bg-sky-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover-shine"
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
          <Link href="/contact" className="btn-primary hover-shine">
            Request Industry Case Study
          </Link>
        </div>
      </section>
    </>
  );
}
