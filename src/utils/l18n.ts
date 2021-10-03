import i18n, { Scope, TranslateOptions } from "i18n-js";

const translations = {
  en: require("../locals/en.json"),
  de: require("../locals/de.json"),
};

export const setI18nConfig = (locale: string) => {
  if(locale !== undefined){
    const languageTag = locale.split("-")[0];
    i18n.locale = languageTag;
  
  }
  i18n.translations = translations;
  i18n.defaultLocale = "en";
  i18n.fallbacks = true;
};
