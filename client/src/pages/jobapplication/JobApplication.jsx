import { useFormik } from "formik";
import { useState } from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import CandidatForm from "../../components/candidatform/CandidatForm";
import Layout from "../../components/layout/Layout";
import JobOfferForm from "../../components/recruiterform/JobOfferForm";
import { useAuth } from "../../context/AuthContext";
import { CreateCandidat, CreateSociete } from "../../lib/fetch";


const JobApplication = () => {

  const renderButtons = () => {

      return (
        <div className="flex justify-between">
          <div className="ml-auto mt-5">
            <PrimaryButton type="button" onClick={handleSubmit}>
            Apply
          </PrimaryButton>
          </div>
        </div>
    );
  };
  const { token } = useAuth();
  const handleApplyJob = (values, actions) => {
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
    onSubmit: handleApplyJob,
  });

  return (
    <Layout>
      <div className="my-6 flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleSubmit}>
            
              <CandidatForm
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            
            {renderButtons()}
            

            
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default JobApplication;
