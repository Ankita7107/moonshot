"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  Settings,
  Cloud,
  Zap,
  Shield,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Banknote,
  ShieldCheck,
  TrendingUp,
  Home,
  BarChart2,
  IndianRupee,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    icon: <Globe className="w-7 h-7 text-sky-500" />,
    title: "Custom Web Solutions",
    desc: "Scalable, high-performance web applications tailored to your business needs using cutting-edge frameworks.",
  },
  {
    icon: <Settings className="w-7 h-7 text-sky-500" />,
    title: "Enterprise Software",
    desc: "Robust ERP, CRM, and internal tools designed to streamline complex business processes for large-scale organizations.",
  },
  {
    icon: <Cloud className="w-7 h-7 text-sky-500" />,
    title: "Cloud & DevOps",
    desc: "Accelerate your deployment cycles with automated pipelines and scalable cloud infrastructure on AWS, Azure, or GCP.",
  },
  {
    icon: <Zap className="w-7 h-7 text-sky-500" />,
    title: "AI & Machine Learning",
    desc: "Integrate intelligent automation and data insights into your product to stay ahead of the competition.",
  },
  {
    icon: <Shield className="w-7 h-7 text-sky-500" />,
    title: "Cybersecurity",
    desc: "Protect your digital assets with enterprise-grade security audits, penetration testing, and compliance monitoring.",
  },
  {
    icon: <Smartphone className="w-7 h-7 text-sky-500" />,
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile experiences that engage users and drive business growth.",
  },

  // 🆕 NEW SERVICES ADDED

  {
    icon: <Settings className="w-7 h-7 text-sky-500" />,
    title: "API Development & Integration",
    desc: "RESTful APIs, GraphQL services, and third-party integrations like payment gateways, SMS, and WhatsApp APIs.",
  },
  {
    icon: <Cloud className="w-7 h-7 text-sky-500" />,
    title: "DevOps & CI/CD Automation",
    desc: "Automated deployment pipelines using Docker, Kubernetes, Jenkins, and GitHub Actions for faster delivery.",
  },
  {
    icon: <Shield className="w-7 h-7 text-sky-500" />,
    title: "UI/UX Design",
    desc: "Modern, user-centric UI/UX design with wireframing, prototyping, and Figma-based design systems.",
  },
  {
    icon: <Zap className="w-7 h-7 text-sky-500" />,
    title: "AI Chatbots & Automation",
    desc: "Smart AI-powered chatbots and workflow automation to improve customer engagement and reduce manual work.",
  },
  {
    icon: <Cloud className="w-7 h-7 text-sky-500" />,
    title: "Data Analytics & BI Dashboards",
    desc: "Interactive dashboards, real-time reporting, and business intelligence solutions for data-driven decisions.",
  },
  {
    icon: <Settings className="w-7 h-7 text-sky-500" />,
    title: "ERP & CRM Systems",
    desc: "Fully customized ERP and CRM solutions for sales, HR, inventory, and customer management systems.",
  },
  {
    icon: <Shield className="w-7 h-7 text-sky-500" />,
    title: "Software Testing & QA",
    desc: "Manual and automated testing including performance, security, and regression testing for stable applications.",
  },
  {
    icon: <Cloud className="w-7 h-7 text-sky-500" />,
    title: "System Migration Services",
    desc: "Legacy system modernization, database migration, and cloud migration with zero downtime strategy.",
  },
  {
    icon: <Zap className="w-7 h-7 text-sky-500" />,
    title: "SaaS Product Development",
    desc: "Scalable multi-tenant SaaS platforms with subscription models and cloud-native architecture.",
  },
];

const financeServices = [
  {
    icon: <Banknote className="w-6 h-6" />,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-100",
    badge: "Personal & Business",
    badgeStyle: "bg-sky-100 text-sky-700",
    title: "Loans",
    desc: "Home, personal, and business loans with competitive rates and quick approvals.",
    link: "/loans",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    badge: "Life & General",
    badgeStyle: "bg-green-100 text-green-700",
    title: "Insurance",
    desc: "Secure your future with life, health, vehicle, and term insurance plans.",
    link: "/insurance",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-100",
    badge: "SIP & Lumpsum",
    badgeStyle: "bg-yellow-100 text-yellow-700",
    title: "Mutual Fund",
    desc: "Invest in top-rated equity, debt, and hybrid mutual fund schemes.",
    link: "/mutual-fund",
  },
  {
    icon: <IndianRupee className="w-6 h-6" />,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
    badge: "Stocks & Bonds",
    badgeStyle: "bg-violet-100 text-violet-700",
    title: "Investments",
    desc: "Grow wealth through equities, bonds, fixed deposits, and more.",
    link: "/investments",
  },
  {
    icon: <Home className="w-6 h-6" />,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    badge: "Residential & Commercial",
    badgeStyle: "bg-orange-100 text-orange-700",
    title: "Real Estate",
    desc: "Buy, sell, or invest in verified residential and commercial properties.",
    link: "/real-estate",
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    iconColor: "text-fuchsia-600",
    iconBg: "bg-fuchsia-100",
    badge: "Pre-IPO & Startups",
    badgeStyle: "bg-fuchsia-100 text-fuchsia-700",
    title: "Unlisted",
    desc: "Access exclusive pre-IPO shares and unlisted equity opportunities.",
    link: "/unlisted",
  },
];

const features = [
  "24/7 Monitoring",
  "Enterprise Scalability",
  "Seamless Integration",
];

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "Understanding your vision and business requirements in detail.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Planning the architecture, tech stack, and project roadmap.",
  },
  {
    num: "03",
    title: "Execution",
    desc: "Agile development with continuous feedback loops and testing.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "Deploying your solution and providing ongoing support.",
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
    transition: { staggerChildren: 0.15 },
  },
};

export default function ServicesPage() {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const index = services.findIndex(s => s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === hash);
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

  const displayedServices = showAll ? services : services.slice(0, 6);

  return (
    <>
      <section className="relative bg-gradient-to-br from-sky-50 to-white py-20 text-center overflow-hidden animated-grid-bg">
        <div className="absolute top-8 left-[14%] h-20 w-20 rounded-full bg-sky-300/20 blur-2xl animate-float-slow" />
        <div className="absolute bottom-6 right-[14%] h-20 w-20 rounded-full bg-sky-200/20 blur-2xl animate-float-delay" />
        <div className="max-w-3xl mx-auto px-4">
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl font-extrabold text-slate-900 mb-4"
          >
            Our Services & Solutions
          </motion.h1>

          {/* Animated Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-slate-500"
          >
            We provide end-to-end software development services using the latest
            technologies to help your business achieve digital excellence.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedServices.map((s, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                key={s.title}
                id={s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                className="card card-hover scroll-mt-24 group border-slate-100 hover:border-sky-200 transition-all duration-300"
              >
                <div className="flex gap-6">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    className="w-16 h-16 bg-gradient-to-br from-slate-50 to-white group-hover:from-slate-100 group-hover:to-white border border-transparent group-hover:border-sky-300 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all duration-500"
                  >
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {s.icon}
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-xl mb-2 group-hover:text-sky-600 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-5 leading-relaxed">{s.desc}</p>
                    <div className="grid grid-cols-1 gap-2 mb-6">
                      {features.map((f, i) => (
                        <motion.li
                          key={f}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (i * 0.1) }}
                          className="flex items-center gap-3 text-sm text-slate-500 list-none"
                        >
                          <div className="w-5 h-5 rounded-full bg-sky-50 flex items-center justify-center">
                            <CheckCircle size={12} className="text-sky-500" />
                          </div>
                          {f}
                        </motion.li>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sky-500 text-sm font-bold group/link"
                    >
                      Inquire for Quote
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </motion.span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {services.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 flex justify-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full border-2 border-sky-500 text-sky-600 font-bold hover:bg-sky-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover-shine"
            >
              {showAll ? "Show Less" : "View All Services"}
            </button>
          </motion.div>
        )}
      </section>

      {/* Finance Products */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Financial Products
            </h2>
            <p className="text-slate-500">
              Comprehensive financial solutions to grow and protect your wealth.
            </p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {financeServices.map((f) => (
              <motion.div
                variants={fadeIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                key={f.title}
                id={f.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                className="card card-hover scroll-mt-24"
              >
                <div
                  className={`w-11 h-11 ${f.iconBg} rounded-xl flex items-center justify-center mb-4`}
                >
                  <span className={f.iconColor}>{f.icon}</span>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${f.badgeStyle} mb-3 inline-block`}
                >
                  {f.badge}
                </span>
                <h3 className="font-bold text-slate-800 text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{f.desc}</p>
                <Link
                  href="/contact"
                  className="text-sky-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Explore <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">How We Work</h2>
          <p className="text-sky-200 mb-12">
            Our structured approach ensures project success every time.
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {steps.map((step) => (
              <motion.div
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                key={step.num}
                className="bg-white/10 rounded-2xl p-6 text-left border border-white/10 transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-5xl font-extrabold text-white/20 mb-3">
                  {step.num}
                </p>
                <h4 className="font-bold text-white mb-2">{step.title}</h4>
                <p className="text-sky-200 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}