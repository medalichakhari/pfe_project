import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";

const CompanyCard = ({ company }) => {
  const { categoryId } = useParams();
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <div className="p-4">
        <div className="flex items-center">
          {company.logo}
          <div className="flex-col ml-2">
            <h3 className="text-xl font-medium text-gray-900">
              {company.name}
            </h3>
            <div className=" flex items-center mt-1">
              <HiOutlineLocationMarker className="text-gray-500 mr-1" />
              <p className="text-xs text-gray-600">{company.location}</p>
            </div>
          </div>
        </div>
        <div className="mt-2 text-gray-600">
          <span>{company.count} Job available</span>
        </div>
        <Link to={`/`} className="text-xs font-bold text-secondary">
          View jobs
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;
