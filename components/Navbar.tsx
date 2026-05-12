"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Settings,
  Cloud,
  Zap,
  Shield,
  Smartphone,
  Banknote,
  ShieldCheck,
  TrendingUp,
  Home,
  BarChart2,
  IndianRupee,
  ArrowRight,
  Rocket,
  Code2,
  Layers,
  HeartPulse,
  ShoppingCart,
  Truck,
  GraduationCap,
  Factory,
  Plane,
  Building2,
  Landmark,
} from "lucide-react";

/* ─── Menu Data ──────────────────────────────────────────── */

const servicesMenu = {
  tech: [
    { icon: Globe, label: "Custom Web Solutions", href: "/services#custom-web-solutions" },
    { icon: Settings, label: "Enterprise Software", href: "/services#enterprise-software" },
    { icon: Cloud, label: "Cloud & DevOps", href: "/services#cloud-devops" },
    { icon: Zap, label: "AI & Machine Learning", href: "/services#ai-machine-learning" },
    { icon: Shield, label: "Cybersecurity", href: "/services#cybersecurity" },
    { icon: Smartphone, label: "Mobile App Development", href: "/services#mobile-app-development" },
    { icon: Code2, label: "API Development", href: "/services#api-development-integration" },
    { icon: Layers, label: "SaaS Product Development", href: "/services#saas-product-development" },
  ],
  finance: [
    {
      icon: Banknote,
      label: "Loans",
      href: "/services#loans",
      color: "text-sky-500",
    },
    {
      icon: ShieldCheck,
      label: "Insurance",
      href: "/services#insurance",
      color: "text-green-500",
    },
    {
      icon: TrendingUp,
      label: "Mutual Fund",
      href: "/services#mutual-fund",
      color: "text-yellow-500",
    },
    {
      icon: IndianRupee,
      label: "Investments",
      href: "/services#investments",
      color: "text-violet-500",
    },
    {
      icon: Home,
      label: "Real Estate",
      href: "/services#real-estate",
      color: "text-orange-500",
    },
    {
      icon: BarChart2,
      label: "Unlisted",
      href: "/services#unlisted",
      color: "text-fuchsia-500",
    },
  ],
};

const industriesMenu = [
  { icon: Landmark, label: "FinTech", href: "/industries#fintech" },
  { icon: HeartPulse, label: "Healthcare", href: "/industries#healthcare" },
  { icon: ShoppingCart, label: "E-Commerce", href: "/industries#e-commerce" },
  { icon: Truck, label: "Logistics", href: "/industries#logistics" },
  { icon: Home, label: "Real Estate", href: "/industries#real-estate" },
  { icon: GraduationCap, label: "Education", href: "/industries#education" },
  { icon: Factory, label: "Manufacturing", href: "/industries#manufacturing" },
  { icon: Plane, label: "Travel & Hospitality", href: "/industries#travel-hospitality" },
  { icon: Building2, label: "Banking & Insurance", href: "/industries#banking-insurance" },
  { icon: Shield, label: "Cybersecurity", href: "/industries#cybersecurity" },
];

/* ─── Reusable Hover Menu Component ─────────────────────── */
function HoverMenu({
  label,
  href,
  isActive,
  children,
}: {
  label: string;
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  let closeTimer: ReturnType<typeof setTimeout>;

  const show = () => {
    clearTimeout(closeTimer);
    setOpen(true);
  };

  const hide = () => {
    closeTimer = setTimeout(() => setOpen(false), 100);
  };

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className={`group flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 select-none
          ${isActive || open ? "bg-sky-50 text-sky-600" : "text-slate-600 hover:text-sky-500 hover:bg-slate-50"}`}
      >
        {label}
        <ChevronDown
          size={13}
          className={`transition-transform duration-300 ${open ? "rotate-180 text-sky-500" : "text-slate-400 group-hover:text-sky-400"}`}
        />
      </Link>

      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 transition-all duration-200 origin-top
          ${open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}`}
      >
        <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-slate-100 rotate-45 z-10" />
        <div 
          onClick={() => setOpen(false)}
          className="relative bg-white rounded-2xl shadow-2xl shadow-slate-300/40 border border-slate-100 overflow-hidden"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Accordion ───────────────────────────────────── */
function MobileAccordion({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
      >
        {label}
        <ChevronDown
          size={13}
          className={`text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[600px] pb-2" : "max-h-0"}`}
      >
        <div className="pl-3 flex flex-col gap-0.5">{children}</div>
      </div>
    </div>
  );
}

/* ─── Main Navbar ────────────────────────────────────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100/80 bg-white/90 backdrop-blur-xl shadow-sm shadow-slate-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center font-bold text-lg shrink-0"
        >
          <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/moonshot_images/logo.png"
              alt="Moonshot Minds"
              fill
              sizes="64px"
              className="object-contain"
              priority
            />
          </div>
          <span className="-ml-1">
            <span className="text-slate-800">Moonshot</span>
            <span className="text-sky-500">Minds</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Home */}
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
              ${pathname === "/" ? "bg-sky-50 text-sky-600" : "text-slate-600 hover:text-sky-500 hover:bg-slate-50"}`}
          >
            Home
          </Link>

          {/* About — simple link, no submenu */}
          <Link
            href="/about"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
              ${["/about", "/why-us"].includes(pathname) ? "bg-sky-50 text-sky-600" : "text-slate-600 hover:text-sky-500 hover:bg-slate-50"}`}
          >
            About
          </Link>

          {/* Services */}
          <HoverMenu label="Services" href="/services" isActive={pathname === "/services"}>
            <div className="w-[780px]">
              <div className="flex">
                {/* Tech */}
                <div className="flex-1 p-5 border-r border-slate-100">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-4">
                    Tech Services
                  </p>
                  <div className="grid grid-cols-2 gap-0.5">
                    {servicesMenu.tech.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sky-50 group/item transition-colors"
                      >
                        <item.icon
                          size={14}
                          className="text-sky-400 group-hover/item:text-sky-600 shrink-0 transition-colors"
                        />
                        <span className="text-sm text-slate-600 group-hover/item:text-slate-900 font-medium transition-colors">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Finance */}
                <div className="w-[200px] p-5 border-r border-slate-100">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-4">
                    Financial Products
                  </p>
                  <div className="space-y-0.5">
                    {servicesMenu.finance.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 group/item transition-colors"
                      >
                        <item.icon
                          size={14}
                          className={`${item.color} shrink-0`}
                        />
                        <span className="text-sm text-slate-600 group-hover/item:text-slate-900 font-medium transition-colors">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="w-[175px] flex items-center p-4">
                  <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl p-4 text-white w-full">
                    <Rocket size={20} className="mb-2 opacity-80" />
                    <p className="text-sm font-bold mb-1">Start a Project</p>
                    <p className="text-xs opacity-75 mb-3 leading-relaxed">
                      Build something amazing with us.
                    </p>
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-1 text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Get in Touch <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer bar */}
              <div className="border-t border-slate-100 px-5 py-3 bg-slate-50/60 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Explore all 15+ services
                </span>
                <Link
                  href="/services"
                  className="text-xs font-semibold text-sky-500 hover:text-sky-600 flex items-center gap-1 transition-colors"
                >
                  View All Services <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </HoverMenu>

          {/* Industries */}
          <HoverMenu label="Industries" href="/industries" isActive={pathname === "/industries"}>
            <div className="w-[420px] p-4">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-2 mb-3">
                Domains We Serve
              </p>
              <div className="grid grid-cols-2 gap-0.5">
                {industriesMenu.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sky-50 group/item transition-colors"
                  >
                    <item.icon
                      size={14}
                      className="text-sky-400 group-hover/item:text-sky-500 shrink-0 transition-colors"
                    />
                    <span className="text-sm text-slate-600 group-hover/item:text-slate-900 font-medium transition-colors">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 px-2">
                <Link
                  href="/industries"
                  className="text-xs font-semibold text-sky-500 hover:text-sky-600 flex items-center gap-1 transition-colors"
                >
                  View all 15 industries <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </HoverMenu>

          {/* Why Us */}
          <Link
            href="/why-us"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
              ${pathname === "/why-us" ? "bg-sky-50 text-sky-600" : "text-slate-600 hover:text-sky-500 hover:bg-slate-50"}`}
          >
            Why Us
          </Link>

          {/* Technologies — simple link, no submenu */}
          <Link
            href="/technologies"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
              ${pathname === "/technologies" ? "bg-sky-50 text-sky-600" : "text-slate-600 hover:text-sky-500 hover:bg-slate-50"}`}
          >
            Technologies
          </Link>

          <Link
            href="/contact"
            className="btn-primary ml-3 text-sm hover-shine"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-white/98 backdrop-blur border-t border-slate-100 px-4 py-3 flex flex-col gap-1 overflow-y-auto max-h-[80vh]">
          {/* Home */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={`text-sm font-medium px-3 py-2.5 rounded-xl ${pathname === "/" ? "text-sky-600 bg-sky-50" : "text-slate-700 hover:bg-slate-50"}`}
          >
            Home
          </Link>

          {/* About — simple link, no accordion */}
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className={`text-sm font-medium px-3 py-2.5 rounded-xl ${["/about", "/why-us"].includes(pathname) ? "text-sky-600 bg-sky-50" : "text-slate-700 hover:bg-slate-50"}`}
          >
            About
          </Link>

          {/* Services */}
          <MobileAccordion label="Services">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 pt-2 pb-1">
              Tech
            </p>
            {servicesMenu.tech.map((i) => (
              <Link
                key={i.label}
                href={i.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-sky-600 rounded-lg hover:bg-sky-50"
              >
                <i.icon size={14} className="text-sky-400" /> {i.label}
              </Link>
            ))}
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 pt-3 pb-1">
              Finance
            </p>
            {servicesMenu.finance.map((i) => (
              <Link
                key={i.label}
                href={i.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-sky-600 rounded-lg hover:bg-sky-50"
              >
                <i.icon size={14} className={i.color} /> {i.label}
              </Link>
            ))}
          </MobileAccordion>

          {/* Industries */}
          <MobileAccordion label="Industries">
            {industriesMenu.map((i) => (
              <Link
                key={i.label}
                href={i.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-sky-600 rounded-lg hover:bg-sky-50"
              >
                <i.icon size={14} className="text-sky-400" /> {i.label}
              </Link>
            ))}
          </MobileAccordion>

          {/* Why Us */}
          <Link
            href="/why-us"
            onClick={() => setMobileOpen(false)}
            className={`text-sm font-medium px-3 py-2.5 rounded-xl ${pathname === "/why-us" ? "text-sky-600 bg-sky-50" : "text-slate-700 hover:bg-slate-50"}`}
          >
            Why Us
          </Link>

          {/* Technologies — simple link, no accordion */}
          <Link
            href="/technologies"
            onClick={() => setMobileOpen(false)}
            className={`text-sm font-medium px-3 py-2.5 rounded-xl ${pathname === "/technologies" ? "text-sky-600 bg-sky-50" : "text-slate-700 hover:bg-slate-50"}`}
          >
            Technologies
          </Link>

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="btn-primary text-sm text-center mt-2"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
