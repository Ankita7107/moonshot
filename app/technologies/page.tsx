"use client";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Globe,
  Cpu,
  Database,
  Cloud,
  Wrench,
  Plug,
  ShieldCheck,
  BrainCircuit,
  Smartphone,
  Bot,
  Network,
  KeyRound,
  BarChart3,
  ServerCog,
  TestTube2,
  Bitcoin,
  type LucideIcon,
} from "lucide-react";

/* ─── data ─────────────────────────────────────────────────── */
const techCategories: {
  title: string;
  tags: string[];
  Icon: LucideIcon;
  color: string;
  glow: string;
}[] = [
  {
    title: "Frontend",
    Icon: Globe,
    tags: [
      "React",
      "Next.js",
      "Vue.js",
      "Angular",
      "Tailwind CSS",
      "TypeScript",
    ],
    color: "from-sky-400 to-blue-500",
    glow: "rgba(14,165,233,0.35)",
  },
  {
    title: "Backend",
    Icon: Cpu,
    tags: ["Node.js", "Go", "Java", "C#", ".NET Core"],
    color: "from-violet-400 to-purple-600",
    glow: "rgba(139,92,246,0.35)",
  },
  {
    title: "Database",
    Icon: Database,
    tags: ["PostgreSQL", "MySQL", "Redis", "DynamoDB", "Elasticsearch"],
    color: "from-emerald-400 to-teal-500",
    glow: "rgba(52,211,153,0.35)",
  },
  {
    title: "Cloud / DevOps",
    Icon: Cloud,
    tags: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"],
    color: "from-orange-400 to-amber-500",
    glow: "rgba(251,146,60,0.35)",
  },
  {
    title: "Tools & Platforms",
    Icon: Wrench,
    tags: ["GitHub", "GitLab", "Jira", "Postman", "VS Code", "Figma"],
    color: "from-pink-400 to-rose-500",
    glow: "rgba(244,114,182,0.35)",
  },
  {
    title: "API & Integration",
    Icon: Plug,
    tags: ["GraphQL", "REST", "Stripe", "Twilio", "Webhooks"],
    color: "from-cyan-400 to-sky-500",
    glow: "rgba(34,211,238,0.35)",
  },
  {
    title: "Security",
    Icon: ShieldCheck,
    tags: ["JWT", "Auth0", "Keycloak", "OpenID Connect"],
    color: "from-red-400 to-rose-600",
    glow: "rgba(248,113,113,0.35)",
  },
  {
    title: "AI / Data",
    Icon: BrainCircuit,
    tags: ["OpenAI", "TensorFlow", "PyTorch", "Pandas", "Hugging Face"],
    color: "from-fuchsia-400 to-purple-500",
    glow: "rgba(232,121,249,0.35)",
  },
  {
    title: "Mobile",
    Icon: Smartphone,
    tags: ["React Native", "Flutter", "Kotlin", "Swift"],
    color: "from-lime-400 to-green-500",
    glow: "rgba(163,230,53,0.35)",
  },
  {
    title: "AI / LLM Systems",
    Icon: Bot,
    tags: ["GPT-4", "OpenAI API", "LangChain", "Hugging Face"],
    color: "from-indigo-400 to-blue-600",
    glow: "rgba(129,140,248,0.35)",
  },
  {
    title: "Microservices",
    Icon: Network,
    tags: ["Docker", "Kubernetes", "Kafka", "RabbitMQ"],
    color: "from-teal-400 to-cyan-500",
    glow: "rgba(45,212,191,0.35)",
  },
  {
    title: "Authentication",
    Icon: KeyRound,
    tags: ["JWT", "Auth0", "Keycloak", "OpenID Connect"],
    color: "from-yellow-400 to-orange-500",
    glow: "rgba(250,204,21,0.35)",
  },
  {
    title: "Data Engineering",
    Icon: BarChart3,
    tags: ["Spark", "Kafka", "Airflow", "Snowflake", "BigQuery"],
    color: "from-blue-400 to-indigo-500",
    glow: "rgba(96,165,250,0.35)",
  },
  {
    title: "Advanced Cloud",
    Icon: ServerCog,
    tags: ["Serverless", "AWS Lambda", "Docker", "Kubernetes"],
    color: "from-slate-400 to-slate-600",
    glow: "rgba(148,163,184,0.35)",
  },
  {
    title: "Testing & QA",
    Icon: TestTube2,
    tags: ["Jest", "Cypress", "Selenium", "Playwright"],
    color: "from-green-400 to-emerald-600",
    glow: "rgba(74,222,128,0.35)",
  },
  {
    title: "Blockchain",
    Icon: Bitcoin,
    tags: ["Ethereum", "Solidity", "Metamask"],
    color: "from-amber-400 to-yellow-500",
    glow: "rgba(251,191,36,0.35)",
  },
];

const partners = ["AWS", "GOOGLE CLOUD", "MICROSOFT AZURE", "DIGITALOCEAN"];

/* ─── particles canvas ──────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const DOTS = 55;
    const dots = Array.from({ length: DOTS }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.35) * 0.35,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x,
            dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(14,165,233,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(14,165,233,0.55)";
        ctx.fill();
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

/* ─── split-letter heading ──────────────────────────────────── */
function SplitHeading({ text }: { text: string }) {
  return (
    <span className="inline-block">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -80 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: 0.35 + i * 0.03,
            duration: 0.5,
            type: "spring",
            stiffness: 180,
          }}
          style={{ display: ch === " " ? "inline" : "inline-block" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── count up ──────────────────────────────────────────────── */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      ob.disconnect();
      let start = 0;
      const step = () => {
        start += Math.ceil(to / 60);
        if (start >= to) {
          setVal(to);
          return;
        }
        setVal(start);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ─── ENHANCED MAGNETIC CARD ────────────────────────────────── */
function MagneticCard({
  cat,
  index,
}: {
  cat: (typeof techCategories)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [12, -12]), {
    stiffness: 260,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 260,
    damping: 20,
  });
  const glowX = useTransform(rawX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(rawY, [-0.5, 0.5], ["0%", "100%"]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.055,
        duration: 0.6,
        type: "spring",
        stiffness: 140,
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      className="relative rounded-2xl bg-white border border-slate-100 p-6 shadow-sm overflow-hidden
                 w-full cursor-default group"
    >
      {/* Dynamic glow spotlight following cursor */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          background: hovered
            ? `radial-gradient(circle at ${glowX.get()} ${glowY.get()}, ${cat.glow} 0%, transparent 65%)`
            : "none",
        }}
      />

      {/* Animated border gradient on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: hovered
            ? `0 0 0 1.5px ${cat.glow}, 0 20px 50px -10px ${cat.glow}`
            : "0 0 0 1px rgba(226,232,240,1), 0 1px 3px rgba(0,0,0,0.04)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shine sweep on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
        initial={false}
      >
        <motion.div
          className="absolute top-0 left-0 w-1/3 h-full"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%)",
            skewX: -15,
          }}
          animate={{ x: hovered ? ["−100%", "400%"] : "−100%" }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Top-right animated sparkle */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="absolute top-3 right-3 text-sm"
          >
            ✦
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ICON with orbit ring + pulse ── */}
      <div className="mb-5 relative w-14 h-14">
        {/* Orbit ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed"
          style={{ borderColor: cat.glow }}
          animate={{ rotate: hovered ? 360 : 0 }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: hovered ? Infinity : 0,
          }}
        />

        {/* Pulse ring */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${cat.glow} 0%, transparent 70%)`,
              }}
              initial={{ scale: 0.6, opacity: 0.8 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, repeat: Infinity }}
            />
          )}
        </AnimatePresence>

        {/* Icon box */}
        <motion.div
          animate={{
            scale: hovered ? 1.15 : 1,
            rotate: hovered ? -8 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className={`absolute inset-1 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md`}
          style={{
            boxShadow: hovered ? `0 8px 25px -5px ${cat.glow}` : undefined,
          }}
        >
          <motion.div
            animate={{ scale: hovered ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.4, times: [0, 0.5, 1] }}
          >
            <cat.Icon size={20} strokeWidth={1.8} className="text-white" />
          </motion.div>
        </motion.div>
      </div>

      {/* Title */}
      <motion.h3
        animate={{ x: hovered ? 3 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="font-bold text-slate-800 mb-4 text-sm tracking-wide uppercase"
      >
        {cat.title}
      </motion.h3>

      {/* Tags with stagger */}
      <div className="flex flex-wrap gap-2">
        {cat.tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.04 + i * 0.05,
              type: "spring",
              stiffness: 260,
            }}
            animate={
              hovered
                ? {
                    y: -4,
                    transition: {
                      delay: i * 0.035,
                      type: "spring",
                      stiffness: 320,
                      damping: 18,
                    },
                  }
                : {
                    y: 0,
                    transition: { delay: i * 0.02 },
                  }
            }
            whileHover={{ scale: 1.1 }}
            className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-default"
            style={{
              background: hovered ? `${cat.glow}` : "rgb(240,249,255)",
              color: hovered ? "white" : "rgb(3,105,161)",
              border: `1px solid ${hovered ? cat.glow : "rgb(186,230,253)"}`,
              textShadow: hovered ? "0 1px 3px rgba(0,0,0,0.2)" : "none",
            }}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Bottom progress bar animation */}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${cat.color}`}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </motion.div>
  );
}

/* ─── page ──────────────────────────────────────────────────── */
export default function TechnologiesPage() {

  return (
    <>
      {/* ── HEADER ── */}
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-slate-50 py-28 text-center overflow-hidden">
        <ParticleCanvas />
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/50"
            initial={{ width: 100, height: 100, opacity: 0.6 }}
            animate={{
              width: 700 + i * 200,
              height: 700 + i * 200,
              opacity: 0,
            }}
            transition={{
              duration: 4,
              delay: i * 1.3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 max-w-3xl mx-auto px-4"
        >
          <h1
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight"
            style={{ perspective: 600 }}
          >
            <SplitHeading text="Our Modern Tech Stack" />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="text-slate-500 text-lg"
          >
            We leverage the most powerful tools in the industry to build
            future-proof solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex justify-center gap-6 mt-8 flex-wrap"
          >
            {[
              { label: "Technologies", value: 60, suffix: "+" },
              { label: "Categories", value: 16, suffix: "" },
              { label: "Cloud Partners", value: 4, suffix: "" },
            ].map(({ label, value, suffix }) => (
              <div
                key={label}
                className="px-5 py-3 rounded-2xl bg-white/80 backdrop-blur border border-sky-100 shadow-sm text-center"
              >
                <div className="text-2xl font-extrabold text-sky-600">
                  <CountUp to={value} suffix={suffix} />
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── TECH CARDS ── */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {techCategories.map((cat, i) => (
            <MagneticCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>
      </section>

      {/* ── PARTNERS TICKER ── */}
      <section className="py-16 border-y border-slate-100 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase"
          >
            Certified Cloud Partners
          </motion.p>
        </div>
        <div className="relative flex overflow-x-hidden group hover-pause-group">
          {/* fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10" />

          {[0, 1].map((track) => (
            <div
              key={track}
                className="flex items-center gap-10 min-w-max pr-10 animate-marquee"
            >
              {[...partners, ...partners].map((p, i) => (
                <motion.div
                  key={`${p}-${i}`}
                  whileHover={{ y: -4 }}
                  className="px-10 py-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-sky-100 transition-all duration-300 min-w-[220px] text-center cursor-default group/partner"
                >
                  <span className="text-lg font-extrabold text-slate-800 tracking-wider group-hover/partner:text-sky-600 transition-colors uppercase">
                    {p}
                  </span>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative rounded-3xl bg-gradient-to-br from-sky-50 to-white
                       border border-sky-100 p-12 text-center overflow-hidden group"
          >
            <motion.div
              animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-sky-200/30 blur-3xl pointer-events-none"
            />
            <motion.div
              animate={{ x: [0, -15, 0], y: [0, 18, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-sky-300/20 blur-3xl pointer-events-none"
            />
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-sky-400"
                style={{
                  left: `${15 + i * 14}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
              />
            ))}
            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-3xl mb-4"
              >
                ⚡
              </motion.div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Need a specific technology?
              </h2>
              <p className="text-slate-500 mb-8 max-w-xl mx-auto">
                Our polyglot engineers specialise in picking the right tool for
                the job — whether it&apos;s legacy modernisation or greenfield
                development.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full
                             border-2 border-sky-500 text-sky-600 font-semibold
                             hover:bg-sky-500 hover:text-white transition-all duration-300 group"
                >
                  Discuss Architecture
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
