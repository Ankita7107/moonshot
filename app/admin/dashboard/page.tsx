"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Calendar, Mail, Building, Tag, Search, Filter, RefreshCw, MessageSquare, Loader2 } from "lucide-react";

interface Inquiry {
  id: number;
  full_name: string;
  email: string;
  company_name: string | null;
  interest: string;
  message: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ fullName: string; email: string; role: string } | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterInterest, setFilterInterest] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Authenticate Session
  useEffect(() => {
    const userSession = localStorage.getItem("moonshot_admin_session");
    if (!userSession) {
      router.push("/admin");
      return;
    }

    try {
      const session = JSON.parse(userSession);
      if (session.role !== "admin") {
        router.push("/admin");
        return;
      }
      setAdminUser(session);
    } catch (e) {
      router.push("/admin");
    }
  }, [router]);

  // Fetch Inquiries
  const fetchInquiries = async () => {
    if (isRefreshing) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem("moonshot_admin_token");
      if (!token) return;

      const response = await fetch("http://localhost:5000/api/admin/inquiries", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Pass authorization bearer token
        },
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setInquiries(data.inquiries);
        setFilteredInquiries(data.inquiries);
      }
    } catch (err) {
      console.error("Fetch inquiries error:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [adminUser]);

  // Handle Search & Filter logic
  useEffect(() => {
    let result = inquiries;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (inq) =>
          inq.full_name.toLowerCase().includes(term) ||
          inq.email.toLowerCase().includes(term) ||
          (inq.company_name && inq.company_name.toLowerCase().includes(term)) ||
          inq.message.toLowerCase().includes(term)
      );
    }

    if (filterInterest !== "All") {
      result = result.filter((inq) => inq.interest === filterInterest);
    }

    setFilteredInquiries(result);
  }, [searchTerm, filterInterest, inquiries]);

  const handleLogout = () => {
    localStorage.removeItem("moonshot_admin_session");
    localStorage.removeItem("moonshot_admin_token");
    router.push("/admin");
  };

  const triggerRefresh = () => {
    setIsRefreshing(true);
    fetchInquiries();
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get unique list of Interests for filter dropdown
  const uniqueInterests = ["All", ...Array.from(new Set(inquiries.map((i) => i.interest)))];

  if (!adminUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800">
        <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden animated-grid-bg">
      {/* Soft blurred background orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-100/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header bar */}
        <header className="flex flex-col sm:flex-row justify-between items-center bg-white/80 border border-slate-100 p-6 rounded-3xl backdrop-blur-xl shadow-[0_10px_40px_rgba(14,165,233,0.04)] mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-sky-500 uppercase tracking-widest">
              Super Admin Space
            </span>
            <h1 className="text-2xl font-black text-slate-800 mt-1">
              Welcome, {adminUser.fullName}!
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">{adminUser.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={triggerRefresh}
              className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-2xl flex items-center justify-center transition-all text-slate-600 shadow-sm"
              title="Refresh"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin text-sky-500" : ""}`} />
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-2xl flex items-center gap-2 transition-all font-bold text-sm shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </header>

        {/* Search & Filter dashboard controls */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="relative md:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search inquiries by name, email, company, or message..."
              className="w-full bg-white/80 border border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all backdrop-blur-xl shadow-sm focus:bg-white"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Filter className="w-5 h-5" />
            </div>
            <select
              value={filterInterest}
              onChange={(e) => setFilterInterest(e.target.value)}
              className="w-full bg-white/80 border border-slate-100 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all backdrop-blur-xl appearance-none shadow-sm focus:bg-white"
            >
              {uniqueInterests.map((interest) => (
                <option key={interest} value={interest} className="bg-white text-slate-700">
                  {interest === "All" ? "Filter by Interest: All" : interest}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Inquiries table container */}
        <div className="bg-white/80 border border-slate-100 rounded-[2rem] overflow-hidden backdrop-blur-xl shadow-[0_20px_50px_rgba(14,165,233,0.03)]">
          {isLoading ? (
            <div className="py-24 text-center">
              <Loader2 className="w-10 h-10 animate-spin text-sky-500 mx-auto mb-4" />
              <p className="text-slate-500 text-sm font-medium">Retrieving database submissions...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="py-24 text-center">
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-sm">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No inquiries found</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">
                No matching submissions were retrieved from the database.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
                    <th className="py-5 px-6">Submitted By</th>
                    <th className="py-5 px-6">Interest Area</th>
                    <th className="py-5 px-6">Company</th>
                    <th className="py-5 px-6">Message</th>
                    <th className="py-5 px-6">Date & Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <AnimatePresence>
                    {filteredInquiries.map((inq, idx) => (
                      <motion.tr
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        key={inq.id}
                        className="hover:bg-slate-50/30 transition-colors align-top"
                      >
                        <td className="py-6 px-6">
                          <p className="font-extrabold text-slate-800 text-sm">
                            {inq.full_name}
                          </p>
                          <a
                            href={`mailto:${inq.email}`}
                            className="text-xs text-sky-500 hover:text-sky-600 flex items-center gap-1.5 mt-1 transition-colors font-medium"
                          >
                            <Mail className="w-3.5 h-3.5 shrink-0" />
                            {inq.email}
                          </a>
                        </td>
                        <td className="py-6 px-6">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-bold border border-sky-100 shadow-sm shadow-sky-50">
                            <Tag className="w-3.5 h-3.5 shrink-0" />
                            {inq.interest}
                          </span>
                        </td>
                        <td className="py-6 px-6">
                          {inq.company_name ? (
                            <span className="inline-flex items-center gap-1.5 text-slate-600 text-sm font-semibold">
                              <Building className="w-4 h-4 text-slate-400 shrink-0" />
                              {inq.company_name}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs italic">Not Provided</span>
                          )}
                        </td>
                        <td className="py-6 px-6 max-w-md">
                          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line bg-slate-50/50 border border-slate-100 rounded-2xl p-4 shadow-inner">
                            {inq.message}
                          </p>
                        </td>
                        <td className="py-6 px-6 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
                            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                            {formatDate(inq.created_at)}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
