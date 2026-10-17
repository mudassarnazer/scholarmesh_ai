import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo, PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — ScholarMesh AI" },
      { name: "description", content: "Appearance and research preferences for ScholarMesh AI." },
      { property: "og:title", content: "Settings — ScholarMesh AI" },
      { property: "og:description", content: "Tune your research workspace." },
    ],
  }),
  component: SettingsPage,
});

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border bg-card p-6">
      <h3 className="font-serif text-lg">{title}</h3>
      <div className="mt-4 space-y-3 text-sm">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-t pt-3 first:border-t-0 first:pt-0">
      <span>{label}</span>
      <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{value}</span>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <PageHeader title="Settings" description="Preferences will become configurable in a later phase." />
      <Card title="Appearance">
        <Row label="Theme" value="Scholarly light" />
        <Row label="Reading density" value="Comfortable" />
      </Card>
      <Card title="Research preferences">
        <Row label="Citation style" value="APA 7th" />
        <Row label="Preferred sources" value="Peer-reviewed" />
      </Card>
      <Card title="About ScholarMesh AI">
        <div className="flex items-start gap-3">
          <Logo />
          <p className="text-muted-foreground">
            An AI-powered research and knowledge discovery agent that helps you explore papers, organize knowledge, and uncover relationships across literature. Initial interface preview.
          </p>
        </div>
      </Card>
    </div>
  );
}
