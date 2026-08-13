import { useEffect, useState } from "react";

export type ActivityKind = "email" | "summary" | "chat";

export type ActivityItem = {
  id: string;
  kind: ActivityKind;
  title: string;
  at: number;
};

let items: ActivityItem[] = [];
const listeners = new Set<(items: ActivityItem[]) => void>();

export function logActivity(kind: ActivityKind, title: string) {
  items = [
    { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, kind, title, at: Date.now() },
    ...items,
  ].slice(0, 8);
  listeners.forEach((listener) => listener(items));
}

export function useActivity() {
  const [current, setCurrent] = useState<ActivityItem[]>(items);
  useEffect(() => {
    listeners.add(setCurrent);
    setCurrent(items);
    return () => {
      listeners.delete(setCurrent);
    };
  }, []);
  return current;
}

export function formatTime(at: number) {
  return new Date(at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
