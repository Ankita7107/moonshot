import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Moonshot Minds Tech | Innovation & Scalability",
  description: "Transforming complex business challenges into sleek, scalable software solutions.",
  icons: {
    icon: "/moonshot_images/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl animate-pulse-glow" />
          <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-sky-200/20 blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-slate-200/40 blur-3xl animate-float-delay" />
        </div>
        <Navbar />
        <main className="page-shell">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
