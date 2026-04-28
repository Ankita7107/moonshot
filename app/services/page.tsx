"use client";
import Link from "next/link";
import { Globe, Settings, Cloud, Zap, Shield, Smartphone, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: <Globe className="w-7 h-7 text-sky-500" />,
    title: "Custom Web Solutions",
    desc: "Scalable, high-performance web applications tailored to your business needs using cutting-edge frameworks.",
  },
  {
    icon: <Settings className="w-7 h-7 text-sky-500" />,
    title: "Enterprise Software",
    desc: "Robust ERP, CRM, and internal tools designed to streamline complex business processes for large-scale organizations.",
  },
  {
    icon: <Cloud className="w-7 h-7 text-sky-500" />,
    title: "Cloud & DevOps",
    desc: "Accelerate your deployment cycles with automated pipelines and scalable cloud infrastructure on AWS, Azure, or GCP.",
  },
  {
    icon: <Zap className="w-7 h-7 text-sky-500" />,
    title: "AI & Machine Learning",
    desc: "Integrate intelligent automation and data insights into your product to stay ahead of the competition.",
  },
  {
    icon: <Shield className="w-7 h-7 text-sky-500" />,
    title: "Cybersecurity",
    desc: "Protect your digital assets with enterprise-grade security audits, penetration testing, and compliance monitoring.",
  },
  {
    icon: <Smartphone className="w-7 h-7 text-sky-500" />,
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile experiences that engage users and drive business growth.",
  },
];

const features = ["24/7 Monitoring", "Enterprise Scalability", "Seamless Integration"];

const steps = [
  { num: "01", title: "Discovery", desc: "Understanding your vision and business requirements in detail." },
  { num: "02", title: "Strategy", desc: "Planning the architecture, tech stack, and project roadmap." },
  { num: "03", title: "Execution", desc: "Agile development with continuous feedback loops and testing." },
  { num: "04", title: "Launch", desc: "Deploying your solution and providing ongoing support." },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-50 to-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4">Our Services & Solutions</h1>
          <p className="text-slate-500">
            We provide end-to-end software development services using the latest technologies to help your business achieve digital excellence.
          </p>
        </div>
      </section>

      <section className="py-20">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8"
        >
          {services.map((s) => (
            <motion.div variants={fadeIn} key={s.title} className="card card-hover">
              <div className="flex gap-5">
                <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm mb-4">{s.desc}</p>
                  <ul className="space-y-1 mb-4">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-500">
                        <CheckCircle size={14} className="text-sky-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="text-sky-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Inquire for Quote <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">How We Work</h2>
          <p className="text-sky-200 mb-12">Our structured approach ensures project success every time.</p>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {steps.map((step) => (
              <motion.div variants={fadeIn} key={step.num} className="bg-white/10 rounded-2xl p-6 text-left border border-white/10 transition-transform hover:-translate-y-1 hover:shadow-lg">
                <p className="text-5xl font-extrabold text-white/20 mb-3">{step.num}</p>
                <h4 className="font-bold text-white mb-2">{step.title}</h4>
                <p className="text-sky-200 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
