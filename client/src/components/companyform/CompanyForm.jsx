import React from "react";
import UploadImage from "../shared/UploadImage";
import { GetSecteurs } from "../../lib/fetch";
import { useQuery } from "react-query";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../shared/LoadingSpinner";

const CompanyForm = ({ values, handleChange, handleBlur, image, setImage ,errors, touched}) => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const { data, isLoading } = useQuery(["activityAreaInfo", token], () =>
    GetSecteurs(token)
  );
  return (
    <>
      <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
      {t("companyInfo.companyInformation")}
      </h4>
      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
      {t("companyInfo.companyLogo")} <span className="text-sm text-gray-400">(optional)</span>
      </label>
      <UploadImage image={image} setImage={setImage} />
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {t("companyInfo.companyName")}
        </label>
        <input
          value={values.companyName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="companyName"
          id="companyName"
          placeholder="Enter your company name"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.companyName && errors.companyName
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {touched.companyName && errors.companyName && (
              <div className="text-red-500 text-sm">{errors.companyName}</div>
            )}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {t("companyInfo.companyAddress")}
        </label>
        <input
          value={values.companyAddress}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="companyAddress"
          id="companyAddress"
          placeholder="Enter your company address"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.companyAddress && errors.companyAddress
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {touched.companyAddress && errors.companyAddress && (
              <div className="text-red-500 text-sm">{errors.companyAddress}</div>
            )}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {t("companyInfo.activityArea")}
        </label>
        <select
          value={values.companyActivity}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="companyActivity"
          id="companyActivity"
          placeholder="Please select it's activity area"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.companyActivity && errors.companyActivity
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}        
          >
          <option value="">Please select it's domain</option>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            data.map((item) => (
              <option  key={item.id} value={item.id}>
                {item.nom}
              </option>
            ))
          )}
        </select>
        {touched.companyActivity && errors.companyActivity && (
              <div className="text-red-500 text-sm">{errors.companyActivity}</div>
            )}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {t("companyInfo.companyDescription")}
        </label>
        <textarea
          value={values.companyDescription}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="companyDescription"
          id="companyDescription"
          placeholder="Enter your company description"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.companyAddress && errors.companyAddress
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {touched.companyDescription && errors.companyDescription && (
              <div className="text-red-500 text-sm">{errors.companyDescription}</div>
            )}
      </div>
    </>
  );
};

export default CompanyForm;
