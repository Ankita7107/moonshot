"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/why-us", label: "Why Us" },
  { href: "/technologies", label: "Technologies" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100/80 bg-white/85 backdrop-blur-xl shadow-sm shadow-slate-200/30">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between h-[80px]">
        {/* Logo */}
        <Link href="/" className="group flex items-center font-bold text-lg">
          <div className="relative w-20 h-20 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/moonshot_images/logo.png"
              alt="Moonshot Minds Logo"
              fill
              sizes="80px"
              className="object-contain"
              priority
            />
          </div>
          <span className="-ml-2">
            <span className="text-slate-800">Moonshot</span>
            <span className="text-sky-500">Minds</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 rounded-full border border-slate-100 bg-white/80 px-2 py-2 shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                pathname === link.href
                  ? "bg-sky-50 text-sky-600 shadow-sm"
                  : "text-slate-600 hover:text-sky-500 hover:bg-slate-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary ml-2 text-sm hover-shine">
            Get Started
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur border-t border-slate-100 px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium px-3 py-2 rounded-lg ${
                pathname === link.href ? "text-sky-600 bg-sky-50" : "text-slate-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary text-sm text-center">
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
