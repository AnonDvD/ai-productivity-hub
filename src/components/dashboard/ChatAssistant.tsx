import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import assistantMark from "@/assets/assistant-mark.png";

export function ChatAssistant() {
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport,
    onError: () => toast.error("The assistant couldn't respond. Please try again."),
  });

  const isBusy = status === "submitted" || status === "streaming";

  const handleSubmit = () => {
    if (!input.trim() || isBusy) return;
    void sendMessage({ text: input.trim() });
    setInput("");
  };

  return (
    <div className="card-elevated flex h-[calc(100vh-16rem)] min-h-[26rem] flex-col overflow-hidden">
      <Conversation className="flex-1">
        <ConversationContent className="gap-5">
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={
                <img
                  src={assistantMark}
                  alt="Workplace assistant mark"
                  className="size-14 rounded-xl"
                />
              }
              title="Ask your workplace assistant"
              description="Draft a reply, plan a project, prep for a 1:1 — this chat lives only in this session."
            />
          ) : (
            messages.map((message) => {
              const text = message.parts
                .map((part) => (part.type === "text" ? part.text : ""))
                .join("");
              return (
                <Message key={message.id} from={message.role}>
                  <MessageContent
                    className={
                      message.role === "assistant" ? "bg-transparent p-0 text-foreground" : undefined
                    }
                  >
                    {message.role === "assistant" ? (
                      <MessageResponse>{text}</MessageResponse>
                    ) : (
                      <span className="whitespace-pre-wrap">{text}</span>
                    )}
                  </MessageContent>
                </Message>
              );
            })
          )}
          {status === "submitted" ? <Shimmer>Thinking…</Shimmer> : null}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border bg-surface p-4">
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask anything about your work…"
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} disabled={!input.trim() || isBusy} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
