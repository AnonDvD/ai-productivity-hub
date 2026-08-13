import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type OutputPanelProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
};

export function OutputPanel({ label, value, onChange, placeholder, rows = 16 }: OutputPanelProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy — select the text and copy manually");
    }
  };

  return (
    <div className="card-elevated p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">{label}</h3>
        <Button variant="outline" size="sm" onClick={copy} disabled={!value.trim()}>
          {copied ? <Check className="mr-1.5 size-4" /> : <Copy className="mr-1.5 size-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="mt-4 resize-y bg-surface font-sans text-sm leading-relaxed"
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Fully editable — tweak the wording before you send it anywhere.
      </p>
    </div>
  );
}
