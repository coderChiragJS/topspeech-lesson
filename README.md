# TopSpeech Health — Daily Lesson Experience

**Live demo:** *(add Vercel URL after deployment)*
**Assignment:** TopSpeech Health Engineer Take-Home

---

## What this is

A PWA prototype of a single daily lesson session for rhotacism speech therapy — fixing the "R" sound. Built in React + Vite with Framer Motion animations and full PWA support.

The experience covers: lesson start → 6 exercise cards → lesson complete with XP + confidence journey.

---

## Running locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build
```

---

## Design choices

### What I kept from Duolingo
- **Segmented progress bar** — individual segments filling is more satisfying than a continuous fill; it also conveys "almost done" clearly
- **Immediate per-card feedback loop** — the snap of knowing right away keeps momentum and corrects errors before they become habits
- **Lesson-complete celebration** — the accomplishment moment matters; people need to feel it before they can be asked to return tomorrow
- **Short daily format** — 6 cards is enough to feel meaningful but low enough that it never feels like a burden

### What I changed for speech therapy
1. **No lives or hearts.** Duolingo punishes mistakes. A speech therapy user is working on something personally vulnerable — their voice. Punishment is clinically counterproductive and emotionally harmful here. Replaced with a soft "Try again" path that never shames.
2. **De-emphasized XP as the metric.** In Duolingo, XP *is* the point. Here, XP is a signal, not the goal. Progress with their voice is what matters; the completion screen leads with an emotional note, not a number.
3. **Added a Mirror Cue card type.** Duolingo teaches language abstractly. Speech therapy requires knowing *where* in the mouth to place the tongue. The animated SVG diagram is unique to this context and has no analogue in Duolingo.
4. **Warmer copy throughout.** "Great effort — that one's tricky!" instead of "Correct! +10 XP". The product voice is warm and clinical, not game-y.
5. **Amber for retry, not red.** Red reads as failure. Amber reads as "keep going." Small color choice, meaningful emotional difference.

---

## Task 03 — Innovation: Confidence Self-Check

After each Listen & Repeat exercise, instead of binary correct/incorrect (which can't be auto-detected without real audio), the user rates how the attempt felt on a 3-level scale:

- 😟 Needed work
- 🙂 Getting there
- 🎯 Nailed it!

**Why this works uniquely for speech therapy:**

Self-monitoring is a genuine clinical technique — metacognitive awareness of one's own articulation quality is a core goal of most speech therapy programs, not just a workaround for missing audio. The Confidence Self-Check trains this skill directly. On the lesson-complete screen, a "Confidence Journey" chart visualizes the user's self-assessed progress across all voice exercises, turning subjective effort into a satisfying, clinic-adjacent data moment. This respects user agency and removes the shame of external judgment on something as personal as one's own voice.

---

## Stack

- React + Vite
- Tailwind CSS (`@tailwindcss/vite`)
- Framer Motion (card transitions, micro-animations)
- `vite-plugin-pwa` (service worker + manifest)

---

## Exercise types

| Type | Cards | Description |
|------|-------|-------------|
| `mirror_cue` | 1 | Animated SVG mouth diagram + tongue position instruction |
| `listen_repeat` | 3 | Word + phonetic display, R-sound highlighted, confidence self-check |
| `word_select` | 2 | Multiple choice with correct/retry feedback |
