import { useFormik } from "formik";
import { useState } from "react";
import PrimaryButton from "../../components/buttons/primarybutton/PrimaryButton";
import SecondaryButton from "../../components/buttons/secondarybutton/SecondaryButton";
import Layout from "../../components/layout/Layout";
import JobOfferForm from "../../components/jobofferform/JobOfferForm";
import { useAuth } from "../../context/AuthContext";
import { CreateOffre } from "../../lib/fetch";
import CompanyInfo from "../../components/companyform/CompanyInfo";
import { useUser } from "../../context/UserContext";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const STEPS_AMOUNT = 1;

const JobPosting = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();
  const [selectedValues, setSelectedValues] = useState(null);
  const [editorValue, setEditorValue] = useState("");
  const [formStep, setFormStep] = useState(0);
  const completeFormStep = () => {
    setFormStep(formStep + 1);
  };
  const previousFormStep = () => {
    setFormStep(formStep - 1);
  };
  const renderCompanyButtons = () => {
    if (formStep === 0) {
      return (
        <div className="flex flex-row-reverse">
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
        <div className="flex justify-between">
          <SecondaryButton type="button" onClick={previousFormStep}>
            {t("jobOfferForm.previous")}
          </SecondaryButton>
          <PrimaryButton type="submit">
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
    const qualificationsValue = selectedValues.map((option) => option.value);
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
    CreateOffre(offerData, token)
      .then((res) => {
        console.log(res);
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
        toast({
          description: error.message,
          position: "bottom-left",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
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
      qualification: "",
    },
    onSubmit: handleCreateJobOffer,
  });
  return (
    <Layout>
      <div className="my-16 flex justify-center items-center bg-gray-50">
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
