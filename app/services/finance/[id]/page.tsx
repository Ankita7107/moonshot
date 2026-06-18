"use client";
import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Banknote, ShieldCheck, TrendingUp, IndianRupee,
  Home, BarChart2, Code, CheckCircle, ArrowRight,
  ArrowLeft, Sparkles, ChevronDown, HelpCircle,
  Ruler, Users, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const financeServices = [
  {
    id: "ledger",
    icon: <Banknote className="w-8 h-8" />,
    iconColor: "text-sky-600", iconBg: "bg-sky-50",
    badge: "Enterprise Accounting",
    title: "Accounting Software",
    tagline: "Smart books, real-time cash flow.",
    desc: "Accounting software designed to manage business books, track real-time cash flow, and simplify tax compliance.",
    detail:
      "Our accounting platform gives finance teams a real-time view of every rupee — from journal entries to P&L statements. Built for Indian compliance (GST, TDS, ITR), it syncs with your bank and auto-reconciles transactions so your books are always audit-ready.",
    features: ["Auto-Reconciliation", "Ledger Sync", "Tax Compliance"],
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "AWS", "Razorpay"],
    benefits: [
      "Real-time P&L and balance sheet dashboards",
      "Auto bank reconciliation — zero manual entry",
      "GST, TDS, and ITR filing support built-in",
      "Multi-company and multi-currency support",
    ],
    faqs: [
      { q: "Does it support GST filing?", a: "Yes. The platform generates GST-ready reports (GSTR-1, GSTR-3B) and integrates with the GST portal for direct filing." },
      { q: "Can we migrate from Tally or Zoho Books?", a: "Absolutely. We provide full data migration with zero data loss from Tally, Zoho Books, QuickBooks, and other accounting platforms." },
      { q: "Is multi-company accounting supported?", a: "Yes. You can manage multiple legal entities under one login with consolidated reporting and entity-wise access control." },
    ],
  },
  {
    id: "invoice",
    icon: <ShieldCheck className="w-8 h-8" />,
    iconColor: "text-green-600", iconBg: "bg-green-50",
    badge: "Billing & Receivables",
    title: "Invoicing & Billing",
    tagline: "Get paid faster, every time.",
    desc: "Professional billing solutions that automate recurring invoicing, custom workflows, and global client payment portals.",
    detail:
      "From one-time invoices to complex recurring subscription billing — our platform handles it all. Clients get a branded payment portal; you get instant notifications, automated reminders, and reconciled receivables.",
    features: ["Recurring Invoicing", "Client Portals", "Secure Gateways"],
    techStack: ["Next.js", "Stripe", "Razorpay", "Node.js", "PostgreSQL", "SendGrid"],
    benefits: [
      "Branded client payment portals",
      "Automated payment reminders via email & WhatsApp",
      "Multi-currency invoicing for global clients",
      "One-click reconciliation with accounting module",
    ],
    faqs: [
      { q: "Which payment gateways are supported?", a: "We integrate Razorpay, Stripe, PayU, CCAvenue, and PayPal — selectable per client or region." },
      { q: "Can invoices be sent automatically on a schedule?", a: "Yes. Set up recurring invoice schedules (weekly, monthly, quarterly) and the system sends, tracks, and follows up automatically." },
      { q: "Is e-invoicing (IRN/QR) supported for B2B?", a: "Yes. For businesses requiring GST e-invoicing, we generate IRN numbers and QR codes compliant with the GSTN e-invoice schema." },
    ],
  },
  {
    id: "expense",
    icon: <TrendingUp className="w-8 h-8" />,
    iconColor: "text-yellow-600", iconBg: "bg-yellow-50",
    badge: "Spend Management",
    title: "Expense Management",
    tagline: "Control spend before it happens.",
    desc: "Corporate spend auditing software with intelligent OCR receipt scanning, multi-level approvals, and card sync.",
    detail:
      "Employees submit expenses via mobile; OCR reads the receipt; managers approve in one tap; finance syncs directly to the books. No paper, no spreadsheets, no chasing receipts.",
    features: ["OCR Receipt Scanning", "Corporate Card Sync", "Auto-Approvals"],
    techStack: ["React Native", "Python", "Tesseract OCR", "Node.js", "PostgreSQL", "AWS S3"],
    benefits: [
      "OCR-powered receipt capture — zero manual data entry",
      "Multi-level approval workflows per department",
      "Corporate card transaction auto-import",
      "Policy violation alerts before submission",
    ],
    faqs: [
      { q: "How accurate is the OCR receipt scanning?", a: "Our OCR achieves 95%+ accuracy on standard receipts and invoices. Ambiguous fields are flagged for manual review." },
      { q: "Can we set per-employee or per-category spending limits?", a: "Yes. Define budgets by employee, team, category (travel, food, software), and time period. Overages are flagged before approval." },
      { q: "Does it integrate with corporate credit cards?", a: "We integrate with Razorpay Corporate Cards, Airwallex, and most major bank feeds via OFX/CSV import." },
    ],
  },
  {
    id: "stock",
    icon: <IndianRupee className="w-8 h-8" />,
    iconColor: "text-violet-600", iconBg: "bg-violet-50",
    badge: "Supply & Orders",
    title: "Inventory Management",
    tagline: "Always know what you have.",
    desc: "End-to-end cloud-native inventory and warehouse management system with real-time stock optimization.",
    detail:
      "From purchase orders to dispatch — every movement tracked in real time. Multi-warehouse support, barcode scanning, low-stock alerts, and demand forecasting keep your supply chain lean and predictable.",
    features: ["Multi-Warehouse Tracking", "Stock Optimization", "Auto-Reordering"],
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "AWS", "Elasticsearch"],
    benefits: [
      "Real-time stock levels across all warehouses",
      "Auto-reorder triggers on configurable thresholds",
      "Barcode and QR code scanning via mobile",
      "Demand forecasting with AI-powered analytics",
    ],
    faqs: [
      { q: "Can it handle multiple warehouses in different cities?", a: "Yes. Each warehouse has its own stock, transfer workflows, and staff access. Consolidated reporting is available at the company level." },
      { q: "Does it integrate with e-commerce platforms?", a: "We integrate with Shopify, WooCommerce, Amazon Seller Central, and Flipkart Seller Hub for order-driven stock updates." },
      { q: "Is batch and expiry date tracking supported?", a: "Yes. Batch numbers, manufacturing dates, and expiry dates can be tracked per SKU — essential for pharma, food, and FMCG businesses." },
    ],
  },
  {
    id: "billing",
    icon: <Home className="w-8 h-8" />,
    iconColor: "text-orange-600", iconBg: "bg-orange-50",
    badge: "SaaS Recurring Billing",
    title: "Subscription Billing",
    tagline: "Recurring revenue, automated.",
    desc: "Robust subscription engine offering multi-tiered pricing management, card dunning, and SaaS billing sync.",
    detail:
      "Manage free trials, paid plans, usage-based billing, and annual discounts — all in one engine. Smart dunning recovers failed payments automatically, while a self-serve upgrade/downgrade portal reduces churn.",
    features: ["Multi-Tiered Plans", "Dunning Prevention", "Stripe Integration"],
    techStack: ["Next.js", "Stripe", "Node.js", "PostgreSQL", "Redis", "SendGrid"],
    benefits: [
      "Drag-and-drop pricing plan builder",
      "Automated dunning: 3-touch failed payment recovery",
      "Usage-based metering for API or seat billing",
      "Revenue recognition reports for SaaS metrics",
    ],
    faqs: [
      { q: "What billing models are supported?", a: "Flat-rate, per-seat, usage-based, tiered, and hybrid models are all supported. You can mix models within a single plan." },
      { q: "How does dunning work?", a: "When a charge fails, the system retries automatically on days 3, 7, and 14. Between retries, automated emails prompt the customer to update their card." },
      { q: "Can customers manage their own subscriptions?", a: "Yes. A white-labeled self-serve portal lets customers upgrade, downgrade, pause, or cancel — reducing support load on your team." },
    ],
  },
  {
    id: "payroll",
    icon: <BarChart2 className="w-8 h-8" />,
    iconColor: "text-fuchsia-600", iconBg: "bg-fuchsia-50",
    badge: "Salary & Benefits",
    title: "Payroll Management",
    tagline: "Pay your team right, on time.",
    desc: "Automated payroll system managing compliant salaries, direct deposits, tax withholdings, and employee self-service dashboards.",
    detail:
      "Run payroll in minutes. The platform auto-calculates CTC breakdowns, PF, ESI, PT, TDS, and generates Form 16 at year-end. Employees access their payslips, tax declarations, and investment proofs via a self-service portal.",
    features: ["Direct Deposits", "Automated Taxes", "Employee Portal"],
    techStack: ["React", "Node.js", "PostgreSQL", "AWS", "SendGrid", "Razorpay"],
    benefits: [
      "One-click payroll processing for 10 to 10,000 employees",
      "Auto PF, ESI, PT, TDS calculation and filing",
      "Form 16, payslip, and IT declaration generation",
      "Employee self-service portal for reimbursements",
    ],
    faqs: [
      { q: "Does it handle statutory compliance (PF, ESI, PT)?", a: "Yes. PF, ESI, and Professional Tax are calculated automatically per state. Challan generation and EPFO/ESIC portal sync are included." },
      { q: "Can employees access their own payslips?", a: "Yes. The self-service portal lets employees download payslips, submit investment declarations (80C, HRA), and raise reimbursement claims." },
      { q: "How does it handle different salary structures?", a: "Each employee can have a custom CTC structure — basic, HRA, special allowance, variable pay, and deductions are fully configurable." },
    ],
  },
  {
    id: "nbfc-api",
    icon: <Code className="w-8 h-8" />,
    iconColor: "text-sky-600", iconBg: "bg-sky-50",
    badge: "Core NBFC APIs",
    title: "NBFC APIs & Solutions",
    tagline: "Lend smarter with robust APIs.",
    desc: "Robust API suites designed for NBFCs to automate loan disbursements, credit scoring, e-KYC, and secure collections.",
    detail:
      "Our NBFC API stack covers the full lending lifecycle — from e-KYC and credit bureau pulls to loan disbursement and EMI collections. RBI-compliant architecture with complete audit trails and data residency in India.",
    features: ["e-KYC & Onboarding", "Credit Scoring APIs", "Disbursement Rails"],
    techStack: ["Node.js", "Python", "PostgreSQL", "AWS", "Kafka", "Redis"],
    benefits: [
      "End-to-end digital onboarding with Aadhaar e-KYC",
      "Instant Credit Score Verification (CIBIL, Equifax & CRIF)",
      "Loan disbursement via NEFT, IMPS, and UPI",
      "RBI-compliant audit trail and data localisation",
    ],
    faqs: [
      { q: "Is the platform RBI compliant?", a: "Yes. All data is stored in India-based AWS regions. The platform includes audit logging, data encryption at rest and in transit, and access controls aligned with RBI IT framework guidelines." },
      { q: "Which credit agencies are supported for integration?", a: "Our APIs seamlessly connect with all major credit agencies, including CIBIL TransUnion, Equifax, CRIF High Mark, and Experian, to automate credit checks and pull scores instantly." },
      { q: "Can the APIs be used for co-lending models?", a: "Yes. Our multi-lender disbursement rails support co-lending structures compliant with RBI's co-lending model (CLM) guidelines." },
    ],
  },
];

const defaultFaqs = [
  { q: "What is your typical delivery timeline?", a: "Most FinTech modules are delivered within 6–12 weeks depending on scope, with agile milestones every 2 weeks." },
  { q: "Do you sign NDAs?", a: "Yes, we sign mutual NDAs before sharing any product details, architecture, or sensitive business data." },
  { q: "What post-launch support is included?", a: "All FinTech products include 90 days of post-launch support covering bug fixes, performance monitoring, and minor enhancements." },
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

export default function FinanceDetailPage({ params }: { params: { id: string } }) {
  const service = financeServices.find(s => s.id === params.id);
  if (!service) notFound();

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = service.faqs || defaultFaqs;

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
              href="/services#finance"
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
                {service.badge}
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
                About This Product
              </h2>
              <p className="text-slate-600 leading-relaxed text-[15px] font-medium whitespace-pre-line">
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
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3.5 mt-1">Technologies Leveraged</h3>
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
                    <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Key Deliverable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { p: "Discovery & Strategy", d: "5 - 7 Days", o: "Scope Roadmap & System Architecture" },
                    { p: "UI/UX Prototyping", d: "2 Weeks", o: "Interactive Figma Wireframes & Flows" },
                    { p: "Agile Development Sprints", d: "4 - 8 Weeks", o: "Functional Beta & Database Integration" },
                    { p: "Security Audit & Launch", d: "1 Week", o: "VAPT Security Logs & Live Production Setup" },
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
                    Let's build the right FinTech solution for your business. Talk to our experts today.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                  {[
                    "Free product demo",
                    "Mutual NDA on request",
                    "Indian compliance built-in",
                    "Post-launch technical support",
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
                    <h4 className="text-sm font-bold text-white">Get Started</h4>
                  </div>
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 bg-white text-sky-600 hover:bg-sky-50 font-extrabold py-3.5 rounded-2xl transition-all duration-200 active:scale-[0.97] text-sm shadow-lg hover:shadow-xl"
                  >
                    Consult Our Experts <ArrowRight size={14} />
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

      {/* ── RELATED FINANCE PRODUCTS ── */}
      <section className="py-16 bg-white border-t border-sky-100/60 mt-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Other FinTech Products</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {financeServices
              .filter(s => s.id !== service.id)
              .slice(0, 3)
              .map(s => (
                <Link key={s.id} href={`/services/finance/${s.id}`}
                  className="bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-sky-300 hover:shadow-lg p-6 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center mb-4 text-sky-600 group-hover:bg-slate-950 group-hover:text-white transition-all flex-shrink-0">
                      {s.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1 text-sm group-hover:text-sky-600 transition-colors leading-snug">{s.title}</h4>
                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{s.tagline}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-sky-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    View Product <ArrowRight size={10} />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}