import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader, Tag } from "@/components/AppShell";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Research Library — ScholarMesh AI" },
      { name: "description", content: "Browse and filter your collection of research papers." },
      { property: "og:title", content: "Research Library — ScholarMesh AI" },
      { property: "og:description", content: "Your scholarly paper collection." },
    ],
  }),
  component: Library,
});

const papers = [
  { title: "MemGPT: Towards LLMs as Operating Systems", author: "Packer et al.", year: 2023, topic: "AI Agents", summary: "Introduces virtual context management that lets language models handle memory beyond their context window.", tags: ["Memory", "LLMs"] },
  { title: "Reflexion: Language Agents with Verbal Reinforcement Learning", author: "Shinn et al.", year: 2023, topic: "AI Agents", summary: "Agents reflect on task feedback in natural language and store reflections to improve future attempts.", tags: ["Self-reflection", "RL"] },
  { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP", author: "Lewis et al.", year: 2020, topic: "NLP", summary: "Combines parametric and non-parametric memory to ground generation in retrieved documents.", tags: ["RAG", "Retrieval"] },
  { title: "Graph Attention Networks", author: "Veličković et al.", year: 2018, topic: "Graph Learning", summary: "Applies masked self-attention to graph-structured data for node classification.", tags: ["GNN", "Attention"] },
];
const topics = ["All topics", ...new Set(papers.map((p) => p.topic))];
const years = ["All years", ...[...new Set(papers.map((p) => p.year))].sort((a, b) => b - a).map(String)];

const control = "rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

function Library() {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [year, setYear] = useState(years[0]);

  const list = useMemo(() => {
    const t = q.toLowerCase();
    return papers.filter(
      (p) =>
        (topic === topics[0] || p.topic === topic) &&
        (year === years[0] || String(p.year) === year) &&
        (!t || [p.title, p.author, p.summary, ...p.tags].join(" ").toLowerCase().includes(t)),
    );
  }, [q, topic, year]);

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Research Library" demo description="Your collection of papers, ready to explore and connect." />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search titles, authors, topics…" className={`${control} w-full pl-9`} aria-label="Search papers" />
        </label>
        <select value={topic} onChange={(e) => setTopic(e.target.value)} className={control} aria-label="Topic">
          {topics.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)} className={control} aria-label="Year">
          {years.map((y) => <option key={y}>{y}</option>)}
        </select>
      </div>
      <ul className="space-y-3">
        {list.map((p) => (
          <li key={p.title} className="rounded-xl border bg-card p-5 transition hover:border-violet/40 hover:shadow-soft">
            <h3 className="font-serif text-lg leading-snug text-foreground">{p.title}</h3>
            <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground"><span className="text-primary">{p.author}</span> · {p.year}</p>
            <p className="mt-3 text-sm leading-relaxed">{p.summary}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Tag>{p.topic}</Tag>
              {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </li>
        ))}
        {list.length === 0 && (
          <li className="bg-welcome rounded-xl border p-10 text-center text-sm text-muted-foreground">No papers match your filters.</li>
        )}
      </ul>
    </div>
  );
}
