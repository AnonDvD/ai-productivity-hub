import { ArrowRight, ListChecks, Mail, MessagesSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatTime, useActivity, type ActivityKind } from "@/lib/activity";
import assistantMark from "@/assets/assistant-mark.png";

type ToolId = "email" | "summary" | "chat";

const QUICK_LINKS: {
  id: ToolId;
  label: string;
  description: string;
  icon: typeof Mail;
}[] = [
  {
    id: "email",
    label: "Email Generator",
    description: "Bullets in, polished email out.",
    icon: Mail,
  },
  {
    id: "summary",
    label: "Meeting Summarizer",
    description: "Action items, decisions, deadlines.",
    icon: ListChecks,
  },
  {
    id: "chat",
    label: "AI Chat Assistant",
    description: "Think out loud with your assistant.",
    icon: MessagesSquare,
  },
];

const KIND_ICON: Record<ActivityKind, typeof Mail> = {
  email: Mail,
  summary: ListChecks,
  chat: MessagesSquare,
};

export function Overview({ onNavigate }: { onNavigate: (id: ToolId) => void }) {
  const activity = useActivity();

  return (
    <div className="space-y-6">
      <section className="hero-gradient relative overflow-hidden rounded-3xl p-6 sm:p-10">
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <img
              src={assistantMark}
              alt="AI Workplace Productivity Assistant logo"
              width={512}
              height={512}
              className="size-14 rounded-2xl bg-card/80 p-1.5 shadow-sm"
            />
            <div>
              <p className="text-xs font-semibold tracking-widest text-primary-foreground/80 uppercase">
                Workplace AI
              </p>
              <h2 className="font-display text-2xl font-semibold text-primary-foreground sm:text-3xl">
                Your productivity dashboard
              </h2>
              <p className="mt-2 max-w-md text-sm text-primary-foreground/85">
                Three AI tools for the everyday work you'd rather not do by hand. Nothing is stored —
                this session clears when you close the tab.
              </p>
            </div>
          </div>
          <Button
            onClick={() => onNavigate("email")}
            className="shrink-0 bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <Sparkles className="mr-2 size-4" />
            Start with an email
          </Button>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
          Quick links
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="card-elevated group p-5 text-left transition-shadow hover:shadow-lg"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <p className="mt-4 flex items-center gap-1.5 font-semibold">
                  {link.label}
                  <ArrowRight className="size-4 text-brand transition-transform group-hover:translate-x-1" />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="card-elevated p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
            Recent activity
          </h3>
          <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-medium text-brand-foreground">
            This session
          </span>
        </div>
        {activity.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Nothing yet — generate an email, summarize notes or start a chat and it will show up
            here.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {activity.map((item) => {
              const Icon = KIND_ICON[item.kind];
              return (
                <li key={item.id} className="flex items-center gap-3 py-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    <Icon className="size-4" />
                  </span>
                  <p className="min-w-0 flex-1 truncate text-sm">{item.title}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatTime(item.at)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
