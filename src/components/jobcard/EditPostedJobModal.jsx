import React from "react";
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

function EditPostedJobModal({ isOpen, handleOpenEditModal, jobId }) {
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

  const [selectError, setSelectError] = useState(true);
  const [editorError, setEditorError] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const skillsArray = data?.competences
    ?.split(",")
    .map((skill) => skill.trim());
  const mappedSkills = skillsArray?.map((skill) => ({
    label: skill,
    value: skill,
  }));
  const [selectedValues, setSelectedValues] = useState(mappedSkills);
  const [editorValue, setEditorValue] = useState(data?.description);

  const handleChanges = (value) => {
    setSelectedValues(value);
    setSelectError(!value);
  };
  const handleEditorChange = (value) => {
    setEditorValue(value);
    setEditorError(value.length <= 90);
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
        salaire: values.salary,
        experience: values.experience,
        niveau: values.educationLevel,
        competences: qualifications,
        description: editorValue,
      };
      UpdateOffre(jobId, jobOfferData, token)
        .then((res) => {
          handleOpenEditModal();
          refetch();
        })
        .catch((err) => {
          console.log(err);
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
          salary: "",
          experience: "",
          educationLevel: "",
          qualification: "",
        }
      : {
          title: data?.titre,
          address: data?.adresse,
          isRemote: data?.isRemote,
          domain: data?.categorie?.id,
          salary: data?.salaire,
          experience: data?.experience,
          educationLevel: data?.niveau,
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
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  {t("editPostedJobCard.salary")}
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
                  className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
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
                  <div className="text-red-500 text-sm">
                    {errors.experience}
                  </div>
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
                  <div className="text-red-500 text-sm">
                    {errors.educationLevel}
                  </div>
                )}
              </div>
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
