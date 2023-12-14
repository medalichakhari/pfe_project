import React from "react";
import Select from "react-tailwindcss-select";
import { skills } from "../../data/skills";
import UploadCv from "../shared/UploadCv";
import { useTranslation } from "react-i18next";


const CandidatForm = ({
  selectedFile,
  setSelectedFile,
  selectedValues,
  setSelectedValues,
  values,
  handleChange,
  handleBlur,
  errors,
  touched
}) => {
  const { t } = useTranslation();
  const handleChanges = (value) => {
    setSelectedValues(value);
  };
  return (
    <>
      <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
        {t("candidateInfo.candidateInformation")}
      </h4>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {t("candidateInfo.educationLevel")}
        </label>
        <select
          value={values.educationLevel}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="educationLevel"
          id="educationLevel"
          placeholder="Please select your education level"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.educationLevel && errors.educationLevel
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
          >
          <option value="">Please select your education level</option>
          <option value="Bac">Bac</option>
          <option value="Licence">Licence</option>
          <option value="Master">Master</option>
          <option value="Ingenieur">Ingenieur</option>
          <option value="Doctorat">Doctorat</option>
        </select>
        {touched.educationLevel && errors.educationLevel && (
              <div className="text-red-500 text-sm">{errors.educationLevel}</div>
            )}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {t("candidateInfo.speciality")}
        </label>
        <input
          value={values.speciality}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="speciality"
          id="speciality"
          placeholder="Enter your speciality"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.speciality && errors.speciality
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {touched.speciality && errors.speciality && (
              <div className="text-red-500 text-sm">{errors.speciality}</div>
            )}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {t("candidateInfo.qualifications")}
        </label>
        <Select
          value={selectedValues}
          onChange={handleChanges}
          options={skills}
          isMultiple={true}
          isSearchable={true}
          isClearable={true}
          placeholder="Select needed skills"
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
        {t("candidateInfo.portfolioUrl")}
        </label>
        <input
          value={values.portfolioUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="portfolioUrl"
          id="portfolioUrl"
          placeholder="Enter your portfolio url if exist"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.portfolioUrl && errors.portfolioUrl
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {touched.portfolioUrl && errors.portfolioUrl && (
              <div className="text-red-500 text-sm">{errors.portfolioUrl}</div>
            )}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {t("candidateInfo.experience")}
        </label>
        <input
          value={values.experience}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="experience"
          id="experience"
          placeholder="Enter number of years of experience"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.experience && errors.experience
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {touched.experience && errors.experience && (
              <div className="text-red-500 text-sm">{errors.experience}</div>
            )}
      </div>
      <div>
        <label className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {t("candidateInfo.curriculumVitae")}
        </label>
        <UploadCv
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      </div>
    </>
  );
};

export default CandidatForm;
