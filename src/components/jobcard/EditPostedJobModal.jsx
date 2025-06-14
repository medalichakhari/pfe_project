import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import PrimaryButton from "../buttons/primarybutton/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import { GetCategories, GetOffre, UpdateOffre } from "../../lib/fetch";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { skills } from "../../data/skills";
import { useQuery } from "react-query";
import TextEditor from "../inputs/TextEditor";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../shared/LoadingSpinner";
import { useToast } from "@chakra-ui/react";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;
function EditPostedJobModal({ isOpen, handleOpenEditModal, jobId }) {
  const toast = useToast();
  const { t } = useTranslation();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { token } = useAuth();
  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    ["domains", token],
    () => GetCategories(token)
  );
  const { data, isLoading, refetch } = useQuery(
    ["jobOfferInfo", jobId, token],
    () => GetOffre(jobId, token)
  );
  const [selectedValues, setSelectedValues] = useState([]);
  const [editorValue, setEditorValue] = useState();
  const [selectError, setSelectError] = useState(false);
  const [editorError, setEditorError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // const [dateRange, setDateRange] = useState([data?.startDate, data?.endDate]);
  const [dateError, setDateError] = useState(true);
  useEffect(() => {
    if (!isLoading && data) {
      const skillsArray = data.competences
        ?.split(",")
        .map((skill) => skill.trim());
      const mappedSkills = skillsArray?.map((skill) => ({
        label: skill,
        value: skill,
      }));
      setSelectedValues(mappedSkills);
      setEditorValue(data.description);
    }
  }, [isLoading, data]);

  const handleChanges = (value) => {
    setSelectedValues(value);
    setSelectError(value.length === 0);
  };
  const handleEditorChange = (value) => {
    setEditorValue(value);
    setEditorError(value.length <= 90);
  };
  const handleDateRangeChange = (value) => {
    setDateRange(value);
    setDateError(!value);
  };
  const handleUpdateJobOffer = (values, actions) => {
    setSubmitting(true);
    if (!editorError && !selectError) {
      const qualificationsValue = selectedValues?.map((option) => option.value);
      const qualifications = qualificationsValue?.join(",");
      let jobOfferData = {
        titre: values.title,
        domaine: values.domain,
        isRemote: values.isRemote,
        experience: values.experience,
        // startDate: moment(dateRange[0]).format("YYYY-MM-DD"),
        // endDate: moment(dateRange[1]).format("YYYY-MM-DD"),
        // niveau: values.educationLevel,
        competences: qualifications,
        description: editorValue,
      };
      UpdateOffre(jobId, jobOfferData, token)
        .then((res) => {
          handleOpenEditModal();
          refetch();
          toast({
            description: "succesfully updated",
            position: "bottom-left",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.log(err);
          toast({
            description: err.message,
            position: "bottom-left",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    }
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: isLoading
      ? {
          title: "",
          isRemote: "",
          domain: "",
          experience: "",
          // educationLevel: "",
          qualification: "",
        }
      : {
          title: data?.titre,
          address: data?.adresse,
          isRemote: data?.isRemote,
          domain: data?.categorie?.id,
          experience: data?.experience,
          // educationLevel: data?.niveau,
          qualification: "",
        },

    onSubmit: handleUpdateJobOffer,
    enableReinitialize: true,
  });
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={handleOpenEditModal}
        isCentered={true}
        onEsc={handleOpenEditModal}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent className="overflow-y-auto">
          <ModalHeader>{t("editPostedJobCard.editJobOffer")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  {t("editPostedJobCard.jobTitle")}:
                </label>
                <input
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Job title"
                  className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
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
                  className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="">Please select it's domain</option>
                  {isLoadingCategories ? (
                    <LoadingSpinner />
                  ) : (
                    categories?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nom}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  {t("editPostedJobCard.jobType")}
                </label>
                <select
                  value={values.isRemote}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="isRemote"
                  id="isRemote"
                  placeholder="Job Location"
                  className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="">Please select it's location</option>
                  <option value="onTheSite">On the site</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
              {/* <div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  {t("editPostedJobCard.date")}
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
                  <div className="text-red-500 text-sm">
                    Please add the date range
                  </div>
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
                  <div className="text-red-500 text-sm">
                    {errors.experience}
                  </div>
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
                  <option value="">{t("jobType.selectJobType")}</option>
                  <option value="FullTime">{t("jobType.fullTime")}</option>
                  <option value="PartTime">{t("jobType.partTime")}</option>
                  <option value="Internship">{t("jobType.internship")}</option>
                  <option value="Freelance">{t("jobType.freelance")}</option>
                </select>
                {touched.educationLevel && errors.educationLevel && (
                  <div className="text-red-500 text-sm">
                    {errors.educationLevel}
                  </div>
                )}
              </div> */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  {t("editPostedJobCard.qualifications")}
                </label>
                <CreatableSelect
                  value={selectedValues}
                  onChange={handleChanges}
                  options={skills}
                  isMulti
                  isClearable
                  isSearchable
                  placeholder="Select needed skills"
                />
                {selectError && submitting && (
                  <div className="text-red-500 text-sm">
                    Please select your skills.
                  </div>
                )}
              </div>
              <div>
                <label className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  {t("editPostedJobCard.jobDescription")}
                </label>
                <div className="mb-2">
                  <TextEditor
                    value={editorValue}
                    setValue={handleEditorChange}
                  />
                </div>
                {editorError && submitting && (
                  <div className="text-red-500 text-sm mb-2">
                    The company description must be more than 90 characters.
                  </div>
                )}
              </div>
              <div className="flex flex-row-reverse gap-4">
                <button
                  type="button"
                  className="text-white rounded-full py-1.5 px-5 md:py-1.5 md:px-5 bg-gradient-to-br hover:bg-gradient-to-r transition-all duration-300 from-red-500 to-red-700 hover:bg-blend-darken"
                  onClick={handleOpenEditModal}
                >
                  {t("cancel")}
                </button>
                <PrimaryButton type="submit">{t("save")}</PrimaryButton>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditPostedJobModal;
