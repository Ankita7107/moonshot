"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ← Back button */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-1.5 hover:text-indigo-600 transition-colors shadow-sm"
          >
            ← Back
          </Link>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
          {/* Gradient header inside card */}
          <div
            className="px-10 py-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, #3730a3 0%, #1d6fa4 60%, #13b8a6 100%)",
            }}
          >
            <p className="text-indigo-200 text-xs font-semibold uppercase tracking-widest mb-2">
              Legal Agreement
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-white/70 text-sm">
              A clear summary of how we work together.
            </p>
          </div>

          {/* Content */}
          <div className="px-8 md:px-12 py-10 space-y-10">
            {/* 1. Agreement */}
            <section id="agreement">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  1. Agreement
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                By using Moonshot Minds services, you agree to these legally
                binding terms. This contract governs all products and consulting
                we provide.
              </p>
              <div className="border-l-4 border-amber-400 pl-4 py-3 bg-amber-50 rounded-r-lg text-sm text-amber-800">
                If you do not agree to these terms, please cease use of our
                services immediately.
              </div>
            </section>

            {/* 2. Core Services */}
            <section id="services">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  2. Core Services
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
                {[
                  "Web & App Development",
                  "AI & ML Integration",
                  "Cloud Solutions",
                  "IT Strategy",
                ].map((s) => (
                  <div
                    key={s}
                    className="border-l-4 border-indigo-200 pl-4 py-2 bg-slate-50 rounded-r-lg"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </section>

            {/* 3. User Obligations */}
            <section id="obligations">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  3. User Obligations
                </h2>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="border-l-4 border-green-300 pl-4 py-2 bg-green-50/60 rounded-r-lg">
                  You must provide accurate project information.
                </div>
                <div className="border-l-4 border-green-300 pl-4 py-2 bg-green-50/60 rounded-r-lg">
                  You are responsible for account security.
                </div>
                <div className="border-l-4 border-amber-400 pl-4 py-2 bg-amber-50 rounded-r-lg">
                  No illegal use or disruption of our servers is permitted.
                </div>
              </div>
            </section>

            {/* 4. Payments & Fees */}
            <section id="payments">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  4. Payments & Fees
                </h2>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="border-l-4 border-indigo-200 pl-4 py-2 bg-slate-50 rounded-r-lg">
                  <strong className="text-slate-800">50% Advance:</strong>{" "}
                  Required to start project.
                </div>
                <div className="border-l-4 border-indigo-200 pl-4 py-2 bg-slate-50 rounded-r-lg">
                  <strong className="text-slate-800">25% Milestone:</strong>{" "}
                  Payable upon mid-project approval.
                </div>
                <div className="border-l-4 border-indigo-200 pl-4 py-2 bg-slate-50 rounded-r-lg">
                  <strong className="text-slate-800">25% Delivery:</strong>{" "}
                  Payable upon final handover.
                </div>
              </div>
            </section>

            {/* 5. Intellectual Property */}
            <section id="ownership">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  5. Intellectual Property
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="border-l-4 border-indigo-200 pl-4 py-3 bg-slate-50 rounded-r-lg">
                  <p className="font-bold text-slate-800 mb-1">Our Property</p>
                  <p className="text-slate-500">
                    Proprietary tools, internal code, and brand assets.
                  </p>
                </div>
                <div className="border-l-4 border-teal-300 pl-4 py-3 bg-teal-50/60 rounded-r-lg">
                  <p className="font-bold text-slate-800 mb-1">Your Property</p>
                  <p className="text-slate-500">
                    Custom project deliverables (once fully paid).
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Liability */}
            <section id="liability">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  6. Liability
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Moonshot Minds is not liable for indirect losses (profits,
                data). Our total liability is capped at the amount paid by you
                in the last 12 months.
              </p>
            </section>

            {/* 7. Termination */}
            <section id="termination">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  7. Termination
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                We reserve the right to suspend services for breaches of these
                terms. You may terminate your account at any time by clearing
                outstanding dues.
              </p>
            </section>

            {/* 8. Governing Law */}
            <section id="law">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  8. Governing Law
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                These terms are governed by the laws of Victoria, Australia.
                Disputes are subject to the exclusive jurisdiction of Victorian
                courts.
              </p>
              <div className="border-l-4 border-indigo-200 pl-4 py-3 bg-slate-50 rounded-r-lg text-sm text-slate-700 space-y-1">
                <p className="font-semibold text-slate-800">Contact Legal:</p>
                <p>moonshotminds@gmail.com</p>
                <p>Craigieburn, VIC 3064, AU</p>
              </div>
            </section>

            {/* Footer */}
            <div className="pt-6 border-t border-slate-100 text-center text-xs text-slate-400 space-y-2">
              <p>© 2024 Moonshot Minds.</p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/privacy-policy"
                  className="text-indigo-500 hover:underline"
                >
                  Privacy
                </Link>
                <Link
                  href="/contact"
                  className="text-indigo-500 hover:underline"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
