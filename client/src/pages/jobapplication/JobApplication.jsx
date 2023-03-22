import { useFormik } from "formik";
import { useState } from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import CandidatForm from "../../components/candidatform/CandidatForm";
import Layout from "../../components/layout/Layout";
import JobOfferForm from "../../components/recruiterform/JobOfferForm";
import { useAuth } from "../../context/AuthContext";
import { CreateCandidat, CreateSociete } from "../../lib/fetch";

const STEPS_AMOUNT = 1;

const JobApplication = () => {
  const [formStep, setFormStep] = useState(0);
  const completeFormStep = (event) => {
    event.preventDefault();
    setFormStep(formStep + 1);
  };
  const previousFormStep = () => {
    setFormStep(formStep - 1);
  };
  const renderButtons = () => {
    if (formStep > STEPS_AMOUNT) {
      return null;
    } else if (formStep === STEPS_AMOUNT) {
      return null;
    } else {
      return (
        <div className="flex justify-between">
          <div className="ml-auto mt-5">
            <PrimaryButton type="button" onClick={completeFormStep}>
            Apply
          </PrimaryButton>
          </div>
        </div>

      );
    }
  };
  const { token } = useAuth();
  const handleCreateOffer = (values, actions) => {
    console.log("values", values);
    let candidatData = {
      grade: values.grade,
      speciality: values.speciality,
      cv:values.cv,
    };
    CreateCandidat(candidatData)
      .then((res) => {
        console.log("res", res);
      })
      .catch((error) => {
        console.log("error", error);
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
    initialValues: {
      grade: "",
      speciality: "",
      cv:"",
    },
    onSubmit: handleCreateOffer,
  });

  return (
    <Layout>
      <div className="my-6 flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleSubmit}>
            {formStep === 0 && (
              <CandidatForm
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
              />
            )}

            
            {formStep === 1 && (
              <div className="mb-2">
                <h2 className="font-semibold text-3xl mb-4">
                  Congratulations!
                </h2>
                <p>Good luck in your search for a job.</p>
              </div>
            )}
            {renderButtons()}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default JobApplication;
