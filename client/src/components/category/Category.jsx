import React from "react";

const CategoryCard = ({ category, logo, count }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <div className="p-4">
        <div className="flex items-center">
          {logo}
          <h3 className="ml-4 text-xl font-medium text-gray-900">{category}</h3>
        </div>
        <div className="mt-2 text-gray-600">
          <span>{count} companies available</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
