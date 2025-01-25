export interface EasyFontsPluginSettings {
  interfaceNormalFont: {
    path: string;
    base64: string;
  };
  interfaceBoldFont: {
    path: string;
    base64: string;
  };
  interfaceItalicFont: {
    path: string;
    base64: string;
  };
  textNormalFont: {
    path: string;
    base64: string;
  };
  textBoldFont: {
    path: string;
    base64: string;
  };
  textItalicFont: {
    path: string;
    base64: string;
  };
  monospaceFont: {
    path: string;
    base64: string;
  };
}

export type EasyFontsPluginSettingsKey = keyof EasyFontsPluginSettings;

export const DEFAULT_SETTINGS: EasyFontsPluginSettings = {
  interfaceNormalFont: { path: "", base64: "" },
  interfaceBoldFont: { path: "", base64: "" },
  interfaceItalicFont: { path: "", base64: "" },
  textNormalFont: { path: "", base64: "" },
  textBoldFont: { path: "", base64: "" },
  textItalicFont: { path: "", base64: "" },
  monospaceFont: { path: "", base64: "" },
};
