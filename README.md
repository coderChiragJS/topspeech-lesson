# TopSpeech Health — Daily Lesson Experience

**Live demo:** https://topspeech-lesson.vercel.app
**GitHub:** https://github.com/coderChiragJS/topspeech-lesson

---

## What I built

A fully functional PWA prototype of a single daily lesson session for rhotacism speech therapy (fixing the "R" sound). The experience runs start → 6 exercise cards → lesson complete, entirely in the browser with no backend.

Stack: React + Vite · Tailwind CSS · Framer Motion · vite-plugin-pwa

---

## Run locally

```bash
npm install
npm run dev      # localhost:5173
npm run build    # production build
```

---

## Task 01 — Duolingo audit: what I kept and what I changed

### Kept
- **Segmented progress bar** — segment-by-segment fill is more motivating than a smooth continuous bar; it communicates "almost there" clearly
- **Immediate per-card feedback** — knowing right after each attempt prevents bad habits forming and keeps momentum
- **Short daily format** — 6 cards takes ~4 minutes; long enough to feel meaningful, short enough to never feel like a burden
- **Lesson-complete celebration** — the accomplishment moment is what makes a user want to return tomorrow

### Changed — specifically for speech therapy
1. **No lives or hearts.** Duolingo punishes mistakes. A speech therapy user is working on something personally vulnerable — their voice. Punishment is clinically counterproductive. Replaced with a soft amber "Try again" that never shames.
2. **XP is a bonus, not the point.** In Duolingo, XP *is* the metric. Here, progress with the voice is the goal. The complete screen leads with an emotional note, not a number.
3. **Mirror Cue card type.** Duolingo teaches abstractly. Speech therapy requires knowing *where* in the mouth the tongue goes. The animated SVG mouth diagram has no analogue in Duolingo.
4. **Warmer copy.** "Great effort — that one's tricky!" not "Correct! +10 XP". The product voice is clinical warmth, not game-show energy.
5. **Amber for retry, not red.** Red reads as failure. Amber reads as "keep going." Small choice, meaningful emotional difference for a user who is already self-conscious.

---

## Task 02 — Prototype

**6 exercise cards across 3 types:**

| Type | Count | Description |
|------|-------|-------------|
| Mirror Cue | 1 | Animated SVG mouth/tongue position diagram with curl-direction arrow |
| Listen & Repeat | 3 | Word + IPA phonetic, R highlighted, confidence self-check (Task 03) |
| Word Select | 2 | Multiple choice — correct gets green tick, wrong gets amber shake + retry |

**Interaction mechanics:**
- Segmented progress bar with smooth fill animation
- Cards slide in from right / out to left (Framer Motion AnimatePresence)
- Correct: green FeedbackBar slides up from bottom
- Incorrect: amber FeedbackBar with "Try again" (resets card) + "Continue" option
- Lesson complete: confetti, XP count-up animation, streak counter, Confidence Journey chart
- Fully responsive — designed mobile-first at 390px, centered on desktop

**PWA:** manifest + service worker via vite-plugin-pwa. Installable from Chrome/Safari on mobile.

---

## Task 03 — Innovation: Confidence Self-Check

After each Listen & Repeat exercise, instead of binary correct/incorrect, the user rates how the attempt felt on a 3-level scale: 😟 Needed work · 🙂 Getting there · 🎯 Nailed it!

Self-monitoring is a genuine clinical technique — metacognitive awareness of one's own articulation quality is a core goal of most speech therapy programs, not just a workaround for missing audio. The Confidence Self-Check trains this skill directly. On the lesson-complete screen, a "Confidence Journey" chart visualizes the user's self-assessed progress across all voice exercises, turning subjective effort into a satisfying, clinic-adjacent data moment. This respects user agency and removes the shame of external judgment on something as personal as one's own voice.
