import React, { useState } from "react";
import { useFormik } from "formik";
import UploadCv from "../shared/UploadCv";

const CandidatForm = ({values, handleChange, handleBlur}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <>
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
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Upload Your Resume:
        </label>
        <UploadCv
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      </div>
    </>
  );
};

export default CandidatForm;
