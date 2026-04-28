import { Target, Lightbulb } from "lucide-react";

const stats = [
  { value: "10+", label: "Years" },
  { value: "20+", label: "Projects" },
  { value: "20", label: "Global Offices" },
];

const values = [
  { icon: "🚀", title: "Quality First", desc: "No compromises on code standards." },
  { icon: "📚", title: "Always Learning", desc: "Staying at the edge of the tech curve." },
  { icon: "🎯", title: "Extreme Ownership", desc: "We treat your product as our own." },
  { icon: "💬", title: "Radical Candor", desc: "Honest communication at every stage." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-extrabold text-slate-900 leading-tight mb-6">Engineering Excellence</h1>
            <p className="text-slate-600 mb-4">
              Moonshot Minds Tech was founded on a simple premise: that software should be beautiful, scalable, and inherently useful.
            </p>
            <p className="text-slate-500 text-sm">
              Founded in 2024 and headquartered in Craigieburn, Victoria, we specialize in architecting sophisticated software solutions that drive innovation, enhance efficiency, and create sustainable competitive advantages for enterprises across diverse industries.
            </p>
            <div className="flex gap-10 mt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-extrabold text-sky-500">{s.value}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-sky-900 h-72 flex items-center justify-center">
            <div className="text-center text-white/70">
              <div className="text-7xl mb-3">🥽</div>
              <p className="text-sm font-medium">Future-Forward Tech</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="card">
            <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-sky-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Our Mission</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              To empower organizations with robust digital infrastructure and innovative software that fosters sustainable growth and solves complex global challenges.
            </p>
          </div>
          <div className="card">
            <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-sky-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Our Vision</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              To be the world&apos;s most trusted partner for engineering digital transformations, recognized for our commitment to quality, integrity, and future-proof innovation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="section-label">THE MOONSHOT WAY</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">What Drives Us</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title}>
                <div className="text-4xl mb-3">{v.icon}</div>
                <h4 className="font-semibold text-slate-800 mb-1">{v.title}</h4>
                <p className="text-slate-500 text-xs">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
