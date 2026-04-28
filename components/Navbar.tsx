"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span>
            <span className="text-slate-800">Moonshot</span>
            <span className="text-sky-500">Minds</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-sky-500 ${
                pathname === link.href ? "text-sky-500 font-semibold" : "text-slate-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-sm">
            Get Started
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-700" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium ${pathname === link.href ? "text-sky-500" : "text-slate-700"}`}
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
