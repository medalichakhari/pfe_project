import React from "react";
import { BiTimeFive } from "react-icons/bi";
import { BsBriefcase } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const JobCard = ({ job }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigate = () => {
    navigate(`/offer/${job.id}`);
  };

  const handleApply = () => {
    user?.roles?.includes("candidat")
      ? navigate(`/offer/${job.id}/apply/${job.societe.userId}`)
      : navigate("/candidateaccount");
  };

  const truncatedTitle =
    job.titre.slice(0, 15) + (job.titre.length > 15 ? "..." : "");
  const truncatedDescription =
    job.description.slice(0, 100) + (job.description.length > 100 ? "..." : "");

  return (
    <div className="h-full">
      <div className="group w-[300px] p-6 bg-white rounded-md hover:bg-blueColor shadow-lg hover:shadow-lg transition duration-300 h-full">
        <span className="flex justify-between items-center mb-4">
          <h1
            className="text-lg font-semibold text-textColor group-hover:text-white cursor-pointer"
            onClick={handleNavigate}
          >
            {truncatedTitle}
          </h1>
          <span className="flex items-center text-gray-500">
            <BiTimeFive className="mr-1" />
            {moment(job.updatedAt).fromNow()}
          </span>
        </span>
        <div className="flex items-center mb-2">
          <HiOutlineLocationMarker className="text-gray-500 mr-1" />
          <h6 className="text-gray-500">
            {job.isRemote ? job?.societe.pays : "Remote"}
          </h6>
        </div>
        <div className="flex items-center mb-2">
          <BsBriefcase className="mr-1 text-gray-500" />
          <h6 className="text-gray-500">{job.experience}</h6>
        </div>
        <p
          className="text-sm text-gray-600 pt-4 border-t border-gray-300 mt-4"
          dangerouslySetInnerHTML={{ __html: truncatedDescription }}
        />
        <div className="flex items-center mt-4">
          {job.societe?.logo && (
            <img
              src={job.societe?.logo}
              alt="companyLogo"
              className="w-7 h-7 rounded-full object-cover mr-2"
            />
          )}
          <span className="text-sm font-semibold">{job.societe?.nom}</span>
        </div>
        <button
          className="mt-4 bg-blueColor text-white rounded-md py-2 w-full hover:bg-white hover:text-blueColor border border-blueColor transition duration-300"
          onClick={handleApply}
        >
          {t("apply")}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
