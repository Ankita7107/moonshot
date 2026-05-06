"use client";
import { motion } from "framer-motion";
import {
  Shield, Lock, Eye, Database, Cookie, Mail, Clock, Globe,
  CheckCircle, AlertCircle, FileText, Users, Server, Trash2
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2026";
  const navItems = ["Introduction", "Collection", "Usage", "Sharing", "Security", "Rights", "Cookies", "Contact"];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="absolute -top-10 left-1/4 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl animate-float-slow" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-4 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
            <Shield className="w-4 h-4 text-sky-400" />
            <span className="text-sky-300 text-sm font-medium">Privacy Commitment</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Privacy Policy</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">Ensuring your data is protected under GDPR, CCPA, and Australian Privacy laws.</p>
          <div className="flex items-center justify-center gap-2 mt-6 text-slate-400 text-sm">
            <Clock className="w-4 h-4" /> Last Updated: {lastUpdated}
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div className="lg:col-span-1">
              <div className="sticky top-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-500" /> Policy Links
                </h3>
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm text-slate-600 hover:text-sky-600 py-1.5 transition-colors">
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Main Content Sections */}
            <motion.div className="lg:col-span-3 space-y-12">

              <section id="introduction" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center shrink-0"><Globe className="text-sky-600" /></div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
                    <p className="text-slate-600">Moonshot Minds is committed to safeguarding your personal information. This policy details how we collect and protect your data across our platforms.</p>
                  </div>
                </div>
              </section>

              <section id="collection" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center shrink-0"><Database className="text-sky-600" /></div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Information Collection</h2>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                      <div>
                        <p className="font-bold text-slate-800 mb-2">Personal Data</p>
                        <p>• Name & Work Email</p>
                        <p>• Billing & Payment Info</p>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 mb-2">Technical Data</p>
                        <p>• IP & Device IDs</p>
                        <p>• Browsing Analytics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="usage" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center shrink-0"><Eye className="text-sky-600" /></div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Usage</h2>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-600">
                      {["Maintain Services", "Process Payments", "Fraud Prevention", "Legal Compliance"].map((u) => (
                        <div key={u} className="flex gap-2"><CheckCircle className="w-4 h-4 text-sky-500" /> {u}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section id="security" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center shrink-0"><Lock className="text-sky-600" /></div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-xl p-4">
                        <Shield className="w-5 h-5 text-sky-500 mb-1" />
                        <p className="text-sm font-medium">SSL Encryption</p>
                        <p className="text-xs text-slate-500">256-bit secure transmission</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4">
                        <Server className="w-5 h-5 text-sky-500 mb-1" />
                        <p className="text-sm font-medium">ISO Facilities</p>
                        <p className="text-xs text-slate-500">Certified data storage</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="rights" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center shrink-0"><Users className="text-sky-600" /></div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Rights</h2>
                    <p className="text-sm text-slate-600 mb-4">You have the right to access, correct, or delete your personal data and opt-out of marketing at any time.</p>
                  </div>
                </div>
              </section>

              <section id="contact" className="bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl shadow-sm border border-sky-100 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center shrink-0"><Mail className="text-white" /></div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact</h2>
                    <div className="bg-white rounded-xl p-4 text-sm text-slate-700 space-y-1">
                      <p>Email: moonshotminds@gmail.com</p>
                      <p>AU: +61 412 345 678 | IN: +91 98765 43210</p>
                      <p>Craigieburn, VIC 3064, AU | Shivaji Nagar, Pune, IN</p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="text-center text-sm text-slate-500 pt-8">
                <p>© 2026 Moonshot Minds. All rights reserved.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}