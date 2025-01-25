import { EasyFontsPluginSettingsKey } from "./settings";

export const VALID_FORMATS = new Set(["ttf", "otf", "woff", "woff2"]);

export const FONT_VARIANTS = ["interface", "text", "monospace"] as const;

interface FontCharacteristics {
  variant: (typeof FONT_VARIANTS)[number];
  weight: "bold" | "normal";
  style: "italic" | "normal";
  description: string;
}

export const FONT_CHARACTERISTICS: Record<
  EasyFontsPluginSettingsKey,
  FontCharacteristics
> = {
  interfaceNormalFont: {
    variant: "interface",
    weight: "normal",
    style: "normal",
    description: "Path to base font for all of Obsidian.",
  },
  interfaceBoldFont: {
    variant: "interface",
    weight: "bold",
    style: "normal",
    description: "Path to base font for all of Obsidian (bold).",
  },
  interfaceItalicFont: {
    variant: "interface",
    weight: "bold",
    style: "italic",
    description: "Path to base font for all of Obsidian (italic).",
  },
  textNormalFont: {
    variant: "text",
    weight: "normal",
    style: "normal",
    description: "Path to font for editing and reading views.",
  },
  textBoldFont: {
    variant: "text",
    weight: "bold",
    style: "normal",
    description: "Path to font for editing and reading views (bold).",
  },
  textItalicFont: {
    variant: "text",
    weight: "bold",
    style: "italic",
    description: "Path to font for editing and reading views (italic).",
  },
  monospaceFont: {
    variant: "monospace",
    weight: "normal",
    style: "normal",
    description: "Path to font for places like code blocks and frontmatter.",
  },
};
