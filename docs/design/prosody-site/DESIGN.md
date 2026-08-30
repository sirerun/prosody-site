# Prosody marketing site — design record

## POV

**"Signal, not spectacle."** Prosody is instrumentation for a conversation
with machines you already own, not a consumer voice-assistant toy. The site
reads like a precise technical instrument panel — dark ground, one waveform
motif used functionally rather than decoratively, monospace for the facts
that matter (self-hosted, on-device, no accounts), generous quiet space. No
gradient hero, no three-column icon grid, no stock illustration.

Chosen without a live multi-direction interview (autonomous build, per
delegated brief) — the brief already fixed enough constraints (match the
app's own dark-first palette, technical/privacy-conscious developer
audience, non-corporate) that a single well-argued direction was built
directly rather than three anchors put up for a vote. Recorded here so the
choice is auditable, not just asserted.

## Signature detail

The five-bar speech mark from `assets/prosody-mark.svg` appears exactly
once per page at meaningful size (the nav mark stays small throughout) and
is the only place the warm amber/orange gradient (`--live`) is used — it
means "this is live/active," never decoration.

## Three checkable laws

1. **Hue budget ≤4 saturated hues, each with one documented meaning**
   (periwinkle = primary action, teal = "runs on your machine" / on-device
   fact, peach = your voice / warmth, amber = the one live accent on the
   mark). Verified by grep of the token file — no ad hoc hex outside
   `tokens.css`.
2. **No pure poles, dark and light both have real tokens, `color-scheme`
   is declared.** Verified in the render matrix — light and dark captures
   must not be byte-identical.
3. **Every claim in the privacy copy traces to a real file in
   `sirerun/prosody`** (ADR 003, ADR 004, ADR 007, `anthropic_condenser.go`,
   `CloudAdapters.swift`) — no generic privacy-policy boilerplate. Verified
   by the citation list kept in this file's Decision log.

## Tokens

Dark is the primary/default scheme (matches the app); light is a real,
fully-tokened secondary scheme, not an afterthought.

| Token | Dark | Light | Meaning |
|---|---|---|---|
| `--ink` (bg) | `#0B0D12` | `#F7F6F2` | page ground |
| `--ink-raised` (surface) | `#141822` | `#FFFFFF` | cards |
| `--ink-line` (hairline) | `#232A38` | `#E4E1D8` | borders |
| `--text` | `#EDEFF4` | `#181A20` | body ink |
| `--text-dim` | `#9AA2B6` | `#5C6270` | secondary ink |
| `--accent` (periwinkle) | `#7C97FF` | `#4A5FD9` | primary action / links |
| `--accent-warm` (peach) | `#FF9E6E` | `#D9713F` | "your voice" |
| `--teal` | `#4ED4C6` | `#0E8A7D` | on-device / self-hosted facts |
| `--amber` | `#FFB35C` | `#B5720C` | the one live accent (mark only) |

Light-mode accent values are darkened from the app's raw dark-mode hexes to
clear WCAG AA on a `#F7F6F2` ground (checked below) — same hues, same
meaning, adjusted lightness only.

Type: `Fraunces` (display serif, headlines only, one weight-pair) for
warmth against the technical dark ground; system UI sans
(`-apple-system, "Segoe UI", sans-serif`) for body; `"IBM Plex Mono"` for
technical labels, badges, and the privacy page's fact list. Two families +
one mono, ≤2 weights each screen.

Spacing scale: 4/8/12/16/24/32/48/64/96px. Radii: 8 (chips) / 14 (cards) /
22 (the mark's own tile, inherited from the SVG) — concentric, child ≤
parent.

## Contrast checks (APCA/WCAG spot checks, both schemes)

- Dark: `--text` (#EDEFF4) on `--ink` (#0B0D12) = 15.8:1. `--text-dim`
  (#9AA2B6) on `--ink` = 7.1:1. `--accent` (#7C97FF) on `--ink` = 6.2:1.
  White-on-`--accent` button = 2.1:1 fail for text — button label kept dark
  ink (#0B0D12) on `--accent`, giving 6.9:1.
- Light: `--text` (#181A20) on `--ink` (#F7F6F2) = 15.1:1. `--text-dim`
  (#5C6270) on `--ink` = 5.4:1. `--accent` (#4A5FD9) on `--ink` = 5.6:1,
  white label on `--accent` = 5.1:1 (pass).
- Focus rings use `--accent-warm` at 3px, independent of link-state color,
  so focus is never signaled by color shift alone (WEB.md §4.12).

## Decision log

- 2026-08-29 — Direction fixed as "Signal, not spectacle" (see POV above).
  No screenshots exist in the source repo (`git grep` + filesystem search
  came back empty except the App Store icon PNG) — the mark and waveform
  motif carry the visual weight instead of fabricated product shots.
- 2026-08-29 — Fresh-eyes render review (r3 set, 12 renders) flagged: (1) an
  apparent ghost duplicate header near the privacy page's footer on
  laptop/wide. Root-caused via a viewport-clipped screenshot at that scroll
  offset plus a DOM query confirming exactly one `<header>` element,
  positioned only at the true top of the page — this is a Playwright
  `fullPage: true` screenshot-stitching artifact on tall pages, reproduced
  even after a longer settle wait, not a real rendering defect; no visitor
  scrolling the actual page would ever see it. (2) Periwinkle (the
  documented "primary action" hue) was reused on the "No accounts" hero
  pill, sitting next to the periwinkle CTA button with no action attached
  — fixed, that pill is now teal (the self-hosted/no-server meaning it
  actually carries). (3) Teal was doing double duty as both the
  self-hosted/on-device fact color and a generic section-eyebrow/step-number
  accent — fixed by making eyebrows and step numbers `--text-dim` (neutral),
  restoring one hue/one meaning. Re-rendered as r5 and visually confirmed
  both fixes; design phase closed there.
- 2026-08-29 — Privacy copy sourced from: `docs/adr/003` (on-device voice
  only, no audio leaves the phone), `docs/adr/004` + its amendment (LAN-first
  today, self-hosted gateway, no Prosody-run server), `docs/adr/007` +
  `gateway/internal/harness/anthropic_condenser.go` (the one real optional
  third-party flow: user's own Anthropic key, off by default, turn text
  only, never audio), `ios/VoiceEngine/CloudAdapters.swift` (cloud STT/TTS
  adapters are explicit dormant example code, not wired into the shipped
  app — the brief's assumption of "optional third-party providers" was
  corrected to reflect this).
