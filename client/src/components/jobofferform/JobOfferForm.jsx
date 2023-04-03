import { useState } from "react";

const JobOfferForm = ({ values, handleChange, handleBlur }) => {
  return (
    <>
      <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
        Job offer details:
      </h4>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Title:
        </label>
        <input
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="title"
          id="title"
          placeholder="Job title"
          className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Domain:
        </label>
        <select
          value={values.domain}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="domain"
          id="domain"
          placeholder="Phone number with country code"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Please select it's domain</option>
          <option value="Student">IT</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Address:
        </label>
        <input
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="address"
          id="address"
          placeholder="(Remote) or Job address"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Type:
        </label>
        <select
          value={values.type}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="type"
          id="type"
          placeholder="Job Type"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Please select it's type</option>
          <option value="internship">Internship</option>
          <option value="fulltime">Full Time</option>
          <option value="parttime">Part Time</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Salary:<span className="text-sm text-gray-400">(optional)</span>
        </label>
        <input
          value={values.salary}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="salary"
          id="salary"
          placeholder="Required experience level"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Qualifications:
        </label>
        <textarea
          value={values.qualification}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="qualification"
          id="qualification"
          placeholder="Job qualifications"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Description:
        </label>
        <textarea
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="description"
          id="description"
          placeholder="Job description"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
    </>
  );
};

export default JobOfferForm;
