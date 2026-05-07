"use client";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Mail,
  Clock,
  Globe,
  CheckCircle,
  FileText,
  Users,
  Server,
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2026";

  return (
    // Outer gray background — full page
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ← Back button */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-1.5 hover:text-sky-600 transition-colors shadow-sm"
          >
            ← Back
          </Link>
        </div>

        {/* Card / Form container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
          {/* ── Teal gradient header INSIDE card ── */}
          <div
            className="px-10 py-6 text-center bg-gradient-to-br from-sky-500 to-sky-600"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-white/75 text-sm italic flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* ── Scrollable content area ── */}
          <div className="px-8 md:px-12 py-10 space-y-10">
            {/* 1. Introduction */}
            <section id="introduction">
              <div className="border-l-4 border-sky-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-sky-600">
                  1. Introduction
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Moonshot Minds ("we", "our", or "us") is committed to safeguarding your personal
                information. This Privacy Policy details how we collect, use, and protect your
                data across our platforms, websites, and services. By using our services, you consent to the data practices described in this policy.
              </p>
            </section>

            {/* 2. Information Collection */}
            <section id="collection">
              <div className="border-l-4 border-sky-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-sky-600">
                  2. Information Collection
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600 mb-3">
                <div className="border-l-4 border-sky-300 pl-4 py-3 bg-slate-50 rounded-r-lg">
                  <p className="font-bold text-slate-800 mb-2">Personal Data</p>
                  <p>• Name, Job Title &amp; Company Name</p>
                  <p>• Work Email &amp; Phone Number</p>
                  <p>• Billing &amp; Payment Info</p>
                </div>
                <div className="border-l-4 border-teal-300 pl-4 py-3 bg-slate-50 rounded-r-lg">
                  <p className="font-bold text-slate-800 mb-2">
                    Technical Data
                  </p>
                  <p>• IP Addresses &amp; Device IDs</p>
                  <p>• Browser Type &amp; Version</p>
                  <p>• Browsing Analytics &amp; Log Data</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                We collect this information when you interact with our website, request a consultation, or engage our services. We may also receive information from third-party partners and public sources.
              </p>
            </section>

            {/* 3. Data Usage */}
            <section id="usage">
              <div className="border-l-4 border-sky-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-sky-600">
                  3. Data Usage
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                We use the collected information for various professional and operational purposes, including:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-600">
                {[
                  "Delivering & Maintaining Services",
                  "Processing Transactions & Payments",
                  "Improving User Experience & Analytics",
                  "Customer Support & Communication",
                  "Fraud Prevention & Security",
                  "Legal & Regulatory Compliance",
                ].map((u) => (
                  <div key={u} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-sky-500 shrink-0" />
                    {u}
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Cookies & Tracking Technologies */}
            <section id="cookies">
              <div className="border-l-4 border-sky-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-sky-600">
                  4. Cookies & Tracking Technologies
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our website uses cookies, web beacons, and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings, though disabling them may limit some site functionalities.
              </p>
            </section>

            {/* 5. Third-Party Sharing */}
            <section id="third-party">
              <div className="border-l-4 border-sky-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-sky-600">
                  5. Information Sharing & Disclosure
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                We do not sell your personal data. We may share your information with trusted third-party service providers (such as hosting, payment processing, and analytics partners) strictly for the purpose of operating our business. These parties are contractually obligated to keep your data secure. We may also disclose data if required by law or to protect our legal rights.
              </p>
            </section>

            {/* 6. Data Security */}
            <section id="security">
              <div className="border-l-4 border-sky-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-sky-600">
                  6. Data Security
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                We implement a multi-layered security strategy to protect your personal information from unauthorized access, alteration, or disclosure. Our security-first culture ensures that data protection is integrated into every stage of our operations.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="border-l-4 border-sky-300 pl-4 py-3 bg-slate-50 rounded-r-lg">
                  <Shield className="w-4 h-4 text-sky-500 mb-1" />
                  <p className="text-sm font-medium text-slate-800">
                    SSL Encryption
                  </p>
                  <p className="text-xs text-slate-500">
                    256-bit secure data transmission for all traffic.
                  </p>
                </div>
                <div className="border-l-4 border-teal-300 pl-4 py-3 bg-slate-50 rounded-r-lg">
                  <Server className="w-4 h-4 text-teal-500 mb-1" />
                  <p className="text-sm font-medium text-slate-800">
                    ISO Certified Facilities
                  </p>
                  <p className="text-xs text-slate-500">
                    Secure and compliant data storage in tier-1 data centers.
                  </p>
                </div>
                <div className="border-l-4 border-indigo-300 pl-4 py-3 bg-slate-50 rounded-r-lg">
                  <Lock className="w-4 h-4 text-indigo-500 mb-1" />
                  <p className="text-sm font-medium text-slate-800">
                    MFA & PoLP
                  </p>
                  <p className="text-xs text-slate-500">
                    Multi-factor authentication and strict access controls.
                  </p>
                </div>
                <div className="border-l-4 border-blue-300 pl-4 py-3 bg-slate-50 rounded-r-lg">
                  <Users className="w-4 h-4 text-blue-500 mb-1" />
                  <p className="text-sm font-medium text-slate-800">
                    Employee Training
                  </p>
                  <p className="text-xs text-slate-500">
                    Regular security and privacy awareness programs.
                  </p>
                </div>
              </div>

              <div className="bg-sky-50 border border-sky-100 rounded-xl p-5">
                <h3 className="text-sm font-bold text-sky-800 mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4" /> Comprehensive Security Framework
                </h3>
                <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-xs text-sky-700/80">
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold">•</span>
                    Regular vulnerability assessments & penetration testing.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold">•</span>
                    End-to-end encryption for sensitive data at rest.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold">•</span>
                    Strict Non-Disclosure Agreements (NDAs) for all staff.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold">•</span>
                    24/7 monitoring and rapid incident response protocols.
                  </li>
                </ul>
              </div>
            </section>

            {/* 7. Data Retention */}
            <section id="retention">
              <div className="border-l-4 border-sky-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-sky-600">
                  7. Data Retention
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law (such as for tax, legal, or accounting purposes).
              </p>
            </section>

            {/* 8. Your Rights */}
            <section id="rights">
              <div className="border-l-4 border-sky-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-sky-600">
                  8. Your Rights & Choices
                </h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Depending on your location, you may have specific rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 mb-3">
                <li>Right to access, update, or correct your information.</li>
                <li>Right to request deletion of your personal data.</li>
                <li>Right to restrict or object to certain data processing.</li>
                <li>Right to opt-out of marketing communications at any time.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed">
                To exercise any of these rights, please contact us using the information provided below.
              </p>
            </section>

            {/* 9. Contact */}
            <section id="contact">
              <div className="border-l-4 border-sky-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-sky-600">9. Contact Us</h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                If you have questions or concerns about this Privacy Policy or our data practices, please reach out to us:
              </p>
              <div className="border-l-4 border-sky-300 pl-4 py-3 bg-slate-50 rounded-r-lg text-sm text-slate-700 space-y-1">
                <p><strong>Email:</strong> moonshotminds@gmail.com</p>
                <p><strong>Phone:</strong> +61 412 345 678</p>
                <p><strong>Address:</strong> Craigieburn, VIC 3064, AU</p>
              </div>
            </section>

            {/* Footer inside card */}
            <div className="pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
              © {new Date().getFullYear()} Moonshot Minds. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
