import { useFormik } from "formik";
import { useState } from "react";
import PrimaryButton from "@/buttons/primarybutton/PrimaryButton";
import SecondaryButton from "@/buttons/secondarybutton/SecondaryButton";
import Layout from "@/layout/Layout";
import JobOfferForm from "@/jobofferform/JobOfferForm";
import { useAuth } from "../../context/AuthContext";
import { CreateOffre } from "../../lib/fetch";
import CompanyInfo from "@/companyform/CompanyInfo";
import { useUser } from "../../context/UserContext";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { jobOfferSchema } from "../../utils/validationSchemas";

const STEPS_AMOUNT = 1;

const JobPosting = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();
  const [selectedValues, setSelectedValues] = useState(null);
  const [editorValue, setEditorValue] = useState("");
  const [formStep, setFormStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [editorError, setEditorError] = useState(true);
  const [selectError, setSelectError] = useState(true);
  const completeFormStep = () => {
    setFormStep(formStep + 1);
  };
  const previousFormStep = () => {
    setFormStep(formStep - 1);
  };
  const renderCompanyButtons = () => {
    if (formStep === 0) {
      return (
        <div className="flex flex-row-reverse mt-2">
          <PrimaryButton type="button" onClick={completeFormStep}>
            {t("jobOfferForm.next")}
          </PrimaryButton>
        </div>
      );
    } else {
      return null;
    }
  };

  const renderJobOfferButtons = () => {
    if (formStep === STEPS_AMOUNT) {
      return (
        <div className="flex justify-between mt-2">
          <SecondaryButton type="button" onClick={previousFormStep}>
            {t("jobOfferForm.previous")}
          </SecondaryButton>
          <PrimaryButton type="submit" disabled={submitting}>
            {t("jobOfferForm.createJob")}
          </PrimaryButton>
        </div>
      );
    } else {
      return null;
    }
  };
  const { token } = useAuth();
  const { company } = useUser();
  const handleCreateJobOffer = async (values, actions) => {
    setSubmitting(true);
    const qualificationsValue = selectedValues?.map((option) => option.value);
    const qualifications = qualificationsValue.join(",");
    let offerData = {
      titre: jobOfferValues.title,
      adresse: jobOfferValues.address,
      type: jobOfferValues.type,
      salaire: jobOfferValues.salary,
      experience: jobOfferValues.experience,
      niveau: jobOfferValues.educationLevel,
      competences: qualifications,
      description: editorValue,
      categorieId: jobOfferValues.domain,
      societeId: company?.id,
    };
    if (!editorError && !selectError) {
      CreateOffre(offerData, token)
        .then((res) => {
          setSubmitting(false);
          toast({
            description: "Joboffer added successfully .",
            position: "bottom-left",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          navigate("/recruiterSpace");
        })
        .catch((err) => {
          console.log(err);
          setSubmitting(false);
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
    values: jobOfferValues,
    errors: jobOfferErrors,
    touched: jobOfferTouched,
    isSubmitting: jobOfferIsSubmitting,
    handleBlur: jobOfferHandleBlur,
    handleChange: jobOfferHandleChange,
    handleSubmit: jobOfferHandleSubmit,
  } = useFormik({
    initialValues: {
      title: "",
      address: "",
      type: "",
      domain: "",
      salary: "",
      experience: "",
      educationLevel: "",
    },
    onSubmit: handleCreateJobOffer,
    validationSchema: jobOfferSchema,
  });
  return (
    <Layout>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div>
            {formStep === 0 && <CompanyInfo />}
            {renderCompanyButtons()}
          </div>
          <form onSubmit={jobOfferHandleSubmit}>
            {formStep === 1 && (
              <JobOfferForm
                values={jobOfferValues}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
                editorValue={editorValue}
                setEditorValue={setEditorValue}
                handleChange={jobOfferHandleChange}
                handleBlur={jobOfferHandleBlur}
                errors={jobOfferErrors}
                touched={jobOfferTouched}
                jobOfferIsSubmitting={submitting}
                setEditorError={setEditorError}
                setSelectError={setSelectError}
                editorError={editorError}
                selectError={selectError}
              />
            )}
            {renderJobOfferButtons()}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default JobPosting;
