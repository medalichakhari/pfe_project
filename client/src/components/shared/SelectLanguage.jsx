import React from "react";
import { useTranslation } from "react-i18next";
import { HiTranslate } from "react-icons/hi";

function SelectLanguage() {
  const { i18n } = useTranslation();

  function handleChange(event) {
    i18n.changeLanguage(event.target.value);
  }

  return (
    <div className="relative">
      <select
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white appearance-none"
        value={i18n.language}
        onChange={handleChange}
      >
        <option value="en">English</option>
        <option value="fr">French</option>
      </select>
      {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <HiTranslate className="w-5 h-5" />
      </div> */}
    </div>
  );
}

export default SelectLanguage;
