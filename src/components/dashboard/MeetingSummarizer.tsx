import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ListChecks, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { summarizeNotes } from "@/lib/ai.functions";
import { logActivity } from "@/lib/activity";
import { OutputPanel } from "./OutputPanel";

export function MeetingSummarizer() {
  const run = useServerFn(summarizeNotes);
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!notes.trim()) {
      toast.error("Paste your raw meeting notes first.");
      return;
    }
    setLoading(true);
    try {
      const result = await run({ data: { notes } });
      setOutput(result.text);
      logActivity("summary", `Meeting notes summarized (${notes.trim().split(/\s+/).length} words)`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(
        /429/.test(message)
          ? "Too many requests right now — try again in a moment."
          : /402/.test(message)
            ? "AI credits are exhausted for this workspace."
            : "Couldn't summarize the notes. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card-elevated p-5 sm:p-6">
        <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">Raw notes</h3>
        <div className="mt-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notes">Paste anything — bullets, transcript, scribbles</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={18}
              placeholder="Sam: we're going with vendor B. Priya to send the contract by Wed. Launch pushed to Nov 14…"
              className="resize-y bg-surface leading-relaxed"
            />
          </div>
          <Button onClick={submit} disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <ListChecks className="mr-2 size-4" />
            )}
            {loading ? "Structuring your summary…" : "Summarize notes"}
          </Button>
          <div className="flex flex-wrap gap-2 pt-1">
            {["Action Items", "Decisions Made", "Deadlines"].map((section) => (
              <span
                key={section}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {section}
              </span>
            ))}
          </div>
        </div>
      </div>

      <OutputPanel
        label="Structured summary"
        value={output}
        onChange={setOutput}
        rows={24}
        placeholder="Action Items, Decisions Made and Deadlines will appear here."
      />
    </div>
  );
}
