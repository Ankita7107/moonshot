import Link from "next/link";
import { Globe, Settings, Database, Cloud } from "lucide-react";

const techCategories = [
  {
    icon: <Globe className="w-6 h-6 text-sky-500" />,
    title: "Frontend",
    tags: ["React", "Next.js", "Vue.js", "Angular", "Tailwind CSS", "TypeScript"],
  },
  {
    icon: <Settings className="w-6 h-6 text-sky-500" />,
    title: "Backend",
    tags: ["Node.js", "Go", "Java", "C#", ".NET Core"],
  },
  {
    icon: <Database className="w-6 h-6 text-sky-500" />,
    title: "Database",
    tags: ["PostgreSQL", "MySql", "Redis", "DynamoDB", "Elasticsearch"],
  },
  {
    icon: <Cloud className="w-6 h-6 text-sky-500" />,
    title: "Cloud/DevOps",
    tags: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"],
  },
];

const partners = ["AWS", "GOOGLE CLOUD", "MICROSOFT AZURE", "DIGITALOCEAN"];

export default function TechnologiesPage() {
  return (
    <>
      <section className="bg-[#0F172A] py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Our Modern Tech Stack</h1>
          <p className="text-slate-400">We leverage the most powerful tools in the industry to build future-proof solutions.</p>
        </div>
      </section>

      {/* Tech Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-6">
          {techCategories.map((cat) => (
            <div key={cat.title} className="card hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
                {cat.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.tags.map((tag) => (
                  <span key={tag} className="badge text-xs">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cloud Partners */}
      <section className="py-16 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="section-label mb-6">CERTIFIED CLOUD PARTNERS</p>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-8">
            {partners.map((p) => (
              <span key={p} className="text-2xl font-extrabold text-slate-300 tracking-wider">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-sky-50 border border-sky-100 rounded-3xl p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Need a specific technology?</h2>
            <p className="text-slate-500 mb-8">
              Our team is composed of polyglot engineers who specialize in picking the right tool for the job. Whether it&apos;s legacy modernization or greenfield development, we have the expertise.
            </p>
            <Link href="/contact" className="btn-outline">Discuss Architecture</Link>
          </div>
        </div>
      </section>
    </>
  );
}
