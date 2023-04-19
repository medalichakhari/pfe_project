import React from "react";
import GoogleIcon from "../../assets/svg/GoogleIcon";
import PrimaryButton from "../buttons/primarybutton/PrimaryButton";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const JobOfferCard = ({ jobOffer }) => {
  const navigate = useNavigate();
  const handleReadMore = () => {
    navigate(`/offer/${jobOffer.id}`);
  };
  return (
    <div className="container mx-auto rounded-lg bg-white shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center cursor-pointer">
          <GoogleIcon className="h-12 w-12 object-contain" />

          <div className="ml-4">
            <h3 className="font-medium text-gray-800">{jobOffer.titre}</h3>
            <p className="text-gray-600">{jobOffer?.societ?.nom}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <p className="flex justify-content px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          <HiOutlineLocationMarker className="text-gray-500 m-1" />
          {jobOffer.lieux}
        </p>
        <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {jobOffer.type}
        </p>
        <p className="px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          2 days ago
        </p>
      </div>
      <p className="ml-6 mt-4 text-gray-800 font-light">
        {jobOffer.description}
      </p>
      <PrimaryButton className="mt-4 w-full" onClick={handleReadMore}>
        Read more
      </PrimaryButton>
    </div>
  );
};

export default JobOfferCard;
