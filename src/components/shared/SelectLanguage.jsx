import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiTranslate } from "react-icons/hi";

function SelectLanguage() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  function handleChange(event) {
    const language = event.target.value;
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem("selectedLanguage", language);
  }

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  return (
    <div className="relative">
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 cursor-pointer  appearance-none"
        value={selectedLanguage}
        onChange={handleChange}
      >
        <option value="en">En</option>
        <option value="fr">Fr</option>
      </select>
      {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <HiTranslate className="w-5 h-5" />
      </div> */}
    </div>
  );
}

export default SelectLanguage;
