"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const techCategories = [
  {
    title: "Frontend",
    tags: ["React", "Next.js", "Vue.js", "Angular", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "Backend",
    tags: ["Node.js", "Go", "Java", "C#", ".NET Core"],
  },
  {
    title: "Database",
    tags: ["PostgreSQL", "MySQL", "Redis", "DynamoDB", "Elasticsearch"],
  },
  {
    title: "Cloud/DevOps",
    tags: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"],
  },
  {
    title: "Tools & Platforms",
    tags: ["GitHub", "GitLab", "Jira", "Postman", "VS Code", "Figma"],
  },
  {
    title: "API & Integration",
    tags: ["GraphQL", "Stripe", "Twilio"],
  },
  {
    title: "Security",
    tags: ["JWT", "Auth0", "Keycloak", "OpenID Connect"],
  },
  {
    title: "AI / Data",
    tags: ["OpenAI", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Hugging Face"],
  },
  {
    title: "Mobile Development",
    tags: ["React Native", "Flutter", "Kotlin", "Swift"],
  },
  {
    title: "AI / LLM Systems",
    tags: ["GPT-4", "OpenAI API", "LangChain", "Hugging Face"],
  },
  {
    title: "Microservices",
    tags: ["Docker", "Kubernetes", "Kafka", "RabbitMQ"],
  },
  {
    title: "Authentication",
    tags: ["JWT", "Auth0", "Keycloak", "OpenID Connect"],
  },
  {
    title: "Data Engineering",
    tags: ["Spark", "Kafka", "Airflow", "Snowflake", "BigQuery"],
  },
  {
    title: "Advanced Cloud",
    tags: ["Serverless", "AWS Lambda", "Docker", "Kubernetes"],
  },
  {
    title: "Testing & QA",
    tags: ["Jest", "Cypress", "Selenium", "Playwright"],
  },
  {
    title: "Blockchain",
    tags: ["Ethereum", "Solidity", "Metamask"],
  },
];

const partners = ["AWS", "GOOGLE CLOUD", "MICROSOFT AZURE", "DIGITALOCEAN"];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function TechnologiesPage() {
  return (
    <>
      {/* HEADER */}
      <section className="relative bg-gradient-to-br from-sky-50 to-white py-20 text-center overflow-hidden animated-grid-bg">
        <div className="absolute top-8 left-[14%] h-24 w-24 rounded-full bg-sky-300/20 blur-2xl animate-float-slow" />
        <div className="absolute bottom-8 right-[14%] h-24 w-24 rounded-full bg-sky-200/20 blur-2xl animate-float-delay" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto px-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Our Modern Tech Stack
          </h1>
          <p className="text-slate-600">
            We leverage the most powerful tools in the industry to build
            future-proof solutions.
          </p>
        </motion.div>
      </section>

      {/* TECH CARDS */}
      <section className="py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto pb-2 md:pb-0 flex md:grid md:grid-cols-4 gap-6 snap-x snap-mandatory md:snap-none md:overflow-visible"
        >
          {techCategories.map((cat) => (
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -8, scale: 1.015, rotateX: 6, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              key={cat.title}
              className="card card-hover hover-shine min-w-[260px] md:min-w-0 snap-start md:snap-start"
              style={{ transformPerspective: 900 }}
            >
              <h3 className="font-bold text-slate-800 mb-4">{cat.title}</h3>

              <div className="flex flex-wrap gap-2">
                {cat.tags.map((tag) => (
                  <motion.span
                    whileHover={{ y: -2 }}
                    key={tag}
                    className="badge text-xs"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CLOUD PARTNERS */}
      <section className="py-16 border-y border-slate-100 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center overflow-hidden">
          <p className="section-label mb-10">CERTIFIED CLOUD PARTNERS</p>
          <div className="relative flex overflow-x-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="flex items-center justify-start gap-16 min-w-max pr-16"
            >
              {[...partners, ...partners].map((p, i) => (
                <span
                  key={`${p}-${i}`}
                  className="text-2xl font-extrabold text-black tracking-wider"
                >
                  {p}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-sky-50 border border-sky-100 rounded-3xl p-12 text-center hover-shine"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Need a specific technology?
            </h2>
            <p className="text-slate-500 mb-8">
              Our team is composed of polyglot engineers who specialize in
              picking the right tool for the job. Whether it&apos;s legacy
              modernization or greenfield development, we have the expertise.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link href="/contact" className="btn-outline hover-shine">
                Discuss Architecture
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}