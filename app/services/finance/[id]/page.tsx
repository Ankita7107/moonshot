"use client";
import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Banknote, ShieldCheck, TrendingUp, IndianRupee,
  Home, BarChart2, Code, CheckCircle, ArrowRight,
  ArrowLeft, Sparkles, ChevronDown, HelpCircle
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
      { q: "Which credit bureaus do you integrate with?", a: "We integrate with CIBIL TransUnion, Equifax, CRIF High Mark, and Experian for bureau pulls and credit score decisioning." },
      { q: "Can the APIs be used for co-lending models?", a: "Yes. Our multi-lender disbursement rails support co-lending structures compliant with RBI's co-lending model (CLM) guidelines." },
    ],
  },
];

const defaultFaqs = [
  { q: "What is your typical delivery timeline?", a: "Most FinTech modules are delivered within 6–12 weeks depending on scope, with agile milestones every 2 weeks." },
  { q: "Do you sign NDAs?", a: "Yes, we sign mutual NDAs before sharing any product details, architecture, or sensitive business data." },
  { q: "What post-launch support is included?", a: "All FinTech products include 90 days of post-launch support covering bug fixes, performance monitoring, and minor enhancements." },
];

export default function FinanceDetailPage({ params }: { params: { id: string } }) {
  const service = financeServices.find(s => s.id === params.id);
  if (!service) notFound();

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = service.faqs || defaultFaqs;

  return (
    <main className="min-h-screen bg-slate-50/50">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-100/40 via-sky-50/20 to-transparent pt-24 pb-20 border-b border-slate-100/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-sky-300/20 to-sky-200/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#0ea5e9 1px,transparent 1px),linear-gradient(90deg,#0ea5e9 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/services#finance"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-600 text-sm font-semibold mb-8 transition-colors group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-500 to-sky-600 text-white flex items-center justify-center shadow-xl shadow-sky-500/30 flex-shrink-0 relative group">
              <div className="absolute inset-0 bg-sky-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative z-10">{service.icon}</div>
            </motion.div>

            <div>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-600 mb-3.5 inline-block">
                {service.badge}
              </motion.span>
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
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

            {/* Left */}
            <div className="lg:col-span-2 space-y-12">

              <motion.div initial={{ opacity: 0, scale: 0.96, y: 25 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 90, delay: 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md hover:shadow-2xl hover:border-sky-300/80 transition-all duration-300 relative overflow-hidden cursor-default">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500" />
                <h2 className="text-xl font-bold text-slate-900 mb-4">About This Product</h2>
                <p className="text-slate-600 leading-relaxed text-base font-medium">{service.detail}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 px-1">Key Benefits & Outcomes</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.benefits.map((b, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 90, delay: 0.2 + i * 0.05 }}
                      whileHover={{ y: -6, scale: 1.03 }}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 border-b-[5px] border-b-transparent hover:border-b-sky-500 shadow-md hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-500/[0.06] transition-all duration-300 cursor-default">
                      <div className="w-6 h-6 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={14} className="text-sky-500" />
                      </div>
                      <span className="text-slate-700 text-sm font-semibold leading-relaxed">{b}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 90, delay: 0.3 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-white p-7 rounded-3xl border border-slate-100 border-b-[5px] border-b-transparent hover:border-b-sky-500 shadow-md hover:shadow-2xl hover:border-sky-300/80 transition-all duration-300 cursor-default">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Core Features</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {service.features.map(f => (
                      <span key={f} className="text-xs font-bold px-3.5 py-2 rounded-full bg-sky-50/50 border border-sky-100/60 text-sky-600">{f}</span>
                    ))}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 90, delay: 0.35 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-white p-7 rounded-3xl border border-slate-100 border-b-[5px] border-b-transparent hover:border-b-sky-500 shadow-md hover:shadow-2xl hover:border-sky-300/80 transition-all duration-300 cursor-default">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map(t => (
                      <span key={t} className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 text-slate-600 border border-slate-200/60">{t}</span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* FAQ */}
              <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 90, delay: 0.4 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 border-b-[5px] border-b-transparent hover:border-b-sky-500 shadow-md hover:shadow-2xl hover:border-sky-200/60 transition-all duration-300">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500">
                    <HelpCircle size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
                </div>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                        <button onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between text-left font-bold text-slate-800 hover:text-sky-500 transition-colors py-2">
                          <span className="text-sm leading-snug">{faq.q}</span>
                          <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-sky-500" : ""}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <p className="text-slate-500 text-xs leading-relaxed pt-2 pl-1 font-medium">{faq.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right: sticky CTA */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="sticky top-24 bg-white/90 backdrop-blur-md rounded-3xl border border-sky-100/60 shadow-xl p-8 space-y-6 hover:shadow-2xl hover:shadow-sky-500/[0.05] transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 shadow-inner">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Ready to get started?</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Let's build the right FinTech solution for your business. Talk to our experts today.
                  </p>
                </div>
                <div className="space-y-3">
                  <Link href="/contact"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold py-3.5 rounded-2xl shadow-md shadow-sky-500/20 active:scale-[0.98] transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/30 hover:-translate-y-0.5 transform">
                    Consult Our Experts <ArrowRight size={15} />
                  </Link>
                  <Link href="/services"
                    className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold py-3 rounded-2xl transition-all text-xs hover:border-slate-300 active:scale-[0.99] duration-300">
                    <ArrowLeft size={14} /> All Services
                  </Link>
                </div>
                <div className="pt-5 border-t border-slate-100 space-y-3">
                  {["Free product demo", "Mutual NDA on request", "Indian compliance built-in", "Post-launch technical support"].map((item, idx) => (
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

      {/* ── RELATED FINANCE PRODUCTS ── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Other FinTech Products</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {financeServices
              .filter(s => s.id !== service.id)
              .slice(0, 3)
              .map(s => (
                <Link key={s.id} href={`/services/finance/${s.id}`}
                  className="bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-sky-300 hover:shadow-lg p-6 transition-all group flex flex-col justify-between">
                  <div>
                    <div className={`w-10 h-10 ${s.iconBg} rounded-xl flex items-center justify-center mb-4 ${s.iconColor} group-hover:scale-110 transition-transform`}>
                      {s.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1 text-sm group-hover:text-sky-600 transition-colors leading-snug">{s.title}</h4>
                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{s.tagline}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-sky-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
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