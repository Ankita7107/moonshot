"use client";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Why Choose Us", href: "/why-us" },
      { label: "Contact", href: "/contact" },
    ],
    expertise: [
      { label: "Web Development", href: "/services#custom-web-solutions" },
      { label: "Enterprise Software", href: "/services#enterprise-software" },
      { label: "Cloud & DevOps", href: "/services#cloud-devops" },
      { label: "AI & Data Science", href: "/services#ai-machine-learning" },
    ],
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-900 pt-12 md:pt-20 pb-8 md:pb-10 overflow-hidden">
      {/* Dynamic background gradient */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-12 md:mb-16">
          {/* Brand Section */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="group flex items-center w-fit">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative w-16 h-16 bg-white rounded-2xl shadow-xl overflow-hidden p-2"
              >
                <Image
                  src="/moonshot_images/logo.png"
                  alt="Moonshot Minds Logo"
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </motion.div>
              <div className="ml-4">
                <p className="text-2xl font-bold tracking-tight">
                  <span className="text-white">Moonshot</span>
                  <span className="text-sky-500">Minds</span>
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold">
                  Tech Studio
                </p>
              </div>
            </Link>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md">
              Architecting the next generation of digital infrastructure. We
              combine engineering excellence with visionary design to build
              solutions that scale with your ambition.
            </p>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-white text-xs uppercase tracking-[0.2em] mb-4 md:mb-6">
                Company
              </h3>
              <ul className="space-y-3.5 md:space-y-4">
                {footerLinks.company.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-sky-400 text-sm transition-all duration-300 flex items-center justify-center sm:justify-start group"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2"
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="font-bold text-white text-xs uppercase tracking-[0.2em] mb-4 md:mb-6">
                Expertise
              </h3>
              <ul className="space-y-3.5 md:space-y-4">
                {footerLinks.expertise.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-sky-400 text-sm transition-all duration-300 flex items-center justify-center sm:justify-start group"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2"
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white text-xs uppercase tracking-[0.2em] mb-4 md:mb-6">
                Contact
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-start group">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                    <MapPin size={16} className="text-sky-500" />
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed break-words">
                    92 Hothly Drive, Craigieburn, Victoria-3064, Australia
                  </p>
                </div>
                <div className="flex gap-4 items-start group">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                    <Phone size={16} className="text-sky-500" />
                  </div>
                  <p className="text-slate-400 text-xs">+61 412 345 678</p>
                </div>
                <div className="flex gap-4 items-start group">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                    <Mail size={16} className="text-sky-500" />
                  </div>
                  <a
                    href="mailto:moonshotminds@gmail.com"
                    className="text-slate-400 text-xs hover:text-sky-400 transition-colors break-all"
                  >
                    moonshotminds@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs order-2 sm:order-1 font-medium text-center sm:text-left">
            © 2002 <span className="text-slate-400">Moonshot Minds Tech</span>.
            All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 sm:gap-8 order-1 sm:order-2 justify-center sm:justify-start">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-slate-500 hover:text-sky-500 transition-colors text-xs font-semibold uppercase tracking-wider"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
