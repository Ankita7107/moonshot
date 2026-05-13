"use client";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Globe, Cpu, Database, Cloud, Wrench, Plug, ShieldCheck,
  BrainCircuit, Smartphone, Bot, Network, KeyRound,
  BarChart3, ServerCog, TestTube2, Bitcoin, type LucideIcon,
} from "lucide-react";

/* ─── data ─────────────────────────────────────────────────── */
const techCategories: { title: string; tags: string[]; Icon: LucideIcon }[] = [
  { title: "Frontend", Icon: Globe, tags: ["React", "Next.js", "Vue.js", "Angular", "Tailwind CSS", "TypeScript"] },
  { title: "Backend", Icon: Cpu, tags: ["Node.js", "Go", "Java", "C#", ".NET Core"] },
  { title: "Database", Icon: Database, tags: ["PostgreSQL", "MySQL", "Redis", "DynamoDB", "Elasticsearch"] },
  { title: "Cloud / DevOps", Icon: Cloud, tags: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"] },
  { title: "Tools & Platforms", Icon: Wrench, tags: ["GitHub", "GitLab", "Jira", "Postman", "VS Code", "Figma"] },
  { title: "API & Integration", Icon: Plug, tags: ["GraphQL", "REST", "Stripe", "Twilio", "Webhooks"] },
  { title: "Security", Icon: ShieldCheck, tags: ["JWT", "Auth0", "Keycloak", "OpenID Connect"] },
  { title: "AI / Data", Icon: BrainCircuit, tags: ["OpenAI", "TensorFlow", "PyTorch", "Pandas", "Hugging Face"] },
  { title: "Mobile", Icon: Smartphone, tags: ["React Native", "Flutter", "Kotlin", "Swift"] },
  { title: "AI / LLM Systems", Icon: Bot, tags: ["GPT-4", "OpenAI API", "LangChain", "Hugging Face"] },
  { title: "Microservices", Icon: Network, tags: ["Docker", "Kubernetes", "Kafka", "RabbitMQ"] },
  { title: "Authentication", Icon: KeyRound, tags: ["JWT", "Auth0", "Keycloak", "OpenID Connect"] },
  { title: "Data Engineering", Icon: BarChart3, tags: ["Spark", "Kafka", "Airflow", "Snowflake", "BigQuery"] },
  { title: "Advanced Cloud", Icon: ServerCog, tags: ["Serverless", "AWS Lambda", "Docker", "Kubernetes"] },
  { title: "Testing & QA", Icon: TestTube2, tags: ["Jest", "Cypress", "Selenium", "Playwright"] },
  { title: "Blockchain", Icon: Bitcoin, tags: ["Ethereum", "Solidity", "Metamask"] },
];

const partners = ["AWS", "GOOGLE CLOUD", "MICROSOFT AZURE", "DIGITALOCEAN"];

/* ─── particles canvas (header bg) ─────────────────────────── */
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

      /* connecting lines */
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
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

      /* dots */
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

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
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
          transition={{ delay: 0.35 + i * 0.03, duration: 0.5, type: "spring" as const, stiffness: 180 }}
          style={{ display: ch === " " ? "inline" : "inline-block" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── magnetic 3-D card ─────────────────────────────────────── */
function MagneticCard({ cat, index }: { cat: typeof techCategories[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), { stiffness: 260, damping: 20 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-12, 12]), { stiffness: 260, damping: 20 });


  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { rawX.set(0); rawY.set(0); setHovered(false); };

  /* tag stagger on card hover */
  const tagVariants = {
    rest: { y: 0, opacity: 1 },
    hover: (i: number) => ({
      y: -3,
      opacity: 1,
      transition: { delay: i * 0.04, type: "spring" as const, stiffness: 320, damping: 18 },
    }),
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.055, duration: 0.55, type: "spring" as const, stiffness: 140 }}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      className="relative rounded-2xl bg-white border border-slate-100 p-6 shadow-sm overflow-hidden
                 min-w-[260px] md:min-w-0 snap-start cursor-default"
    >


      {/* top-right sparkle */}
      <motion.div
        animate={{ rotate: hovered ? 180 : 0, scale: hovered ? 1 : 0.6, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-3 right-3 text-sky-400 text-sm"
      >
        ✦
      </motion.div>

      {/* icon box */}
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? -6 : 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 18 }}
        className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-50 text-sky-500"
      >
        <cat.Icon size={22} strokeWidth={1.6} />
      </motion.div>

      <h3 className="font-bold text-slate-800 mb-4 text-sm tracking-wide uppercase">
        {cat.title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {cat.tags.map((tag, i) => (
          <motion.span
            key={tag}
            custom={i}
            variants={tagVariants}
            animate={hovered ? "hover" : "rest"}
            className="px-2.5 py-1 rounded-full text-xs font-medium
                       bg-sky-50 text-sky-700 border border-sky-100
                       hover:bg-sky-100 transition-colors"
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── animated count-up ─────────────────────────────────────── */
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
        if (start >= to) { setVal(to); return; }
        setVal(start);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── page ──────────────────────────────────────────────────── */
export default function TechnologiesPage() {
  return (
    <>
      {/* ── HEADER ── */}
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-slate-50 py-28 text-center overflow-hidden">
        <ParticleCanvas />

        {/* pulsing rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/50"
            initial={{ width: 100, height: 100, opacity: 0.6 }}
            animate={{ width: 700 + i * 200, height: 700 + i * 200, opacity: 0 }}
            transition={{ duration: 4, delay: i * 1.3, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 max-w-3xl mx-auto px-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight"
            style={{ perspective: 600 }}>
            <SplitHeading text="Our Modern Tech Stack" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="text-slate-500 text-lg"
          >
            We leverage the most powerful tools in the industry to build future-proof solutions.
          </motion.p>

          {/* stat pills */}
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
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
                     flex md:grid md:grid-cols-4 gap-6
                     overflow-x-auto md:overflow-visible pb-4 md:pb-0
                     snap-x snap-mandatory md:snap-none"
        >
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

        <div className="relative flex overflow-x-hidden">
          {/* fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

          {[0, 1].map((track) => (
            <motion.div
              key={track}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              className="flex items-center gap-16 min-w-max pr-16"
            >
              {[...partners, ...partners].map((p, i) => (
                <motion.span
                  key={`${p}-${i}`}
                  whileHover={{ scale: 1.08, color: "#0ea5e9" }}
                  className="text-xl font-extrabold text-slate-800 tracking-wider cursor-default transition-colors"
                >
                  {p}
                </motion.span>
              ))}
            </motion.div>
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
            transition={{ duration: 0.6, type: "spring" as const }}
            className="relative rounded-3xl bg-gradient-to-br from-sky-50 to-white
                       border border-sky-100 p-12 text-center overflow-hidden group"
          >
            {/* animated bg blobs */}
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

            {/* sparkle dots */}
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
                Our polyglot engineers specialise in picking the right tool for the job —
                whether it&apos;s legacy modernisation or greenfield development.
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
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