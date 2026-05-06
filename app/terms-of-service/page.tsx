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
                  1. Agreement to Terms
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                By accessing our website and using Moonshot Minds' services, you agree to be bound by these Terms of Service. This contract governs all products, consulting, and software development services we provide.
              </p>
              <div className="border-l-4 border-amber-400 pl-4 py-3 bg-amber-50 rounded-r-lg text-sm text-amber-800">
                If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any of our services.
              </div>
            </section>

            {/* 2. Core Services */}
            <section id="services">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  2. Scope of Services
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Moonshot Minds offers professional technology consulting and software engineering services, including but not limited to:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
                {[
                  "Custom Web & App Development",
                  "AI & Machine Learning Integration",
                  "Cloud Infrastructure & DevOps",
                  "Enterprise IT Strategy & Consulting",
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
                  3. Client Obligations
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                To ensure successful project delivery, clients are expected to cooperate fully and provide necessary resources.
              </p>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="border-l-4 border-green-300 pl-4 py-2 bg-green-50/60 rounded-r-lg">
                  Provide accurate and timely project requirements and feedback.
                </div>
                <div className="border-l-4 border-green-300 pl-4 py-2 bg-green-50/60 rounded-r-lg">
                  Maintain the security of any accounts or credentials provided by us.
                </div>
                <div className="border-l-4 border-amber-400 pl-4 py-2 bg-amber-50 rounded-r-lg">
                  Refrain from any illegal activities or unauthorized disruption of our servers and infrastructure.
                </div>
              </div>
            </section>

            {/* 4. Payments & Fees */}
            <section id="payments">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  4. Payment Terms & Milestones
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Unless otherwise specified in a custom Statement of Work (SOW), our standard payment structure is as follows:
              </p>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="border-l-4 border-indigo-200 pl-4 py-2 bg-slate-50 rounded-r-lg">
                  <strong className="text-slate-800">50% Advance:</strong>{" "}
                  Required to initiate the project and allocate resources.
                </div>
                <div className="border-l-4 border-indigo-200 pl-4 py-2 bg-slate-50 rounded-r-lg">
                  <strong className="text-slate-800">25% Milestone:</strong>{" "}
                  Payable upon mid-project approval or beta release.
                </div>
                <div className="border-l-4 border-indigo-200 pl-4 py-2 bg-slate-50 rounded-r-lg">
                  <strong className="text-slate-800">25% Delivery:</strong>{" "}
                  Payable prior to final handover or production deployment.
                </div>
              </div>
              <p className="text-slate-500 text-xs italic mt-3">Late payments may incur additional interest charges as permitted by law.</p>
            </section>

            {/* 5. Intellectual Property */}
            <section id="ownership">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  5. Intellectual Property Rights
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="border-l-4 border-indigo-200 pl-4 py-3 bg-slate-50 rounded-r-lg">
                  <p className="font-bold text-slate-800 mb-1">Moonshot Minds Property</p>
                  <p className="text-slate-500">
                    Pre-existing proprietary tools, internal frameworks, libraries, and brand assets remain our exclusive property.
                  </p>
                </div>
                <div className="border-l-4 border-teal-300 pl-4 py-3 bg-teal-50/60 rounded-r-lg">
                  <p className="font-bold text-slate-800 mb-1">Client Property</p>
                  <p className="text-slate-500">
                    Custom project deliverables, source code, and assets become your intellectual property only upon full payment.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Confidentiality */}
            <section id="confidentiality">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  6. Confidentiality
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Both parties agree to keep all proprietary information, trade secrets, and business strategies disclosed during the project strictly confidential. A separate Non-Disclosure Agreement (NDA) may be signed upon request.
              </p>
            </section>

            {/* 7. Warranties and Disclaimers */}
            <section id="warranties">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  7. Warranties & Disclaimers
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our services are provided on an "as-is" and "as available" basis. While we strive for excellence, Moonshot Minds makes no representations or warranties of any kind, express or implied, regarding the uninterrupted operation of custom software or its fitness for a particular purpose, unless explicitly stated in an SLA.
              </p>
            </section>

            {/* 8. Liability */}
            <section id="liability">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  8. Limitation of Liability
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                In no event shall Moonshot Minds, its directors, employees, or partners be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or goodwill. Our total liability is strictly capped at the total amount paid by you for the specific service in the 12 months preceding the claim.
              </p>
            </section>

            {/* 9. Termination */}
            <section id="termination">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  9. Termination
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                We reserve the right to suspend or terminate services immediately, without prior notice, for any breach of these Terms. You may terminate your engagement with us at any time by providing written notice and clearing all outstanding dues for work completed up to the termination date.
              </p>
            </section>

            {/* 10. Governing Law */}
            <section id="law">
              <div className="border-l-4 border-indigo-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-indigo-600">
                  10. Governing Law
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                These Terms shall be governed and construed in accordance with the laws of Victoria, Australia, without regard to its conflict of law provisions. Any legal disputes shall be subject to the exclusive jurisdiction of the courts located in Victoria.
              </p>
              <div className="border-l-4 border-indigo-200 pl-4 py-3 bg-slate-50 rounded-r-lg text-sm text-slate-700 space-y-1">
                <p className="font-semibold text-slate-800">Contact Legal:</p>
                <p>moonshotminds@gmail.com</p>
                <p>Craigieburn, VIC 3064, AU</p>
              </div>
            </section>

            {/* Footer */}
            <div className="pt-6 border-t border-slate-100 text-center text-xs text-slate-400 space-y-2">
              <p>© {new Date().getFullYear()} Moonshot Minds. All rights reserved.</p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/privacy-policy"
                  className="text-indigo-500 hover:underline"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/contact"
                  className="text-indigo-500 hover:underline"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
