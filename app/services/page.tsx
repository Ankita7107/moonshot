"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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
  Cpu,
  Database,
  Layout,
  MessageSquare,
  BarChart,
  RefreshCcw,
  Search,
  Code,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const services = [
  {
    id: "custom-web-solutions",
    icon: <Globe className="w-7 h-7" />,
    title: "WebCore",
    desc: "Scalable, high-performance web applications tailored to your business needs using cutting-edge frameworks.",
    features: ["Next.js/React", "SEO Optimized", "Microservices"],
  },
  {
    id: "enterprise-software",
    icon: <Settings className="w-7 h-7" />,
    title: "Enterprise ERP",
    desc: "Robust ERP, CRM, and internal tools designed to streamline complex business processes for large-scale organizations.",
    features: ["Scalable Architecture", "Legacy Integration", "24/7 Support"],
  },
  {
    id: "cloud-devops",
    icon: <Cloud className="w-7 h-7" />,
    title: "CloudPulse",
    desc: "Accelerate your deployment cycles with automated pipelines and scalable cloud infrastructure on AWS, Azure, or GCP.",
    features: ["AWS/Azure/GCP", "CI/CD Pipelines", "Auto-scaling"],
  },
  {
    id: "ai-machine-learning",
    icon: <Zap className="w-7 h-7" />,
    title: "CognitiveAI",
    desc: "Integrate intelligent automation and data insights into your product to stay ahead of the competition.",
    features: ["Predictive Analytics", "NLP Systems", "Computer Vision"],
  },
  {
    id: "cybersecurity",
    icon: <Shield className="w-7 h-7" />,
    title: "CyberShield",
    desc: "Protect your digital assets with enterprise-grade security audits, penetration testing, and compliance monitoring.",
    features: ["Vulnerability Audits", "Penetration Testing", "Compliance"],
  },
  {
    id: "mobile-app-development",
    icon: <Smartphone className="w-7 h-7" />,
    title: "SwiftMobile",
    desc: "Native and cross-platform mobile experiences that engage users and drive business growth.",
    features: ["iOS & Android", "React Native/Flutter", "High Performance"],
  },
  {
    id: "api-development-integration",
    icon: <Code className="w-7 h-7" />,
    title: "ConnectAPI",
    desc: "RESTful APIs, GraphQL services, and third-party integrations like payment gateways, SMS, and WhatsApp APIs.",
    features: ["REST/GraphQL", "Secure Auth", "High Throughput"],
  },
  {
    id: "devops-ci-cd-automation",
    icon: <Database className="w-7 h-7" />,
    title: "DevOpsAuto",
    desc: "Automated deployment pipelines using Docker, Kubernetes, Jenkins, and GitHub Actions for faster delivery.",
    features: ["Docker/K8s", "Jenkins/Actions", "Terraform"],
  },
  {
    id: "ui-ux-design",
    icon: <Layout className="w-7 h-7" />,
    title: "StudioUX",
    desc: "Modern, user-centric UI/UX design with wireframing, prototyping, and Figma-based design systems.",
    features: ["User Research", "Wireframing", "Prototyping"],
  },
  {
    id: "ai-chatbots-automation",
    icon: <MessageSquare className="w-7 h-7" />,
    title: "AutomateBOT",
    desc: "Smart AI-powered chatbots and workflow automation to improve customer engagement and reduce manual work.",
    features: ["24/7 Automation", "Multi-lingual", "CRM Integration"],
  },
  {
    id: "data-analytics-bi-dashboards",
    icon: <BarChart className="w-7 h-7" />,
    title: "DataLens",
    desc: "Interactive dashboards, real-time reporting, and business intelligence solutions for data-driven decisions.",
    features: ["PowerBI/Tableau", "Real-time Ops", "Data Mining"],
  },
  {
    id: "erp-crm-systems",
    icon: <RefreshCcw className="w-7 h-7" />,
    title: "UnifiedCRM",
    desc: "Fully customized ERP and CRM solutions for sales, HR, inventory, and customer management systems.",
    features: ["Custom Modules", "Data Analytics", "Workflows"],
  },
  {
    id: "software-testing-qa",
    icon: <Shield className="w-7 h-7" />,
    title: "QAguard",
    desc: "Manual and automated testing including performance, security, and regression testing for stable applications.",
    features: ["Unit/Integration", "Automated QA", "Load Testing"],
  },
  {
    id: "system-migration-services",
    icon: <Cloud className="w-7 h-7" />,
    title: "SwiftMigrate",
    desc: "Legacy system modernization, database migration, and cloud migration with zero downtime strategy.",
    features: ["Zero Downtime", "Data Integrity", "Legacy Modernization"],
  },
  {
    id: "saas-product-development",
    icon: <Zap className="w-7 h-7" />,
    title: "SaaSBuilder",
    desc: "Scalable multi-tenant SaaS platforms with subscription models and cloud-native architecture.",
    features: ["Multi-tenancy", "Stripe Billing", "High Availability"],
  },
];

const financeServices = [
  {
    id: "ledger",
    icon: <Banknote className="w-6 h-6" />,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-100",
    badge: "Enterprise Accounting",
    badgeStyle: "bg-sky-100 text-sky-700",
    title: "Ledger",
    desc: "Cloud accounting software designed to manage business books, track real-time cash flow, and simplify tax compliance.",
    features: ["Auto-Reconciliation", "Ledger Sync", "Tax Compliance"],
  },
  {
    id: "invoice",
    icon: <ShieldCheck className="w-6 h-6" />,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    badge: "Billing & Receivables",
    badgeStyle: "bg-green-100 text-green-700",
    title: "Invoice",
    desc: "Professional billing solutions that automate recurring invoicing, custom workflows, and global client payment portals.",
    features: ["Recurring Invoicing", "Client Portals", "Secure Gateways"],
  },
  {
    id: "expense",
    icon: <TrendingUp className="w-6 h-6" />,
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-100",
    badge: "Spend Management",
    badgeStyle: "bg-yellow-100 text-yellow-700",
    title: "Expense",
    desc: "Corporate spend auditing software with intelligent OCR receipt scanning, multi-level approvals, and card sync.",
    features: ["OCR Receipt Scanning", "Corporate Card Sync", "Auto-Approvals"],
  },
  {
    id: "stock",
    icon: <IndianRupee className="w-6 h-6" />,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
    badge: "Supply & Orders",
    badgeStyle: "bg-violet-100 text-violet-700",
    title: "StockControl",
    desc: "End-to-end cloud-native inventory and warehouse management system with real-time stock optimization.",
    features: ["Multi-Warehouse Tracking", "Stock Optimization", "Auto-Reordering"],
  },
  {
    id: "billing",
    icon: <Home className="w-6 h-6" />,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    badge: "SaaS Recurring Billing",
    badgeStyle: "bg-orange-100 text-orange-700",
    title: "Billing",
    desc: "Robust subscription engine offering multi-tiered pricing management, card dunning, and SaaS billing sync.",
    features: ["Multi-Tiered Plans", "Dunning Prevention", "Stripe Integration"],
  },
  {
    id: "payroll",
    icon: <BarChart2 className="w-6 h-6" />,
    iconColor: "text-fuchsia-600",
    iconBg: "bg-fuchsia-100",
    badge: "Salary & Benefits",
    badgeStyle: "bg-fuchsia-100 text-fuchsia-700",
    title: "Payroll",
    desc: "Automated payroll system managing compliant salaries, direct deposits, tax withholdings, and employee self-service dashboards.",
    features: ["Direct Deposits", "Automated Taxes", "Employee Portal"],
  },
];

const steps = [
  { num: "01", title: "Discovery", desc: "Understanding your vision and business requirements." },
  { num: "02", title: "Strategy", desc: "Planning the architecture and project roadmap." },
  { num: "03", title: "Execution", desc: "Agile development with continuous feedback loops." },
  { num: "04", title: "Launch", desc: "Deploying your solution with ongoing support." },
];

/* ─────────────────── SPOTLIGHT CARD ───────────────────────── */
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {hovered && (
        <div
          className="pointer-events-none absolute z-0 rounded-full transition-opacity duration-300"
          style={{
            width: 350, height: 350,
            background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
            left: pos.x - 175, top: pos.y - 175,
          }}
        />
      )}
      {children}
    </div>
  );
}

export default function ServicesPage() {
  const [showAll, setShowAll] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const techIndex = services.findIndex(
        (s) => (s.id || s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")) === hash
      );

      const financeIndex = financeServices.findIndex(
        (f) => (f.id || f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")) === hash
      );

      if (financeIndex >= 0) {
        // Finance cards साठी
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else if (techIndex >= 6) {
        // Index 6+ असलेल्या tech services साठी — आधी showAll true कर
        setShowAll(true);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 300); // ✅ 150 नाही — 300ms द्या कारण DOM render व्हायला वेळ लागतो
      } else if (techIndex >= 0) {
        // पहिल्या 6 tech services साठी
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  const displayedServices = showAll ? services : services.slice(0, 6);

  return (
    <>
      {/* ══════════════════ HERO ══════════════════ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative bg-gradient-to-br from-sky-50 to-white py-24 text-center overflow-hidden animated-grid-bg"
      >
        <div className="absolute top-8 left-[10%] h-24 w-24 rounded-full bg-sky-300/10 blur-3xl animate-float-slow" />
        <div className="absolute bottom-6 right-[10%] h-24 w-24 rounded-full bg-sky-200/10 blur-3xl animate-float-delay" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-6 border border-sky-100"
          >
            <Sparkles className="w-4 h-4 text-sky-500 animate-pulse" />
            <span className="text-sm text-slate-600 font-medium">Precision Engineering</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Our Services & <span className="text-sky-500">Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We provide end-to-end software development services using the latest
            technologies to help your business achieve digital excellence.
          </motion.p>
        </div>
      </motion.section>

      {/* ══════════════════ SERVICES GRID ══════════════════ */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {displayedServices.map((s, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                  key={s.title}
                  id={s.id}
                >
                  <SpotlightCard className="h-full rounded-3xl">
                    <div className="card card-hover h-full bg-white/80 backdrop-blur-sm border border-slate-100 hover:border-sky-200 p-8 flex flex-col group transition-all">
                      <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm">
                        {s.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">{s.title}</h3>
                      <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-grow">{s.desc}</p>

                      <div className="space-y-2 mb-8">
                        {s.features.map((f) => (
                          <div key={f} className="flex items-center gap-3 text-xs text-slate-500">
                            <div className="w-4 h-4 rounded-full bg-sky-50 flex items-center justify-center">
                              <CheckCircle size={10} className="text-sky-500" />
                            </div>
                            {f}
                          </div>
                        ))}
                      </div>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-sky-500 text-sm font-bold group/link hover:gap-3 transition-all"
                      >
                        Inquire Now <ArrowRight size={16} />
                      </Link>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {services.length > 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-16 flex justify-center"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="relative px-8 py-3 rounded-full border-2 border-sky-500 text-sky-600 font-bold hover:bg-sky-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />
                {showAll ? "Show Less" : "Explore All Services"}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════ FINANCE PRODUCTS ══════════════════ */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">FinTech Software Suites</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Cloud-native financial management software and enterprise FinTech products designed for scaling modern business operations.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {financeServices.map((f, i) => (
              <motion.div
                key={f.title}
                id={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={`w-12 h-12 ${f.iconBg} rounded-2xl flex items-center justify-center mb-6 ${f.iconColor} group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${f.badgeStyle} mb-4 inline-block uppercase tracking-wider`}>
                  {f.badge}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{f.desc}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {f.features.map((feat) => (
                    <span key={feat} className="badge text-[10px] uppercase tracking-wider font-bold">
                      {feat}
                    </span>
                  ))}
                </div>

                <Link href="/contact" className="text-sky-500 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Consult Experts <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ HOW WE WORK ══════════════════ */}
      <section className="py-20 bg-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">How We Work</h2>
          <p className="text-sky-200 mb-12">
            Our structured approach ensures project success every time.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="grid md:grid-cols-4 gap-6"
          >
            {steps.map((step) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
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