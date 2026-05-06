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
            className="px-10 py-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%)",
            }}
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
                Moonshot Minds is committed to safeguarding your personal
                information. This policy details how we collect and protect your
                data across our platforms.
              </p>
            </section>

            {/* 2. Information Collection */}
            <section id="collection">
              <div className="border-l-4 border-sky-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-sky-600">
                  2. Information Collection
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                <div className="border-l-4 border-sky-300 pl-4 py-3 bg-slate-50 rounded-r-lg">
                  <p className="font-bold text-slate-800 mb-2">Personal Data</p>
                  <p>• Name &amp; Work Email</p>
                  <p>• Billing &amp; Payment Info</p>
                </div>
                <div className="border-l-4 border-teal-300 pl-4 py-3 bg-slate-50 rounded-r-lg">
                  <p className="font-bold text-slate-800 mb-2">
                    Technical Data
                  </p>
                  <p>• IP &amp; Device IDs</p>
                  <p>• Browsing Analytics</p>
                </div>
              </div>
            </section>

            {/* 3. Data Usage */}
            <section id="usage">
              <div className="border-l-4 border-sky-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-sky-600">
                  3. Data Usage
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-600">
                {[
                  "Maintain Services",
                  "Process Payments",
                  "Fraud Prevention",
                  "Legal Compliance",
                ].map((u) => (
                  <div key={u} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-sky-500 shrink-0" />
                    {u}
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Data Security */}
            <section id="security">
              <div className="border-l-4 border-sky-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-sky-600">
                  4. Data Security
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border-l-4 border-sky-300 pl-4 py-3 bg-slate-50 rounded-r-lg">
                  <Shield className="w-4 h-4 text-sky-500 mb-1" />
                  <p className="text-sm font-medium text-slate-800">
                    SSL Encryption
                  </p>
                  <p className="text-xs text-slate-500">
                    256-bit secure transmission
                  </p>
                </div>
                <div className="border-l-4 border-teal-300 pl-4 py-3 bg-slate-50 rounded-r-lg">
                  <Server className="w-4 h-4 text-teal-500 mb-1" />
                  <p className="text-sm font-medium text-slate-800">
                    ISO Facilities
                  </p>
                  <p className="text-xs text-slate-500">
                    Certified data storage
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Your Rights */}
            <section id="rights">
              <div className="border-l-4 border-sky-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-sky-600">
                  5. Your Rights
                </h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                You have the right to access, correct, or delete your personal
                data and opt-out of marketing at any time.
              </p>
            </section>

            {/* 6. Contact */}
            <section id="contact">
              <div className="border-l-4 border-sky-500 pl-4 mb-3">
                <h2 className="text-lg font-bold text-sky-600">6. Contact</h2>
              </div>
              <div className="border-l-4 border-sky-300 pl-4 py-3 bg-slate-50 rounded-r-lg text-sm text-slate-700 space-y-1">
                <p>Email: moonshotminds@gmail.com</p>
                <p>AU: +61 412 345 678</p>
                <p>Craigieburn, VIC 3064, AU</p>
              </div>
            </section>

            {/* Footer inside card */}
            <div className="pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
              © 2026 Moonshot Minds. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
