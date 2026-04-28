import Link from "next/link";
import { ArrowRight, Globe, Settings, Cloud, ChevronRight } from "lucide-react";

const stats = [
  { value: "300+", label: "Successful Projects" },
  { value: "20+", label: "Global Offices" },
  { value: "200+", label: "Tech Experts" },
  { value: "4.9/5", label: "Customer Rating" },
];

const services = [
  {
    icon: <Globe className="w-6 h-6 text-sky-500" />,
    title: "Custom Web Solutions",
    desc: "Scalable, high-performance web applications tailored to your business needs using cutting-edge frameworks.",
  },
  {
    icon: <Settings className="w-6 h-6 text-sky-500" />,
    title: "Enterprise Software",
    desc: "Robust ERP, CRM, and internal tools designed to streamline complex business processes for large-scale organizations.",
  },
  {
    icon: <Cloud className="w-6 h-6 text-sky-500" />,
    title: "Cloud & DevOps",
    desc: "Accelerate your deployment cycles with automated pipelines and scalable cloud infrastructure on AWS, Azure, or GCP.",
  },
];

const whyUs = [
  { icon: "🚀", title: "Proven Expertise", desc: "Over 10+ years of experience delivering 200+ successful projects globally." },
  { icon: "📊", title: "Agile Methodology", desc: "Fast iterations, transparent communication, and continuous delivery cycles." },
  { icon: "👥", title: "Customer Centric", desc: "We don't just build software; we build solutions that solve real-world problems." },
  { icon: "🔒", title: "Security First", desc: "Every line of code is written with security best practices to protect your data." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-sky-50 py-24 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="animate-fade-down delay-200 text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Innovation Through{" "}
            <span className="text-sky-500">Moonshot</span> Engineering
          </h1>
          <p className="animate-fade-down delay-400 text-lg text-slate-500 max-w-2xl mx-auto mb-10">
            Transforming complex business challenges into sleek, scalable software solutions. We partner with visionaries to build the future of tech.
          </p>
          <div className="animate-fade-up delay-600 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary flex items-center justify-center gap-2">
              Start Your Project <ArrowRight size={16} />
            </Link>
            <Link href="/services" className="btn-outline flex items-center justify-center gap-2">
              View Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={s.label} className="animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
              <p className="text-4xl font-extrabold text-sky-500">{s.value}</p>
              <p className="text-sm text-slate-500 uppercase tracking-wide mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label">OUR EXPERTISE</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Solutions for the Next Frontier</h2>
            <div className="w-12 h-1 bg-sky-500 mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={s.title} className="card card-hover animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
                  {s.icon}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{s.desc}</p>
                <Link href="/services" className="text-sky-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Moonshot Minds */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label">WHY MOONSHOT MINDS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
              We build tech that scales with your ambition
            </h2>
            <ul className="space-y-6">
              {whyUs.map((item, i) => (
                <li key={item.title} className="flex gap-4 animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center text-lg shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-scale-up delay-300 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 h-80 flex items-center justify-center">
            <div className="text-center text-white/60 p-8">
              <div className="text-6xl mb-4">🔐</div>
              <p className="text-sm">Enterprise-grade Security</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-scale-up delay-200 bg-sky-500 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to launch your next mission?</h2>
            <p className="text-sky-100 mb-8">
              Join dozens of industry leaders who trust us with their critical infrastructure and software innovation.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-sky-600 font-semibold px-7 py-3 rounded-xl hover:bg-sky-50 transition-colors">
              Consult Our Tech Experts <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}