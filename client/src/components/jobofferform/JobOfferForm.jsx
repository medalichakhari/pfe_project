import Select from "react-tailwindcss-select";
import {skills} from "../../data/skills";

const JobOfferForm = ({
  values,
  selectedValues,
  setSelectedValues,
  handleChange,
  handleBlur,
}) => {
  const handleChanges = (value) => {
    console.log("value:", value);
    setSelectedValues(value);
  };

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
          Qualifications :
        </label>
        <Select
          value={selectedValues}
          onChange={handleChanges}
          options={skills}
          isMultiple={true}
          isSearchable={true}
          isClearable={true}
          placeholder="Select needed skills"
          classNames={{
            menuButton: ({ isDisabled }) =>
              `flex text-sm text-gray-500 border border-gray-300 rounded-lg shadow-sm transition-all duration-300 focus:outline-none ${
                isDisabled
                  ? "bg-gray-200"
                  : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
              }`,
            menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
            listItem: ({ isSelected }) =>
              `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                isSelected
                  ? `text-white bg-blue-500`
                  : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
              }`,
          }}
        />
      </div>
      <div>
        <label className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white">
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
