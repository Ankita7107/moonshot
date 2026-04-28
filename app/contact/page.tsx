export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-sky-50 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Let&apos;s Build Something Great
          </h1>
          <p className="text-slate-500">
            Ready to start your digital transformation? Get in touch with our solution architects today.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row shadow-xl rounded-2xl overflow-hidden">
            {/* Left: Contact Info (dark) */}
            <div className="bg-[#0F172A] text-white p-8 md:w-72 shrink-0 flex flex-col gap-8">
              <div>
                <h2 className="text-lg font-bold mb-6">Contact Information</h2>
                <ul className="space-y-5">
                  <li className="flex gap-3 items-start">
                    <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">Email Us</p>
                      <p className="text-sm text-white">moonshotminds@gmail.com</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">Call Us</p>
                      <p className="text-sm text-white">1234567890</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">Visit Us</p>
                      <p className="text-sm text-white">92 Hothly Drive,<br/>Craigieburn,<br/>Victoria-3064, Australia</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-auto">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">Follow Our Journey</p>
                <div className="flex gap-3">
                  <a href="#" className="w-9 h-9 bg-white/10 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <a href="#" className="w-9 h-9 bg-white/10 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white p-8 flex-1">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" placeholder="FULL NAME"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
                  <input type="email" placeholder="abc@company.com"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                  <input type="text" placeholder="ABC"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Interest</label>
                  <select className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white">
                    <option>Web Development</option>
                    <option>Enterprise Software</option>
                    <option>Cloud & DevOps</option>
                    <option>AI & Machine Learning</option>
                    <option>Cybersecurity</option>
                    <option>Mobile App Development</option>
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label className="block text-sm font-medium text-slate-700 mb-1">How can we help you?</label>
                <textarea rows={5} placeholder="Tell us about your project..."
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" />
              </div>
              <button className="mt-4 w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                Send Message
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden h-72 border border-slate-100 shadow-sm">
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
        </div>
      </section>
    </>
  );
}
