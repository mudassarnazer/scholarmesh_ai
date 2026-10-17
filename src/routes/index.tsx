import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock, GitBranch, Info, Microscope, Network, Paperclip, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { DemoBadge } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Research Chat — ScholarMesh AI" },
    { name: "description", content: "Ask research questions and discover relationships across scientific literature." },
    { property: "og:title", content: "Research Chat — ScholarMesh AI" },
    { property: "og:description", content: "Connect knowledge. Discover what matters." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ResearchChat,
});
const suggestions = [
  { title: "Compare approaches", question: "Compare approaches to AI agent memory", icon: GitBranch, category: "SYNTHESIZE" },
  { title: "Challenge the evidence", question: "What limitations appear across these studies?", icon: Microscope, category: "CRITIQUE" },
  { title: "Connect the dots", question: "Find connections between related research methods", icon: Network, category: "CONNECT" },
  { title: "Explore new directions", question: "Identify unexplored research directions", icon: Sparkles, category: "DISCOVER" },
];
const recent = [
  { title: "Retrieval-augmented generation in clinical NLP", papers: 12, time: "2 days ago" },
  { title: "Graph neural networks for citation prediction", papers: 8, time: "last week" },
  { title: "Evaluation benchmarks for long-context models", papers: 5, time: "2 weeks ago" },
];
function ResearchChat() {
  const [q, setQ] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const ref = useRef<HTMLTextAreaElement>(null);
  const submit = () => { if (!q.trim()) return ref.current?.focus(); setSubmitted(q.trim()); };
  return <div className="mx-auto max-w-[1000px]">
    <section className="relative pb-2 pt-2 md:pt-5">
      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary"><span className="h-px w-5 bg-primary" /> A space for curious minds</p>
      <div className="mt-5 flex items-center justify-between gap-4"><div className="max-w-xl"><h2 className="font-serif text-4xl font-medium leading-[1.2] md:text-[44px]">Good questions.<br /> <span className="text-primary">New discoveries.</span></h2><p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">Explore the literature, connect ideas, and find your next research direction.</p></div>
        <svg viewBox="0 0 240 160" aria-label="Connected research papers and ideas" role="img" className="hidden h-40 w-60 shrink-0 xl:block" fill="none"><path d="M35 85L110 35L190 60L145 125L35 85L190 60M110 35L145 125" className="stroke-border" strokeWidth="1.5" /><circle cx="35" cy="85" r="19" className="fill-blue-soft stroke-primary" /><circle cx="110" cy="35" r="13" className="fill-secondary stroke-violet" /><circle cx="190" cy="60" r="24" className="fill-blue-soft stroke-primary" /><circle cx="145" cy="125" r="15" className="fill-secondary stroke-violet" /><path d="M29 80h12v10H29zM184 51h12v18h-12zM187 56h6m-6 4h6M106 35h8m-4-4v8M141 125h8m-4-4v8" className="stroke-primary" strokeWidth="1.5" /><text x="12" y="121" className="fill-muted-foreground text-[9px]">PAPERS</text><text x="119" y="156" className="fill-muted-foreground text-[9px]">IDEAS</text></svg>
      </div>
    </section>
    <form className="gradient-border mt-7 rounded-lg p-4 shadow-soft md:p-5" onSubmit={e => { e.preventDefault(); submit(); }}>
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold"><Sparkles className="h-4 w-4 text-violet" /> What are you exploring?</div>
      <textarea ref={ref} value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }} rows={3} placeholder="Ask a question about papers, concepts, or methods…" className="min-h-24 w-full resize-none bg-transparent text-sm leading-6 outline-none placeholder:text-muted-foreground" aria-label="Research question" />
      <div className="mt-2 flex items-center justify-between gap-2 border-t pt-3"><div className="flex items-center gap-2"><Button type="button" variant="ghost" size="icon" title="Attach document (coming soon)" aria-label="Attach document (coming soon)" onClick={() => toast("Document attachments are coming soon")} className="text-muted-foreground"><Paperclip /></Button><span className="hidden text-[11px] text-muted-foreground sm:inline">Scientific literature</span></div><Button type="submit" className="bg-brand h-10 px-4 font-semibold shadow-none">Ask Research<ArrowRight /></Button></div>
    </form>
    {submitted && <div className="mt-4 flex gap-3 rounded-lg border bg-blue-soft p-4 text-sm" role="status"><Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><div><p className="font-medium">Your question has been noted: “{submitted}”</p><p className="mt-1 text-muted-foreground">The research engine will be connected in a later development phase. No answers are generated yet.</p></div></div>}
    <div className="mb-3 mt-7 flex items-center justify-between"><h3 className="text-xs font-semibold">Start with a little inspiration</h3><span className="text-[10px] text-muted-foreground">Follow your curiosity</span></div>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{suggestions.map(({ title, question, icon: Icon, category }) => <Button key={question} variant="outline" onClick={() => { setQ(question); ref.current?.focus(); }} className="group h-auto min-h-36 flex-col items-start justify-start gap-0 whitespace-normal bg-card p-4 text-left shadow-none hover:border-primary/40 hover:bg-card hover:shadow-soft"><div className="mb-4 flex w-full items-center justify-between"><Icon className="text-primary" /><ArrowRight className="text-muted-foreground transition-transform group-hover:translate-x-1" /></div><span className="mb-1.5 text-[9px] font-semibold tracking-[0.1em] text-muted-foreground">{category}</span><span className="text-xs font-semibold">{title}</span><span className="mt-2 text-[11px] font-normal leading-5 text-muted-foreground">{question}</span></Button>)}</div>
    <section className="mt-10"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><h3 className="text-sm font-semibold">Continue your research</h3><DemoBadge /></div><Button asChild variant="link" size="sm" className="h-auto p-0 text-xs"><Link to="/library">Your library<ArrowRight /></Link></Button></div><ul className="divide-y border-y">{recent.map(r => <li key={r.title}><Button variant="ghost" onClick={() => toast("Session history arrives in a later phase")} className="h-auto w-full justify-between gap-4 whitespace-normal rounded-none px-1 py-4 text-left"><span className="flex min-w-0 items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border bg-card"><BookOpen className="text-primary" /></span><span><span className="block text-xs font-medium">{r.title}</span><span className="mt-1 block text-[10px] font-normal text-muted-foreground">{r.papers} papers</span></span></span><span className="flex shrink-0 items-center gap-2"><span className="hidden items-center gap-1.5 text-[10px] font-normal text-muted-foreground sm:flex"><Clock className="h-3 w-3" />{r.time}</span><ArrowRight className="text-muted-foreground" /></span></Button></li>)}</ul></section>
    <footer className="mt-7 flex items-center justify-between gap-3 text-[10px] text-muted-foreground"><span className="flex items-center gap-1.5"><Network className="h-3 w-3" />ScholarMesh AI</span><span>Designed for evidence-based research.</span></footer>
  </div>;
}
