import React, { useState } from "react";
import { useFormik } from "formik";
import UploadCv from "../shared/UploadCv";
import { useAuth } from "../../context/AuthContext";
import PrimaryButton from "../buttons/PrimaryButton";

const CandidatForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { token } = useAuth();
  const handleApplyJob = (values, actions) => {
    console.log("values", values);
    // let candidatData = {
    //   grade: values.grade,
    //   speciality: values.speciality,
    //   cv: values.cv,
    // };
    // CreateCandidat(candidatData)
    //   .then((res) => {
    //     console.log("res", res);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
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
    <div className="my-6 flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handleSubmit}>
          <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
            Candidat account:
          </h4>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Grade:
            </label>
            <select
              value={values.grade}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="grade"
              id="grade"
              placeholder="Please select your grade"
              className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            >
              <option value="">Please select your employement status</option>
              <option value="T1">Student</option>
              <option value="T2">Unemployed</option>
              <option value="T3">Employeed</option>
              <option value="T2">Freelancer</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Speciality:
            </label>
            <input
              value={values.speciality}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="speciality"
              id="speciality"
              placeholder="Enter your speciality"
              className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Upload Your Resume:
          </label>
          <UploadCv
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
          <div className="flex flex-row-reverse">
            <PrimaryButton type="submit">Apply</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidatForm;
