import { CSSProperties } from "react";

export const colors = {
  primary: "#3B82F6",
  primaryDark: "#2563EB",
  secondary: "#10B981",
  accent: "#F59E0B",
  dark: "#1F2937",
  light: "#F9FAFB",
  white: "#FFFFFF",
  gray: {
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  level: {
    0: "#6B7280",
    1: "#3B82F6",
    2: "#8B5CF6",
    3: "#EF4444",
    4: "#F97316",
    5: "#22C55E",
    6: "#14B8A6",
    7: "#6366F1",
    8: "#84CC16",
    9: "#EC4899",
  },
};

export const baseStyles: Record<string, CSSProperties> = {
  fullScreen: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  centered: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 72,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 36,
    color: colors.gray[300],
    textAlign: "center",
  },
  body: {
    fontSize: 28,
    color: colors.gray[200],
    lineHeight: 1.6,
  },
};
