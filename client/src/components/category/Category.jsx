import React from "react";
import { FaBriefcase } from "react-icons/fa"; // import the category logo
import "tailwindcss/tailwind.css"; // import Tailwind CSS styles

const JobCategoryCard = ({ categoryTitle, numJobs }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-lg">
      <div className="flex items-center">
        <FaBriefcase className="text-gray-600 mr-4" size={28} />{" "}
        {/* category logo */}
        <h3 className="text-lg font-medium text-gray-800">
            It development
          {/* {categoryTitle} */}
        </h3>{" "}
        {/* category title */}
      </div>
      <span className="text-gray-500 font-medium">275 Jobs</span>{" "}
      {/* number of available jobs */}
    </div>
  );
};

export default JobCategoryCard;
