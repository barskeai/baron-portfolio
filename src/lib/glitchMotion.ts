export const GLITCH_DURATION_MS = 600;
const GLITCH_DURATION_S = GLITCH_DURATION_MS / 1000;

// Per-card stagger for the boot-in sequence (see CARD_BOOT_DURATION_MS)
// when cards first appear — initial load, or returning to the desktop.
export const CARD_POP_STAGGER_MS = 50;
export const CARD_BOOT_DURATION_MS = 420;

// Brief pause after a click before the portal sequencer navigates — no
// card exit animation plays during it, just a beat to register the click.
export const CARD_EXIT_DURATION_MS = 150;

// How long the portal sequencer waits after navigating before it hands
// control back (destination page keeps animating in on its own after this).
export const PAGE_ENTER_SETTLE_MS = 380;

const GLITCH_TIMES = [0, 0.08, 0.16, 0.24, 0.34, 0.5, 0.7, 1];

const GLITCH_JITTER_X = [0, -3, 3, -2, 2, -1, 1, 0];

const GLITCH_TEXT_SHADOW = [
  "0 0 8px rgba(124,255,107,0.6)",
  "-2px 0 rgba(255,45,85,0.75), 2px 0 rgba(56,189,248,0.75)",
  "2px 0 rgba(255,45,85,0.75), -2px 0 rgba(56,189,248,0.75)",
  "-3px 0 rgba(255,45,85,0.7), 3px 0 rgba(56,189,248,0.7)",
  "1px 0 rgba(255,45,85,0.6), -1px 0 rgba(56,189,248,0.6)",
  "-1px 0 rgba(255,45,85,0.5), 1px 0 rgba(56,189,248,0.5)",
  "0 0 6px rgba(124,255,107,0.5)",
  "0 0 8px rgba(124,255,107,0.6)",
];

export const glitchAnimate = {
  x: GLITCH_JITTER_X,
  textShadow: GLITCH_TEXT_SHADOW,
};

export const glitchTransition = {
  duration: GLITCH_DURATION_S,
  times: GLITCH_TIMES,
  ease: "easeInOut" as const,
};
