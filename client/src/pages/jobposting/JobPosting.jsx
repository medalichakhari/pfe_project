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

const STEPS_AMOUNT = 1;

const JobPosting = () => {
  const [selectedValues, setSelectedValues] = useState(null);
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
            Next
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
            Previous
          </SecondaryButton>
          <PrimaryButton type="submit">Create Job Offer</PrimaryButton>
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
      domaine: jobOfferValues.domain,
      type: jobOfferValues.type,
      salaire: jobOfferValues.salary,
      competences: qualifications,
      description: jobOfferValues.description,
      societeId: company?.id,
    };
    console.log(offerData);
    CreateOffre(offerData, token)
      .then((res) => {
        console.log(res);
        completeFormStep();
      })
      .catch((err) => console.log(err));
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
      qualification: "",
      description: "",
    },
    onSubmit: handleCreateJobOffer,
  });
  return (
    <Layout>
      <div className="my-6 flex justify-center items-center bg-gray-50">
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
                handleChange={jobOfferHandleChange}
                handleBlur={jobOfferHandleBlur}
              />
            )}
            {renderJobOfferButtons()}
          </form>
          {formStep === 2 && (
            <div className="mb-2">
              <h2 className="font-semibold text-3xl mb-4">Congratulations!</h2>
              <p>You can browse your jobs offer in your dashboard!</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JobPosting;
