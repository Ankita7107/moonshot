import Link from "next/link";
import { MapPin, Phone, Mail, Linkedin, Twitter, Github } from "lucide-react";

import Image from "next/image";

export default function Footer() {
  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Why Choose Us", href: "/why-us" },
      { label: "Contact", href: "/contact" }
    ],
    expertise: [
      { label: "Web Development", href: "#" },
      { label: "Enterprise Software", href: "#" },
      { label: "Cloud & DevOps", href: "#" },
      { label: "AI & Data Science", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" }
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-500/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Brand Section - spans 4 columns */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center">
              <div className="relative w-16 h-16 bg-white rounded-xl shadow-sm overflow-hidden">
                <Image
                  src="/moonshot_images/logo.png"
                  alt="Moonshot Minds Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold ml-2">
                <span className="text-white">Moonshot</span>
                <span className="text-sky-500">Minds</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering global enterprises with scalable software solutions and innovative technologies.
            </p>

            {/* Social Links */}
            {/* <div className="flex gap-2 pt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-400 hover:border-sky-500/50 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div> */}
          </div>

          {/* Company Links - spans 2 columns */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-sky-400 text-sm transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise Links - spans 2 columns */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Expertise
            </h3>
            <ul className="space-y-2">
              {footerLinks.expertise.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-sky-400 text-sm transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - spans 4 columns */}
          <div className="md:col-span-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3 text-slate-400 text-sm">
                <MapPin size={18} className="text-sky-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>-92 Hothly Drive, Craigieburn, Victoria 3064</p>

                </div>
              </div>

              <div className="flex gap-3 text-slate-400 text-sm">
                <Phone size={18} className="text-sky-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>+61 412 345 678</p>
                  <p>+91 98765 43210</p>
                </div>
              </div>

              <div className="flex gap-3 text-slate-400 text-sm">
                <Mail size={18} className="text-sky-500 shrink-0 mt-0.5" />
                <a href="mailto:moonshotminds@gmail.com" className="hover:text-sky-400 transition-colors">
                  moonshotminds@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-slate-500 order-2 sm:order-1">
            © 2026 Moonshot Minds Tech. All rights reserved.
          </p>
          <div className="flex gap-6 order-1 sm:order-2">
            <Link href="/privacy-policy" className="text-slate-500 hover:text-sky-400 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-slate-500 hover:text-sky-400 transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}