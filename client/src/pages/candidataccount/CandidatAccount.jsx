import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import CandidatForm from "../../components/candidatform/CandidatForm";
import Layout from "../../components/layout/Layout";
import { CreateCandidat } from "../../lib/fetch";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useAuth } from "../../context/AuthContext";

const CandidatAccount = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
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
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
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
          <form onSubmit={handleSubmit}>
            <CandidatForm
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <div className="flex flex-row-reverse">
              <PrimaryButton type="submit">Apply</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CandidatAccount;
