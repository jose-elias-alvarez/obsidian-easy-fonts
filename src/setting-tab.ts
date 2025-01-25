import { App, PluginSettingTab, Setting } from "obsidian";
import { FONT_CHARACTERISTICS } from "./constants";
import EasyFontsPlugin from "./main";
import { EasyFontsPluginSettingsKey } from "./settings";

export class EasyFontsPluginSettingTab extends PluginSettingTab {
  plugin: EasyFontsPlugin;

  constructor(app: App, plugin: EasyFontsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  private getKeyDisplayName(key: EasyFontsPluginSettingsKey) {
    return key
      .split(/(?=[A-Z])/)
      .join(" ")
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  display(): void {
    this.containerEl.empty();
    this.plugin.allSettingsKeys.forEach((key) =>
      new Setting(this.containerEl)
        .setName(this.getKeyDisplayName(key))
        .setDesc(FONT_CHARACTERISTICS[key].description)
        .addText((text) =>
          text
            .setPlaceholder("Default")
            .setValue(this.plugin.settings[key].path)
            .onChange(async (value) => {
              this.plugin.settings[key].path = value;
              this.plugin.settings[key].base64 = "";
              await this.plugin.saveSettings();
            }),
        ),
    );
    // I played around with different options to do this automatically (on change, on close)
    // but the former is too aggressive, and the latter is too unnatural
    new Setting(this.containerEl).addButton((button) =>
      button
        .setButtonText("Reload fonts")
        .setCta()
        .onClick(async () => await this.plugin.reloadFonts()),
    );
  }
}
