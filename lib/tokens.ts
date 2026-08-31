/**
 * NOEVIS AI — Design System Foundation Tokens
 * V1 Phase 0 Locked Visual System
 * 
 * Strict specifications for all future Noevis screens.
 */

export const tokens = {
  brand: {
    name: "NOEVIS AI",
    tagline: "Intelligent Learning System",
  },
  colors: {
    // Canvas & Surfaces
    background: "#F7F8FA",
    surface: "#FFFFFF",
    surfaceHover: "#F9FAFB",
    surfaceSubtle: "#F3F4F6",

    // Typography
    textPrimary: "#111827",
    textSecondary: "#667085",
    textTertiary: "#9CA3AF",
    textInverse: "#FFFFFF",

    // Structural Borders & Dividers
    border: "#E5E7EB",
    borderFocus: "#4B5BEA",
    borderSubtle: "#F0F2F5",

    // Primary Brand Accent (Restrained, precise indigo)
    indigo: "#4B5BEA",
    indigoHover: "#3E4DD4",
    indigoPressed: "#323FB8",
    indigoSoft: "#EEF0FF",
    indigoSoftHover: "#E4E7FF",
    indigoSubtleBorder: "#DCE1FD",

    // Feedback & System Status
    success: "#16A34A",
    successSoft: "#ECFDF5",
    successBorder: "#BBF7D0",

    warning: "#D97706",
    warningSoft: "#FFFBEB",
    warningBorder: "#FDE68A",

    error: "#DC2626",
    errorSoft: "#FEF2F2",
    errorBorder: "#FECACA",
  },

  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", system-ui, sans-serif',
    scale: {
      display: {
        desktop: "44px",
        mobile: "34px",
        lineHeight: "1.15",
        fontWeight: "600",
        letterSpacing: "-0.025em",
      },
      pageTitle: {
        desktop: "32px",
        mobile: "28px",
        lineHeight: "1.25",
        fontWeight: "600",
        letterSpacing: "-0.02em",
      },
      sectionTitle: {
        size: "22px",
        lineHeight: "1.35",
        fontWeight: "600",
        letterSpacing: "-0.015em",
      },
      body: {
        size: "16px",
        lineHeight: "1.6",
        fontWeight: "400",
        letterSpacing: "-0.011em",
      },
      bodySecondary: {
        size: "14px",
        lineHeight: "1.5",
        fontWeight: "400",
        letterSpacing: "-0.006em",
      },
      labelSmall: {
        size: "12px",
        lineHeight: "1.4",
        fontWeight: "500",
        letterSpacing: "0.01em",
      },
    },
  },

  spacing: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
    16: "64px",
  },

  radius: {
    card: "16px",
    button: "12px",
    input: "12px",
    sheet: "20px",
    modal: "20px",
    badge: "8px",
    full: "9999px",
  },

  shadows: {
    none: "none",
    card: "0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px -1px rgba(0, 0, 0, 0.03)",
    cardHover: "0 4px 12px 0 rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    dropdown: "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
    modal: "0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.04)",
    focusRing: "0 0 0 3px rgba(75, 91, 234, 0.25)",
  },

  motion: {
    durationFast: "120ms",
    durationDefault: "180ms",
    durationSlow: "240ms",
    ease: "cubic-bezier(0.16, 1, 0.3, 1)", // iOS-like snappy spring deceleration
  },

  breakpoints: {
    mobile: "320px to 767px",
    tablet: "768px to 1199px",
    desktop: "1200px+",
  },
} as const;
