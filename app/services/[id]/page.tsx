"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Globe, Settings, Cloud, Zap, Shield, Smartphone,
  CheckCircle, ArrowRight, Code, Database, Layout,
  MessageSquare, BarChart, RefreshCcw, ArrowLeft,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

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
    techStack: ["Odoo", "Salesforce", "HubSpot", "PostgreSQL", "Redis", "Elasticsearch"],
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
  // Note: fixed missing closing bracket for services array element if there was one, let's keep it exact as it was
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string; btn: string; light: string }> = {
  sky:    { bg: "bg-sky-500",    text: "text-sky-600",    border: "border-sky-200",    badge: "bg-sky-50 text-sky-600",    btn: "bg-sky-500 hover:bg-sky-600",   light: "bg-sky-50" },
  violet: { bg: "bg-violet-500", text: "text-violet-600", border: "border-violet-200", badge: "bg-violet-50 text-violet-600", btn: "bg-violet-500 hover:bg-violet-600", light: "bg-violet-50" },
  blue:   { bg: "bg-blue-500",   text: "text-blue-600",   border: "border-blue-200",   badge: "bg-blue-50 text-blue-600",   btn: "bg-blue-500 hover:bg-blue-600",  light: "bg-blue-50" },
  amber:  { bg: "bg-amber-500",  text: "text-amber-600",  border: "border-amber-200",  badge: "bg-amber-50 text-amber-600",  btn: "bg-amber-500 hover:bg-amber-600", light: "bg-amber-50" },
  red:    { bg: "bg-red-500",    text: "text-red-600",    border: "border-red-200",    badge: "bg-red-50 text-red-600",    btn: "bg-red-500 hover:bg-red-600",   light: "bg-red-50" },
  green:  { bg: "bg-green-500",  text: "text-green-600",  border: "border-green-200",  badge: "bg-green-50 text-green-600",  btn: "bg-green-500 hover:bg-green-600", light: "bg-green-50" },
  pink:   { bg: "bg-pink-500",   text: "text-pink-600",   border: "border-pink-200",   badge: "bg-pink-50 text-pink-600",   btn: "bg-pink-500 hover:bg-pink-600",  light: "bg-pink-50" },
  indigo: { bg: "bg-indigo-500", text: "text-indigo-600", border: "border-indigo-200", badge: "bg-indigo-50 text-indigo-600", btn: "bg-indigo-500 hover:bg-indigo-600", light: "bg-indigo-50" },
};

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = services.find(s => s.id === params.id);
  if (!service) notFound();

  const c = colorMap["sky"];

  return (
    <main className="min-h-screen bg-slate-50/50">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-sky-50/20 to-transparent pt-24 pb-16 border-b border-slate-100">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#0ea5e9 1px,transparent 1px),linear-gradient(90deg,#0ea5e9 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-72 h-72 rounded-full bg-sky-200/20 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back button */}
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/services"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-600 text-sm font-semibold mb-8 transition-colors group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Glassmorphic Icon Wrapper */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-500 to-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/20 flex-shrink-0">
              {service.icon}
            </motion.div>

            <div>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-600 mb-3.5 inline-block">
                {service.category}
              </motion.span>
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
                className="text-3xl md:text-5xl font-black text-slate-900 mb-2.5 tracking-tight leading-tight">
                {service.title}
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                className="text-sky-500 font-semibold italic text-base md:text-lg">
                "{service.tagline}"
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left: main content */}
            <div className="lg:col-span-2 space-y-12">

              {/* About section card */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500" />
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span>About This Service</span>
                </h2>
                <p className="text-slate-600 leading-relaxed text-base font-medium whitespace-pre-line">{service.detail}</p>
              </motion.div>

              {/* Key Benefits */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 px-1">Key Benefits & Outcomes</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-sky-200 hover:shadow-md hover:shadow-sky-500/[0.02] transition-all duration-300">
                      <div className="w-6 h-6 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={14} className="text-sky-500" />
                      </div>
                      <span className="text-slate-700 text-sm font-semibold leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Core Features & Tech Stack Row */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Core Features */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm space-y-5">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Core Features</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {service.features.map(f => (
                      <span key={f} className="text-xs font-bold px-3.5 py-2 rounded-full bg-sky-50/50 border border-sky-100/60 text-sky-600">
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                  className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm space-y-5">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Technologies Leveraged</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map(t => (
                      <span key={t} className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 text-slate-600 border border-slate-200/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right: sticky CTA card */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="sticky top-24 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 p-8 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 shadow-inner">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Ready to get started?</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Build secure, scalable solutions configured for your business workflows. Let's discuss your roadmap.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link href="/contact"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md shadow-sky-500/20 active:scale-[0.98]">
                    Start a Project <ArrowRight size={15} />
                  </Link>

                  <Link href="/services"
                    className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold py-3 rounded-2xl transition-colors text-xs">
                    <ArrowLeft size={14} /> All Services
                  </Link>
                </div>

                {/* Trust list with fine styling */}
                <div className="pt-5 border-t border-slate-100 space-y-3">
                  {[
                    "Free discovery consultation",
                    "Mutual NDA signed on request",
                    "Predictable milestones & delivery",
                    "Post-launch technical support"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-500">
                      <CheckCircle size={14} className="text-sky-500 flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Other Capabilities</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {services
              .filter(s => s.id !== service.id && s.category === service.category)
              .slice(0, 3)
              .map(s => (
                <Link key={s.id} href={`/services/${s.id}`}
                  className="bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-sky-300 hover:shadow-lg p-6 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-sky-500 mb-4 group-hover:bg-sky-500 group-hover:text-white transition-all flex-shrink-0">
                      {s.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1 text-sm group-hover:text-sky-600 transition-colors leading-snug">{s.title}</h4>
                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{s.tagline}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-sky-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    View Service <ArrowRight size={10} />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}