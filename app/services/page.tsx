"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Globe, Settings, Cloud, Zap, Shield, Smartphone,
  CheckCircle, ArrowRight, Banknote, ShieldCheck,
  TrendingUp, Home, BarChart2, IndianRupee, Database,
  Layout, MessageSquare, BarChart, RefreshCcw, Code,
  Sparkles, X, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ─── DATA ──────────────────────────────────────────────────── */
// const services = [
//   {
//     id: "custom-web-solutions", category: "Web",
//     icon: <Globe className="w-7 h-7" />,
//     title: "Web Development",
//     tagline: "Fast, scalable websites & web apps.",
//     desc: "Scalable, high-performance web applications tailored to your business needs using cutting-edge frameworks.",
//     features: ["Next.js / React", "SEO Optimized", "Microservices"],
//     detail: "We architect web platforms that handle millions of requests with zero compromise on speed. From complex SPA dashboards to content-heavy marketing sites — built to rank, built to convert.",
//   },
//   {
//     id: "enterprise-software", category: "Enterprise",
//     icon: <Settings className="w-7 h-7" />,
//     title: "ERP Solutions",
//     tagline: "Streamline your entire business.",
//     desc: "Robust ERP, CRM, and internal tools designed to streamline complex business processes for large-scale organizations.",
//     features: ["Scalable Architecture", "Legacy Integration", "24/7 Support"],
//     detail: "Custom ERP systems that replace disconnected tools with a single source of truth. We integrate with your existing infrastructure and modernize workflows without disrupting operations.",
//   },
//   {
//     id: "cloud-devops", category: "Cloud",
//     icon: <Cloud className="w-7 h-7" />,
//     title: "Cloud & DevOps",
//     tagline: "Deploy faster, scale smarter.",
//     desc: "Accelerate deployment cycles with automated pipelines and scalable cloud infrastructure on AWS, Azure, or GCP.",
//     features: ["AWS / Azure / GCP", "CI/CD Pipelines", "Auto-scaling"],
//     detail: "We design fault-tolerant cloud architectures with automated scaling, blue-green deployments, and infrastructure-as-code. Your team ships every day — safely.",
//   },
//   {
//     id: "ai-machine-learning", category: "AI",
//     icon: <Zap className="w-7 h-7" />,
//     title: "AI & Machine Learning",
//     tagline: "Smart solutions for complex problems.",
//     desc: "Integrate intelligent automation and data insights into your product to stay ahead of the competition.",
//     features: ["Predictive Analytics", "NLP Systems", "Computer Vision"],
//     detail: "From recommendation engines to computer vision pipelines, we embed AI at every layer of your product. Real models, real data, real results — not just demos.",
//   },
//   {
//     id: "cybersecurity", category: "Security",
//     icon: <Shield className="w-7 h-7" />,
//     title: "Cybersecurity",
//     tagline: "Protect your digital assets.",
//     desc: "Enterprise-grade security audits, penetration testing, and compliance monitoring for digital assets.",
//     features: ["Vulnerability Audits", "Penetration Testing", "Compliance"],
//     detail: "Our red team engineers simulate real-world attacks before hackers do. VAPT reports, OWASP compliance, GDPR/SOC2 readiness — complete security posture.",
//   },
//   {
//     id: "mobile-app-development", category: "Mobile",
//     icon: <Smartphone className="w-7 h-7" />,
//     title: "Mobile App Development",
//     tagline: "iOS & Android apps users love.",
//     desc: "Native and cross-platform mobile experiences that engage users and drive business growth.",
//     features: ["iOS & Android", "React Native / Flutter", "High Performance"],
//     detail: "60fps animations, offline-first architecture, deep OS integrations. We build apps that get 5-star reviews — from MVP to millions of daily users.",
//   },
//   {
//     id: "api-development-integration", category: "Web",
//     icon: <Code className="w-7 h-7" />,
//     title: "API Development & Integration",
//     tagline: "Connect every system seamlessly.",
//     desc: "RESTful APIs, GraphQL services, and third-party integrations like payment gateways, SMS, and WhatsApp APIs.",
//     features: ["REST / GraphQL", "Secure Auth", "High Throughput"],
//     detail: "We design APIs that are versioned, documented, and built to last. Payment gateways, WhatsApp Business, SMS — every integration wired securely with rate limiting and monitoring.",
//   },
//   {
//     id: "devops-ci-cd-automation", category: "Cloud",
//     icon: <Database className="w-7 h-7" />,
//     title: "DevOps & CI/CD Automation",
//     tagline: "From code to production, automatically.",
//     desc: "Automated deployment pipelines using Docker, Kubernetes, Jenkins, and GitHub Actions for faster delivery.",
//     features: ["Docker / K8s", "Jenkins / Actions", "Terraform"],
//     detail: "Full GitOps workflows with environment promotion, automated rollbacks, and infra drift detection. Every commit goes from code to production with confidence.",
//   },
//   {
//     id: "ui-ux-design", category: "Design",
//     icon: <Layout className="w-7 h-7" />,
//     title: "UI/UX Design",
//     tagline: "Beautiful designs that convert.",
//     desc: "Modern, user-centric UI/UX design with wireframing, prototyping, and Figma-based design systems.",
//     features: ["User Research", "Wireframing", "Prototyping"],
//     detail: "We run user research, heatmaps, A/B tests, and usability studies to back every design decision. Figma design systems that scale across your entire product suite.",
//   },
//   {
//     id: "ai-chatbots-automation", category: "AI",
//     icon: <MessageSquare className="w-7 h-7" />,
//     title: "AI Chatbots & Automation",
//     tagline: "Automate support & workflows 24/7.",
//     desc: "Smart AI-powered chatbots and workflow automation to improve customer engagement and reduce manual work.",
//     features: ["24/7 Automation", "Multi-lingual", "CRM Integration"],
//     detail: "LLM-powered bots that resolve Tier-1 support, qualify leads, and trigger workflows. Multi-language support and seamless CRM handoff when humans are needed.",
//   },
//   {
//     id: "data-analytics-bi-dashboards", category: "Data",
//     icon: <BarChart className="w-7 h-7" />,
//     title: "Data Analytics & BI",
//     tagline: "Turn raw data into clear decisions.",
//     desc: "Interactive dashboards, real-time reporting, and business intelligence solutions for data-driven decisions.",
//     features: ["PowerBI / Tableau", "Real-time Ops", "Data Mining"],
//     detail: "Custom BI dashboards with live data pipelines. We turn raw databases into executive-ready insights — drill-downs, anomaly alerts, and forecast models included.",
//   },
//   {
//     id: "erp-crm-systems", category: "Enterprise",
//     icon: <RefreshCcw className="w-7 h-7" />,
//     title: "ERP & CRM Systems",
//     tagline: "One system for your whole business.",
//     desc: "Fully customized ERP and CRM solutions for sales, HR, inventory, and customer management systems.",
//     features: ["Custom Modules", "Data Analytics", "Workflows"],
//     detail: "We build CRMs that fit your actual sales process — not the other way around. Custom pipelines, automated follow-ups, inventory sync, and reporting in one unified system.",
//   },
//   {
//     id: "software-testing-qa", category: "Security",
//     icon: <Shield className="w-7 h-7" />,
//     title: "Software Testing & QA",
//     tagline: "Ship bug-free, every time.",
//     desc: "Manual and automated testing including performance, security, and regression testing for stable applications.",
//     features: ["Unit / Integration", "Automated QA", "Load Testing"],
//     detail: "Cypress, Playwright, JMeter — full coverage across unit, integration, E2E, and load. Zero regressions in production with our CI-integrated test suites.",
//   },
//   {
//     id: "system-migration-services", category: "Cloud",
//     icon: <Cloud className="w-7 h-7" />,
//     title: "System Migration",
//     tagline: "Move to modern with zero downtime.",
//     desc: "Legacy system modernization, database migration, and cloud migration with zero downtime strategy.",
//     features: ["Zero Downtime", "Data Integrity", "Legacy Modernization"],
//     detail: "We've migrated monoliths to microservices, Oracle to PostgreSQL, on-prem to cloud — all with dual-run strategies ensuring zero data loss and zero downtime.",
//   },
//   {
//     id: "saas-product-development", category: "Enterprise",
//     icon: <Zap className="w-7 h-7" />,
//     title: "SaaS Product Development",
//     tagline: "Build your SaaS from idea to launch.",
//     desc: "Scalable multi-tenant SaaS platforms with subscription models and cloud-native architecture.",
//     features: ["Multi-tenancy", "Stripe Billing", "High Availability"],
//     detail: "We build SaaS from scratch — auth, multi-tenancy, subscription billing, usage metering, and admin dashboards. Architected to support your first customer and your ten-thousandth.",
//   },
// ];

// const financeServices = [
//   {
//     id: "ledger", icon: <Banknote className="w-6 h-6" />,
//     iconColor: "text-sky-600", iconBg: "bg-sky-100",
//     badge: "Enterprise Accounting", badgeStyle: "bg-sky-100 text-sky-700",
//     title: "Accounting Software",
//     desc: "Accounting software designed to manage business books, track real-time cash flow, and simplify tax compliance.",
//     features: ["Auto-Reconciliation", "Ledger Sync", "Tax Compliance"],
//   },
//   {
//     id: "invoice", icon: <ShieldCheck className="w-6 h-6" />,
//     iconColor: "text-green-600", iconBg: "bg-green-100",
//     badge: "Billing & Receivables", badgeStyle: "bg-green-100 text-green-700",
//     title: "Invoicing & Billing",
//     desc: "Professional billing solutions that automate recurring invoicing, custom workflows, and global client payment portals.",
//     features: ["Recurring Invoicing", "Client Portals", "Secure Gateways"],
//   },
//   {
//     id: "expense", icon: <TrendingUp className="w-6 h-6" />,
//     iconColor: "text-yellow-600", iconBg: "bg-yellow-100",
//     badge: "Spend Management", badgeStyle: "bg-yellow-100 text-yellow-700",
//     title: "Expense Management",
//     desc: "Corporate spend auditing software with intelligent OCR receipt scanning, multi-level approvals, and card sync.",
//     features: ["OCR Receipt Scanning", "Corporate Card Sync", "Auto-Approvals"],
//   },
//   {
//     id: "stock", icon: <IndianRupee className="w-6 h-6" />,
//     iconColor: "text-violet-600", iconBg: "bg-violet-100",
//     badge: "Supply & Orders", badgeStyle: "bg-violet-100 text-violet-700",
//     title: "Inventory Management",
//     desc: "End-to-end cloud-native inventory and warehouse management system with real-time stock optimization.",
//     features: ["Multi-Warehouse Tracking", "Stock Optimization", "Auto-Reordering"],
//   },
//   {
//     id: "billing", icon: <Home className="w-6 h-6" />,
//     iconColor: "text-orange-600", iconBg: "bg-orange-100",
//     badge: "SaaS Recurring Billing", badgeStyle: "bg-orange-100 text-orange-700",
//     title: "Subscription Billing",
//     desc: "Robust subscription engine offering multi-tiered pricing management, card dunning, and SaaS billing sync.",
//     features: ["Multi-Tiered Plans", "Dunning Prevention", "Stripe Integration"],
//   },
//   {
//     id: "payroll", icon: <BarChart2 className="w-6 h-6" />,
//     iconColor: "text-fuchsia-600", iconBg: "bg-fuchsia-100",
//     badge: "Salary & Benefits", badgeStyle: "bg-fuchsia-100 text-fuchsia-700",
//     title: "Payroll Management",
//     desc: "Automated payroll system managing compliant salaries, direct deposits, tax withholdings, and employee self-service dashboards.",
//     features: ["Direct Deposits", "Automated Taxes", "Employee Portal"],
//   },
// ];
const services = [
  {
    id: "custom-web-solutions", category: "Web",
    icon: <Globe className="w-7 h-7" />,
    title: "Web Development",
    tagline: "Fast, scalable websites & web apps.",
    desc: "Your website is your first impression. We build fast, beautiful, and easy-to-find websites that turn visitors into paying customers.",
    features: ["Next.js / React", "SEO Optimized", "Microservices"],
    detail: "Whether you need a marketing website, a customer portal, or a complex web app — we build it to load fast, rank on Google, and grow with your business. No slowdowns, no crashes, just results.",
  },
  {
    id: "enterprise-software", category: "Enterprise",
    icon: <Settings className="w-7 h-7" />,
    title: "ERP Solutions",
    tagline: "Streamline your entire business.",
    desc: "Replace 10 different tools with one smart system. Manage your teams, operations, and data from a single place — built exactly for your business.",
    features: ["Scalable Architecture", "Legacy Integration", "24/7 Support"],
    detail: "We build custom ERP systems that connect every department — HR, finance, inventory, sales — into one unified platform. Your existing tools stay, we just make everything work together seamlessly.",
  },
  {
    id: "cloud-devops", category: "Cloud",
    icon: <Cloud className="w-7 h-7" />,
    title: "Cloud & DevOps",
    tagline: "Deploy faster, scale smarter.",
    desc: "Your software runs 24/7 without downtime, scales automatically during peak traffic, and costs only what you actually use.",
    features: ["AWS / Azure / GCP", "CI/CD Pipelines", "Auto-scaling"],
    detail: "We move your business to the cloud and set up systems that automatically handle traffic spikes, recover from failures, and deploy updates without interrupting your users. More uptime, less headache.",
  },
  {
    id: "ai-machine-learning", category: "AI",
    icon: <Zap className="w-7 h-7" />,
    title: "AI & Machine Learning",
    tagline: "Smart solutions for complex problems.",
    desc: "Let AI handle repetitive decisions so your team can focus on what matters. Predict trends, automate tasks, and get smarter insights from your own data.",
    features: ["Predictive Analytics", "NLP Systems", "Computer Vision"],
    detail: "From predicting customer churn to automating quality checks on a production line — we build AI that solves real business problems. Not just tech demos, but tools your team actually uses every day.",
  },
  {
    id: "cybersecurity", category: "Security",
    icon: <Shield className="w-7 h-7" />,
    title: "Cybersecurity",
    tagline: "Protect your digital assets.",
    desc: "We find the holes in your system before hackers do. Protect your customer data, avoid costly breaches, and stay compliant with industry regulations.",
    features: ["Vulnerability Audits", "Penetration Testing", "Compliance"],
    detail: "Our security experts attack your systems the same way real hackers would — then fix every weakness they find. You get a full report, a clear action plan, and the peace of mind that your business is protected.",
  },
  {
    id: "mobile-app-development", category: "Mobile",
    icon: <Smartphone className="w-7 h-7" />,
    title: "Mobile App Development",
    tagline: "iOS & Android apps users love.",
    desc: "Give your customers an app they'll actually use — smooth, fast, and available on both iPhone and Android. From idea to App Store in record time.",
    features: ["iOS & Android", "React Native / Flutter", "High Performance"],
    detail: "We design and build mobile apps that feel native, work offline, and keep users coming back. Whether it's your first MVP or a full-scale product with millions of users — we've done it before.",
  },
  {
    id: "api-development-integration", category: "Web",
    icon: <Code className="w-7 h-7" />,
    title: "API Development & Integration",
    tagline: "Connect every system seamlessly.",
    desc: "Make your tools talk to each other. Connect payment gateways, WhatsApp, SMS, or any third-party service directly into your product — no manual work needed.",
    features: ["REST / GraphQL", "Secure Auth", "High Throughput"],
    detail: "We build the invisible connections that make your software powerful. Razorpay, Stripe, WhatsApp Business, Shiprocket — every integration built securely, documented clearly, and monitored 24/7.",
  },
  {
    id: "devops-ci-cd-automation", category: "Cloud",
    icon: <Database className="w-7 h-7" />,
    title: "DevOps & CI/CD Automation",
    tagline: "From code to production, automatically.",
    desc: "Ship new features to your users every day without fear. We automate the entire process from writing code to going live — safely and instantly.",
    features: ["Docker / K8s", "Jenkins / Actions", "Terraform"],
    detail: "Every code change is automatically tested, reviewed, and deployed. If something breaks, it rolls back on its own. Your developers focus on building — not fixing deployment problems at 2am.",
  },
  {
    id: "ui-ux-design", category: "Design",
    icon: <Layout className="w-7 h-7" />,
    title: "UI/UX Design",
    tagline: "Beautiful designs that convert.",
    desc: "Design that doesn't just look good — it guides users exactly where you want them to go. Less confusion, more conversions, happier customers.",
    features: ["User Research", "Wireframing", "Prototyping"],
    detail: "We study how real users interact with your product, identify where they get stuck, and redesign those moments. Every screen is tested, every button placement is intentional — because good design is good business.",
  },
  {
    id: "ai-chatbots-automation", category: "AI",
    icon: <MessageSquare className="w-7 h-7" />,
    title: "AI Chatbots & Automation",
    tagline: "Automate support & workflows 24/7.",
    desc: "Answer customer questions instantly, qualify leads automatically, and handle routine tasks around the clock — without hiring extra staff.",
    features: ["24/7 Automation", "Multi-lingual", "CRM Integration"],
    detail: "Our AI bots handle the repetitive stuff — order status, FAQs, lead qualification — in any language, at any hour. When a human touch is needed, it hands off seamlessly to your team with full context.",
  },
  {
    id: "data-analytics-bi-dashboards", category: "Data",
    icon: <BarChart className="w-7 h-7" />,
    title: "Data Analytics & BI",
    tagline: "Turn raw data into clear decisions.",
    desc: "Stop guessing. See exactly what's working in your business with live dashboards that turn your data into simple, actionable insights.",
    features: ["PowerBI / Tableau", "Real-time Ops", "Data Mining"],
    detail: "We connect to your databases, clean your data, and build dashboards your entire team can actually understand. Spot trends early, catch problems before they grow, and make confident decisions backed by real numbers.",
  },
  {
    id: "erp-crm-systems", category: "Enterprise",
    icon: <RefreshCcw className="w-7 h-7" />,
    title: "ERP & CRM Systems",
    tagline: "One system for your whole business.",
    desc: "Never lose a lead or miss a follow-up again. A custom CRM and ERP built around how your business actually works — not the other way around.",
    features: ["Custom Modules", "Data Analytics", "Workflows"],
    detail: "We map your exact sales process, then build a system around it. Automated follow-ups, real-time inventory sync, HR workflows, and financial reporting — all in one place, tailored entirely to your team.",
  },
  {
    id: "software-testing-qa", category: "Security",
    icon: <Shield className="w-7 h-7" />,
    title: "Software Testing & QA",
    tagline: "Ship bug-free, every time.",
    desc: "Catch bugs before your customers do. We thoroughly test your software so every release goes out clean, stable, and exactly as expected.",
    features: ["Unit / Integration", "Automated QA", "Load Testing"],
    detail: "We test everything — from individual features to how your app behaves under thousands of simultaneous users. Automated test suites run on every update, so bugs never sneak into production again.",
  },
  {
    id: "system-migration-services", category: "Cloud",
    icon: <Cloud className="w-7 h-7" />,
    title: "System Migration",
    tagline: "Move to modern with zero downtime.",
    desc: "Upgrade your old, slow systems to modern technology without losing a single hour of business or a single record of data.",
    features: ["Zero Downtime", "Data Integrity", "Legacy Modernization"],
    detail: "We've moved businesses from outdated on-premise servers to the cloud, from old databases to modern ones — all while keeping operations running. Your users never notice a thing, but your team notices everything.",
  },
  {
    id: "saas-product-development", category: "Enterprise",
    icon: <Zap className="w-7 h-7" />,
    title: "SaaS Product Development",
    tagline: "Build your SaaS from idea to launch.",
    desc: "Have a SaaS idea? We build the entire product — from login screen to billing system — ready to onboard your first paying customer.",
    features: ["Multi-tenancy", "Stripe Billing", "High Availability"],
    detail: "We handle every layer of your SaaS: user authentication, multiple account tiers, subscription billing, usage tracking, and admin dashboards. Built to handle your first customer — and scale to your ten-thousandth.",
  },
];

const financeServices = [
  {
    id: "ledger", icon: <Banknote className="w-6 h-6" />,
    iconColor: "text-sky-600", iconBg: "bg-sky-100",
    badge: "Enterprise Accounting", badgeStyle: "bg-sky-100 text-sky-700",
    title: "Accounting Software",
    desc: "Know exactly where your money is at any moment. Our accounting software keeps your books clean, taxes ready, and cash flow visible — without the spreadsheet chaos.",
    features: ["Auto-Reconciliation", "Ledger Sync", "Tax Compliance"],
  },
  {
    id: "invoice", icon: <ShieldCheck className="w-6 h-6" />,
    iconColor: "text-green-600", iconBg: "bg-green-100",
    badge: "Billing & Receivables", badgeStyle: "bg-green-100 text-green-700",
    title: "Invoicing & Billing",
    desc: "Send professional invoices in seconds, get paid faster, and never chase a payment manually again. Recurring billing runs itself.",
    features: ["Recurring Invoicing", "Client Portals", "Secure Gateways"],
  },
  {
    id: "expense", icon: <TrendingUp className="w-6 h-6" />,
    iconColor: "text-yellow-600", iconBg: "bg-yellow-100",
    badge: "Spend Management", badgeStyle: "bg-yellow-100 text-yellow-700",
    title: "Expense Management",
    desc: "Snap a receipt, submit in one tap. Managers approve instantly, finance teams reconcile automatically. No more lost receipts or delayed reimbursements.",
    features: ["OCR Receipt Scanning", "Corporate Card Sync", "Auto-Approvals"],
  },
  {
    id: "stock", icon: <IndianRupee className="w-6 h-6" />,
    iconColor: "text-violet-600", iconBg: "bg-violet-100",
    badge: "Supply & Orders", badgeStyle: "bg-violet-100 text-violet-700",
    title: "Inventory Management",
    desc: "Always know what's in stock, what's running low, and what to reorder — across every warehouse, in real time. Stop losing money to overstocking or stockouts.",
    features: ["Multi-Warehouse Tracking", "Stock Optimization", "Auto-Reordering"],
  },
  {
    id: "billing", icon: <Home className="w-6 h-6" />,
    iconColor: "text-orange-600", iconBg: "bg-orange-100",
    badge: "SaaS Recurring Billing", badgeStyle: "bg-orange-100 text-orange-700",
    title: "Subscription Billing",
    desc: "Charge customers automatically every month, handle upgrades and downgrades without effort, and never lose revenue to a failed payment.",
    features: ["Multi-Tiered Plans", "Dunning Prevention", "Stripe Integration"],
  },
  {
    id: "payroll", icon: <BarChart2 className="w-6 h-6" />,
    iconColor: "text-fuchsia-600", iconBg: "bg-fuchsia-100",
    badge: "Salary & Benefits", badgeStyle: "bg-fuchsia-100 text-fuchsia-700",
    title: "Payroll Management",
    desc: "Pay your team on time, every time — with automatic tax deductions, payslips, and compliance handled for you. Employees check everything from their own portal.",
    features: ["Direct Deposits", "Automated Taxes", "Employee Portal"],
  },
];
const steps = [
  { num: "01", title: "Discovery", desc: "Deep-dive into your vision, goals, and technical landscape.", icon: "🔍" },
  { num: "02", title: "Strategy", desc: "Architecture planning, tech stack selection, and project roadmap.", icon: "🗺️" },
  { num: "03", title: "Execution", desc: "Agile sprints with weekly demos and continuous feedback loops.", icon: "⚙️" },
  { num: "04", title: "Launch", desc: "Production deployment with monitoring, docs, and ongoing support.", icon: "🚀" },
];

const categories = ["All", "Web", "Mobile", "AI", "Cloud", "Enterprise", "Security", "Design", "Data"];



/* ─── SPOTLIGHT CARD ────────────────────────────────────────── */
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={`relative overflow-hidden ${className}`}>
      {hovered && (
        <div className="pointer-events-none absolute z-0 rounded-full transition-opacity duration-300"
          style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)", left: pos.x - 200, top: pos.y - 200 }} />
      )}
      {children}
    </div>
  );
}

/* ─── TILT CARD ─────────────────────────────────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
    setTilt({ x, y });
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`, transition: "transform 0.15s ease" }}
      className={className}>
      {children}
    </div>
  );
}

/* ─── SERVICE MODAL ─────────────────────────────────────────── */
function ServiceModal({ service, onClose }: { service: typeof services[0]; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}>
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", duration: 0.4 }}
          className="relative bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-sky-100"
          onClick={e => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <X size={16} className="text-slate-500" />
          </button>
          <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 text-sky-500">
            {service.icon}
          </div>
          <span className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-2 block">{service.category}</span>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-1">{service.title}</h3>
          <p className="text-sky-500 font-semibold text-sm mb-4 italic">"{service.tagline}"</p>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.detail}</p>
          <div className="space-y-2 mb-8">
            {service.features.map(f => (
              <div key={f} className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle size={14} className="text-sky-500 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
          <Link href="/contact"
            className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 rounded-2xl transition-colors">
            Start a Project <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}



/* ─── MAIN PAGE ─────────────────────────────────────────────── */
export default function ServicesPage() {
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.75]);
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.97]);

  const filtered = services.filter(s => activeCategory === "All" || s.category === activeCategory);
  const displayedServices = showAll ? filtered : filtered.slice(0, 6);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const techIndex = services.findIndex(s => s.id === hash);
      const financeIndex = financeServices.findIndex(f => f.id === hash);
      if (financeIndex >= 0) {
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 100);
      } else if (techIndex >= 6) {
        setShowAll(true);
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 300);
      } else if (techIndex >= 0) {
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <>
      {/* ── PROGRESS BAR ── */}
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-sky-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }} />

      {/* ══════════════════ HERO ══════════════════ */}
      <motion.section style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative bg-gradient-to-br from-sky-50 via-white to-slate-50 py-28 text-center overflow-hidden">

        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#0ea5e9 1px,transparent 1px),linear-gradient(90deg,#0ea5e9 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Floating blobs */}
        <div className="absolute top-12 left-[8%] h-40 w-40 rounded-full bg-sky-400/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-12 right-[8%] h-40 w-40 rounded-full bg-sky-300/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-sky-100/40 blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
        

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
            Our Services &{" "}
            <span className="text-sky-500">Solutions</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            End-to-end software development using the latest technologies —
            helping your business achieve true digital excellence.
          </motion.p>
        </div>
      </motion.section>

      {/* ══════════════════ SERVICES GRID ══════════════════ */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">





          {/* Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {displayedServices.map((s, index) => (
                <motion.div layout key={s.id}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, delay: (index % 6) * 0.07 }}
                  id={s.id}>
                  <TiltCard className="h-full">
                    <SpotlightCard className="h-full rounded-3xl">
                      <div
                        onClick={() => setSelectedService(s)}
                        className="card h-full bg-white border border-slate-100 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-50 p-8 flex flex-col group transition-all duration-300 rounded-3xl cursor-pointer">

                        {/* Icon + category */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm">
                            {s.icon}
                          </div>
                          <span className="text-[10px] font-bold text-sky-400 bg-sky-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {s.category}
                          </span>
                        </div>

                        {/* Title + tagline */}
                        <h3 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">
                          {s.title}
                        </h3>
                        <p className="text-xs text-sky-400 font-semibold italic mb-3">"{s.tagline}"</p>
                        <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-grow">{s.desc}</p>

                        {/* Features */}
                        <div className="space-y-2 mb-6">
                          {s.features.map(f => (
                            <div key={f} className="flex items-center gap-2.5 text-xs text-slate-500">
                              <div className="w-4 h-4 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0">
                                <CheckCircle size={10} className="text-sky-500" />
                              </div>
                              {f}
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-sky-500 text-sm font-bold group-hover:gap-3 transition-all">
                          Learn More <ArrowRight size={15} />
                        </div>
                      </div>
                    </SpotlightCard>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Show more / less */}
          {filtered.length > 6 && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-14 flex justify-center">
              <button onClick={() => setShowAll(!showAll)}
                className="group relative px-8 py-3.5 rounded-full border-2 border-sky-500 text-sky-600 font-bold hover:bg-sky-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-sky-200 overflow-hidden flex items-center gap-2">
                <div className="absolute inset-0 bg-sky-400/10 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />
                {showAll ? "Show Less" : `Explore All ${activeCategory === "All" ? "Services" : activeCategory + " Services"}`}
                <ChevronDown size={16} className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════ FINANCE PRODUCTS ══════════════════ */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />

        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-bold text-sky-500 uppercase tracking-widest bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100 mb-4 inline-block">
                Financial Technology
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                FinTech Software <span className="text-sky-500">Suites</span>
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
                Cloud-native financial management software and enterprise FinTech products designed for scaling modern business operations.
              </p>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {financeServices.map((f, i) => (
              <motion.div key={f.title} id={f.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <TiltCard className="h-full">
                  <div className="h-full bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-sky-50 hover:border-sky-100 transition-all duration-300 group flex flex-col">
                    <div className={`w-12 h-12 ${f.iconBg} rounded-2xl flex items-center justify-center mb-5 ${f.iconColor} group-hover:scale-110 transition-transform`}>
                      {f.icon}
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${f.badgeStyle} mb-4 inline-block uppercase tracking-wider w-fit`}>
                      {f.badge}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 mb-3">{f.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-grow">{f.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {f.features.map(feat => (
                        <span key={feat} className="text-[10px] uppercase tracking-wider font-bold bg-slate-50 text-slate-500 px-2.5 py-1 rounded-full border border-slate-100">
                          {feat}
                        </span>
                      ))}
                    </div>

                    <Link href="/contact" className="text-sky-500 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                      Consult Experts <ArrowRight size={15} />
                    </Link>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ HOW WE WORK ══════════════════ */}
      <section className="py-24 bg-[#1E3A5F] relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #0ea5e9 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest bg-sky-400/10 px-3 py-1.5 rounded-full border border-sky-400/20 mb-4 inline-block">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">How We <span className="text-sky-400">Work</span></h2>
            <p className="text-sky-200/70 max-w-lg mx-auto text-sm">
              A structured, transparent approach that ensures every project ships on time and exceeds expectations.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-sky-500/20 via-sky-400/50 to-sky-500/20" />

            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <motion.div key={step.num}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}>
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-7 border border-white/10 hover:bg-white/10 hover:border-sky-400/30 transition-all duration-300 group text-left">
                    {/* Step number circle */}
                    <div className="relative w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center mb-6 group-hover:bg-sky-500/20 transition-colors mx-auto md:mx-0">
                      <span className="text-2xl">{step.icon}</span>
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#1E3A5F] rounded-full flex items-center justify-center border border-sky-400/40">
                        <span className="text-[9px] font-black text-sky-400">{step.num}</span>
                      </div>
                    </div>
                    <h4 className="font-extrabold text-white mb-2 text-lg">{step.title}</h4>
                    <p className="text-sky-200/60 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center mt-14">
            <Link href="/contact"
              className="inline-flex items-center gap-2.5 bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-sky-500/30 hover:shadow-sky-400/40 hover:-translate-y-0.5">
              Start Your Project <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ SERVICE MODAL ══════════════════ */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>
    </>
  );
}