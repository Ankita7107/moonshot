"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Twitter, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-sky-50 py-16 text-center overflow-hidden animated-grid-bg">
        <div className="absolute -top-10 left-1/4 h-24 w-24 rounded-full bg-sky-300/25 blur-2xl animate-float-slow" />
        <div className="absolute -bottom-10 right-1/4 h-24 w-24 rounded-full bg-sky-200/25 blur-2xl animate-float-delay" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto px-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Let&apos;s Build Something Great
          </h1>
          <p className="text-slate-500">
            Ready to start your digital transformation? Get in touch with our solution architects today.
          </p>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 relative bg-slate-50 overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center">

            {/* Left: Contact Info (Vibrant theme) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-sky-500 to-sky-600 text-white p-10 md:p-12 lg:w-[400px] shrink-0 flex flex-col gap-10 rounded-3xl shadow-2xl z-20 lg:-mr-16 lg:my-8 w-full relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-tr-full pointer-events-none"></div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                <ul className="space-y-8">
                  <li className="flex gap-4 items-start group">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                      <Mail className="w-5 h-5 text-white group-hover:text-sky-500 transition-colors" />
                    </div>
                    <div>
                      <p className="text-sky-100 text-xs uppercase tracking-widest font-semibold mb-1">Email Us</p>
                      <p className="text-base text-white">moonshotminds@gmail.com</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start group">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                      <Phone className="w-5 h-5 text-white group-hover:text-sky-500 transition-colors" />
                    </div>
                    <div>
                      <p className="text-sky-100 text-xs uppercase tracking-widest font-semibold mb-1">Call Us</p>
                      <p className="text-base text-white">+61 412 345 678</p>
                      <p className="text-base text-white mt-2">+91 98765 43210</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start group">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                      <MapPin className="w-5 h-5 text-white group-hover:text-sky-500 transition-colors" />
                    </div>
                    <div>
                      <p className="text-sky-100 text-xs uppercase tracking-widest font-semibold mb-1">Visit Us</p>
                      <p className="text-base text-white leading-relaxed">92 Hotly Drive, Craigieburn, Victoria 3064, Australia</p>

                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-auto pt-8 border-t border-white/20 relative z-10">
                <p className="text-sky-100 text-xs uppercase tracking-widest font-semibold mb-4">Follow Our Journey</p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white rounded-lg flex items-center justify-center transition-colors group">
                    <Linkedin className="w-5 h-5 text-white group-hover:text-sky-500" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white rounded-lg flex items-center justify-center transition-colors group">
                    <Twitter className="w-5 h-5 text-white group-hover:text-sky-500" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 md:p-16 lg:pl-28 flex-1 w-full rounded-3xl shadow-xl z-10 border border-slate-100"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input type="text" placeholder="FULL NAME"
                    className="w-full bg-slate-50 border-transparent rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Work Email</label>
                  <input type="email" placeholder="abc@company.com"
                    className="w-full bg-slate-50 border-transparent rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                  <input type="text" placeholder="ABC"
                    className="w-full bg-slate-50 border-transparent rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Interest</label>
                  <select className="w-full bg-slate-50 border-transparent rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all shadow-sm appearance-none">
                    <option>Web Development</option>
                    <option>Enterprise Software</option>
                    <option>Cloud & DevOps</option>
                    <option>AI & Machine Learning</option>
                    <option>Cybersecurity</option>
                    <option>Mobile App Development</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">How can we help you?</label>
                <textarea rows={5} placeholder="Tell us about your project..."
                  className="w-full bg-slate-50 border-transparent rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all shadow-sm resize-none" />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-sky-500/25 hover-shine"
              >
                Send Message
                <Send className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="rounded-3xl overflow-hidden h-[400px] border border-slate-200 shadow-lg">
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