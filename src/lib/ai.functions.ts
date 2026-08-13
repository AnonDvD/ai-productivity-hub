import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";

const EmailInput = z.object({
  context: z.string().min(1),
  keyPoints: z.string().min(1),
  tone: z.enum(["Formal", "Friendly", "Persuasive"]),
});

const NotesInput = z.object({
  notes: z.string().min(1),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EmailInput.parse(input))
  .handler(async ({ data }) => {
    const { getGateway, AI_MODEL } = await import("./ai-gateway.server");
    const gateway = getGateway();

    const result = streamText({
      model: gateway(AI_MODEL),
      system:
        "You are an expert business communication writer. Write complete, ready-to-send professional emails. Return only the email itself: a 'Subject:' line, then the body with greeting, paragraphs and sign-off. No commentary, no markdown fences.",
      prompt: `Recipient and context:\n${data.context}\n\nKey points to cover:\n${data.keyPoints}\n\nTone: ${data.tone}\n\nWrite the email now.`,
    });

    return { text: await result.text };
  });

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => NotesInput.parse(input))
  .handler(async ({ data }) => {
    const { getGateway, AI_MODEL } = await import("./ai-gateway.server");
    const gateway = getGateway();

    const result = streamText({
      model: gateway(AI_MODEL),
      system:
        "You summarize raw meeting notes into a clear structured brief. Always output exactly three sections with these headings, in this order: 'Action Items', 'Decisions Made', 'Deadlines'. Use '## ' before each heading and '- ' bullets underneath. If a section has nothing, write '- None identified'. Include owners for action items when mentioned. No extra sections or commentary.",
      prompt: `Raw meeting notes:\n\n${data.notes}`,
    });

    return { text: await result.text };
  });
