import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Bookmark, ChevronRight, FlaskConical, MessageSquareText, Network, PanelLeft, Plus, Settings } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Research Chat", icon: MessageSquareText },
  { to: "/graph", label: "Knowledge Graph", icon: Network },
  { to: "/library", label: "Research Library", icon: BookOpen },
  { to: "/saved", label: "Saved Discoveries", icon: Bookmark },
] as const;
const titles: Record<string, string> = { "/": "Research Chat", "/graph": "Knowledge Graph", "/library": "Research Library", "/saved": "Saved Discoveries", "/settings": "Settings" };

export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return <span className={`bg-brand grid shrink-0 place-items-center rounded-lg ${className}`}><svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 7l6 10M18 7l-6 10M6 7h12" /><circle cx="6" cy="7" r="2.2" fill="currentColor" /><circle cx="18" cy="7" r="2.2" fill="currentColor" /><circle cx="12" cy="17" r="2.2" fill="currentColor" /></svg></span>;
}

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  return <div className="flex min-h-screen w-full flex-col lg:flex-row">
    <aside className={`flex shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:sticky lg:top-0 lg:h-screen ${collapsed ? "lg:w-20" : "lg:w-[244px]"} transition-[width]`}>
      <div className="flex items-center justify-between px-5 py-5 lg:px-4 lg:py-8">
        <Link to="/" className="flex items-center gap-3" aria-label="ScholarMesh AI home"><Logo />{!collapsed && <span className="text-base font-semibold">ScholarMesh<span className="ml-1.5 text-xs text-sidebar-muted">AI</span></span>}</Link>
      </div>
      <div className="hidden px-4 lg:block"><Button onClick={() => toast("New research session started", { description: "Demo only — sessions will persist in a later phase." })} className="bg-brand h-11 w-full shadow-none" title="New Research"><Plus />{!collapsed && "New Research"}</Button></div>
      {!collapsed && <p className="hidden px-6 pb-3 pt-8 text-[10px] font-semibold uppercase tracking-[0.14em] text-sidebar-muted lg:block">Workspace</p>}
      <nav className={`flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:pb-0 ${collapsed ? "lg:pt-6" : ""}`}>
        {nav.map(({ to, label, icon: Icon }) => <Button key={to} asChild variant="ghost" className={`h-11 shrink-0 justify-start gap-3 px-3 text-xs lg:text-sm hover:bg-sidebar-active hover:text-sidebar-foreground ${path === to ? "bg-sidebar-active text-sidebar-foreground" : "text-sidebar-muted"} ${collapsed ? "lg:justify-center" : ""}`}><Link to={to} title={label}><Icon />{!collapsed && <span>{label}</span>}{path === to && !collapsed && <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-sage lg:block" />}</Link></Button>)}
      </nav>
      <div className="hidden border-t border-sidebar-active p-4 lg:block">
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(c => !c)} title="Toggle sidebar" aria-label="Toggle sidebar" className="mb-2 text-sidebar-muted hover:bg-sidebar-active hover:text-sidebar-foreground"><PanelLeft /></Button>
        <Button asChild variant="ghost" className={`h-10 w-full justify-start text-sidebar-muted hover:bg-sidebar-active hover:text-sidebar-foreground ${collapsed ? "justify-center" : ""}`}><Link to="/settings" title="Settings"><Settings />{!collapsed && "Settings"}</Link></Button>
        {!collapsed && <div className="mt-4 flex items-center gap-3 px-2 pb-2"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sidebar-active text-xs font-semibold">R</span><div><p className="text-xs font-semibold">Research workspace</p><p className="mt-1 flex items-center gap-1.5 text-[10px] text-sidebar-muted"><FlaskConical className="h-3 w-3" />Interface preview</p></div></div>}
      </div>
    </aside>
    <div className="min-w-0 flex-1 bg-workspace">
      <header className="flex h-16 items-center justify-between border-b bg-card px-5 md:px-9"><div className="flex items-center gap-2 text-xs"><span className="hidden text-muted-foreground sm:inline">Workspace</span><ChevronRight className="hidden h-3 w-3 text-muted-foreground sm:block" /><h1 className="font-semibold">{titles[path] ?? "ScholarMesh AI"}</h1></div><div className="flex items-center gap-4"><span className="hidden text-xs text-muted-foreground sm:block">Your research, connected.</span><Button asChild variant="ghost" size="icon" className="rounded-full bg-secondary text-secondary-foreground" aria-label="Profile settings"><Link to="/settings">R</Link></Button></div></header>
      <main className="research-enter px-5 py-8 md:px-9 md:py-10">{children}</main>
    </div>
  </div>;
}

export function PageHeader({ title, description, demo }: { title: string; description: string; demo?: boolean }) {
  return <div className="mb-8 border-b pb-6"><div className="flex flex-wrap items-center gap-3"><h2 className="font-serif text-3xl font-medium">{title}</h2>{demo && <DemoBadge />}</div><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p></div>;
}
export function DemoBadge() { return <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border bg-card px-2 py-1 text-[10px] font-medium text-muted-foreground"><span className="h-1 w-1 rounded-full bg-violet" />Demo data</span>; }
export function Tag({ children }: { children: ReactNode }) { return <span className="rounded bg-accent px-2 py-1 text-[10px] font-medium text-accent-foreground">{children}</span>; }
