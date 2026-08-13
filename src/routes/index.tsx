import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Mail,
  ListChecks,
  MessagesSquare,
  Menu,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Overview } from "@/components/dashboard/Overview";
import { EmailGenerator } from "@/components/dashboard/EmailGenerator";
import { MeetingSummarizer } from "@/components/dashboard/MeetingSummarizer";
import { ChatAssistant } from "@/components/dashboard/ChatAssistant";
import assistantMark from "@/assets/assistant-mark.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Draft emails, summarize meeting notes and chat with an AI assistant — a private, session-only workplace productivity dashboard.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Generate professional emails, turn raw meeting notes into action items, and chat with an AI work assistant.",
      },
    ],
  }),
  component: Dashboard,
});

type ToolId = "email" | "summary" | "chat";

const TOOLS = [
  {
    id: "email" as ToolId,
    label: "Email Generator",
    icon: Mail,
    title: "Smart Email Generator",
    blurb: "Turn a few bullet points into a polished, ready-to-send email.",
  },
  {
    id: "summary" as ToolId,
    label: "Meeting Summarizer",
    icon: ListChecks,
    title: "Meeting Notes Summarizer",
    blurb: "Convert messy notes into action items, decisions and deadlines.",
  },
  {
    id: "chat" as ToolId,
    label: "AI Chat Assistant",
    icon: MessagesSquare,
    title: "AI Chat Assistant",
    blurb: "A working session with an assistant that knows workplace context.",
  },
];

function Dashboard() {
  const [active, setActive] = useState<ToolId>("email");
  const [mobileOpen, setMobileOpen] = useState(false);
  const current = TOOLS.find((tool) => tool.id === active)!;

  const nav = (
    <nav className="space-y-1.5">
      {TOOLS.map((tool) => {
        const Icon = tool.icon;
        const isActive = tool.id === active;
        return (
          <button
            key={tool.id}
            onClick={() => {
              setActive(tool.id);
              setMobileOpen(false);
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {tool.label}
          </button>
        );
      })}
    </nav>
  );

  const brand = (
    <div className="flex items-center gap-3">
      <img
        src={assistantMark}
        alt="AI Workplace Productivity Assistant logo"
        width={512}
        height={512}
        className="size-9 rounded-lg"
      />
      <div className="leading-tight">
        <p className="font-display text-sm font-semibold">Workplace AI</p>
        <p className="text-xs text-muted-foreground">Productivity Assistant</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-[1500px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-surface px-4 py-6 lg:flex">
          {brand}
          <div className="mt-8 flex-1">
            <p className="px-3 pb-3 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
              Workspace
            </p>
            {nav}
          </div>
          <div className="rounded-xl border border-border bg-card p-3">
            <p className="flex items-center gap-2 text-xs font-semibold">
              <span className="size-2 rounded-full bg-brand" />
              Session only
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Nothing is saved. Closing the tab clears everything.
            </p>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-border bg-background/85 px-4 py-4 backdrop-blur sm:px-8">
            <div className="flex items-center gap-3">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="size-4" />
                    <span className="sr-only">Open navigation</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 bg-surface p-6">
                  {brand}
                  <div className="mt-8">{nav}</div>
                </SheetContent>
              </Sheet>
              <div className="lg:hidden">{brand}</div>
              <div className="hidden min-w-0 lg:block">
                <h1 className="truncate text-xl font-semibold">{current.title}</h1>
                <p className="truncate text-sm text-muted-foreground">{current.blurb}</p>
              </div>
              <span className="ml-auto hidden rounded-full bg-brand/15 px-3 py-1 text-xs font-medium text-brand-foreground sm:inline">
                Powered by Lovable AI
              </span>
            </div>
          </header>

          <div className="flex-1 px-4 py-6 sm:px-8 sm:py-8">
            <div className="mb-6 lg:hidden">
              <h1 className="text-lg font-semibold">{current.title}</h1>
              <p className="text-sm text-muted-foreground">{current.blurb}</p>
            </div>

            {active === "email" ? <EmailGenerator /> : null}
            {active === "summary" ? <MeetingSummarizer /> : null}
            {active === "chat" ? <ChatAssistant /> : null}
          </div>

          <footer className="border-t border-border px-4 py-5 sm:px-8">
            <p className="flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldAlert className="mt-0.5 size-3.5 shrink-0 text-brand" />
              <span>
                <strong className="font-semibold text-foreground">Responsible AI:</strong>{" "}
                AI-generated content may require review before use. Verify facts, names and dates,
                and avoid pasting confidential information.
              </span>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
