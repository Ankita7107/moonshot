"use client";
import Link from "next/link";
import { Globe, Settings, Database, Cloud } from "lucide-react";
import { motion } from "framer-motion";

const techCategories = [
  {
    icon: <Globe className="w-6 h-6 text-sky-500" />,
    title: "Frontend",
    tags: [
      "React",
      "Next.js",
      "Vue.js",
      "Angular",
      "Tailwind CSS",
      "TypeScript",
    ],
  },
  {
    icon: <Settings className="w-6 h-6 text-sky-500" />,
    title: "Backend",
    tags: ["Node.js", "Go", "Java", "C#", ".NET Core"],
  },
  {
    icon: <Database className="w-6 h-6 text-sky-500" />,
    title: "Database",
    tags: ["PostgreSQL", "MySQL", "Redis", "DynamoDB", "Elasticsearch"],
  },
  {
    icon: <Cloud className="w-6 h-6 text-sky-500" />,
    title: "Cloud/DevOps",
    tags: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"],
  },

  // ⭐ Existing Added Sections
  {
    icon: <Settings className="w-6 h-6 text-sky-500" />,
    title: "Tools & Platforms",
    tags: ["GitHub", "GitLab", "Jira", "Postman", "VS Code", "Figma"],
  },
  {
    icon: <Globe className="w-6 h-6 text-sky-500" />,
    title: "API & Integration",
    tags: ["REST API", "GraphQL", "Webhooks", "Stripe", "Twilio"],
  },
  {
    icon: <Settings className="w-6 h-6 text-sky-500" />,
    title: "Security",
    tags: ["JWT", "OAuth2", "SSL", "OWASP", "Identity Server"],
  },
  {
    icon: <Database className="w-6 h-6 text-sky-500" />,
    title: "AI / Data",
    tags: ["OpenAI", "TensorFlow", "PyTorch", "Pandas", "NumPy"],
  },
  {
    icon: <Globe className="w-6 h-6 text-sky-500" />,
    title: "Mobile Development",
    tags: ["React Native", "Flutter", "Kotlin", "Swift"],
  },

  // 🚀 NEW HIGH-LEVEL INDUSTRY STACK ADDED

  {
    icon: <Globe className="w-6 h-6 text-sky-500" />,
    title: "AI / LLM Systems",
    tags: [
      "GPT-4",
      "OpenAI API",
      "LangChain",
      "RAG",
      "Vector DB",
      "Hugging Face",
    ],
  },
  {
    icon: <Cloud className="w-6 h-6 text-sky-500" />,
    title: "Microservices",
    tags: ["Docker", "Kubernetes", "Kafka", "RabbitMQ", "gRPC", "API Gateway"],
  },
  {
    icon: <Settings className="w-6 h-6 text-sky-500" />,
    title: "Authentication",
    tags: ["JWT", "OAuth2", "SSO", "Keycloak", "Auth0", "OpenID Connect"],
  },
  {
    icon: <Database className="w-6 h-6 text-sky-500" />,
    title: "Data Engineering",
    tags: ["Spark", "Kafka", "Airflow", "ETL", "Snowflake", "BigQuery"],
  },
  {
    icon: <Cloud className="w-6 h-6 text-sky-500" />,
    title: "Advanced Cloud",
    tags: [
      "Serverless",
      "AWS Lambda",
      "Cloud Functions",
      "Edge Computing",
      "CI/CD",
    ],
  },
  {
    icon: <Settings className="w-6 h-6 text-sky-500" />,
    title: "Testing & QA",
    tags: ["Jest", "Cypress", "Selenium", "Playwright", "Load Testing"],
  },
  {
    icon: <Globe className="w-6 h-6 text-sky-500" />,
    title: "Blockchain",
    tags: [
      "Ethereum",
      "Solidity",
      "Smart Contracts",
      "Web3.js",
      "NFT",
      "Metamask",
    ],
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
      <section className="bg-[#0F172A] py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Our Modern Tech Stack
          </h1>
          <p className="text-slate-400">
            We leverage the most powerful tools in the industry to build
            future-proof solutions.
          </p>
        </div>
      </section>

      {/* TECH CARDS */}
      <section className="py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-6"
        >
          {techCategories.map((cat) => (
            <motion.div
              variants={fadeIn}
              key={cat.title}
              className="card card-hover"
            >
              <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
                {cat.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.tags.map((tag) => (
                  <span key={tag} className="badge text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CLOUD PARTNERS */}
      <section className="py-16 border-y border-slate-100">
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
          <div className="bg-sky-50 border border-sky-100 rounded-3xl p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Need a specific technology?
            </h2>
            <p className="text-slate-500 mb-8">
              Our team is composed of polyglot engineers who specialize in
              picking the right tool for the job. Whether it&apos;s legacy
              modernization or greenfield development, we have the expertise.
            </p>
            <Link href="/contact" className="btn-outline">
              Discuss Architecture
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
