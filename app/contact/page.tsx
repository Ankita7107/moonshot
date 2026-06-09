"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [interest, setInterest] = useState("Web Development");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);

    if (!fullName || !email || !message) {
      setSubmitStatus({ type: "error", text: "Please fill in all required fields." });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, companyName, mobileNumber, interest, message }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: "success",
          text: "Thank you! Your message has been sent successfully. We will contact you soon.",
        });
        setFullName(""); setEmail(""); setCompanyName(""); setMobileNumber("");
        setInterest("Web Development"); setMessage("");
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus({ type: "error", text: data.error || "Failed to submit request. Please try again." });
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus({ type: "error", text: "Could not connect to the backend server. Please check if server is running." });
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full bg-slate-50 border border-slate-200/70 rounded-xl px-5 py-3.5 text-sm text-slate-800 placeholder-slate-400 " +
    "focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(14,165,233,0.07)] " +
    "transition-all duration-200 shadow-sm";

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-slate-50 py-20 text-center overflow-hidden animated-grid-bg">
        <div className="absolute -top-12 left-1/4 h-40 w-40 rounded-full bg-sky-300/20 blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute -bottom-12 right-1/4 h-40 w-40 rounded-full bg-sky-200/20 blur-3xl animate-float-delay pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto px-4 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Let's Talk</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
            Let&apos;s Build Something Great
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Ready to start your digital transformation? Get in touch with our
            solution architects today.
          </p>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 relative bg-slate-50/70 overflow-hidden">
        {/* Background blobs */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-200/20 rounded-full blur-3xl -z-10" />
        <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 bg-sky-100/30 rounded-full blur-2xl -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-0">

            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden text-white p-10 md:p-12 lg:w-[380px] shrink-0 flex flex-col gap-10 rounded-3xl shadow-[0_24px_80px_rgba(14,165,233,0.35)] z-20 lg:-mr-14 lg:my-8 w-full"
              style={{
                background: "linear-gradient(145deg, #0ea5e9 0%, #0284c7 60%, #0369a1 100%)",
              }}
            >
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-bl-[4rem] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-tr-[3rem] pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-8 tracking-tight">Contact Information</h2>
                <ul className="space-y-7">
                  {[
                    { icon: Mail, label: "Email Us", value: "moonshotminds@gmail.com", href: "mailto:moonshotminds@gmail.com" },
                    { icon: Phone, label: "Call Us", value: "+61 412 345 678\n+91 98765 43210" },
                    { icon: MapPin, label: "Visit Us", value: "92 Hothly Drive, Craigieburn, Victoria-3064, Australia" },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex gap-4 items-start group">
                      <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white transition-colors duration-300 border border-white/20">
                        <Icon className="w-4 h-4 text-white group-hover:text-sky-500 transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="text-sky-100/80 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm text-white hover:text-sky-200 transition-colors whitespace-pre-line leading-relaxed break-all">{value}</a>
                        ) : (
                          <p className="text-sm text-white whitespace-pre-line leading-relaxed break-words">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-8 md:p-14 lg:pl-24 flex-1 w-full rounded-3xl shadow-[0_8px_40px_rgba(15,23,42,0.08)] z-10 border border-slate-100/80"
            >
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Full Name *</label>
                    <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Work Email *</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="abc@company.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Company Name</label>
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Your company" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Mobile Number</label>
                    <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="+91 98765 43210" className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Interest</label>
                    <div className="relative">
                      <select value={interest} onChange={(e) => setInterest(e.target.value)} className={`${inputClass} appearance-none cursor-pointer`}>
                        <option>Web Development</option>
                        <option>Enterprise Software</option>
                        <option>Cloud & DevOps</option>
                        <option>AI & Machine Learning</option>
                        <option>Cybersecurity</option>
                        <option>Mobile App Development</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">How can we help you? *</label>
                  <textarea rows={5} required value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project..."
                    className={`${inputClass} resize-none`} />
                </div>

                {/* Submit Feedback */}
                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mt-5 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border ${
                        submitStatus.type === "success"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-100"
                          : "bg-rose-50 text-rose-800 border-rose-100"
                      }`}
                    >
                      {submitStatus.type === "success"
                        ? <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                        : <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                      <span>{submitStatus.text}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: isLoading ? 1 : 1.015, y: isLoading ? 0 : -2 }}
                  whileTap={{ scale: isLoading ? 1 : 0.97 }}
                  disabled={isLoading}
                  type="submit"
                  className="mt-7 w-full relative overflow-hidden bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400
                             text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2.5
                             transition-all duration-300
                             shadow-[0_4px_20px_rgba(14,165,233,0.35)]
                             hover:shadow-[0_8px_30px_rgba(14,165,233,0.50)]
                             hover-shine"
                >
                  {isLoading ? (
                    <>Sending Message... <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : (
                    <>Send Message <Send className="w-4 h-4" /></>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20 bg-slate-50/70">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="rounded-3xl overflow-hidden h-[400px] border border-slate-200/60 shadow-[0_8px_40px_rgba(15,23,42,0.08)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3155.123456!2d144.9!3d-37.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349cfd%3A0x5045675218ce6e0!2sCraigieburn%20VIC%203064%2C%20Australia!5e0!3m2!1sen!2sau!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}
