import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, GitBranch, HelpCircle, X } from "lucide-react";
import { useState } from "react";
import { Logo, PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Discoveries — ScholarMesh AI" },
      { name: "description", content: "Your saved questions, concepts, and explored relationships." },
      { property: "og:title", content: "Saved Discoveries — ScholarMesh AI" },
      { property: "og:description", content: "Revisit what you've discovered." },
    ],
  }),
  component: Saved,
});

const initial = [
  { id: 1, group: "Saved research questions", icon: HelpCircle, text: "How do agent memory architectures differ in retrieval strategy?" },
  { id: 2, group: "Bookmarked concepts", icon: Bookmark, text: "Self-reflection in language agents" },
  { id: 3, group: "Bookmarked concepts", icon: Bookmark, text: "Virtual context management" },
  { id: 4, group: "Explored relationships", icon: GitBranch, text: "MemGPT ↔ Retrieval (RAG) ↔ Reflexion" },
];

function Saved() {
  const [items, setItems] = useState(initial);
  const groups = [...new Set(initial.map((i) => i.group))];

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Saved Discoveries" demo description="Questions, concepts, and relationships you've kept for later." />
      {items.length === 0 ? (
        <div className="bg-welcome rounded-2xl border p-12 text-center">
          <Logo className="mx-auto h-12 w-12" />
          <h3 className="mt-5 font-serif text-xl">Nothing saved yet</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">Bookmark questions, concepts, and connections as you research — they'll gather here.</p>
          <Link to="/" className="mt-5 inline-block rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Start researching</Link>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map((g) => {
            const gi = items.filter((i) => i.group === g);
            if (!gi.length) return null;
            return (
              <section key={g}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{g}</h3>
                <ul className="space-y-2">
                  {gi.map((i) => (
                    <li key={i.id} className="group flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
                      <i.icon className="h-4 w-4 shrink-0 text-primary" />
                      <span className="flex-1 text-sm">{i.text}</span>
                      <button onClick={() => setItems((s) => s.filter((x) => x.id !== i.id))} aria-label="Remove"
                        className="rounded p-1 text-muted-foreground opacity-60 hover:bg-muted hover:text-foreground group-hover:opacity-100">
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
