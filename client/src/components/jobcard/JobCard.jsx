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
  console.log("jobzzzzzzzzzzzz", job);
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleNavigate = () => {
    navigate(`/offer/${job.id}`);
  };

  const handleApply = () => {
    user?.roles?.includes("candidat")
      ? navigate(`/offer/${job.id}/apply/${job.societe.id}`)
      : navigate("/candidateaccount");
  };

  const truncatedTitle =
    job.titre.slice(0, 15) + (job.titre.length > 15 ? "..." : "");
  const truncatedDescription =
    job.description.slice(0, 99) + (job.description.length > 99 ? "..." : "");

  return (
    <div>
      <div className="group group/item w-[250px] p-[20px] bg-white rounded-[10px] hover:bg-blueColor shadow-lg shadow-greIsh-400/700 hover:shadow-lg">
        <span className="flex justify-between items-center gap-4">
          <h1
            className="text-[16px] font-semibold text-textColor group-hover:text-white cursor-pointer"
            onClick={handleNavigate}
          >
            {truncatedTitle}
          </h1>
          <span className="flex items-center text-[#ccc] gap-1">
            <BiTimeFive />
            {moment(job.updatedAt).fromNow()}
          </span>
        </span>
        <div className=" flex items-center mt-1">
          <HiOutlineLocationMarker className="text-gray-500 mr-1" />
          <h6 className="text-[#ccc]">{job.adresse}</h6>
        </div>
        <div className="flex items-center mt-1">
          <BsBriefcase className="mr-1 text-gray-500" />
          <h6 className="text-[#ccc]">{job.type}</h6>
        </div>
        <p
          className="text-[13px text-[#959595] pt-[20px] border-t-[2px] mt-[20px]"
          dangerouslySetInnerHTML={{ __html: truncatedDescription }}
        />
        <div className="flex items-center gap-2">
          {job.societe?.logo ? (
            <img
              src={job.societe?.logo}
              alt="companyLogo"
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : null}
          <span className="text-[14px] py-[1rem] block group-hover:text-white">
            {job.societe?.nom}
          </span>
        </div>
        <button
          className="border-[2px] rounded-[10px] block p-[10px] w-full text-[14px] font-semibold text-textColor hover:bg-white group-hover/item:text-textColor group-hover:text-textColor"
          onClick={handleApply}
        >
          {t("apply")}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
