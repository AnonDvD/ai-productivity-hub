import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateEmail } from "@/lib/ai.functions";
import { OutputPanel } from "./OutputPanel";

type Tone = "Formal" | "Friendly" | "Persuasive";

export function EmailGenerator() {
  const run = useServerFn(generateEmail);
  const [context, setContext] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!context.trim() || !keyPoints.trim()) {
      toast.error("Add the recipient context and at least one key point.");
      return;
    }
    setLoading(true);
    try {
      const result = await run({ data: { context, keyPoints, tone } });
      setOutput(result.text);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(
        /429/.test(message)
          ? "Too many requests right now — try again in a moment."
          : /402/.test(message)
            ? "AI credits are exhausted for this workspace."
            : "Couldn't generate the email. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card-elevated p-5 sm:p-6">
        <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
          Email brief
        </h3>
        <div className="mt-5 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="context">Recipient &amp; context</Label>
            <Input
              id="context"
              value={context}
              onChange={(event) => setContext(event.target.value)}
              placeholder="e.g. Priya, client-side project lead — following up after Tuesday's kickoff"
              className="bg-surface"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="points">Key points</Label>
            <Textarea
              id="points"
              value={keyPoints}
              onChange={(event) => setKeyPoints(event.target.value)}
              rows={7}
              placeholder={"- Confirm scope for phase 2\n- Ask for updated brand assets by Friday\n- Propose a 30-min sync next week"}
              className="resize-y bg-surface"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={(value) => setTone(value as Tone)}>
              <SelectTrigger id="tone" className="bg-surface">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Formal">Formal</SelectItem>
                <SelectItem value="Friendly">Friendly</SelectItem>
                <SelectItem value="Persuasive">Persuasive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={submit} disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 size-4" />
            )}
            {loading ? "Writing your email…" : "Generate email"}
          </Button>
        </div>
      </div>

      <OutputPanel
        label="Generated email"
        value={output}
        onChange={setOutput}
        rows={20}
        placeholder="Your drafted email will appear here, ready to edit and copy."
      />
    </div>
  );
}
