import React from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative px-6 lg:px-8">
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-6 sm:py-4 lg:py-8">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">{t("hero.findYour")}</span>
              <span className="block text-secondary xl:inline">
                {t("hero.dreamJob")}
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-base sm:leading-6">
              {t("hero.browseThrough")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
