import i18n from "i18next";
// import intervalPlural from 'i18next-intervalplural-postprocessor';
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "../../public/locales/en/translation.json";
import vi from "../../public/locales/vi/translation.json";

const RESOURCES = {
  en: { common: en },
  vi: { common: vi },
};

const DETECTION_OPTIONS = {
  order: ["localStorage", "navigator"],
  caches: ["localStorage"],
};

export const defaultNS = "common";

i18n
  .use(LanguageDetector)
  //   .use(intervalPlural)
  .use(initReactI18next)
  .init({
    detection: DETECTION_OPTIONS,
    resources: RESOURCES,
    defaultNS,
    fallbackLng: "vi",
    interpolation: { escapeValue: false },
  });

export default i18n;
