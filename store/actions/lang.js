import i18n from "i18next";
import moment from "moment";

export const setLanguage = (locale) => {
   i18n.fallbacks = true;
   i18n.changeLanguage(locale);
   moment.locale(locale);
   return {
      type: "SET_LANGUAGE",
      locale,
   };
};
