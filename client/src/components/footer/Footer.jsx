import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import Slogan from "../../assets/svg/Slogan";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div>
      <footer id="footer" className="relative z-50 dark:bg-gray-900 pt-24">
        <div className=" border-t border-b border-gray-200 dark:border-gray-700 py-16">
          <div className="mx-auto container px-4 xl:px-12 2xl:px-4">
            <div className="lg:flex">
              <div className="w-full lg:w-1/2 mb-16 lg:mb-0 flex">
                <div className="w-full lg:w-1/2 px-6">
                  <h3 className="text-gray-800 dark:text-gray-50 font-bold text-md lg:text-base leading-tight mb-6">
                    {t("footer.features")}
                  </h3>
                  <ul className="text-gray-800 dark:text-gray-50 text-sm lg:text-base leading-tight">
                    <li className="mt-6">
                      <Link to="/about">{t("footer.about")}</Link>
                    </li>
                    <li className="mt-6">
                      <Link to="/candidatespace">{t("footer.candidate")}</Link>
                    </li>
                    <li className="mt-6">
                      <Link to="/recruiterspace">{t("footer.recruiter")}</Link>
                    </li>
                    <li className="mt-6">
                      <Link to="/conact">{t("footer.contact")}</Link>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-1/2 px-6">
                  <h3 className="text-gray-800 dark:text-gray-50 font-bold text-md lg:text-base leading-tight mb-6">
                    Services
                  </h3>
                  <ul className="text-gray-800 dark:text-gray-50 text-sm lg:text-base leading-tight">
                    <li>
                      <Link to="/chat">{t("footer.chat")}</Link>
                    </li>

                    <li className="mt-6">
                      <Link to="/candidateaccount">
                        {t("footer.candidate")}
                      </Link>
                    </li>
                    <li className="mt-6">
                      <Link to="/companyaccount">{t("footer.recruiter")}</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex">
                <div className="w-full lg:w-1/2 px-6">
                  <h3 className="text-gray-800 dark:text-gray-50 font-bold text-md lg:text-base leading-tight mb-6">
                    {t("footer.privacy")}
                  </h3>
                  <ul className="text-gray-800 dark:text-gray-50 text-sm lg:text-base leading-tight">
                    <li>
                      <Link to="/">{t("footer.security")}</Link>
                    </li>
                    <li className="mt-6">
                      <Link to="/">{t("footer.terms")}</Link>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-1/2 px-6 flex flex-col justify-between">
                  <div className="flex items-center mb-6">
                    <a href="https://facebook.com">
                      <BsFacebook
                        size={30}
                        className=" text-gray-500 cursor-pointer hover:text-gray-900 dark:hover:text-gray-50"
                      />
                    </a>
                    <a href="https://instagram.com">
                      <BsInstagram
                        size={30}
                        className="text-gray-500 ml-6 cursor-pointer hover:text-gray-900 dark:hover:text-gray-50"
                      />
                    </a>
                    <a href="https://instagram.com">
                      <BsLinkedin
                        size={30}
                        className="text-gray-500 ml-6 cursor-pointer hover:text-gray-900 dark:hover:text-gray-50"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-16 flex flex-col justify-center items-center">
          <Link href="/">
            <Slogan className="mr-3 h-4" />
          </Link>
          <p className="mt-6 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50">
            2023 JOBYSSY. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
