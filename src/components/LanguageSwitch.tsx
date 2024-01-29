import React from "react";
import { useTranslation } from "react-i18next";
import { Model } from "../global/data/Enum";
import { useModelStore } from "../store/store";
// import { locales } from '../global/data/constant'; // error occur

const locales = {
  hk: { title: "繁體中文" },
  en: { title: "English" },
};

/**
 * temporary solve locale change but press clear chat history cause language back to chinese
 */

export default function LanguageSwitch({
  handleUserSubmit,
}: {
  handleUserSubmit: (text?: string, model?: Model) => Promise<void>;
}) {
  const { i18n } = useTranslation();
  const { model } = useModelStore();
  return (
    <>
      <ul className="mt-4">
        {Object.keys(locales).map((locale) => (
          <li key={locale}>
            <button
              className={`mt-2 w-24 whitespace-nowrap hover:bg-blue-500  font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded  ${
                i18n.resolvedLanguage === locale
                  ? "text-bold bg-indigo-700 text-white"
                  : "bg-white text-blue-700"
              }`}
              type="submit"
              onClick={async () => {
                i18n.changeLanguage(locale);
                if (model === Model.gpt3_turbo_16k) {
                  handleUserSubmit(`Please speak in ${locales[locale].title}`);
                }
              }}
            >
              {locales[locale].title}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
