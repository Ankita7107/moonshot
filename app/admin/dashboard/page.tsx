"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Calendar, Mail, Building, Tag, Search, Filter, RefreshCw, MessageSquare, Loader2, Copy, Check, Phone, Globe, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface Inquiry {
  id: number;
  full_name: string;
  email: string;
  company_name: string | null;
  mobile_number: string | null;
  interest: string;
  message: string;
  created_at: string;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return true;
    const decodedJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
    const decoded = JSON.parse(decodedJson);
    const exp = decoded.exp;
    if (!exp) return false;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ fullName: string; email: string; role: string } | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterInterest, setFilterInterest] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleLogout = useCallback((expired = false) => {
    localStorage.removeItem("moonshot_admin_session");
    localStorage.removeItem("moonshot_admin_token");
    router.push(expired ? "/admin?expired=true" : "/admin");
  }, [router]);

  // Authenticate Session and setup Auto-Logout Timer
  useEffect(() => {
    const userSession = localStorage.getItem("moonshot_admin_session");
    const token = localStorage.getItem("moonshot_admin_token");

    if (!userSession || !token || isTokenExpired(token)) {
      handleLogout(token ? true : false);
      return;
    }

    try {
      const session = JSON.parse(userSession);
      if (session.role !== "admin") {
        handleLogout();
        return;
      }
      setAdminUser(session);

      // Auto-logout when token expires
      const payloadBase64 = token.split(".")[1];
      const decodedJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
      const decoded = JSON.parse(decodedJson);
      const exp = decoded.exp * 1000;
      const delay = exp - Date.now();

      if (delay > 0) {
        const timer = setTimeout(() => {
          handleLogout(true);
        }, delay);
        return () => clearTimeout(timer);
      } else {
        handleLogout(true);
      }
    } catch (e) {
      handleLogout();
    }
  }, [router, handleLogout]);

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

      if (response.status === 401 || response.status === 403) {
        handleLogout(true);
        return;
      }

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
          (inq.mobile_number && inq.mobile_number.toLowerCase().includes(term)) ||
          inq.message.toLowerCase().includes(term)
      );
    }

    if (filterInterest !== "All") {
      result = result.filter((inq) => inq.interest === filterInterest);
    }

    setFilteredInquiries(result);
    setCurrentPage(1); // Reset page on filter/search
  }, [searchTerm, filterInterest, inquiries]);

  // Calculate pagination details
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInquiries = filteredInquiries.slice(startIndex, endIndex);

  // handleLogout is now defined using useCallback above

  const triggerRefresh = () => {
    setIsRefreshing(true);
    fetchInquiries();
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 text-slate-800 py-6 md:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden animated-grid-bg">
      {/* Soft blurred background orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-100/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Header bar */}
        <header className="flex flex-col sm:flex-row justify-between items-center bg-white/80 border border-slate-100 p-5 md:p-6 rounded-2xl md:rounded-3xl backdrop-blur-xl shadow-[0_10px_40px_rgba(14,165,233,0.04)] mb-6 md:mb-8 gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold text-sky-500 uppercase tracking-widest">
              Super Admin Space
            </span>
            <h1 className="text-2xl font-black text-slate-800 mt-1">
              Welcome, {adminUser.fullName}!
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">{adminUser.email}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <Link
              href="/"
              className="px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 transition-all font-bold text-xs sm:text-sm shadow-sm flex-1 sm:flex-none whitespace-nowrap"
              title="Go to website"
            >
              <Globe className="w-4 h-4 text-sky-500 shrink-0" />
              View Website
            </Link>
            <button
              onClick={triggerRefresh}
              className="p-2.5 sm:p-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all text-slate-600 shadow-sm shrink-0"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${isRefreshing ? "animate-spin text-sky-500" : ""}`} />
            </button>
            <button
              onClick={() => handleLogout()}
              className="px-3.5 py-2.5 sm:px-5 sm:py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 transition-all font-bold text-xs sm:text-sm shadow-sm flex-1 sm:flex-none whitespace-nowrap"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              Sign Out
            </button>
          </div>
        </header>

        {/* Search & Filter dashboard controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 md:mb-8">
          <div className="relative md:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search inquiries..."
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
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <span className="text-xs font-bold text-slate-400">Show:</span>
            </div>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full bg-white/80 border border-slate-100 rounded-2xl pl-16 pr-10 py-3.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all backdrop-blur-xl appearance-none shadow-sm focus:bg-white font-bold"
            >
              {[10, 20, 50].map((num) => (
                <option key={num} value={num} className="bg-white text-slate-700">
                  {num} Show
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Inquiries container */}
        <div className="bg-white/80 border border-slate-100 rounded-2xl md:rounded-[2rem] overflow-hidden backdrop-blur-xl shadow-[0_20px_50px_rgba(14,165,233,0.03)]">
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
            <>
              {/* Desktop View (Table) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[1200px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
                      <th className="py-5 px-6">Submitted By</th>
                      <th className="py-5 px-6">Phone Number</th>
                      <th className="py-5 px-6">Interest Area</th>
                      <th className="py-5 px-6">Company</th>
                      <th className="py-5 px-6">Message</th>
                      <th className="py-5 px-6">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <AnimatePresence mode="popLayout">
                      {paginatedInquiries.map((inq, idx) => (
                        <motion.tr
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          key={inq.id}
                          className="hover:bg-slate-50/30 transition-colors align-middle"
                        >
                          <td className="py-6 px-6">
                            <p className="font-extrabold text-slate-800 text-sm">
                              {inq.full_name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <a
                                href={`mailto:${inq.email}`}
                                className="text-xs text-sky-500 hover:text-sky-600 flex items-center gap-1.5 transition-colors font-medium"
                              >
                                <Mail className="w-3.5 h-3.5 shrink-0" />
                                {inq.email}
                              </a>
                              <button
                                onClick={() => handleCopyEmail(inq.email)}
                                className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-400 hover:text-sky-500 flex items-center justify-center shrink-0"
                                title="Copy Email"
                              >
                                {copiedEmail === inq.email ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-6 px-6 whitespace-nowrap">
                            {inq.mobile_number ? (
                              <a
                                href={`tel:${inq.mobile_number}`}
                                className="text-xs text-sky-500 hover:text-sky-600 flex items-center gap-1.5 transition-colors font-semibold"
                              >
                                <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                                {inq.mobile_number}
                              </a>
                            ) : (
                              <span className="text-slate-400 text-xs italic">Not Provided</span>
                            )}
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

              {/* Mobile View (Cards) */}
              <div className="md:hidden divide-y divide-slate-100">
                <AnimatePresence mode="popLayout">
                  {paginatedInquiries.map((inq, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      key={inq.id}
                      className="p-5 flex flex-col gap-4 hover:bg-slate-50/30 transition-colors"
                    >
                      {/* Header Stack: Tag, Name, Date */}
                      <div className="flex flex-col gap-2">
                        <div className="flex">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-bold border border-sky-100 shadow-sm shadow-sky-50">
                            <Tag className="w-3.5 h-3.5 shrink-0" />
                            {inq.interest}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-slate-800 text-lg leading-tight">
                          {inq.full_name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{formatDate(inq.created_at)}</span>
                        </div>
                      </div>

                      {/* Details Area */}
                      <div className="flex flex-col gap-3 bg-slate-50/40 rounded-2xl p-3.5 border border-slate-100">
                        <div className="flex items-center justify-between gap-3">
                          <a
                            href={`mailto:${inq.email}`}
                            className="text-xs text-sky-500 hover:text-sky-600 flex items-center gap-1.5 transition-colors font-semibold break-all"
                          >
                            <Mail className="w-3.5 h-3.5 shrink-0 text-sky-400" />
                            {inq.email}
                          </a>
                          <button
                            onClick={() => handleCopyEmail(inq.email)}
                            className="p-1.5 hover:bg-slate-100 rounded-md transition-colors text-slate-400 hover:text-sky-500 flex items-center justify-center shrink-0"
                            title="Copy Email"
                          >
                            {copiedEmail === inq.email ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>

                        {inq.mobile_number && (
                          <div className="flex items-center gap-1.5 text-slate-600 text-xs font-semibold border-t border-slate-100/80 pt-2.5">
                            <a
                              href={`tel:${inq.mobile_number}`}
                              className="hover:text-sky-600 flex items-center gap-1.5 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{inq.mobile_number}</span>
                            </a>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 text-slate-600 text-xs font-semibold border-t border-slate-100/80 pt-2.5">
                          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{inq.company_name || "No Company Provided"}</span>
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="bg-slate-50/30 border border-slate-100/70 rounded-2xl p-3.5">
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
                          Message
                        </p>
                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-medium">
                          {inq.message}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 px-6 py-5 bg-slate-50/30">
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 text-center sm:text-left">
                    Showing <span className="text-slate-800 font-bold">{startIndex + 1}</span> to{" "}
                    <span className="text-slate-800 font-bold">
                      {Math.min(endIndex, filteredInquiries.length)}
                    </span>{" "}
                    of <span className="text-slate-800 font-bold">{filteredInquiries.length}</span> inquiries
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white text-slate-600 transition-all shadow-sm flex items-center justify-center"
                      title="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center ${
                          currentPage === page
                            ? "bg-sky-500 text-white shadow-sky-100"
                            : "bg-white border border-slate-100 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white text-slate-600 transition-all shadow-sm flex items-center justify-center"
                      title="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
