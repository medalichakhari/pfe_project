import React from "react";
import CreatableSelect from "react-select/creatable";
import { skills } from "../../data/skills";
import UploadCv from "../shared/UploadCv";
import { useTranslation } from "react-i18next";

const CandidatForm = ({
  selectedFile,
  setSelectedFile,
  selectedValues,
  setSelectedValues,
  selectError,
  setSelectError,
  submitting,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}) => {
  const { t } = useTranslation();
  const handleChanges = (value) => {
    setSelectedValues(value);
    setSelectError(value.length === 0);
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
        <CreatableSelect
          value={selectedValues}
          isMulti
          isClearable
          onChange={handleChanges}
          options={skills}
          placeholder="Select needed skills"
        />
        {selectError && submitting && (
          <div className="text-red-500 text-sm">
            Please select at least one skill.
          </div>
        )}
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
        <select
          value={values.experience}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="experience"
          id="experience"
          placeholder="Enter your experience level"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.experience && errors.experience
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        >
          <option value="">Please select your experience level</option>
          <option value="Bac">Entry level</option>
          <option value="Licence">Intermidiate</option>
          <option value="Master">Advanced</option>
        </select>
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
