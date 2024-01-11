import i18n from "i18n";
import path from "path";

i18n.configure({
  locales: ["en_US"],
  defaultLocale: "en_US",
  directory: path.join(__dirname, "locales"),
  objectNotation: true,
  api: {
    __: "translate",
    __n: "translateN",
  },
});

export default i18n;
