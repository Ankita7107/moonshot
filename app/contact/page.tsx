"use client";
import { motion } from "framer-motion";

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
            
            {/* Left: Contact Info (dark, overlapping) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#0F172A] text-white p-10 md:p-12 lg:w-[400px] shrink-0 flex flex-col gap-10 rounded-3xl shadow-2xl z-20 lg:-mr-16 lg:my-8 w-full relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-bl-full pointer-events-none"></div>
              
              <div>
                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                <ul className="space-y-8">
                  <li className="flex gap-4 items-start group">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-sky-500 transition-colors">
                      <svg className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sky-300 text-xs uppercase tracking-widest font-semibold mb-1">Email Us</p>
                      <p className="text-base text-white">moonshotminds@gmail.com</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start group">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-sky-500 transition-colors">
                      <svg className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sky-300 text-xs uppercase tracking-widest font-semibold mb-1">Call Us</p>
                      <p className="text-base text-white">1234567890</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start group">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-sky-500 transition-colors">
                      <svg className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sky-300 text-xs uppercase tracking-widest font-semibold mb-1">Visit Us</p>
                      <p className="text-base text-white leading-relaxed">92 Hothly Drive,<br/>Craigieburn,<br/>Victoria-3064, Australia</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-auto pt-8 border-t border-white/10">
                <p className="text-sky-300 text-xs uppercase tracking-widest font-semibold mb-4">Follow Our Journey</p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
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
