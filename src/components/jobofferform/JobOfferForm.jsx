import Select from "react-tailwindcss-select";
import { skills } from "../../data/skills";
import { useQuery } from "react-query";
import { GetCategories } from "../../lib/fetch";
import { useAuth } from "../../context/AuthContext";
import TextEditor from "../inputs/TextEditor";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../shared/LoadingSpinner";

const JobOfferForm = ({
  values,
  selectedValues,
  setSelectedValues,
  editorValue,
  setEditorValue,
  handleChange,
  handleBlur,
  errors,
  touched,
  jobOfferIsSubmitting,
  setEditorError,
  setSelectError,
  editorError,
  selectError,
}) => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const { data, isLoading } = useQuery(["domains", token], () =>
    GetCategories(token)
  );

  const handleEditorChange = (value) => {
    setEditorValue(value);
    setEditorError(value.length <= 90);
  };

  const handleSelectChange = (value) => {
    setSelectedValues(value);
    setSelectError(!value);
  };

  return (
    <>
      <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
        {t("jobOfferForm.jobOfferInformation")}
      </h4>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          {t("jobOfferForm.jobTitle")}
        </label>
        <input
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="title"
          id="title"
          placeholder="Job title"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.title && errors.title
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {touched.title && errors.title && (
          <div className="text-red-500 text-sm">{errors.title}</div>
        )}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          {t("jobOfferForm.domain")}
        </label>
        <select
          value={values.domain}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="domain"
          id="domain"
          placeholder="Phone number with country code"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.domain && errors.domain
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        >
          <option value="">Please select it's domain</option>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            data?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nom}
              </option>
            ))
          )}
        </select>
        {touched.domain && errors.domain && (
          <div className="text-red-500 text-sm">{errors.domain}</div>
        )}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          {t("jobOfferForm.jobType")}
        </label>
        <select
          value={values.type}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="type"
          id="type"
          placeholder="Job Type"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.type && errors.type
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        >
          <option value="">Please select it's type</option>
          <option value="internship">Internship</option>
          <option value="fulltime">Full Time</option>
          <option value="parttime">Part Time</option>
          <option value="other">Other</option>
        </select>
        {touched.type && errors.type && (
          <div className="text-red-500 text-sm">{errors.type}</div>
        )}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          {t("jobOfferForm.salary")}
          <span className="text-sm text-gray-400">(optional)</span>
        </label>
        <input
          value={values.salary}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="salary"
          id="salary"
          placeholder="Required experience level"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.salary && errors.salary
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {touched.salary && errors.salary && (
          <div className="text-red-500 text-sm">{errors.salary}</div>
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
          {t("jobOfferForm.qualifications")}
        </label>
        <Select
          value={selectedValues}
          onChange={handleSelectChange}
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
        {selectError && jobOfferIsSubmitting && (
          <div className="text-red-500 text-sm">
            Please select at least one skill.
          </div>
        )}
      </div>
      <div>
        <label className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white">
          {t("jobOfferForm.jobDescription")}
        </label>
        <div>
          <TextEditor value={editorValue} setValue={handleEditorChange} />
        </div>
        {editorError && jobOfferIsSubmitting && (
          <div className="text-red-500 text-sm mb-2">
            The job description must be more than 90 characters.
          </div>
        )}
      </div>
    </>
  );
};

export default JobOfferForm;
