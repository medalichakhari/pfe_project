import { useFormik } from "formik";
import { useState } from "react";
import Layout from "../../components/layout/Layout";
import CandidatForm from "../../components/candidatform/CandidatForm";
import PrimaryButton from "../../components/buttons/primarybutton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { useAuth } from "../../context/AuthContext";
import { CreateCandidat } from "../../lib/fetch";
import { useUser } from "../../context/UserContext";
import CandidatInfo from "../../components/candidatinfo/CandidatInfo";

const STEPS_AMOUNT = 1;

const JobApplication = () => {
  const [formStep, setFormStep] = useState(0);
  const completeFormStep = () => {
    setFormStep(formStep + 1);
  };
  const previousFormStep = () => {
    setFormStep(formStep - 1);
  };
  const renderCandidatButtons = () => {
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
  const renderApplyJobButtons = () => {
    if (formStep === STEPS_AMOUNT) {
      return (
        <div className="flex justify-between">
          <SecondaryButton type="button" onClick={previousFormStep}>
            Previous
          </SecondaryButton>
          <PrimaryButton type="submit" onClick={completeFormStep}>
            Apply
          </PrimaryButton>
        </div>
      );
    } else {
      return null;
    }
  };
  const { token } = useAuth();
  const { candidate } = useUser();
  const handleApplyJob = async (values, actions) => {
    let candidatData = {
      grade: values.grade,
      speciality: values.speciality,
      cv: values.cv,
    };
    CreateCandidat(candidatData, token)
      .then((res) => {
        console.log(res);
        navigate("/JobApplication");
      })
      .catch((err) => console.log(err));
  };

  const {
    values: applyJobValues,
    errors: applyJobErrors,
    touched: applyJobTouched,
    isSubmitting: applyJobIsSubmitting,
    handleBlur: applyJobHandleBlur,
    handleChange: applyJobHandleChange,
    handleSubmit: applyJobHandleSubmit,
  } = useFormik({
    initialValues: {
      speciality: "",
      grade: "",
    },
    onSubmit: handleApplyJob,
  });
  return (
    <Layout>
      <div className="my-6 flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div>
            {formStep === 0 && <CandidatInfo />}
            {renderCandidatButtons()}
          </div>
          <div className="flex flex-row-reverse"></div>
          <form onSubmit={applyJobHandleSubmit}>
            {formStep === 1 && (
              <CandidatForm
                values={applyJobValues}
                handleChange={applyJobHandleChange}
                handleBlur={applyJobHandleBlur}
              />
            )}

            {renderApplyJobButtons()}
          </form>
          {formStep === 2 && (
            <div className="mb-2">
              <h2 className="font-semibold text-3xl mb-4">Request sent!</h2>
              <p>Good Luck</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JobApplication;