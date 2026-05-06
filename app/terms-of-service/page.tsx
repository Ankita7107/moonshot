"use client";
import { motion } from "framer-motion";
import { 
  Scale, FileText, AlertCircle, CheckCircle, Shield, Users, Globe, BookOpen, Trash2, Zap, IndianRupee 
} from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  const navItems = [
    "Agreement", "Services", "Obligations", "Payments", "Ownership", "Liability", "Termination", "Law"
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="absolute -top-10 left-1/4 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl animate-float-slow" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-4 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 text-indigo-300 text-sm">
            <Scale className="w-4 h-4" /> Legal Agreement
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Terms of Service</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">A clear summary of how we work together.</p>
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
                  <BookOpen className="w-4 h-4 text-indigo-500" /> Summary
                </h3>
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm text-slate-600 hover:text-indigo-600 py-1.5 transition-colors">
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Main Content Sections */}
            <motion.div className="lg:col-span-3 space-y-8">
              
              {/* Section 1 */}
              <section id="agreement" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0"><FileText className="text-indigo-600" /></div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Agreement</h2>
                    <p className="text-slate-600 mb-4">By using Moonshot Minds services, you agree to these legally binding terms. This contract governs all products and consulting we provide.</p>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-sm text-amber-800">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p>If you do not agree to these terms, please cease use of our services immediately.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section id="services" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0"><Zap className="text-indigo-600" /></div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Core Services</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {["Web & App Development", "AI & ML Integration", "Cloud Solutions", "IT Strategy"].map((s) => (
                        <div key={s} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-green-500" /> {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="obligations" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0"><Users className="text-indigo-600" /></div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Obligations</h2>
                    <ul className="space-y-3 text-slate-600 text-sm">
                      <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> You must provide accurate project information.</li>
                      <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> You are responsible for account security.</li>
                      <li className="flex gap-2"><AlertCircle className="w-4 h-4 text-amber-500 shrink-0" /> No illegal use or disruption of our servers is permitted.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="payments" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0"><IndianRupee className="text-indigo-600" /></div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Payments & Fees</h2>
                    <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 space-y-2">
                      <p>• <strong>50% Advance:</strong> Required to start project.</p>
                      <p>• <strong>25% Milestone:</strong> Payable upon mid-project approval.</p>
                      <p>• <strong>25% Delivery:</strong> Payable upon final handover.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section id="ownership" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0"><Shield className="text-indigo-600" /></div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Intellectual Property</h2>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="border border-slate-200 rounded-xl p-4">
                        <p className="font-bold mb-1">Our Property</p>
                        <p className="text-slate-500">Proprietary tools, internal code, and brand assets.</p>
                      </div>
                      <div className="border border-slate-200 rounded-xl p-4">
                        <p className="font-bold mb-1">Your Property</p>
                        <p className="text-slate-500">Custom project deliverables (once fully paid).</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section id="liability" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0"><AlertCircle className="text-indigo-600" /></div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Liability</h2>
                    <p className="text-slate-600 text-sm mb-4">Moonshot Minds is not liable for indirect losses (profits, data). Our total liability is capped at the amount paid by you in the last 12 months.</p>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section id="termination" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0"><Trash2 className="text-indigo-600" /></div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Termination</h2>
                    <p className="text-slate-600 text-sm">We reserve the right to suspend services for breaches of these terms. You may terminate your account at any time by clearing outstanding dues.</p>
                  </div>
                </div>
              </section>

              {/* Section 8 */}
              <section id="law" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0"><Globe className="text-indigo-600" /></div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Governing Law</h2>
                    <p className="text-slate-600 text-sm">These terms are governed by the laws of Victoria, Australia. Disputes are subject to the exclusive jurisdiction of Victorian courts.</p>
                    <div className="mt-6 pt-6 border-t border-slate-200 text-xs text-slate-500">
                      <p className="font-bold mb-1">Contact Legal:</p>
                      <p>legal@moonshotminds.com | Craigieburn, VIC 3064, AU</p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="text-center text-sm text-slate-500 pt-8">
                <p>© 2026 Moonshot Minds.</p>
                <div className="mt-2 flex justify-center gap-4">
                  <Link href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy</Link>
                  <Link href="/contact" className="text-indigo-600 hover:underline">Contact</Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}