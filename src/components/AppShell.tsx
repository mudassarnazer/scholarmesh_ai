import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Bookmark, MessageSquareText, Network, PanelLeft, Plus, Settings } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

const nav = [
  { to: "/", label: "Research Chat", icon: MessageSquareText },
  { to: "/graph", label: "Knowledge Graph", icon: Network },
  { to: "/library", label: "Research Library", icon: BookOpen },
  { to: "/saved", label: "Saved Discoveries", icon: Bookmark },
] as const;

const titles: Record<string, string> = {
  "/": "Research Chat",
  "/graph": "Knowledge Graph",
  "/library": "Research Library",
  "/saved": "Saved Discoveries",
  "/settings": "Settings",
};

export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span className={`bg-brand grid place-items-center rounded-lg ${className}`}>
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 7l6 10M18 7l-6 10M6 7h12" />
        <circle cx="6" cy="7" r="2.2" fill="currentColor" />
        <circle cx="18" cy="7" r="2.2" fill="currentColor" />
        <circle cx="12" cy="17" r="2.2" fill="currentColor" />
      </svg>
    </span>
  );
}

function NavItem({ to, label, icon: Icon, collapsed, active }: { to: string; label: string; icon: typeof Settings; collapsed: boolean; active: boolean }) {
  return (
    <Link
      to={to}
      title={label}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        active ? "bg-tint font-semibold text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      } ${collapsed ? "justify-center" : ""}`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <aside
        className={`flex shrink-0 flex-row items-center gap-1 border-b bg-card p-2 md:sticky md:top-0 md:h-screen md:flex-col md:items-stretch md:border-b-0 md:border-r md:p-4 ${
          collapsed ? "md:w-20" : "md:w-64"
        } transition-[width]`}
      >
        <div className={`hidden items-center gap-2.5 px-1 pb-6 md:flex ${collapsed ? "justify-center" : ""}`}>
          <Logo />
          {!collapsed && <span className="font-serif text-lg font-semibold tracking-tight">ScholarMesh <span className="text-primary">AI</span></span>}
        </div>
        <button
          onClick={() => toast("New research session started", { description: "Demo only — sessions will persist in a later phase." })}
          title="New Research"
          className={`hidden items-center gap-2 rounded-lg bg-brand px-3 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:mb-5 md:flex ${collapsed ? "justify-center" : ""}`}
        >
          <Plus className="h-4 w-4" />
          {!collapsed && "New Research"}
        </button>
        <nav className="flex flex-1 flex-row gap-1 overflow-x-auto md:flex-col">
          {nav.map((n) => (
            <NavItem key={n.to} {...n} collapsed={collapsed} active={path === n.to} />
          ))}
        </nav>
        <div className="flex gap-1 md:flex-col">
          <NavItem to="/settings" label="Settings" icon={Settings} collapsed={collapsed} active={path === "/settings"} />
          <button
            onClick={() => setCollapsed((c) => !c)}
            className={`hidden items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground md:flex ${collapsed ? "justify-center" : ""}`}
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="h-4 w-4" />
            {!collapsed && "Collapse"}
          </button>
        </div>
      </aside>

      <div className="bg-workspace flex min-h-screen flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b bg-background/70 px-5 backdrop-blur md:px-8">
          <h1 className="text-sm font-semibold tracking-wide">{titles[path] ?? "ScholarMesh AI"}</h1>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground" aria-label="Profile">
            R
          </div>
        </header>
        <main className="flex-1 px-5 py-8 md:px-8 md:py-12">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ title, description, demo }: { title: string; description: string; demo?: boolean }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <h2 className="font-serif text-3xl font-medium tracking-tight">{title}</h2>
        {demo && <DemoBadge />}
      </div>
      <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
    </div>
  );
}

export function DemoBadge() {
  return <span className="rounded-full border border-sage/50 bg-sage-soft px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">Demo data</span>;
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">{children}</span>;
}
