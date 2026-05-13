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
  Layout, MessageSquare, RefreshCcw
} from "lucide-react";

/* ─── Menu Data ──────────────────────────────────────────── */
const servicesMenu = {
  tech: [
    { icon: Globe, label: "Custom Web Solutions", desc: "Performance-first web apps", href: "/services#custom-web-solutions" },
    { icon: Settings, label: "Enterprise Software", desc: "Streamlined business tools", href: "/services#enterprise-software" },
    { icon: Cloud, label: "Cloud & DevOps", desc: "Automated infra scaling", href: "/services#cloud-devops" },
    { icon: Zap, label: "AI & Machine Learning", desc: "Intelligent automation", href: "/services#ai-machine-learning" },
    { icon: Shield, label: "Cybersecurity", desc: "Threat audits & protection", href: "/services#cybersecurity" },
    { icon: Smartphone, label: "Mobile Development", desc: "Native & hybrid experiences", href: "/services#mobile-app-development" },
    { icon: Code2, label: "API Development", desc: "Secure data integrations", href: "/services#api-development-integration" },
    { icon: Layout, label: "UI/UX Design", desc: "User-centric design systems", href: "/services#ui-ux-design" },
    { icon: MessageSquare, label: "AI Chatbots", desc: "Intelligent conversational agents", href: "/services#ai-chatbots-automation" },
    { icon: RefreshCcw, label: "ERP & CRM", desc: "Custom business management", href: "/services#erp-crm-systems" },
    { icon: Shield, label: "Software Testing", desc: "Automated QA & stability", href: "/services#software-testing-qa" },
  ],
  finance: [
    { icon: Banknote, label: "Loans", href: "/services#loans", color: "text-sky-500" },
    { icon: ShieldCheck, label: "Insurance", href: "/services#insurance", color: "text-green-500" },
    { icon: TrendingUp, label: "Mutual Fund", href: "/services#mutual-fund", color: "text-yellow-500" },
    { icon: IndianRupee, label: "Investments", href: "/services#investments", color: "text-violet-500" },
    { icon: Home, label: "Real Estate", href: "/services#real-estate", color: "text-orange-500" },
    { icon: BarChart2, label: "Unlisted", href: "/services#unlisted", color: "text-fuchsia-500" },
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
  { icon: Smartphone, label: "Telecom", href: "/industries#telecom" },
  { icon: Rocket, label: "Automotive", href: "/industries#automotive" },
  { icon: Layers, label: "Media & Entertainment", href: "/industries#media-entertainment" },
  { icon: ShoppingCart, label: "Food Tech", href: "/industries#food-restaurant-tech" },
  { icon: Building2, label: "Public Sector", href: "/industries#government-public-sector" },
];

/* ─── Components ─────────────────────────────────────────── */
function HoverMenu({ label, href, isActive, children }: { label: string; href: string; isActive: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<NodeJS.Timeout>();

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };

  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 300);
  };

  const cancelHide = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <Link
        href={href}
        className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-colors
          ${isActive || open ? "text-sky-600" : "text-slate-600 hover:text-sky-500"}`}
      >
        {label}
        <ChevronDown size={14} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        {(isActive || open) && (
          <motion.div
            layoutId="nav-glow"
            className="absolute inset-0 bg-sky-50 rounded-full -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            onMouseEnter={cancelHide}
            onMouseLeave={hide}
            initial={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
            className="absolute top-full left-1/2 mt-2 z-[100]"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-sky-900/10 border border-slate-100 overflow-hidden backdrop-blur-xl">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileAccordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-50 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-sm font-bold text-slate-900">
        {label}
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180 text-sky-500" : "text-slate-400"}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="pb-4 space-y-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <header className={`sticky top-0 z-[100] transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl py-3 border-b border-slate-100" : "bg-white py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-12 h-12 group-hover:scale-110 transition-transform">
            <Image src="/moonshot_images/logo.png" alt="Logo" fill className="object-contain" priority />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900">
            Moonshot<span className="text-sky-500">Minds</span>
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-semibold transition-colors
                ${pathname === link.href ? "text-sky-600" : "text-slate-600 hover:text-sky-500"}`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute inset-0 bg-sky-50 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}

          <HoverMenu label="Services" href="/services" isActive={pathname === "/services"}>
            <div className="w-[820px] flex p-2">
              <div className="flex-1 p-6">
                <div className="grid grid-cols-2 gap-2">
                  {servicesMenu.tech.map((i) => (
                    <Link key={i.label} href={i.href} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-sky-50 group/item transition-all">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-sky-500 group-hover/item:bg-sky-500 group-hover/item:text-white transition-all">
                        <i.icon size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 mb-1">{i.label}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{i.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="w-[240px] bg-slate-50/50 p-6 rounded-2xl border-l border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Finance</div>
                  <div className="space-y-2 mb-8">
                    {servicesMenu.finance.map((i) => (
                      <Link key={i.label} href={i.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all group/f">
                        <i.icon size={16} className={i.color} />
                        <span className="text-sm font-bold text-slate-700 group-hover/f:text-sky-600 transition-colors">{i.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA Box */}
                <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-5 text-white shadow-lg shadow-sky-200">
                  <Rocket size={24} className="mb-3 opacity-90" />
                  <p className="text-sm font-bold mb-1">Start a Project</p>
                  <p className="text-[10px] opacity-80 mb-4 leading-relaxed">
                    Build something amazing with our expert engineering team.
                  </p>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 text-[10px] font-bold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all"
                  >
                    Get in Touch <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </HoverMenu>

          <HoverMenu label="Industries" href="/industries" isActive={pathname === "/industries"}>
            <div className="w-[450px] p-4 grid grid-cols-2 gap-2">
              {industriesMenu.map((i) => (
                <Link key={i.label} href={i.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-sky-50 group/i transition-all">
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
              <Link
                key={link}
                href={href}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors
                  ${pathname === href ? "text-sky-600" : "text-slate-600 hover:text-sky-500"}`}
              >
                {link}
                {pathname === href && (
                  <motion.div
                    layoutId="nav-glow"
                    className="absolute inset-0 bg-sky-50 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}

          <Link href="/contact" className="ml-4 btn-primary rounded-full">
            Get Started
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-900 hover:bg-slate-50 rounded-full transition-colors">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white fixed inset-x-0 top-[72px] z-[90] overflow-y-auto px-6 pb-20"
          >
            <div className="py-6 flex flex-col gap-2">
              <Link href="/" onClick={() => setMobileOpen(false)} className="text-2xl font-black text-slate-900 py-4">Home</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="text-2xl font-black text-slate-900 py-4">About</Link>

              <MobileAccordion label="Services">
                {servicesMenu.tech.map(i => (
                  <Link key={i.label} href={i.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-3 text-slate-500 font-bold">{i.label}</Link>
                ))}
              </MobileAccordion>

              <MobileAccordion label="Industries">
                {industriesMenu.map(i => (
                  <Link key={i.label} href={i.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-3 text-slate-500 font-bold">{i.label}</Link>
                ))}
              </MobileAccordion>

              <Link href="/why-us" onClick={() => setMobileOpen(false)} className="text-2xl font-black text-slate-900 py-4">Why Us</Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="mt-8 btn-primary text-center">Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}