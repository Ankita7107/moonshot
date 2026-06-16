"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Globe, Settings, Cloud, Zap, Shield, Smartphone,
  Banknote, ShieldCheck, TrendingUp, Home, BarChart2, IndianRupee,
  ArrowRight, Rocket, Code2, Layers, HeartPulse, ShoppingCart, Truck,
  GraduationCap, Factory, Plane, Building2, Landmark, Sparkles,
  Layout, MessageSquare, RefreshCcw, Database, BarChart
} from "lucide-react";

/* ─── Menu Data ──────────────────────────────────────────── */
const servicesMenu = {
  tech: [
    { icon: Globe,        label: "Web Development",              desc: "Fast, scalable websites & web apps",      href: "/services/custom-web-solutions" },
    { icon: Settings,     label: "ERP Solutions",                desc: "Streamline your entire business",         href: "/services/enterprise-software" },
    { icon: Cloud,        label: "Cloud & DevOps",               desc: "Deploy faster, scale smarter",            href: "/services/cloud-devops" },
    { icon: Zap,          label: "AI & Machine Learning",        desc: "Smart solutions for complex problems",    href: "/services/ai-machine-learning" },
    { icon: Shield,       label: "Cybersecurity",                desc: "Protect your digital assets",             href: "/services/cybersecurity" },
    { icon: Smartphone,   label: "Mobile App Development",       desc: "iOS & Android apps users love",           href: "/services/mobile-app-development" },
    { icon: Code2,        label: "API Development & Integration",desc: "Connect every system seamlessly",         href: "/services/api-development-integration" },
    { icon: Database,     label: "DevOps & CI/CD Automation",    desc: "From code to production, automatically",  href: "/services/devops-ci-cd-automation" },
    { icon: Layout,       label: "UI/UX Design",                 desc: "Beautiful designs that convert",          href: "/services/ui-ux-design" },
    { icon: MessageSquare,label: "AI Chatbots & Automation",     desc: "Automate support & workflows 24/7",       href: "/services/ai-chatbots-automation" },
    { icon: BarChart,     label: "Data Analytics & BI",          desc: "Turn raw data into clear decisions",      href: "/services/data-analytics-bi-dashboards" },
    { icon: RefreshCcw,   label: "ERP & CRM Systems",            desc: "One system for your whole business",      href: "/services/erp-crm-systems" },
    { icon: Shield,       label: "Software Testing & QA",        desc: "Ship bug-free, every time",               href: "/services/software-testing-qa" },
    { icon: Cloud,        label: "System Migration",             desc: "Move to modern with zero downtime",       href: "/services/system-migration-services" },
    { icon: Zap,          label: "SaaS Product Development",     desc: "Build your SaaS from idea to launch",    href: "/services/saas-product-development" },
  ],
  finance: [
    { icon: Banknote,     label: "Accounting Software",   href: "/services/finance/ledger",   color: "text-sky-500" },
    { icon: ShieldCheck,  label: "Invoicing & Billing",   href: "/services/finance/invoice",  color: "text-green-500" },
    { icon: TrendingUp,   label: "Expense Management",    href: "/services/finance/expense",  color: "text-yellow-500" },
    { icon: IndianRupee,  label: "Inventory Management",  href: "/services/finance/stock",    color: "text-violet-500" },
    { icon: Home,         label: "Subscription Billing",  href: "/services/finance/billing",  color: "text-orange-500" },
    { icon: BarChart2,    label: "Payroll Management",    href: "/services/finance/payroll",  color: "text-fuchsia-500" },
    { icon: Code2,        label: "NBFC APIs & Solutions", href: "/services/finance/nbfc-api", color: "text-sky-500" },
  ],
};

const industriesMenu = [
  { icon: Landmark,     label: "FinTech",               href: "/industries/fintech" },
  { icon: HeartPulse,   label: "Healthcare",             href: "/industries/healthcare" },
  { icon: ShoppingCart, label: "E-Commerce",             href: "/industries/e-commerce" },
  { icon: Truck,        label: "Logistics",              href: "/industries/logistics" },
  { icon: Home,         label: "Real Estate",            href: "/industries/real-estate" },
  { icon: GraduationCap,label: "Education",              href: "/industries/education" },
  { icon: Factory,      label: "Manufacturing",          href: "/industries/manufacturing" },
  { icon: Plane,        label: "Travel & Hospitality",   href: "/industries/travel-hospitality" },
  { icon: Building2,    label: "Banking & Insurance",    href: "/industries/banking-insurance" },
  { icon: Shield,       label: "Cybersecurity",          href: "/industries/cybersecurity" },
  { icon: Smartphone,   label: "Telecom",                href: "/industries/telecom" },
  { icon: Rocket,       label: "Automotive",             href: "/industries/automotive" },
  { icon: Layers,       label: "Media & Entertainment",  href: "/industries/media-entertainment" },
  { icon: ShoppingCart, label: "Food Tech",              href: "/industries/food-restaurant-tech" },
  { icon: Building2,    label: "Public Sector",          href: "/industries/government-public-sector" },
];

/* ─── HoverMenu ──────────────────────────────────────────── */
function HoverMenu({ label, href, isActive, isOpen, onMouseEnter, onMouseLeave, children }: {
  label: string; href: string; isActive: boolean; isOpen: boolean;
  onMouseEnter: () => void; onMouseLeave: () => void; children: React.ReactNode;
}) {
  return (
    <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Link href={href}
        className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-colors
          ${isActive || isOpen ? "text-sky-600" : "text-slate-600 hover:text-sky-500"}`}>
        {label}
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        {(isActive || isOpen) && (
          <motion.div layoutId="nav-glow" className="absolute inset-0 bg-sky-50 rounded-full -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
        )}
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
            className="absolute top-full left-1/2 mt-2 z-[100]">
            <div className="bg-white rounded-3xl shadow-2xl shadow-sky-900/10 border border-slate-100 overflow-hidden backdrop-blur-xl">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── MobileAccordion ────────────────────────────────────── */
function MobileAccordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-lg font-bold text-slate-900 transition-colors hover:text-sky-500">
        {label}
        <ChevronDown size={18} className={`transition-transform duration-200 ${open ? "rotate-180 text-sky-500" : "text-slate-400"}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="pb-4 pt-1 space-y-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<"services" | "industries" | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (menu: "services" | "industries") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const closeDropdowns = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const handleSamePageHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split("#");
    if (pathname === path) {
      e.preventDefault();
      if (hash) window.location.hash = hash;
    }
  };

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className={`sticky top-0 z-[100] transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl py-3 border-b border-slate-100" : "bg-white py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-12 h-12 group-hover:scale-110 transition-transform">
            <Image src="/moonshot_images/logo.png" alt="Logo" fill className="object-contain" priority />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900">
            Moonshot<span className="text-sky-500">Minds</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {[{ label: "Home", href: "/" }, { label: "About", href: "/about" }].map((link) => (
            <Link key={link.label} href={link.href}
              className={`relative px-4 py-2 text-sm font-semibold transition-colors
                ${pathname === link.href ? "text-sky-600" : "text-slate-600 hover:text-sky-500"}`}>
              {link.label}
              {pathname === link.href && (
                <motion.div layoutId="nav-glow" className="absolute inset-0 bg-sky-50 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
            </Link>
          ))}

          {/* Services Mega Menu */}
          <HoverMenu 
            label="Services" 
            href="/services" 
            isActive={pathname === "/services"}
            isOpen={activeDropdown === "services"}
            onMouseEnter={() => handleMouseEnter("services")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-[900px] flex p-2">

              {/* Tech Services — 3-column grid to fit all 15 */}
              <div className="flex-1 p-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Tech Services</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {servicesMenu.tech.map((i) => (
                    <Link key={i.label} href={i.href}
                      onClick={(e) => {
                        handleSamePageHashClick(e, i.href);
                        closeDropdowns();
                      }}
                      className="flex items-start gap-3 p-3 rounded-2xl hover:bg-sky-50 group/item transition-all">
                      <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-sky-500 group-hover/item:bg-sky-500 group-hover/item:text-white transition-all flex-shrink-0">
                        <i.icon size={17} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 leading-tight mb-0.5">{i.label}</div>
                        <div className="text-[10px] text-slate-400 font-medium leading-tight">{i.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Finance + CTA sidebar */}
              <div className="w-[220px] bg-slate-50/50 p-5 rounded-2xl border-l border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">FinTech Suites</div>
                  <div className="space-y-1 mb-6">
                    {servicesMenu.finance.map((i) => (
                      <Link key={i.label} href={i.href}
                        onClick={(e) => {
                          handleSamePageHashClick(e, i.href);
                          closeDropdowns();
                        }}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white hover:shadow-sm transition-all group/f">
                        <i.icon size={15} className={i.color} />
                        <span className="text-xs font-bold text-slate-700 group-hover/f:text-sky-600 transition-colors">{i.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA Box */}
                <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-4 text-white shadow-lg shadow-sky-200">
                  <Rocket size={20} className="mb-2 opacity-90" />
                  <p className="text-xs font-bold mb-1">Start a Project</p>
                  <p className="text-[10px] opacity-80 mb-3 leading-relaxed">
                    Build something amazing with our expert engineering team.
                  </p>
                  <Link href="/contact"
                    onClick={closeDropdowns}
                    className="flex items-center justify-center gap-2 text-[10px] font-bold bg-white/20 hover:bg-white/30 px-3 py-2 rounded-xl transition-all">
                    Get in Touch <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          </HoverMenu>

          {/* Industries Menu */}
          <HoverMenu 
            label="Industries" 
            href="/industries" 
            isActive={pathname === "/industries"}
            isOpen={activeDropdown === "industries"}
            onMouseEnter={() => handleMouseEnter("industries")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-[450px] p-4 grid grid-cols-2 gap-2">
              {industriesMenu.map((i) => (
                <Link key={i.label} href={i.href}
                  onClick={(e) => {
                    handleSamePageHashClick(e, i.href);
                    closeDropdowns();
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-sky-50 group/i transition-all">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sky-400 group-hover/i:text-sky-600 shadow-sm transition-all">
                    <i.icon size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{i.label}</span>
                </Link>
              ))}
            </div>
          </HoverMenu>

          {["Why Us", "Technologies"].map((link) => {
            const href = "/" + link.toLowerCase().replace(" ", "-");
            return (
              <Link key={link} href={href}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors
                  ${pathname === href ? "text-sky-600" : "text-slate-600 hover:text-sky-500"}`}>
                {link}
                {pathname === href && (
                  <motion.div layoutId="nav-glow" className="absolute inset-0 bg-sky-50 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                )}
              </Link>
            );
          })}

          <Link href="/contact" className="ml-4 btn-primary rounded-full">Get Started</Link>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-900 hover:bg-slate-50 rounded-full transition-colors">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white fixed inset-x-0 top-[72px] z-[90] overflow-y-auto px-6 pb-20">
            <div className="py-4 flex flex-col">
              <Link href="/" onClick={() => setMobileOpen(false)} className="border-b border-slate-100 py-4 text-lg font-bold text-slate-900 block transition-colors hover:text-sky-500">Home</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="border-b border-slate-100 py-4 text-lg font-bold text-slate-900 block transition-colors hover:text-sky-500">About</Link>

              <MobileAccordion label="Services">
                <div className="pl-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-2 pb-1">Tech</p>
                  <div className="grid grid-cols-1 gap-1">
                    {servicesMenu.tech.map(i => (
                      <Link key={i.label} href={i.href}
                        onClick={(e) => { setMobileOpen(false); handleSamePageHashClick(e, i.href); }}
                        className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-slate-50 text-slate-600 font-semibold text-sm transition-colors">
                        <i.icon size={15} className="text-sky-400 flex-shrink-0" />
                        {i.label}
                      </Link>
                    ))}
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-4 pb-1">FinTech</p>
                  <div className="grid grid-cols-1 gap-1">
                    {servicesMenu.finance.map(i => (
                      <Link key={i.label} href={i.href}
                        onClick={(e) => { setMobileOpen(false); handleSamePageHashClick(e, i.href); }}
                        className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-slate-50 text-slate-600 font-semibold text-sm transition-colors">
                        <i.icon size={15} className={`${i.color} flex-shrink-0`} />
                        {i.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </MobileAccordion>

              <MobileAccordion label="Industries">
                <div className="pl-2 pt-2 grid grid-cols-2 gap-1">
                  {industriesMenu.map(i => (
                    <Link key={i.label} href={i.href}
                      onClick={(e) => { setMobileOpen(false); handleSamePageHashClick(e, i.href); }}
                      className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-slate-50 text-slate-600 font-semibold text-sm transition-colors">
                      <i.icon size={15} className="text-sky-400 flex-shrink-0" />
                      {i.label}
                    </Link>
                  ))}
                </div>
              </MobileAccordion>

              <Link href="/why-us" onClick={() => setMobileOpen(false)} className="border-b border-slate-100 py-4 text-lg font-bold text-slate-900 block transition-colors hover:text-sky-500">Why Us</Link>
              <Link href="/technologies" onClick={() => setMobileOpen(false)} className="border-b border-slate-100 py-4 text-lg font-bold text-slate-900 block transition-colors hover:text-sky-500">Technologies</Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="mt-8 btn-primary text-center">Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}