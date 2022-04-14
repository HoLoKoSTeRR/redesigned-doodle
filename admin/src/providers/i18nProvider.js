import polyglotI18nProvider from "ra-i18n-polyglot";
import { resolveBrowserLocale } from "react-admin";
import { ru, en, fr } from "../i18n";
const messages = {
  fr: fr,
  en: en,
  ru: ru,
};
const i18nProvider = polyglotI18nProvider(
  (locale) => (messages[locale] ? messages[locale] : messages.ru),
  resolveBrowserLocale()
);

export default i18nProvider;
