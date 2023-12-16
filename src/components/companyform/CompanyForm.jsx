import React from "react";
import UploadImage from "../shared/UploadImage";
import { GetSecteurs } from "../../lib/fetch";
import { useQuery } from "react-query";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../shared/LoadingSpinner";
import TextEditor from "../../components/inputs/TextEditor";
import {countryList} from "../../data/countryList.json"
import Select from "react-tailwindcss-select";

const CompanyForm = ({ values, handleChange, handleBlur, image, setImage ,errors, touched, editorValue, setEditorValue, editorError, setEditorError, isSubmitting, selectedCountry,setSelectedCountry}) => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const handleEditorChange = (value) => {
    setEditorValue(value);
    setEditorError(value.length <= 90);
  };
  const { data, isLoading } = useQuery(["activityAreaInfo", token], () =>
    GetSecteurs(token)
  );
  const handleChanges = (value) => {
    setSelectedCountry(value);
  };
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
          {t("companyInfo.country")}
        </label>
        <Select
          value={selectedCountry}
          onChange={handleChanges}
          options={countryList}
          isSearchable={true}
          isClearable={true}
          placeholder="Select your country"
          classNames={{
            menuButton: ({ isDisabled }) =>
              `flex text-sm text-gray-500 border border-gray-300 rounded-lg shadow-sm transition-all duration-300 focus:outline-none ${
                isDisabled
                  ? "bg-gray-200"
                  : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
              }`,
            menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
            listItem: ({ isSelected }) =>
              `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                isSelected
                  ? `text-white bg-blue-500`
                  : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
              }`,
          }}
        />
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
        {t("companyInfo.website")}  
        </label>
        <input
          value={values.companyWebsite}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="companyWebsite"
          id="companyWebsite"
          placeholder="Enter your company website"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.companyWebsite && errors.companyWebsite
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {touched.companyWebsite && errors.companyWebsite && (
              <div className="text-red-500 text-sm">{errors.companyWebsite}</div>
            )}
      </div>
      <div className="mb-2">
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {t("companyInfo.companyDescription")}
        </label>
        <div>
          <TextEditor value={editorValue} setValue={handleEditorChange} />
        </div>
        {editorError && isSubmitting && (
          <div className="text-red-500 text-sm mb-2">
            The company description must be more than 90 characters.
          </div>
        )}
        {/* <textarea
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
            )} */}
      </div>
    </>
  );
};

export default CompanyForm;
