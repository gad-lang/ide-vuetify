import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import App from "./App";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "dockview-core/dist/styles/dockview.css";
import "./styles.css";

const saved = (() => {
  try {
    return localStorage.getItem("gad-vuetify-theme");
  } catch {
    return null;
  }
})();
const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
const defaultTheme = saved === "light" || saved === "dark" ? saved : prefersDark ? "dark" : "light";

const vuetify = createVuetify({
  components,
  directives,
  icons: { defaultSet: "mdi", aliases, sets: { mdi } },
  theme: { defaultTheme },
});

// the app's vue-i18n: the IDE reads its words from it (gadIde, gadGit), its
// defaults merged under what the app has
const i18n = createI18n({ legacy: false, locale: navigator.language.startsWith("pt") ? "pt" : "en", fallbackLocale: "en" });

createApp(App).use(vuetify).use(i18n).mount("#app");
