"use client";
import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Globe, Settings, Cloud, Zap, Shield, Smartphone,
  CheckCircle, ArrowRight, Code, Database, Layout,
  MessageSquare, BarChart, RefreshCcw, ArrowLeft,
  Sparkles, ChevronDown, HelpCircle, Ruler, Users, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── SERVICE DATA (same as services page) ──────────────────── */
const services = [
  {
    id: "custom-web-solutions", category: "Web",
    icon: <Globe className="w-8 h-8" />,
    title: "Web Development",
    tagline: "Fast, scalable websites & web apps.",
    desc: "Scalable, high-performance web applications tailored to your business needs using cutting-edge frameworks.",
    features: ["Next.js / React", "SEO Optimized", "Microservices"],
    detail: "We architect web platforms that handle millions of requests with zero compromise on speed. From complex SPA dashboards to content-heavy marketing sites — built to rank, built to convert.",
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
    benefits: [
      "Lightning-fast page loads with SSR & SSG",
      "SEO-optimised structure for maximum visibility",
      "Scalable microservices for enterprise growth",
      "Responsive design across all devices",
    ],
    color: "sky",
  },
  {
    id: "enterprise-software", category: "Enterprise",
    icon: <Settings className="w-8 h-8" />,
    title: "ERP Solutions",
    tagline: "Streamline your entire business.",
    desc: "Robust ERP, CRM, and internal tools designed to streamline complex business processes for large-scale organizations.",
    features: ["Scalable Architecture", "Legacy Integration", "24/7 Support"],
    detail: "Custom ERP systems that replace disconnected tools with a single source of truth. We integrate with your existing infrastructure and modernize workflows without disrupting operations.",
    techStack: ["Java", "Spring Boot", "Oracle", "SAP Integration", "Kafka", "Docker"],
    benefits: [
      "Single source of truth across departments",
      "Seamless legacy system integration",
      "Real-time business dashboards",
      "24/7 dedicated support team",
    ],
    color: "violet",
  },
  {
    id: "cloud-devops", category: "Cloud",
    icon: <Cloud className="w-8 h-8" />,
    title: "Cloud & DevOps",
    tagline: "Deploy faster, scale smarter.",
    desc: "Accelerate deployment cycles with automated pipelines and scalable cloud infrastructure on AWS, Azure, or GCP.",
    features: ["AWS / Azure / GCP", "CI/CD Pipelines", "Auto-scaling"],
    detail: "We design fault-tolerant cloud architectures with automated scaling, blue-green deployments, and infrastructure-as-code. Your team ships every day — safely.",
    techStack: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "GitHub Actions"],
    benefits: [
      "99.99% uptime with multi-region redundancy",
      "Automated rollback on failed deployments",
      "Cost-optimised cloud spend monitoring",
      "Infrastructure as code for reproducibility",
    ],
    color: "blue",
  },
  {
    id: "ai-machine-learning", category: "AI",
    icon: <Zap className="w-8 h-8" />,
    title: "AI & Machine Learning",
    tagline: "Smart solutions for complex problems.",
    desc: "Integrate intelligent automation and data insights into your product to stay ahead of the competition.",
    features: ["Predictive Analytics", "NLP Systems", "Computer Vision"],
    detail: "From recommendation engines to computer vision pipelines, we embed AI at every layer of your product. Real models, real data, real results — not just demos.",
    techStack: ["Python", "TensorFlow", "PyTorch", "OpenAI", "LangChain", "FastAPI"],
    benefits: [
      "Custom ML models trained on your data",
      "NLP pipelines for text & document analysis",
      "Computer vision for image recognition",
      "Real-time prediction APIs with low latency",
    ],
    color: "amber",
  },
  {
    id: "cybersecurity", category: "Security",
    icon: <Shield className="w-8 h-8" />,
    title: "Cybersecurity",
    tagline: "Protect your digital assets.",
    desc: "Enterprise-grade security audits, penetration testing, and compliance monitoring for digital assets.",
    features: ["Vulnerability Audits", "Penetration Testing", "Compliance"],
    detail: "Our security engineers simulate real-world cyberattacks to find weaknesses before hackers do. We provide VAPT reports and help ensure compliance with standards like OWASP, GDPR, and SOC2.",
    techStack: ["Burp Suite", "Metasploit", "Nessus", "OWASP ZAP", "Wireshark", "Kali Linux"],
    benefits: [
      "VAPT reports with detailed remediation steps",
      "OWASP Top 10 compliance checks",
      "GDPR & SOC2 audit preparation",
      "Ongoing threat monitoring dashboards",
    ],
    color: "red",
  },
  {
    id: "mobile-app-development", category: "Mobile",
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile App Development",
    tagline: "iOS & Android apps users love.",
    desc: "Native and cross-platform mobile experiences that engage users and drive business growth.",
    features: ["iOS & Android", "React Native / Flutter", "High Performance"],
    detail: "We build scalable, high-quality apps with smooth performance, offline capability, and strong system integration — designed to earn great user reviews.",
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Expo"],
    benefits: [
      "60fps smooth animations & gestures",
      "Offline-first architecture with sync",
      "App Store & Play Store optimised ASO",
      "Push notifications & deep linking",
    ],
    color: "green",
  },
  {
    id: "api-development-integration", category: "Web",
    icon: <Code className="w-8 h-8" />,
    title: "API Development & Integration",
    tagline: "Connect every system seamlessly.",
    desc: "RESTful APIs, GraphQL services, and third-party integrations like payment gateways, SMS, and WhatsApp APIs.",
    features: ["REST / GraphQL", "Secure Auth", "High Throughput"],
    detail: "We design APIs that are versioned, documented, and built to last. Payment gateways, WhatsApp Business, SMS — every integration wired securely with rate limiting and monitoring.",
    techStack: ["Node.js", "GraphQL", "REST", "Swagger", "OAuth 2.0", "Redis"],
    benefits: [
      "Auto-generated Swagger documentation",
      "Rate limiting & DDoS protection built-in",
      "Payment gateways: Razorpay, Stripe, PayU",
      "WhatsApp Business & SMS integrations",
    ],
    color: "sky",
  },
  {
    id: "devops-ci-cd-automation", category: "Cloud",
    icon: <Database className="w-8 h-8" />,
    title: "DevOps & CI/CD Automation",
    tagline: "From code to production, automatically.",
    desc: "Automated deployment pipelines using Docker, Kubernetes, Jenkins, and GitHub Actions for faster delivery.",
    features: ["Docker / K8s", "Jenkins / Actions", "Terraform"],
    detail: "We build automated GitOps pipelines that move code from development to production safely, with built-in rollback and infrastructure drift detection.",
    techStack: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Terraform", "ArgoCD"],
    benefits: [
      "Zero-downtime blue/green deployments",
      "Automated infrastructure drift detection",
      "Multi-environment pipeline management",
      "Secrets management with Vault",
    ],
    color: "blue",
  },
  {
    id: "ui-ux-design", category: "Design",
    icon: <Layout className="w-8 h-8" />,
    title: "UI/UX Design",
    tagline: "Beautiful designs that convert.",
    desc: "Modern, user-centric UI/UX design with wireframing, prototyping, and Figma-based design systems.",
    features: ["User Research", "Wireframing", "Prototyping"],
    detail: "We design using real user data — research, heatmaps, A/B tests, and usability studies — and build scalable Figma systems across your products.",
    techStack: ["Figma", "Adobe XD", "Hotjar", "Maze", "Storybook", "Zeroheight"],
    benefits: [
      "Design systems that scale across teams",
      "Heatmap-driven UX improvements",
      "Accessibility-first WCAG 2.1 compliance",
      "Handoff-ready Figma with Dev Mode",
    ],
    color: "pink",
  },
  {
    id: "ai-chatbots-automation", category: "AI",
    icon: <MessageSquare className="w-8 h-8" />,
    title: "AI Chatbots & Automation",
    tagline: "Automate support & workflows 24/7.",
    desc: "Smart AI-powered chatbots and workflow automation to improve customer engagement and reduce manual work.",
    features: ["24/7 Automation", "Multi-lingual", "CRM Integration"],
    detail: "LLM-powered bots that resolve Tier-1 support, qualify leads, and trigger workflows. Multi-language support and seamless CRM handoff when humans are needed.",
    techStack: ["OpenAI", "LangChain", "Dialogflow", "WhatsApp API", "Zapier", "HubSpot"],
    benefits: [
      "Resolves 70%+ of Tier-1 support tickets",
      "Multi-language support (20+ languages)",
      "Seamless human handoff via CRM",
      "Analytics dashboard for bot performance",
    ],
    color: "amber",
  },
  {
    id: "data-analytics-bi-dashboards", category: "Data",
    icon: <BarChart className="w-8 h-8" />,
    title: "Data Analytics & BI",
    tagline: "Turn raw data into clear decisions.",
    desc: "Interactive dashboards, real-time reporting, and business intelligence solutions for data-driven decisions.",
    features: ["PowerBI / Tableau", "Real-time Ops", "Data Mining"],
    detail: "Custom BI dashboards with live data pipelines. We turn raw databases into executive-ready insights — drill-downs, anomaly alerts, and forecast models included.",
    techStack: ["Power BI", "Tableau", "Apache Spark", "dbt", "Snowflake", "Airflow"],
    benefits: [
      "Real-time dashboards with sub-second refresh",
      "Anomaly detection & automated alerts",
      "Forecast models for business planning",
      "Data warehouse design & optimisation",
    ],
    color: "indigo",
  },
  {
    id: "erp-crm-systems", category: "Enterprise",
    icon: <RefreshCcw className="w-8 h-8" />,
    title: "ERP & CRM Systems",
    tagline: "One system for your whole business.",
    desc: "Fully customized ERP and CRM solutions for sales, HR, inventory, and customer management systems.",
    features: ["Custom Modules", "Data Analytics", "Workflows"],
    detail: "We build CRMs that fit your actual sales process — not the other way around. Custom pipelines, automated follow-ups, inventory sync, and reporting in one unified system.",
    techStack: [ "Salesforce", "HubSpot", "PostgreSQL", "Redis", "Elasticsearch"],
    benefits: [
      "Custom sales pipelines matching your process",
      "Automated follow-ups & lead scoring",
      "Inventory & supply chain integration",
      "Role-based access control",
    ],
    color: "violet",
  },
  {
    id: "software-testing-qa", category: "Security",
    icon: <Shield className="w-8 h-8" />,
    title: "Software Testing & QA",
    tagline: "Ship bug-free, every time.",
    desc: "Manual and automated testing including performance, security, and regression testing for stable applications.",
    features: ["Unit / Integration", "Automated QA", "Load Testing"],
    detail: "Cypress, Playwright, JMeter — full coverage across unit, integration, E2E, and load. Zero regressions in production with our CI-integrated test suites.",
    techStack: ["Cypress", "Playwright", "JMeter", "Selenium", "Jest", "Postman"],
    benefits: [
      "90%+ test coverage across all layers",
      "CI-integrated automated regression suites",
      "Load testing up to 100k concurrent users",
      "Detailed bug reports with reproduction steps",
    ],
    color: "red",
  },
  {
    id: "system-migration-services", category: "Cloud",
    icon: <Cloud className="w-8 h-8" />,
    title: "System Migration",
    tagline: "Move to modern with zero downtime.",
    desc: "Legacy system modernization, database migration, and cloud migration with zero downtime strategy.",
    features: ["Zero Downtime", "Data Integrity", "Legacy Modernization"],
    detail: "We've migrated monoliths to microservices, Oracle to PostgreSQL, on-prem to cloud — all with dual-run strategies ensuring zero data loss and zero downtime.",
    techStack: ["AWS DMS", "pgloader", "Flyway", "Kafka", "Docker", "Terraform"],
    benefits: [
      "Dual-run strategy ensures zero downtime",
      "100% data integrity validation post-migration",
      "Monolith to microservices decomposition",
      "Rollback plan for every migration step",
    ],
    color: "blue",
  },
  {
    id: "saas-product-development", category: "Enterprise",
    icon: <Zap className="w-8 h-8" />,
    title: "SaaS Product Development",
    tagline: "Build your SaaS from idea to launch.",
    desc: "Scalable multi-tenant SaaS platforms with subscription models and cloud-native architecture.",
    features: ["Multi-tenancy", "Stripe Billing", "High Availability"],
    detail: "We build SaaS from scratch — auth, multi-tenancy, subscription billing, usage metering, and admin dashboards. Architected to support your first customer and your ten-thousandth.",
    techStack: ["Next.js", "Stripe", "Auth0", "PostgreSQL", "Redis", "Kubernetes"],
    benefits: [
      "Multi-tenant architecture with data isolation",
      "Stripe subscription billing & usage metering",
      "Admin super-dashboard for all tenants",
      "Built-in analytics for product metrics",
    ],
    color: "violet",
  },
];

const theme = {
  primary: "sky",
  text: "text-sky-600",
  textDark: "text-sky-950",
  bg: "bg-sky-500",
  bgLight: "bg-sky-50",
  bgGradient: "from-sky-500 to-sky-600",
  bgGradientLight: "from-sky-100/40 via-sky-50/20 to-transparent",
  border: "border-sky-100",
  borderHover: "hover:border-sky-300",
  borderBottom: "hover:border-b-sky-500",
  shadow: "shadow-sky-500/20",
  shadowHover: "hover:shadow-sky-500/[0.04]",
  badge: "bg-sky-50/70 border-sky-100/60 text-sky-600",
  glow: "bg-sky-400/20",
};

const serviceFaqs: Record<string, { q: string; a: string }[]> = {
  "custom-web-solutions": [
    { q: "Which programming frameworks do you use for web development?", a: "We build modern web projects using React, Next.js, and TypeScript, backed by robust Node.js, Python, or Go backend servers depending on scalability requirements." },
    { q: "Will the web application be mobile-friendly?", a: "Yes, 100% of our code uses mobile-first styling principles with Tailwind CSS, ensuring that your application renders beautifully on smartphones, tablets, and desktops alike." },
    { q: "How do you optimize performance and SEO?", a: "We leverage Next.js Server-Side Rendering (SSR) and Static Site Generation (SSG) alongside advanced caching (Redis) and image optimization to deliver sub-second page loads." }
  ],
  "erp-crm-systems": [
    { q: "Can we migrate our existing database records safely?", a: "Absolutely. We specialize in end-to-end data migrations from legacy systems, including data cleaning, validation, and schema mapping with zero downtime." },
    { q: "Can it integrate with third-party software tools?", a: "Yes. We design custom REST/GraphQL integrations for payment gateways, WhatsApp Business APIs, HubSpot, QuickBooks, and internal logistics services." },
    { q: "Is Role-Based Access Control (RBAC) supported?", a: "Yes, security is our priority. Every ERP/CRM module is built with fine-grained permission control to restrict data access based on user hierarchy." }
  ],
  "cloud-devops": [
    { q: "Which cloud service providers do you support?", a: "We design, deploy, and monitor infrastructures across Amazon Web Services (AWS), Google Cloud Platform (GCP), and Microsoft Azure." },
    { q: "How do you automate project delivery and scale?", a: "We construct GitOps-driven CI/CD pipelines using GitHub Actions, Docker, Kubernetes, and Terraform, enabling automatic rollbacks and seamless autoscaling." }
  ],
  "ai-machine-learning": [
    { q: "What models and LLMs do you work with?", a: "We work with Google Gemini, OpenAI GPT models, Anthropic Claude, and open-source options like LLaMA using frameworks like LangChain." },
    { q: "Is our proprietary data secure during AI processing?", a: "Yes, your training data is stored securely in virtual private clouds (VPC). We do not train public models on your proprietary business datasets." }
  ]
};

const defaultFaqs = [
  { q: "What is your typical project timeline?", a: "Depending on scope, small to medium applications require 4 to 8 weeks, while complex enterprise systems can take 3 to 6 months of agile iterations." },
  { q: "Do you sign Non-Disclosure Agreements (NDAs)?", a: "Yes, we sign mutual NDAs before any sensitive project details, database structures, or design assets are shared." },
  { q: "What post-launch support plans do you offer?", a: "We provide comprehensive post-launch support packages, including server health monitoring, security audits, dependency updates, and feature enhancements." }
];

/* ─── ANIMATION VARIANTS ──────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = services.find(s => s.id === params.id);
  if (!service) notFound();

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = serviceFaqs[service.id] || defaultFaqs;

  return (
    <main className="min-h-screen bg-[#f0f7ff] pb-20">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#dbeeff] via-[#eaf4ff] to-[#f5f9ff] pt-24 pb-24 border-b border-sky-100/60">

        {/* Decorative animated blobs */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 right-0 w-[520px] h-[520px] bg-sky-300/30 rounded-full blur-[80px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 -left-20 w-[380px] h-[380px] bg-blue-300/25 rounded-full blur-[70px] pointer-events-none"
        />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, #0ea5e9 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-600 text-sm font-semibold mb-10 transition-colors group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Services
            </Link>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 130, damping: 14, delay: 0.05 }}
              whileHover={{ scale: 1.08, rotate: 3 }}
              className="relative flex-shrink-0"
            >
              <div className="w-[88px] h-[88px] rounded-[26px] bg-gradient-to-br from-sky-400 to-sky-600 text-white flex items-center justify-center shadow-2xl shadow-sky-400/35">
                {service.icon}
              </div>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-[26px] bg-sky-400/20 blur-xl scale-125 -z-10" />
            </motion.div>

            <div className="space-y-2">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="inline-block text-[10px] font-black uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200/80 text-sky-600"
              >
                {service.category}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight"
              >
                {service.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-sky-500 font-semibold italic text-lg"
              >
                "{service.tagline}"
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

          {/* ── About + Features + Tech ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-7 items-stretch"
          >
            {/* About */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -5, boxShadow: "0 20px 48px 0 rgba(14,165,233,0.10)" }}
              className="md:col-span-2 bg-white rounded-3xl p-8 border border-sky-100/70 shadow-sm transition-all duration-300 relative overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-blue-400 to-sky-300 rounded-t-3xl" />
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 mt-1">
                About This Service
              </h2>
              <p className="text-slate-600 leading-relaxed text-[15px] font-medium">
                {service.detail}
              </p>
            </motion.div>

            {/* Features + Tech Stack */}
            <div className="flex flex-col gap-5">
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -5, boxShadow: "0 20px 48px 0 rgba(14,165,233,0.10)" }}
                className="bg-white p-6 rounded-3xl border border-sky-100/70 shadow-sm transition-all duration-300 relative overflow-hidden flex-1"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 to-blue-400 rounded-t-3xl" />
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3.5 mt-1">Core Features</h3>
                <div className="flex flex-wrap gap-2">
                  {service.features.map(f => (
                    <span key={f} className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200/70 text-sky-600">
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                whileHover={{ y: -5, boxShadow: "0 20px 48px 0 rgba(14,165,233,0.10)" }}
                className="bg-white p-6 rounded-3xl border border-sky-100/70 shadow-sm transition-all duration-300 relative overflow-hidden flex-1"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 to-blue-400 rounded-t-3xl" />
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3.5 mt-1">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {service.techStack.map(t => (
                    <span key={t} className="text-[11px] font-semibold px-2.5 py-1.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-200/70 hover:border-sky-300 hover:text-sky-600 transition-colors duration-200">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Key Benefits ── */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-2xl font-black text-slate-900 tracking-tight mb-7"
            >
              Key Benefits & Outcomes
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {service.benefits.map((b, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -7, scale: 1.02, boxShadow: "0 24px 48px 0 rgba(14,165,233,0.13)" }}
                  className="flex flex-col gap-4 p-6 rounded-3xl bg-white border border-sky-100/70 shadow-sm transition-all duration-300 cursor-default group"
                >
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center flex-shrink-0 group-hover:from-sky-200 group-hover:to-blue-200 transition-colors duration-300">
                    <CheckCircle size={17} className="text-sky-500" />
                  </div>
                  <span className="text-slate-700 text-sm font-bold leading-relaxed">{b}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Timeline + Process ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid lg:grid-cols-2 gap-7"
          >
            {/* Delivery Table */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -5, boxShadow: "0 20px 48px 0 rgba(14,165,233,0.10)" }}
              className="bg-white p-8 rounded-3xl border border-sky-100/70 shadow-sm transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-blue-400 to-sky-300 rounded-t-3xl" />
              <h3 className="text-lg font-bold text-slate-900 mb-6 mt-1">Standard Delivery Timelines</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Phase</th>
                    <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Duration</th>
                    <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Deliverable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { p: "Discovery & Strategy", d: "5–7 Days", o: "Scope Roadmap & Architecture" },
                    { p: "UI/UX Prototyping", d: "2 Weeks", o: "Figma Wireframes & Flows" },
                    { p: "Agile Dev Sprints", d: "4–8 Weeks", o: "Beta & DB Integration" },
                    { p: "Security Audit & Launch", d: "1 Week", o: "VAPT Logs & Production" },
                  ].map((item, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="hover:bg-sky-50/50 transition-colors group"
                    >
                      <td className="py-4 text-sm font-bold text-slate-800 group-hover:text-sky-700 transition-colors">{item.p}</td>
                      <td className="py-4 text-sm font-black text-sky-500">{item.d}</td>
                      <td className="py-4 text-xs font-medium text-slate-400">{item.o}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Process Timeline */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -5, boxShadow: "0 20px 48px 0 rgba(14,165,233,0.10)" }}
              className="bg-white p-8 rounded-3xl border border-sky-100/70 shadow-sm transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-blue-400 to-sky-300 rounded-t-3xl" />
              <h3 className="text-lg font-bold text-slate-900 mb-6 mt-1">Our Delivery Process</h3>
              <div className="relative border-l-2 border-sky-100 ml-3 pl-7 space-y-7">
                {[
                  { title: "1. Discover & Map", desc: "Collaborative workshops to freeze wireframes, define API integrations, and finalize the database architecture." },
                  { title: "2. Design & Prototype", desc: "Crafting modern design systems in Figma matching your brand identity with clickable prototype handoffs." },
                  { title: "3. Build & QA Sprints", desc: "Milestone-driven agile development with weekly builds, unit testing, and sandbox API validation." },
                  { title: "4. Deploy & Scale", desc: "Production release with zero-downtime strategy, server health monitoring, and documentation handover." },
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="relative group"
                  >
                    <div className="absolute -left-[35px] top-1.5 w-4 h-4 rounded-full bg-white border-[3px] border-sky-400 shadow-sm group-hover:border-sky-500 group-hover:scale-110 transition-all duration-200" />
                    <h4 className="text-sm font-extrabold text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">{step.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Engagement Models ── */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-black text-slate-900 tracking-tight mb-7"
            >
              Flexible Engagement Models
            </motion.h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-3 gap-6"
            >
              {[
                { title: "Fixed Scope", desc: "Best for structured projects with concrete specifications and set timelines.", icon: <Ruler className="w-6 h-6 text-sky-500" /> },
                { title: "Dedicated Team", desc: "A custom team of developers, designers, and QA working exclusively on your product backlog.", icon: <Users className="w-6 h-6 text-sky-500" /> },
                { title: "Time & Material", desc: "Pay for active resources and hours logged, allowing complete flexibility to pivot.", icon: <Clock className="w-6 h-6 text-sky-500" /> },
               
              ].map((model, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  custom={idx}
                  whileHover={{ y: -6, boxShadow: "0 24px 48px 0 rgba(14,165,233,0.12)" }}
                  className="p-7 rounded-3xl bg-white border border-sky-100/70 shadow-sm transition-all duration-300 space-y-3 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 to-blue-400 rounded-t-3xl" />
                  <div className="mt-1">{model.icon}</div>
                  <span className="block text-xs font-black uppercase tracking-widest text-sky-600">{model.title}</span>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{model.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── FAQ ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-3xl border border-sky-100/70 shadow-sm max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-blue-400 to-sky-300 rounded-t-3xl" />
            <div className="flex items-center gap-3 mb-6 mt-1">
              <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500">
                <HelpCircle size={17} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
            </div>
            <div className="space-y-1">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border-b border-slate-100/80 last:border-0">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left py-4 font-bold text-slate-800 hover:text-sky-600 transition-colors group"
                    >
                      <span className="text-sm leading-snug pr-4">{faq.q}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown size={16} className={`flex-shrink-0 transition-colors ${isOpen ? "text-sky-500" : "text-slate-400"}`} />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-500 text-xs leading-relaxed pb-4 pl-1 font-medium">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── CTA Banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-sky-500 to-sky-500 rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-sky-500/25"
          >
            {/* Animated orbs inside CTA */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-16 -top-16 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.10, 0.18, 0.10] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-16 -bottom-16 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl pointer-events-none"
            />
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "24px 24px" }} />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
                <div>
                  <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Ready to get started?
                  </h3>
                  <p className="text-sky-100 text-sm md:text-base leading-relaxed font-medium mt-2 max-w-lg">
                    Build secure, scalable solutions configured for your business workflows. Let's discuss your roadmap.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                  {[
                    "Free discovery consultation",
                    "Mutual NDA signed on request",
                    "Predictable milestones",
                    "Post-launch support",
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + idx * 0.06 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 border border-white/25 text-white text-[11px] font-bold backdrop-blur-sm"
                    >
                      <CheckCircle size={11} className="text-sky-200 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-sm p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md space-y-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
                      <Sparkles size={17} />
                    </div>
                    <h4 className="text-sm font-bold text-white">Get Started Today</h4>
                  </div>
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 bg-white text-sky-600 hover:bg-sky-50 font-extrabold py-3.5 rounded-2xl transition-all duration-200 active:scale-[0.97] text-sm shadow-lg hover:shadow-xl"
                  >
                    Start a Project <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/services"
                    className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold py-3 rounded-2xl transition-all duration-200 active:scale-[0.97] text-xs"
                  >
                    <ArrowLeft size={13} /> All Services
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section className="py-16 bg-white border-t border-sky-100/60 mt-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-black text-slate-900 mb-8 tracking-tight"
          >
            Other Capabilities
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-6"
          >
            {(() => {
              const sameCategory = services.filter(s => s.id !== service.id && s.category === service.category);
              const otherCategories = services.filter(s => s.id !== service.id && s.category !== service.category);
              const related = [...sameCategory, ...otherCategories].slice(0, 3);
              return related.map(s => (
                <motion.div key={s.id} variants={fadeUp}>
                  <Link
                    href={`/services/${s.id}`}
                    className="block bg-[#f8fbff] rounded-3xl border border-sky-100/70 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100 p-6 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-sky-500 mb-4 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 border border-sky-100">
                      {s.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1 text-sm group-hover:text-sky-600 transition-colors leading-snug">{s.title}</h4>
                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{s.tagline}</p>
                    <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-sky-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                      View Service <ArrowRight size={10} />
                    </div>
                  </Link>
                </motion.div>
              ));
            })()}
          </motion.div>
        </div>
      </section>
    </main>
  );
}