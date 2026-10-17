import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock, Info, Paperclip, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { DemoBadge } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Research Chat — ScholarMesh AI" },
      { name: "description", content: "Ask research questions and discover relationships across scientific literature." },
      { property: "og:title", content: "Research Chat — ScholarMesh AI" },
      { property: "og:description", content: "Connect knowledge. Discover what matters." },
    ],
  }),
  component: ResearchChat,
});

const suggestions = [
  "Compare approaches to AI agent memory",
  "What limitations appear across these studies?",
  "Find connections between related research methods",
  "Identify unexplored research directions",
];

const recent = [
  { title: "Retrieval-augmented generation in clinical NLP", meta: "12 papers · 2 days ago" },
  { title: "Graph neural networks for citation prediction", meta: "8 papers · last week" },
  { title: "Evaluation benchmarks for long-context models", meta: "5 papers · 2 weeks ago" },
];

function ResearchChat() {
  const [q, setQ] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const ref = useRef<HTMLTextAreaElement>(null);

  const submit = () => {
    if (!q.trim()) return ref.current?.focus();
    setSubmitted(q.trim());
  };

  return (
    <div className="relative isolate mx-auto max-w-3xl">
      <section className="relative pt-4 text-center md:pt-10">
        <div aria-hidden className="bg-glow pointer-events-none absolute -inset-x-16 -inset-y-10 -z-10 blur-2xl" />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-3 py-1 text-xs font-medium text-secondary-foreground">
          <Sparkles className="h-3.5 w-3.5" /> Connect knowledge. Discover what matters.
        </span>
        <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight md:text-5xl">
          Where will your next discovery begin?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Explore ideas, connect research, and uncover relationships across scientific literature.
        </p>
      </section>

      <form
        className="gradient-border mt-10 rounded-2xl p-4 transition-shadow"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <textarea
          ref={ref}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          rows={3}
          placeholder="Ask a research question across papers, concepts, or methods…"
          className="w-full resize-none bg-transparent px-2 py-1 text-base outline-none placeholder:text-muted-foreground"
          aria-label="Research question"
        />
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => toast("Document attachments are coming soon")}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Attach document (coming soon)"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Ask Research <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      {submitted && (
        <div className="bg-welcome mt-4 flex gap-3 rounded-xl border p-4 text-sm" role="status">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
          <div>
            <p className="font-medium">Your question has been noted: “{submitted}”</p>
            <p className="mt-1 text-muted-foreground">
              The research engine will be connected in a later development phase. No answers are generated yet.
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => {
              setQ(s);
              ref.current?.focus();
            }}
            className="rounded-xl border bg-card p-4 text-left text-sm transition hover:border-violet/40 hover:bg-tint hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {s}
          </button>
        ))}
      </div>

      <section className="mt-14">
        <div className="mb-3 flex items-center gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Continue your research</h3>
          <DemoBadge />
        </div>
        <ul className="divide-y rounded-xl border bg-card">
          {recent.map((r) => (
            <li key={r.title}>
              <button
                onClick={() => toast("Session history arrives in a later phase")}
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="font-medium">{r.title}</span>
                <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {r.meta}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-center text-xs text-muted-foreground">Designed for evidence-based research.</p>
    </div>
  );
}
