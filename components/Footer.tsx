import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 border-t border-slate-900 pt-16 pb-6">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10 relative z-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/25">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span>
                <span className="text-white">Moonshot</span>
                <span className="text-sky-500">Minds</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Empowering global enterprises with scalable software solutions and innovative technologies. Your mission, our code.
            </p>
            <div className="flex gap-3">
              {/* LinkedIn */}
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-sky-400 hover:border-sky-500/50 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              {/* Twitter */}
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-sky-400 hover:border-sky-500/50 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              {/* GitHub */}
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-sky-400 hover:border-sky-500/50 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {[
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Why Choose Us", href: "/why-us" },
                { label: "Contact", href: "/contact" }
              ].map((item) => (
                <li key={item.label}><Link href={item.href} className="hover:text-sky-500 transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="font-semibold text-white mb-4">Expertise</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {["Web Development", "Enterprise Software", "Cloud & DevOps", "AI & Data Science"].map((item) => (
                <li key={item}><Link href="#" className="hover:text-sky-500 transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2"><MapPin size={16} className="text-sky-500 mt-0.5 shrink-0" /><span>92 hotly drive, Craigieburn, Victoria-3064</span></li>
              <li className="flex gap-2"><Phone size={16} className="text-sky-500 shrink-0" /><span>1234567890</span></li>
              <li className="flex gap-2"><Mail size={16} className="text-sky-500 shrink-0" /><span>moonshotminds@gmail.com</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900/80 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 relative z-10">
          <p>© 2026 Moonshot Minds Tech. All rights reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <Link href="#" className="hover:text-sky-500">Privacy Policy</Link>
            <Link href="#" className="hover:text-sky-500">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
