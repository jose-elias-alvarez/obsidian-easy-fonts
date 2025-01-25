import { arrayBufferToBase64, normalizePath, Notice, Plugin } from "obsidian";
import {
  FONT_CHARACTERISTICS,
  FONT_VARIANTS,
  VALID_FORMATS,
} from "./constants";
import { EasyFontsPluginSettingTab } from "./setting-tab";
import {
  DEFAULT_SETTINGS,
  EasyFontsPluginSettings,
  EasyFontsPluginSettingsKey,
} from "./settings";

export default class EasyFontsPlugin extends Plugin {
  settings: EasyFontsPluginSettings;
  base64Cache = new Map<string, string>();

  private get definedSettingsKeys() {
    return this.allSettingsKeys.filter(
      (setting) => this.settings[setting].path,
    );
  }

  private getFontFileFormat(path: string) {
    const extension = path.split(".").pop();
    if (!extension || !VALID_FORMATS.has(extension)) {
      throw new Error(
        `File at ${path} has invalid extension (must be one of ${Array.from(
          VALID_FORMATS,
        ).join(", ")})`,
      );
    }
    return extension === "ttf" ? "truetype" : extension;
  }

  private async loadFontAt(key: EasyFontsPluginSettingsKey) {
    const startTime = Date.now();
    let { path, base64 } = this.settings[key];
    path = normalizePath(path);
    if (!(await this.app.vault.adapter.exists(path))) {
      if (base64) {
        // font was deleted, so don't load it next time
        this.settings[key].base64 = "";
        await this.saveSettings();
      }
      throw new Error(`Font file at ${path} does not exist`);
    }

    if (!base64) {
      base64 =
        // tiny optimization on first load: don't read twice at the same path
        this.base64Cache.get(path) ??
        arrayBufferToBase64(await this.app.vault.adapter.readBinary(path));
      this.settings[key].base64 = base64;
      await this.saveSettings();
    }
    this.base64Cache.set(path, base64);

    const { variant, style, weight } = FONT_CHARACTERISTICS[key];
    const fontFace = new FontFace(
      `Easy Fonts ${variant} Font`,
      // you can actually pass in an array buffer here, but we want to serialize it to cache it
      `url(data:font/${this.getFontFileFormat(path)};base64,${base64})`,
      { weight, style, display: "swap" },
    );
    const loadedFont = await fontFace.load();
    // @ts-expect-error: obsidian doesn't seem to have updated its type definitions
    document.fonts.add(loadedFont);
    console.info(`Loaded font at ${path} in ${Date.now() - startTime}ms`);
  }

  private async loadFonts() {
    await Promise.all(
      this.definedSettingsKeys.map(async (key) => {
        try {
          await this.loadFontAt(key);
        } catch (e) {
          console.error(e);
          new Notice(e);
        }
      }),
    );
    // clear here to free memory
    this.base64Cache.clear();

    FONT_VARIANTS.filter((variant) =>
      this.definedSettingsKeys.some(
        (key) => FONT_CHARACTERISTICS[key].variant === variant,
      ),
    ).forEach((variant) =>
      document.body.style.setProperty(
        `--font-${variant}-theme`,
        `Easy Fonts ${variant} Font`,
      ),
    );
  }

  private unloadFonts() {
    this.base64Cache.clear();

    document.fonts.forEach((font) => {
      if (font.family.startsWith("Easy Fonts")) {
        // @ts-expect-error: same issue, type defs not up-to-date
        document.fonts.delete(font);
      }
    });

    FONT_VARIANTS.map((variant) => `--font-${variant}-theme`).forEach(
      (property) => {
        if (
          document.body.style
            .getPropertyValue(property)
            .startsWith("Easy Fonts")
        ) {
          document.body.style.removeProperty(property);
        }
      },
    );
  }

  public get allSettingsKeys() {
    return Object.keys(this.settings) as EasyFontsPluginSettingsKey[];
  }

  public async reloadFonts() {
    this.unloadFonts();
    await this.loadFonts();
  }

  async onload() {
    await this.loadSettings();
    await this.loadFonts();

    this.addCommand({
      id: "reload-fonts",
      name: "Reload fonts",
      callback: this.reloadFonts.bind(this),
    });

    this.addSettingTab(new EasyFontsPluginSettingTab(this.app, this));
  }

  onunload() {
    this.unloadFonts();
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
