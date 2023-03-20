import React, { useState } from "react";
import { useFormik } from "formik";
import { useAuth } from "../../context/AuthContext";
import UploadImage from "../shared/UploadImage";
import { CreateSociete } from "../../lib/fetch";

const CompanyForm = ({ values, handleChange, handleBlur, handleSubmit }) => {
  const [image, setImage] = useState("");
  return (
<>
      <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
        Recruiter account:
      </h4>
      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        Company logo: <span className="text-sm text-gray-400">(optional)</span>
      </label>
      <UploadImage image={image} setImage={setImage} />
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Profession:
        </label>
        <input
          value={values.profession}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="profession"
          id="profession"
          placeholder="Enter your profession e.g: Software Engineer"
          className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Company name:
        </label>
        <input
          value={values.companyName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="companyName"
          id="companyName"
          placeholder="Enter your company name"
          className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Company address:
        </label>
        <input
          value={values.companyAddress}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="companyAddress"
          id="companyAddress"
          placeholder="Enter your company address"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Company domain
        </label>
        <select
          value={values.companyDomain}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="companyDomain"
          id="companyDomain"
          placeholder="Please select it's domain"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Please select it's domain</option>
          <option value="Student">Student</option>
          <option value="Employed">Employed</option>
          <option value="notEmployed">Not Employed</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Description:
        </label>
        <input
          value={values.companyDescription}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="companyDescription"
          id="companyDescription"
          placeholder="Enter your company description"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
</>
  );
};

export default CompanyForm;
