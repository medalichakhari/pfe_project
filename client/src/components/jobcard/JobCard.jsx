import React from "react";
import { BiTimeFive } from "react-icons/bi";

const JobCard = ({ job }) => {
  return (
    <div>
      <div className="group group/item w-[250px] p-[20px] bg-white rounded-[10px] hover:bg-blueColor shadow-lg shadow-greIsh-400/700 hover:shadow-lg">
        <span className="flex justify-between items-center gap-4">
          <h1 className="text-[16px] font-semibold text-textColor group-hover:text-white cursor-pointer">
            {job.titre}
          </h1>
          <span className="flex items-center text-[#ccc] gap-1">
            <BiTimeFive />
            Now
          </span>
        </span>
        <h6 className="text-[#ccc]">{job.lieu}</h6>
        <p className="text-[13px text-[#959595] pt-[20px] border-t-[2px] mt-[20px]">
          {job.description}
        </p>
        <div className="flex items-center gap-2">
          <img src="" alt="" className="w-[10%]" />
          <span className="text-[14px] py-[1rem] block group-hover:text-white">
            Google
          </span>
        </div>
        <button className="border-[2px] rounded-[10px] block p-[10px] w-full text-[14px] font-semibold text-textColor hover:bg-white group-hover/item:text-textColor group-hover:text-white">
          Aplly Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
