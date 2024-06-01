import { DatePicker } from "antd";
import CreatableSelect from "react-select/creatable";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { skills } from "../../data/skills";
import { GetCategories } from "../../lib/fetch";
import { useAuth } from "../../context/AuthContext";
import TextEditor from "../inputs/TextEditor";
import LoadingSpinner from "../shared/LoadingSpinner";

const { RangePicker } = DatePicker;

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
  dateRange,
  setDateRange,
  dateError,
  setDateError,
  isSubmitting,
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
    setSelectError(value.length === 0);
  };
  const handleDateRangeChange = (value) => {
    setDateRange(value);
    setDateError(!value);
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
          Location
        </label>
        <select
          value={values.isRemote}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="isRemote"
          id="isRemote"
          placeholder="Location"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.isRemote && errors.isRemote
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        >
          <option value="">Please select it's location</option>
          <option value="onTheSite">On the site</option>
          <option value="remote">Remote</option>
        </select>
        {touched.isRemote && errors.isRemote && (
          <div className="text-red-500 text-sm">{errors.isRemote}</div>
        )}
      </div>
      {/* <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          {t("jobOfferForm.date")}
        </label>
        <RangePicker
          size="large"
          className="w-full"
          format={"DD/MM/YYYY"}
          name="date"
          value={dateRange}
          onChange={handleDateRangeChange}
        />
        {isSubmitting && dateError && (
          <div className="text-red-500 text-sm">Please add the date range</div>
        )}
      </div> */}
      {/* <div>
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
      </div> */}
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
          <option value="">{t("jobType.selectJobType")}</option>
          <option value="FullTime">{t("jobType.fullTime")}</option>
          <option value="PartTime">{t("jobType.partTime")}</option>
          <option value="Internship">{t("jobType.internship")}</option>
          <option value="Freelance">{t("jobType.freelance")}</option>
        </select>
        {touched.experience && errors.experience && (
          <div className="text-red-500 text-sm">{errors.experience}</div>
        )}
      </div>
      {/* <div>
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
      </div> */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          {t("jobOfferForm.qualifications")}
        </label>
        <CreatableSelect
          value={selectedValues}
          onChange={handleSelectChange}
          options={skills}
          isMulti
          isSearchable
          isClearable
          placeholder="Select needed skills"
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
