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
import Select from "react-tailwindcss-select";
import { skills } from "../../data/skills";
import { useQuery } from "react-query";
import TextEditor from "../inputs/TextEditor";
import { useTranslation } from "react-i18next";
import { jobOfferSchema } from "../../utils/validationSchemas";

function EditPostedJobModal({ isOpen, handleOpenEditModal, jobId }) {
  const { t } = useTranslation();
  const [selectedValues, setSelectedValues] = useState(null);
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
  const [editorValue, setEditorValue] = useState(data?.description);
  const handleChanges = (value) => {
    setSelectedValues(value);
  };
  const handleUpdateJobOffer = (values, actions) => {
    const qualificationsValue = selectedValues?.map((option) => option.value);
    const qualifications = qualificationsValue?.join(",");
    let jobOfferData = {
      titre: values.title,
      adresse: values.address,
      domaine: values.domain,
      type: values.type,
      salaire: values.salary,
      competences: qualifications,
      description: editorValue,
    };
    UpdateOffre(jobId, jobOfferData, token)
      .then((res) => {
        console.log(res);
        handleOpenEditModal();
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
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
          address: "",
          type: "",
          domain: "",
          salary: "",
          qualification: "",
        }
      : {
          title: data?.titre,
          address: data?.adresse,
          type: data?.type,
          domain: data?.categorie?.id,
          salary: data?.salaire,
          qualification: "",
        },

    onSubmit: handleUpdateJobOffer,
    enableReinitialize: true,
    validationSchema: jobOfferSchema,
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
      >
        <ModalOverlay />
        <ModalContent>
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
                  {isLoadingCategories ? (
                    <option value="">Loading...</option>
                  ) : (
                    categories?.map((item) => (
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
                  {t("editPostedJobCard.address")}
                </label>
                <input
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="address"
                  id="address"
                  placeholder="(Remote) or Job address"
                  className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
                    touched.address && errors.address
                      ? "focus:ring-red-500 focus:border-red-500 border-red-500"
                      : "focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                {touched.address && errors.address && (
                  <div className="text-red-500 text-sm">{errors.address}</div>
                )}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  {t("editPostedJobCard.jobType")}
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
                  {t("editPostedJobCard.qualifications")}
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
                <label className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  {t("editPostedJobCard.jobDescription")}
                </label>
                <div className="mb-2">
                  <TextEditor value={editorValue} setValue={setEditorValue} />
                </div>
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
