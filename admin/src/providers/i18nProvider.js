import polyglotI18nProvider from "ra-i18n-polyglot";
import { resolveBrowserLocale } from "react-admin";
import { ru, en} from "../i18n";
const messages = {
  en: en,
  ru: ru,
};
const i18nProvider = polyglotI18nProvider(
  (locale) => (messages[locale] ? messages[locale] : messages.ru),
  resolveBrowserLocale()
);

export default i18nProvider;
