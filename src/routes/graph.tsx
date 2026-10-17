import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/graph")({
  head: () => ({
    meta: [
      { title: "Knowledge Graph — ScholarMesh AI" },
      { name: "description", content: "Visualize connections between papers, authors, concepts, and methods." },
      { property: "og:title", content: "Knowledge Graph — ScholarMesh AI" },
      { property: "og:description", content: "See how research connects." },
    ],
  }),
  component: GraphPage,
});

type Kind = "Paper" | "Concept" | "Author" | "Method";
const kindStyle: Record<Kind, string> = {
  Paper: "fill-primary",
  Concept: "fill-violet",
  Author: "fill-card stroke-primary",
  Method: "fill-card stroke-violet",
};

const nodes: { id: string; label: string; kind: Kind; x: number; y: number; detail: string }[] = [
  { id: "p1", label: "MemGPT (2023)", kind: "Paper", x: 300, y: 180, detail: "Proposes hierarchical memory management for LLM agents." },
  { id: "p2", label: "Reflexion (2023)", kind: "Paper", x: 520, y: 300, detail: "Agents improve via verbal self-reflection stored in memory." },
  { id: "c1", label: "Agent Memory", kind: "Concept", x: 420, y: 90, detail: "How autonomous agents store and retrieve past context." },
  { id: "c2", label: "Self-Reflection", kind: "Concept", x: 680, y: 200, detail: "Iterative critique of an agent's own outputs." },
  { id: "a1", label: "C. Packer", kind: "Author", x: 140, y: 110, detail: "Lead author of MemGPT." },
  { id: "a2", label: "N. Shinn", kind: "Author", x: 560, y: 440, detail: "Lead author of Reflexion." },
  { id: "m1", label: "Retrieval (RAG)", kind: "Method", x: 220, y: 350, detail: "Retrieving external documents to ground generation." },
];
const edges: [string, string, string][] = [["p1", "c1", "studies"], ["p2", "c1", "extends"], ["p2", "c2", "introduces"], ["a1", "p1", "authored"], ["a2", "p2", "authored"], ["p1", "m1", "uses"], ["m1", "p2", "informs"]];

function GraphPage() {
  const [sel, setSel] = useState<string | null>("c1");
  const byId = (id: string) => nodes.find((n) => n.id === id)!;
  const s = sel ? byId(sel) : null;
  const linked = s ? edges.filter((e) => e.includes(s.id)).map((e) => byId(e[0] === s.id ? e[1] : e[0])) : [];

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Knowledge Graph" demo description="See how papers, authors, concepts, and methods connect. Select a node to explore its relationships." />
      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        <div className="rounded-2xl border bg-card p-3">
          <svg viewBox="0 0 820 520" className="h-auto w-full">
            {edges.map(([a, b, rel]) => {
              const active = sel === a || sel === b;
              return (
                <line key={a + b} x1={byId(a).x} y1={byId(a).y} x2={byId(b).x} y2={byId(b).y}
                  className={active ? "stroke-violet" : "stroke-input"} strokeWidth={active ? 1.6 : 1} />
              );
            })}
            {nodes.map((n) => (
              <g key={n.id} onClick={() => setSel(n.id)} className="cursor-pointer" tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSel(n.id)} role="button" aria-label={n.label}>
                <circle cx={n.x} cy={n.y} r={sel === n.id ? 15 : 11} strokeWidth={2.5}
                  className={`${kindStyle[n.kind]} transition-all`} />
                {sel === n.id && <circle cx={n.x} cy={n.y} r={21} fill="none" strokeWidth={2} className="stroke-sage" />}
                <text x={n.x} y={n.y + 30} textAnchor="middle" className="fill-foreground text-[13px] font-medium">{n.label}</text>
              </g>
            ))}
          </svg>
          <div className="flex flex-wrap gap-4 border-t px-2 pt-3 text-xs text-muted-foreground">
            {(Object.keys(kindStyle) as Kind[]).map((k) => (
              <span key={k} className="flex items-center gap-1.5">
                <svg width="12" height="12"><circle cx="6" cy="6" r="4.5" strokeWidth="2" className={kindStyle[k]} /></svg>
                {k}s
              </span>
            ))}
          </div>
        </div>
        <aside className="bg-welcome rounded-2xl border p-6">
          {s ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.kind}</p>
              <h3 className="mt-1 font-serif text-xl">{s.label}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.detail}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Connected to</p>
              <ul className="mt-2 space-y-1.5">
                {linked.map((l) => (
                  <li key={l.id}>
                    <button onClick={() => setSel(l.id)} className="text-sm text-primary hover:underline">{l.label}</button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Select a node to see its details.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
