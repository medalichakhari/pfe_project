import React from "react";
import PrimaryButton from "../buttons/primarybutton/PrimaryButton";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from "moment";

const JobOfferCard = ({ jobOffer }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const truncatedTitle =
    jobOffer.titre.slice(0, 15) + (jobOffer.titre.length > 15 ? "..." : "");
  const truncatedDescription =
    jobOffer.description.slice(0, 100) +
    (jobOffer.description.length > 100 ? "..." : "");

  const handleReadMore = () => {
    navigate(`/offer/${jobOffer.id}`);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center cursor-pointer">
          <img
            src={jobOffer.societe?.logo}
            alt="companyLogo"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="ml-4">
            <h3 className="font-medium text-gray-800">{truncatedTitle}</h3>
            <p className="text-gray-600">{jobOffer?.societ?.nom}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <p className="flex items-center px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          <HiOutlineLocationMarker className="text-gray-500 mr-1" />
          {jobOffer.isRemote ? jobOffer?.societe.pays : "Remote"}
        </p>
        <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {jobOffer.experience}
        </p>
        <p className="px-3 py-1 text-sm font-semibold text-gray-700">
          {moment(jobOffer.updatedAt).fromNow()}
        </p>
      </div>
      <p
        className="mt-4 text-gray-800 font-light"
        dangerouslySetInnerHTML={{ __html: truncatedDescription }}
      />
      <PrimaryButton className="mt-4 w-full" onClick={handleReadMore}>
        {t("readMore")}
      </PrimaryButton>
    </div>
  );
};

export default JobOfferCard;
