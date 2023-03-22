import React, { useState } from "react";
import { useFormik } from "formik";
import { useAuth } from "../../context/AuthContext";
import UploadCv from "../shared/UploadCv";


const CandidatForm = ({ values, handleChange, handleBlur }) => {
  const [image, setImage] = useState("");
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
          <option value="">Please select your grade</option>
          <option value="T1">Very early career</option>
          <option value="T2">Early career</option>
          <option value="T3">Seasoned professional</option>
          <option value="T4">Very senior</option>
          <option value="T5">Exceptional</option>
          <option value="T6">Luminary</option>
          <option value="other">Other</option>
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
          placeholder="Enter your specialities"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Upload Your Resume:<span className="text-sm text-gray-400">(cv)</span>
        </label>
     <UploadCv/>




</>
  );
};

export default CandidatForm;
