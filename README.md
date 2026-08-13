# AI Productivity Hub

Build a modern, responsive web app called "AI Workplace Productivity Assistant" — a SaaS-style dashboard that helps professionals automate workplace tasks using AI. No backend or database needed (no user data is stored); all AI outputs are generated live and editable in-session only.

Layout:

Sidebar navigation (collapsible on mobile) with 3 sections: Email Generator, Meeting Summarizer, AI Chat Assistant

Clean dashboard-style main content area

Fully responsive (desktop, tablet, mobile)

Feature 1 — Smart Email Generator:

Input fields: recipient/context, key points, tone selector (Formal, Friendly, Persuasive)

Structured prompt sent to AI generates a complete professional email

Output shown in an editable text box with a "Copy" button

Feature 2 — Meeting Notes Summarizer:

Large textarea for pasting raw meeting notes

AI returns a structured summary broken into 3 clear sections: Action Items, Decisions Made, Deadlines

Output editable, with a "Copy" button

Feature 3 — AI Chatbot Interface:

Simple chat UI (message bubbles, input box, send button)

Chat history persists only for the current session (no storage)

Design:

Modern, clean, professional SaaS aesthetic

Unique but tasteful color palette (not default blue/white — something distinctive, used sparingly for accents)

Consistent spacing, rounded cards, subtle shadows, good typography hierarchy

Other requirements:

Small "Responsible AI" disclaimer footer/note (e.g., "AI-generated content may require review before use")

No login, no database, no backend — frontend only, AI calls handled client-side per session

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5dc2b054-398d-4f31-9039-c4260a33449e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
